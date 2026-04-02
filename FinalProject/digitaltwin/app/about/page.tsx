import { Navbar } from '@/components/seminar/navbar';
import AboutHero from '@/components/about/about-hero';
import TeamIntro from '@/components/about/team-intro';
import MembersSection from '@/components/about/members-section';

export default function AboutPage() {
  return (
    <div className="min-h-screen overflow-x-clip bg-[#000000] text-white">
      <Navbar />
      <main>
        <AboutHero />
        <TeamIntro />
        <MembersSection />
      </main>
    </div>
  );
}
