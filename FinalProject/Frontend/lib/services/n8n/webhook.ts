const N8N_WEBHOOK_URL = "https://snailnoodles.app.n8n.cloud/webhook/chat-api";
const SESSION_ID = "user_123";

interface N8NPayload {
  sessionId: string;
  targetPersona: string;
  intent: string;
  message: string;
}

interface N8NResponse {
  reply: string;
}

export async function sendMessageToN8N(
  userMessage: string,
  personaId: number
): Promise<string> {
  try {
    const payload: N8NPayload = {
      sessionId: SESSION_ID,
      targetPersona: String(personaId),
      intent: "ask_info",
      message: userMessage,
    };

    const response = await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: N8NResponse = await response.json();
    return data.reply || "Xin lỗi, tôi không thể trả lời lúc này.";
  } catch (error) {
    console.error("Error communicating with n8n:", error);
    return "Có lỗi xảy ra, vui lòng thử lại sau.";
  }
}
