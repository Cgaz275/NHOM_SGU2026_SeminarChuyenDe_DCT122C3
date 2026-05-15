import { ExperienceItem } from '@/types/ai-twin';
import { Edit2, Trash2 } from 'lucide-react';

interface ExperienceListProps {
  items: ExperienceItem[];
  onEdit: (item: ExperienceItem) => void;
  onDelete: (id: string) => void;
}

export function ExperienceList({ items, onEdit, onDelete }: ExperienceListProps) {
  if (items.length === 0) {
    return <div className="text-center py-6 text-sm text-white/50">No experience added yet.</div>;
  }

  return (
    <div className="space-y-3">
      {items.map(item => (
        <div key={item.id} className="bg-[#101010] border border-white/10 rounded-lg p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-semibold text-white">{item.role}</h4>
              <span className="text-white/40 text-sm">at</span>
              <span className="text-[#008FEA] text-sm font-medium">{item.companyName}</span>
            </div>
            <div className="text-xs text-white/40 mb-2">
              {item.startDate} - {item.endDate}
            </div>
            <p className="text-sm text-white/60">{item.description}</p>
          </div>
          <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
            <button onClick={() => onEdit(item)} className="p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
              <Edit2 size={16} />
            </button>
            <button onClick={() => onDelete(item.id)} className="p-2 text-white/50 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors">
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
