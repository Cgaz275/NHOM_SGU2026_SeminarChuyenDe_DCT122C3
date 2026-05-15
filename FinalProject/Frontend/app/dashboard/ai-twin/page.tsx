import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { AITwinConfigPage } from '@/components/ai-twin/AITwinConfigPage';

export default function AITwinPage() {
  return (
    <div className="flex min-h-screen bg-[#0A0A0A]">
      <DashboardSidebar />
      <main className="flex-1 overflow-auto">
        <AITwinConfigPage />
      </main>
    </div>
  );
}
