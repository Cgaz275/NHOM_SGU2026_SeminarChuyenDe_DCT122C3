import { Navbar } from '@/components/seminar/navbar';
import { Footer } from '@/components/seminar/footer';
import { ProjectsSection } from '@/components/projects/projects-section';

export default function TeamProjectPage() {
  return (
    <div id="top" className="min-h-screen overflow-x-clip bg-[#0f0f0f] text-white">
      <Navbar />
      <main>
        <ProjectsSection />
      </main>
      <Footer />
    </div>
  );
}
