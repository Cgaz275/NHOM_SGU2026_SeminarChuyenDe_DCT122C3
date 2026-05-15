import { ProjectItem } from '@/types/ai-twin';
import { Edit2, Trash2, ExternalLink } from 'lucide-react';

interface ProjectListProps {
  items: ProjectItem[];
  onEdit: (item: ProjectItem) => void;
  onDelete: (id: string) => void;
}

export function ProjectList({ items, onEdit, onDelete }: ProjectListProps) {
  if (items.length === 0) {
    return <div className="text-center py-6 text-sm text-white/50">No projects added yet.</div>;
  }

  return (
    <div className="space-y-3">
      {items.map(item => (
        <div key={item.id} className="bg-[#101010] border border-white/10 rounded-lg p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h4 className="font-semibold text-white">{item.projectName}</h4>
              {item.projectUrl && (
                <a href={item.projectUrl} target="_blank" rel="noreferrer" className="text-[#008FEA] hover:underline flex items-center gap-1 text-xs">
                  <ExternalLink size={12} /> Link
                </a>
              )}
            </div>
            <div className="text-xs text-white/40 mb-2">
              {item.startDate} - {item.endDate}
            </div>
            <p className="text-sm text-white/60 mb-2">{item.description}</p>
            {item.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {item.tags.map(tag => (
                  <span key={tag} className="text-[10px] px-2 py-0.5 bg-white/5 text-white/60 rounded-full border border-white/10">{tag}</span>
                ))}
              </div>
            )}
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
