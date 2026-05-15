const { db } = require("../config/firebase");
const { getToneInstruction } = require("../utils/toneMapper");

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

	void globalRules;
	void toneInstruction;

	return `Ghi nhận tin nhắn: ${userMessage}. Đây là phản hồi giả lập từ AI của ${cardData.fullName}`;
}

module.exports = {
	processChat,
};