"use client";

import { useState, useRef, useEffect } from "react";
import { sendMessageToN8N } from "@/lib/services/n8n/webhook";

type Message = {
  id: number;
  role: "ai" | "user";
  text: string;
  personaId?: number;
};

type Persona = {
  id: number;
  name: string;
  avatar: string;
};

const PERSONAS: Persona[] = [
  {
    id: 0,
    name: "Team",
    avatar: "/team_members/sgu.png",
  },
  {
    id: 1,
    name: "Châu Gia Anh",
    avatar: "/team_members/cga.png",
  },
  {
    id: 2,
    name: "Dương Lê Khánh",
    avatar: "/team_members/khanh.jpeg",
  },
  {
    id: 3,
    name: "Đào Thị Thanh Tâm",
    avatar: "/team_members/mun.jpeg",
  },
  {
    id: 4,
    name: "Phan Thành Đại",
    avatar: "/team_members/D.jpeg",
  },
];

const INITIAL_MESSAGES: Message[] = [
  {
    id: 1,
    role: "ai",
    text: "Chào bạn nha, bạn muốn hỏi mình cái gì nè hỏi đi trả lời cho !",
    personaId: 2,
  },
];

interface DigitalTwinChatProps {
  selectedPersona: number;
  onPersonaChange: (personaId: number) => void;
}

export function DigitalTwinChat({
  selectedPersona,
  onPersonaChange,
}: DigitalTwinChatProps) {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [showPersonaMenu, setShowPersonaMenu] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function handlePersonaSelect(personaId: number) {
    onPersonaChange(personaId);
    setShowPersonaMenu(false);
    // Clear messages when switching persona
    setMessages([
      {
        id: 1,
        role: "ai",
        text: "Chào bạn nha, bạn muốn hỏi mình cái gì nè hỏi đi trả lời cho !",
        personaId: personaId,
      },
    ]);
  }

  function togglePersonaMenu() {
    setShowPersonaMenu((prev) => !prev);
  }

  function handleSend() {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMsg: Message = { id: Date.now(), role: "user", text: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    (async () => {
      setIsLoading(true);
      try {
        const aiReplyText = await sendMessageToN8N(trimmed, selectedPersona);
        const aiReply: Message = {
          id: Date.now() + 1,
          role: "ai",
          text: aiReplyText,
          personaId: selectedPersona,
        };
        setMessages((prev) => [...prev, aiReply]);
      } finally {
        setIsLoading(false);
      }
    })();
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !isLoading) handleSend();
  }

  const currentPersona = PERSONAS.find((p) => p.id === selectedPersona);

  return (
    <div className="dt-chat-card">
      {/* Chat Header with Persona Selector */}
      <div className="dt-chat-header">
        <div className="dt-persona-selector">
          <button
            className="dt-persona-btn"
            onClick={togglePersonaMenu}
            title="Chọn persona"
          >
            👤
          </button>
          {showPersonaMenu && (
            <div className="dt-persona-menu">
              {PERSONAS.map((persona) => (
                <button
                  key={persona.id}
                  className={`dt-persona-option ${
                    selectedPersona === persona.id ? "active" : ""
                  }`}
                  onClick={() => handlePersonaSelect(persona.id)}
                >
                  {persona.name}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="dt-current-persona">
          {currentPersona && currentPersona.name}
        </div>
      </div>

      {/* Messages */}
      <div className="dt-messages">
        {messages.map((msg) =>
          msg.role === "ai" ? (
            <div key={msg.id} className="dt-ai-message">
              <img
                src={PERSONAS.find((p) => p.id === msg.personaId)?.avatar || currentPersona?.avatar}
                alt="AI avatar"
                className="dt-ai-avatar"
              />
              <div className="dt-ai-content">
                <p className="dt-ai-name">
                  {PERSONAS.find((p) => p.id === msg.personaId)?.name || currentPersona?.name}
                </p>
                <p className="dt-ai-text">{msg.text}</p>
              </div>
            </div>
          ) : (
            <div key={msg.id} className="dt-user-row">
              <span className="dt-user-bubble">{msg.text}</span>
            </div>
          )
        )}
        {isLoading && (
          <div className="dt-ai-message">
            <img
              src={currentPersona?.avatar}
              alt="AI avatar"
              className="dt-ai-avatar"
            />
            <div className="dt-ai-content">
              <p className="dt-ai-name">{currentPersona?.name}</p>
              <div className="dt-loading-bubble">
                <span className="dt-loading-dot"></span>
                <span className="dt-loading-dot"></span>
                <span className="dt-loading-dot"></span>
              </div>
            </div>
          </div>
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
          disabled={isLoading}
        />
        <button
          className="dt-send-btn"
          onClick={handleSend}
          disabled={!input.trim() || isLoading}
        >
          {isLoading ? "..." : "SEND"}
        </button>
      </div>
    </div>
  );
}
