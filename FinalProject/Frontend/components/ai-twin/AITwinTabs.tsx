import { User, Database, Shield, MessageSquare, UploadCloud } from 'lucide-react';

interface AITwinTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function AITwinTabs({ activeTab, onTabChange }: AITwinTabsProps) {
  const tabs = [
    { id: 'persona', label: 'Tính cách', icon: User },
    { id: 'knowledge', label: 'Cơ sở Kiến thức', icon: Database },
  ];


  return (
    <div className="flex overflow-x-auto hide-scrollbar border-b border-white/10 mb-6">
      <div className="flex min-w-max space-x-2 pb-px">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors border-b-2 ${
                isActive
                  ? 'border-[#008FEA] text-[#008FEA]'
                  : 'border-transparent text-white/50 hover:text-white hover:border-white/20'
              }`}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
