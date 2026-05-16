import { Conversation } from '@/types/inbox';

interface ConversationCardProps {
  conversation: Conversation;
  isSelected: boolean;
  onClick: () => void;
}

export function ConversationCard({ conversation, isSelected, onClick }: ConversationCardProps) {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'unread':
        return 'bg-[#008FEA]';
      case 'read':
        return 'bg-white/20';
      case 'archived':
        return 'bg-white/10';
      default:
        return 'bg-white/20';
    }
  };

  const getModeLabel = (mode: string) => {
    switch (mode) {
      case 'ai_active':
        return 'AI đang trả lời';
      case 'human_takeover':
        return 'Người thật tiếp quản';
      case 'ai_paused':
        return 'AI tạm dừng';
      default:
        return '';
    }
  };
  
  const getModeColor = (mode: string) => {
    switch (mode) {
      case 'ai_active':
        return 'text-[#008FEA] bg-[#2367A2]/20';
      case 'human_takeover':
        return 'text-success bg-success/20';
      case 'ai_paused':
        return 'text-white/50 bg-white/10';
      default:
        return 'text-white/50 bg-white/10';
    }
  };

  const getLeadTagColor = (tag: string) => {
    switch (tag) {
      case 'new_lead':
        return 'text-blue-400 border-blue-400/30 bg-blue-400/10';
      case 'interested':
        return 'text-green-400 border-green-400/30 bg-green-400/10';
      case 'needs_reply':
        return 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10';
      default:
        return 'hidden';
    }
  };

  const getLeadTagLabel = (tag: string) => {
    switch (tag) {
      case 'new_lead':
        return 'Lead mới';
      case 'interested':
        return 'Có nhu cầu hợp tác';
      case 'needs_reply':
        return 'Cần phản hồi';
      default:
        return '';
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'Vừa xong';
    
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes} phút trước`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} giờ trước`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) return `${diffInDays} ngày trước`;
    
    return date.toLocaleDateString('vi-VN');
  };

  const timeAgo = formatTimeAgo(conversation.lastMessageAt);

  return (
    <div
      onClick={onClick}
      className={`p-4 cursor-pointer transition-colors border-b border-white/5 last:border-b-0 ${
        isSelected ? 'bg-[#2367A2]/10 border-l-2 border-l-[#008FEA]' : 'hover:bg-white/5 border-l-2 border-l-transparent'
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-sm font-medium text-white/80 shrink-0">
            {getInitials(conversation.visitorName)}
          </div>
          {conversation.status === 'unread' && (
            <div className={`absolute top-0 right-0 w-3 h-3 rounded-full border-2 border-[#101010] ${getStatusColor(conversation.status)}`} />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-center mb-1">
            <h4 className={`text-sm truncate font-medium ${conversation.status === 'unread' ? 'text-white' : 'text-white/80'}`}>
              {conversation.visitorName}
            </h4>
            <span className="text-xs text-white/40 whitespace-nowrap ml-2">
              {timeAgo}
            </span>
          </div>

          <div className="flex gap-2 text-xs mb-2 truncate">
            {conversation.visitorEmail && (
              <span className="text-white/50">{conversation.visitorEmail}</span>
            )}
            {conversation.visitorPhone && (
              <span className="text-white/50">{conversation.visitorPhone}</span>
            )}
          </div>

          <p className={`text-sm truncate mb-2 ${conversation.status === 'unread' ? 'text-white/90 font-medium' : 'text-white/60'}`}>
            {conversation.lastMessage}
          </p>

          <div className="flex flex-wrap items-center gap-2 mt-2">
            <span className={`text-[10px] px-2 py-0.5 rounded-full ${getModeColor(conversation.mode)}`}>
              {getModeLabel(conversation.mode)}
            </span>
            {conversation.leadTag !== 'none' && (
              <span className={`text-[10px] px-2 py-0.5 rounded-full border ${getLeadTagColor(conversation.leadTag)}`}>
                {getLeadTagLabel(conversation.leadTag)}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
