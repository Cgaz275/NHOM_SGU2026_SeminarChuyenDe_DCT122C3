import { Navbar } from "@/components/seminar/navbar";
import { Footer } from "@/components/seminar/footer";
import { DigitalTwinChat } from "@/components/seminar/digital-twin-chat";

export default function DigitalTwinPage() {
  return (
    <div className="dt-page-wrapper">
      <Navbar />
      <main className="dt-main">
        <div className="dt-bg-gradient" aria-hidden="true" />
        <div className="section-shell dt-content">
          <div className="dt-layout">
            <h1 className="dt-page-title">DIGITAL TWIN</h1>
            <p className="dt-page-subtitle">Let&apos;s chat ? → Khánh</p>
            <div className="dt-chat-wrap">
              <DigitalTwinChat />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
