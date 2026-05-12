import { Navbar } from "@/components/seminar/navbar";
import { Hero } from "@/components/seminar/hero";
import { TechStack } from "@/components/seminar/tech-stack";
import { TeamSection } from "@/components/seminar/team-section";
import { ContactCTA } from "@/components/seminar/contact-cta";
import { Footer } from "@/components/seminar/footer";

export function SeminarLanding() {
  return (
    <div className="min-h-screen overflow-x-clip bg-[#0f0f0f] text-white">
      <Navbar />
      <main>
        <Hero />
        <TechStack />
        <TeamSection />
        <ContactCTA />
        <Footer />
      </main>
    </div>
  );
}
