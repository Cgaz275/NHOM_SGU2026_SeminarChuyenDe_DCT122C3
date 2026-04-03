"use client";

import { useState } from "react";
import { Navbar } from "@/components/seminar/navbar";
import { Footer } from "@/components/seminar/footer";
import { DigitalTwinChat } from "@/components/seminar/digital-twin-chat";

const PERSONA_NAMES = [
  "Team",
  "Châu Gia Anh",
  "Dương Lê Khánh",
  "Đào Thị Thanh Tâm",
  "Phan Thành Đại",
];

export default function DigitalTwinPage() {
  const [selectedPersona, setSelectedPersona] = useState(2);

  const personaName = PERSONA_NAMES[selectedPersona] || "Khánh";

  return (
    <div className="dt-page-wrapper">
      <Navbar />
      <main className="dt-main">
        <div className="dt-bg-gradient" aria-hidden="true" />
        <div className="section-shell dt-content">
          <div className="dt-layout">
            <h1 className="dt-page-title">DIGITAL TWIN</h1>
            <p className="dt-page-subtitle">Let&apos;s chat ? → {personaName}</p>
            <div className="dt-chat-wrap">
              <DigitalTwinChat
                selectedPersona={selectedPersona}
                onPersonaChange={setSelectedPersona}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
