"use client";

import { useState, useRef, useEffect } from "react";

type Message = {
  id: number;
  role: "ai" | "user";
  text: string;
};

const INITIAL_MESSAGES: Message[] = [
  {
    id: 1,
    role: "ai",
    text: "Chào bạn nha, bạn muốn hỏi mình cái gì nè hỏi đi trả lời cho !",
  },
  { id: 2, role: "user", text: "chào bạn, bạn học ngành gì á ?" },
  {
    id: 3,
    role: "ai",
    text: "Mình học ngành công nghệ thông tin nha ! Bạn muốn hỏi gì khác không ?",
  },
  { id: 4, role: "user", text: "Techstack của bạn là gì ?" },
  {
    id: 5,
    role: "ai",
    text: "Main techstack hiện tại của mình là C# .NET backend nha, nhưng ở trong nhóm seminar chuyên đề mình đóng vai trò Fullstack",
  },
];

const AI_AVATAR =
  "https://api.builder.io/api/v1/image/assets/TEMP/313a7c38eca2e2912d54b0e22e386dfd71191a84?width=64";

export function DigitalTwinChat() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function handleSend() {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMsg: Message = { id: Date.now(), role: "user", text: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Placeholder AI reply
    setTimeout(() => {
      const aiReply: Message = {
        id: Date.now() + 1,
        role: "ai",
        text: "Câu hỏi hay đó ! Mình sẽ trả lời sau nha bạn.",
      };
      setMessages((prev) => [...prev, aiReply]);
    }, 800);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") handleSend();
  }

  return (
    <div className="dt-chat-card">
      {/* Messages */}
      <div className="dt-messages">
        {messages.map((msg) =>
          msg.role === "ai" ? (
            <div key={msg.id} className="dt-ai-message">
              <img src={AI_AVATAR} alt="Khánh avatar" className="dt-ai-avatar" />
              <div className="dt-ai-content">
                <p className="dt-ai-name">Dương Lê Khánh</p>
                <p className="dt-ai-text">{msg.text}</p>
              </div>
            </div>
          ) : (
            <div key={msg.id} className="dt-user-row">
              <span className="dt-user-bubble">{msg.text}</span>
            </div>
          )
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="dt-input-row">
        <input
          type="text"
          className="dt-input-field"
          placeholder="ask anything..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className="dt-send-btn"
          onClick={handleSend}
          disabled={!input.trim()}
        >
          SEND
        </button>
      </div>
    </div>
  );
}