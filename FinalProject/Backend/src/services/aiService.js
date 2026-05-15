const OpenAI = require("openai");
const { db } = require("../config/firebase");
const { getToneInstruction } = require("../utils/toneMapper");

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

async function processChat(cardId, userMessage) {
	const cardRef = db.collection("cards").doc(cardId);
	const snapshot = await cardRef.get();

	if (!snapshot.exists) {
		const error = new Error("Không tìm thấy thẻ");
		error.statusCode = 404;
		throw error;
	}

	const cardData = snapshot.data();
	const aiConfig = cardData.aiConfig || {};

	if (cardData.status !== "active" || cardData.aiStatus !== "Ready" || aiConfig.isAiPaused === true) {
		const error = new Error("AI hiện không khả dụng, vui lòng để lại lời nhắn");
		error.statusCode = 403;
		throw error;
	}

	const globalRulesSnapshot = await db
		.collection("ai_knowledge_base")
		.doc("global_rules")
		.get();

	const globalRules = globalRulesSnapshot.exists ? globalRulesSnapshot.data() : null;
	const toneInstruction = getToneInstruction(aiConfig.toneOfVoice);

	const systemPrompt = `Bạn là trợ lý AI ảo đại diện cho ${cardData.fullName}.

[LUẬT CHUNG]
Guardrails: ${JSON.stringify(globalRules ? globalRules.Guardrails : [])}
AI_Reading_Guide: ${JSON.stringify(globalRules ? globalRules.AI_Reading_Guide : [])}

[TONE]
${toneInstruction}`;

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
		return reply;
	} catch (error) {
		const apiError = new Error("Gọi OpenAI thất bại");
		apiError.statusCode = 500;
		throw apiError;
	}
}

module.exports = {
	processChat,
};