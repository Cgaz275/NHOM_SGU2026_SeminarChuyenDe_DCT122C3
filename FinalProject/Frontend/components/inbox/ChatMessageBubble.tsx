import { ChatMessage } from '@/types/inbox';

interface ChatMessageBubbleProps {
  message: ChatMessage;
}

export function ChatMessageBubble({ message }: ChatMessageBubbleProps) {
  if (message.isSystemEvent || message.sender === 'system') {
    return (
      <div className="flex justify-center my-4">
        <span className="bg-white/5 px-4 py-1.5 rounded-full text-xs text-white/50 border border-white/10">
          {message.content}
        </span>
      </div>
    );
  }

  const isVisitor = message.sender === 'visitor';
  const isOwner = message.sender === 'owner';
  const isAi = message.sender === 'ai';

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getSenderLabel = () => {
    if (isVisitor) return 'Khách';
    if (isOwner) return 'Chủ thẻ';
    if (isAi) return 'AI Twin';
    return '';
  };

  return (
    <div className={`flex w-full ${isVisitor ? 'justify-start' : 'justify-end'} mb-4`}>
      <div className={`max-w-[75%] flex flex-col ${isVisitor ? 'items-start' : 'items-end'}`}>
        <span className="text-[10px] text-white/40 mb-1 ml-1 mr-1">
          {getSenderLabel()}
        </span>
        
        <div
          className={`px-4 py-3 rounded-2xl ${
            isVisitor
              ? 'bg-[#101010] border border-white/10 text-white/90 rounded-tl-sm'
              : isOwner
              ? 'bg-[#2367A2] text-white rounded-tr-sm'
              : 'bg-[#2367A2]/20 border border-[#2367A2]/30 text-[#008FEA] rounded-tr-sm'
          }`}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
        </div>
        
        <span className="text-[10px] text-white/30 mt-1 ml-1 mr-1">
          {formatTime(message.createdAt)}
        </span>
      </div>
    </div>
  );
}
