import { SkillItem } from '@/types/ai-twin';
import { Edit2, Trash2 } from 'lucide-react';

interface SkillListProps {
  items: SkillItem[];
  onEdit: (item: SkillItem) => void;
  onDelete: (id: string) => void;
}

export function SkillList({ items, onEdit, onDelete }: SkillListProps) {
  if (items.length === 0) {
    return <div className="text-center py-6 text-sm text-white/50">No skills added yet.</div>;
  }

  return (
    <div className="space-y-3">
      {items.map(item => (
        <div key={item.id} className="bg-[#101010] border border-white/10 rounded-lg p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-semibold text-white">{item.name}</h4>
            </div>
          </div>
          <div className="flex items-center gap-2 self-end md:self-auto">
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
