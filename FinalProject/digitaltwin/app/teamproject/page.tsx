import { Navbar } from '@/components/seminar/navbar';
import { ProjectsSection } from '@/components/projects/projects-section';

export default function TeamProjectPage() {
  return (
    <div className="min-h-screen overflow-x-clip bg-[#0f0f0f] text-white">
      <Navbar />
      <main>
        <ProjectsSection />
      </main>
    </div>
  );
}
