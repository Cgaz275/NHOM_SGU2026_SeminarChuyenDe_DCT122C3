const OpenAI = require("openai");
const { admin, db } = require("../config/firebase");
const { getToneInstruction } = require("../utils/toneMapper");

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

async function processChat(cardId, userMessage, conversationId = null, guestName = null, guestContact = null, forceHumanTakeover = false) {
	const cardRef = db.collection("cards").doc(cardId);
	const snapshot = await cardRef.get();

	if (!snapshot.exists) {
		const error = new Error("Không tìm thấy thẻ");
		error.statusCode = 404;
		throw error;
	}

	const cardData = snapshot.data();
	const aiConfig = cardData.aiConfig || {};

	if (!forceHumanTakeover) {
		if ((cardData.status !== "active" && cardData.status !== "published") || (cardData.aiStatus !== "Ready" && cardData.aiStatus !== "AI Ready") || aiConfig.isAiPaused === true) {
			const error = new Error(`AI hiện không khả dụng. [Debug] status: ${cardData.status}, aiStatus: ${cardData.aiStatus}, isAiPaused: ${aiConfig.isAiPaused}`);
			error.statusCode = 403;
			throw error;
		}
	}

	const globalRulesSnapshot = await db
		.collection("ai_knowledge_base")
		.doc("global_rules")
		.get();

	const globalRules = globalRulesSnapshot.exists ? globalRulesSnapshot.data() : null;

	const toneInstruction = getToneInstruction(aiConfig.toneOfVoice);

	const knowledgeBase = aiConfig.knowledgeBase || {};
	const skills = Array.isArray(knowledgeBase.skills)
		? knowledgeBase.skills.map(s => s.name).join(", ")
		: "Chưa cập nhật";
	const projects = Array.isArray(knowledgeBase.projects)
		? JSON.stringify(knowledgeBase.projects)
		: "[]";
	const experiences = Array.isArray(knowledgeBase.experiences)
		? JSON.stringify(knowledgeBase.experiences)
		: "[]";

	const systemPrompt = `Bạn là trợ lý AI ảo đại diện cho ${cardData.fullName}.
Vai trò: ${cardData.jobTitle || 'Chưa cập nhật'}.
Tiểu sử: ${cardData.bio || 'Chưa cập nhật'}.

[KIẾN THỨC VỀ CHỦ THẺ]
Kỹ năng: ${skills}
Dự án: ${projects}
Kinh nghiệm: ${experiences}

[HƯỚNG DẪN TRẢ LỜI]
- Khi người dùng hỏi về các dự án, chỉ liệt kê: Tên dự án, Thời gian, và Link dẫn tới (nếu có).
- KHÔNG hiển thị phần mô tả của dự án trong câu trả lời đầu tiên. Chỉ khi khách hàng hỏi thêm về dự án đó thì mới trả lời chi tiết phần mô tả.
- KHÔNG sử dụng ký tự ** để làm đậm các nhãn (ví dụ: viết "Tên dự án: " thay vì "**Tên dự án:**").

[LUẬT CHUNG]
Guardrails: ${JSON.stringify(globalRules ? globalRules.Guardrails : [])}
AI_Reading_Guide: ${JSON.stringify(globalRules ? globalRules.AI_Reading_Guide : [])}

[TONE]
${toneInstruction}`;

	const now = admin.firestore.FieldValue.serverTimestamp();
	let convRef;
	let activeConversationId = conversationId;

	// Nếu có conversationId → kiểm tra xem có tồn tại không
	if (activeConversationId) {
		convRef = db.collection("conversations").doc(activeConversationId);
		const convSnap = await convRef.get();
		if (!convSnap.exists) {
			activeConversationId = null;
		}
	}

	// Nếu không có conversationId nhưng có guestContact → tìm conversation cũ
	if (!activeConversationId && guestContact) {
		const existingSnap = await db.collection("conversations")
			.where("cardId", "==", cardId)
			.where("visitorEmail", "==", guestContact)
			.orderBy("createdAt", "desc")
			.limit(1)
			.get();
		if (!existingSnap.empty) {
			activeConversationId = existingSnap.docs[0].id;
			convRef = db.collection("conversations").doc(activeConversationId);
		}
	}

	if (!activeConversationId) {
		const newConv = await db.collection("conversations").add({
			cardId,
			createdAt: now,
			lastMessage: userMessage,
			lastMessageAt: now,
			status: "unread",
			isArchived: false,
			mode: forceHumanTakeover ? "human_takeover" : "ai_active",
			visitorName: guestName || "Khách truy cập",
			visitorEmail: guestContact || "",
			visitorPhone: "",
			leadTag: guestName ? "new_lead" : "none"
		});
		activeConversationId = newConv.id;
		convRef = newConv;
	} else {
		const updateData = {
			lastMessage: userMessage,
			lastMessageAt: now,
			status: "unread"
		};
		if (forceHumanTakeover) {
			updateData.mode = "human_takeover";
		}
		await convRef.update(updateData);
	}

	// Lưu tin nhắn của khách
	await convRef.collection("messages").add({
		sender: "visitor",
		content: userMessage,
		type: "text",
		createdAt: now
	});

	// Kiểm tra mode của cuộc trò chuyện
	const currentConvSnap = await convRef.get();
	const convMode = currentConvSnap.exists ? currentConvSnap.data().mode : "ai_active";

	if (convMode === "human_takeover") {
		// Chủ thẻ đang tiếp quản → AI tạm dừng, không gọi OpenAI
		return {
			reply: null, // null báo hiệu cho FE biết AI đang tắt
			conversationId: activeConversationId,
			mode: "human_takeover"
		};
	}

	try {
		const response = await openai.chat.completions.create({
			model: "gpt-4o-mini",
			messages: [
				{ role: "system", content: systemPrompt },
				{ role: "user", content: userMessage },
			],
			temperature: 0.7,
		});

		const reply = response.choices[0]?.message?.content || "";

		// Lưu tin nhắn của AI
		await convRef.collection("messages").add({
			sender: "ai",
			content: reply,
			type: "text",
			createdAt: now
		});

		// Cập nhật lastMessage là câu trả lời của AI
		await convRef.update({
			lastMessage: reply,
			lastMessageAt: now
		});

		return { reply, conversationId: activeConversationId };
	} catch (error) {
		console.error("OpenAI Error:", error);
		const apiError = new Error(`Gọi OpenAI thất bại: ${error.message}`);
		apiError.statusCode = 500;
		throw apiError;
	}
}

module.exports = {
	processChat,
};