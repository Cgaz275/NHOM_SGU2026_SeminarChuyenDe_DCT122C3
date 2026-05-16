import { Search } from 'lucide-react';
import { ConversationFilter } from '@/types/inbox';

interface ConversationFiltersProps {
  filter: ConversationFilter;
  onFilterChange: (filter: ConversationFilter) => void;
}

export function ConversationFilters({ filter, onFilterChange }: ConversationFiltersProps) {
  const filterOptions: { label: string; value: ConversationFilter['type'] }[] = [
    { label: 'Tất cả', value: 'all' },
    { label: 'Chưa đọc', value: 'unread' },
    { label: 'Đã lưu trữ', value: 'archived' },
    { label: 'Lead mới', value: 'new_lead' },
    { label: 'AI tạm dừng', value: 'ai_paused' },
  ];

  return (
    <div className="p-4 border-b border-white/10 space-y-4">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={18} className="text-white/40" />
        </div>
        <input
          type="text"
          placeholder="Tìm theo tên, email, số điện thoại..."
          value={filter.search}
          onChange={(e) => onFilterChange({ ...filter, search: e.target.value })}
          className="w-full bg-[#101010] border border-white/10 rounded-lg py-2 pl-10 pr-4 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#2367A2] transition-colors"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {filterOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => onFilterChange({ ...filter, type: option.value })}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              filter.type === option.value
                ? 'bg-[#2367A2] text-white'
                : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
