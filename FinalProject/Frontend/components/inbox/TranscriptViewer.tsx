import { useState, useRef, useEffect } from 'react';
import { Conversation } from '@/types/inbox';
import { ChatMessageBubble } from './ChatMessageBubble';
import { HumanTakeoverBanner } from './HumanTakeoverBanner';
import { HumanTakeoverToggle } from './HumanTakeoverToggle';
import { ConversationActions } from './ConversationActions';
import { Send, ArrowLeft, Info } from 'lucide-react';

interface TranscriptViewerProps {
  conversation: Conversation | null;
  onSendMessage: (content: string) => void;
  onToggleTakeover: () => void;
  onMarkRead: (read: boolean) => void;
  onArchive: () => void;
  onRestore: () => void;
  onDelete: () => void;
  onToggleEmailNotification: (enabled: boolean) => void;
  onBackToMobileList: () => void;
  onShowMobileLead: () => void;
  isLoading: boolean;
}

export function TranscriptViewer({
  conversation,
  onSendMessage,
  onToggleTakeover,
  onMarkRead,
  onArchive,
  onRestore,
  onDelete,
  onToggleEmailNotification,
  onBackToMobileList,
  onShowMobileLead,
  isLoading,
}: TranscriptViewerProps) {
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation?.messages]);

  if (!conversation) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-white text-center p-6 h-full text-black/40">
        <div className="w-16 h-16 rounded-full bg-[#101010]/5 flex items-center justify-center mb-4">
          <span className="text-4xl text-[#101010]/20">💬</span>
        </div>
        <h3 className="font-medium text-[#101010]/60 mb-2">Chưa có hội thoại nào được chọn</h3>
        <p className="text-sm">Chọn một hội thoại từ danh sách để xem nội dung chi tiết.</p>
      </div>
    );
  }

  const handleSend = async () => {
    if (!input.trim() || isSending) return;
    
    setIsSending(true);
    await onSendMessage(input.trim());
    setInput('');
    setIsSending(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const isTakeoverActive = conversation.mode === 'human_takeover';

  return (
    <div className="flex-1 flex flex-col h-full bg-[#FAFAFA] text-[#101010] relative">
      {/* Header */}
      <div className="bg-[#2367A2] text-white px-4 py-3 flex items-center justify-between shadow-sm z-20 shrink-0">
        <div className="flex items-center gap-3">
          <button onClick={onBackToMobileList} className="md:hidden p-1.5 hover:bg-white/10 rounded-lg transition-colors">
            <ArrowLeft size={20} />
          </button>
          
          <div>
            <h2 className="font-medium">{conversation.visitorName}</h2>
            <div className="flex items-center gap-2 text-xs text-white/70">
              <span className="uppercase">{conversation.source}</span>
              <span className="w-1 h-1 rounded-full bg-white/40" />
              <span>{conversation.status === 'unread' ? 'Chưa đọc' : 'Đã đọc'}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={onShowMobileLead}
            className="xl:hidden p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <Info size={20} />
          </button>
          <HumanTakeoverToggle isActive={isTakeoverActive} onClick={onToggleTakeover} />
          <div className="w-px h-6 bg-white/20 mx-1 hidden sm:block" />
          <ConversationActions
            conversation={conversation}
            onMarkRead={onMarkRead}
            onArchive={onArchive}
            onRestore={onRestore}
            onDelete={onDelete}
            onToggleEmailNotification={onToggleEmailNotification}
          />
        </div>
      </div>

      <HumanTakeoverBanner isActive={isTakeoverActive} />

      {/* Transcript Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {conversation.messages.map((msg) => (
          <ChatMessageBubble key={msg.id} message={msg} />
        ))}
        {isLoading && (
          <div className="flex justify-center my-4">
            <span className="bg-[#101010]/5 px-4 py-2 rounded-full text-xs text-[#101010]/50 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#101010]/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1.5 h-1.5 bg-[#101010]/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1.5 h-1.5 bg-[#101010]/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-[#101010]/10 shrink-0">
        <div className="flex items-end gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={!isTakeoverActive || isSending}
            placeholder={isTakeoverActive ? "Nhập tin nhắn với tư cách chủ thẻ..." : "Bật Tiếp quản để nhắn trực tiếp với khách."}
            className="flex-1 bg-[#101010]/5 border border-[#101010]/10 rounded-xl px-4 py-3 text-sm text-[#101010] placeholder-[#101010]/40 focus:outline-none focus:border-[#2367A2] focus:bg-white resize-none h-[50px] max-h-[120px] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            rows={1}
          />
          <button
            onClick={handleSend}
            disabled={!isTakeoverActive || !input.trim() || isSending}
            className="w-[50px] h-[50px] rounded-xl bg-[#2367A2] text-white flex items-center justify-center hover:bg-[#2367A2]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
          >
            <Send size={20} className={input.trim() && !isSending ? 'ml-1' : ''} />
          </button>
        </div>
      </div>
    </div>
  );
}
