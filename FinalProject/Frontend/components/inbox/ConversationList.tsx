import { Conversation, ConversationFilter } from '@/types/inbox';
import { ConversationCard } from './ConversationCard';
import { ConversationFilters } from './ConversationFilters';
import { Inbox } from 'lucide-react';

interface ConversationListProps {
  conversations: Conversation[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  filter: ConversationFilter;
  onFilterChange: (filter: ConversationFilter) => void;
  isLoading: boolean;
}

export function ConversationList({
  conversations,
  selectedId,
  onSelect,
  filter,
  onFilterChange,
  isLoading,
}: ConversationListProps) {
  return (
    <div className="flex flex-col h-full bg-[#1A1A1A] border-r border-white/10 w-full md:w-[340px] shrink-0">
      <div className="p-4 border-b border-white/10 shrink-0">
        <h2 className="text-xl font-semibold text-white">Hộp thư Persona</h2>
        <p className="text-sm text-white/50 mt-1">
          {conversations.length} hội thoại
        </p>
      </div>

      <ConversationFilters filter={filter} onFilterChange={onFilterChange} />

      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-full text-white/40 p-6">
            <span className="w-8 h-8 rounded-full border-2 border-[#008FEA] border-t-transparent animate-spin mb-4" />
            <p className="text-sm">Đang tải hội thoại...</p>
          </div>
        ) : conversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-6 text-white/40">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
              <Inbox size={24} className="text-white/20" />
            </div>
            <h3 className="font-medium text-white/60 mb-2">Chưa có hội thoại nào.</h3>
            <p className="text-sm">Không tìm thấy hội thoại phù hợp với bộ lọc hiện tại.</p>
          </div>
        ) : (
          conversations.map((conv) => (
            <ConversationCard
              key={conv.id}
              conversation={conv}
              isSelected={selectedId === conv.id}
              onClick={() => onSelect(conv.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}
