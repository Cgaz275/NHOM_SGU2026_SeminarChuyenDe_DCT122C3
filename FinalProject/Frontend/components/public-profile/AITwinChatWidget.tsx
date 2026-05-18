import { useState, useRef, useEffect } from 'react';
import { ChatMessage, AIStatus } from '../../types/public-profile';
import { Send, AlertTriangle, UserCircle2, Bot, Sparkles, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AITwinChatWidgetProps {
  profileName: string;
  aiStatus: AIStatus;
  onSendMessage: (msg: string) => Promise<void>;
  onOpenLeadForm: () => void;
  onOpenReport: () => void;
  messages: ChatMessage[];
  isTyping: boolean;
}

export function AITwinChatWidget({
  profileName,
  aiStatus,
  onSendMessage,
  onOpenLeadForm,
  onOpenReport,
  messages,
  isTyping,
}: AITwinChatWidgetProps) {
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || aiStatus !== 'ai_ready') return;
    const msg = inputValue;
    setInputValue('');
    await onSendMessage(msg);
  };

  const isDisabled = aiStatus !== 'ai_ready';

  return (
    <div className="flex flex-col h-[500px] md:h-[600px] rounded-[24px] bg-card border border-white/10 overflow-hidden mt-6">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/[0.02]">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Bot className="w-8 h-8 text-brand-blue" />
            <div
              className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-card ${
                aiStatus === 'ai_ready' ? 'bg-success' : 'bg-danger'
              }`}
            />
          </div>
          <div>
            <h2 className="text-white font-semibold flex items-center gap-2">
              AI Twin của {profileName}
              <Sparkles className="w-4 h-4 text-electric-blue" />
            </h2>
            <p className="text-xs text-text-muted">
              {aiStatus === 'ai_ready' ? 'AI Sẵn sàng' : aiStatus === 'ai_disabled' ? 'AI Đã tắt' : 'Lỗi AI'}
            </p>
          </div>
        </div>
        <button
          onClick={onOpenReport}
          className="p-2 text-text-muted hover:text-danger transition-colors rounded-full hover:bg-danger/10"
          title="Báo cáo AI"
        >
          <AlertTriangle className="w-5 h-5" />
        </button>
      </div>

      {/* Disclaimer */}
      <div className="bg-brand-blue/10 border-b border-brand-blue/20 px-6 py-2 flex items-center gap-2">
        <AlertCircle className="w-4 h-4 text-brand-blue flex-shrink-0" />
        <p className="text-xs text-brand-blue/90">
          Đây là trợ lý AI đại diện cho {profileName}. Nó có thể không phải là người thật.
        </p>
      </div>

      {/* Message Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          // Check if AI suggested leaving contact form
          const showLeadButton = !isUser && msg.content.includes('[SHOW_LEAD_FORM]');
          const content = msg.content.replace('[SHOW_LEAD_FORM]', '').trim();

          return (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 max-w-[85%] ${isUser ? 'ml-auto flex-row-reverse' : ''}`}
            >
              <div className="flex-shrink-0 mt-1">
                {isUser ? (
                  <UserCircle2 className="w-6 h-6 text-text-muted" />
                ) : (
                  <Bot className="w-6 h-6 text-brand-blue" />
                )}
              </div>
              <div
                className={`rounded-2xl px-4 py-3 text-sm ${
                  isUser
                    ? 'bg-chat-light text-black rounded-tr-sm'
                    : 'bg-[#1A1A1A] border border-white/5 text-white rounded-tl-sm'
                }`}
              >
                <p className="whitespace-pre-wrap leading-relaxed">{content}</p>
                {showLeadButton && (
                  <button
                    onClick={onOpenLeadForm}
                    className="mt-3 w-full py-2 px-4 bg-brand-blue/20 hover:bg-brand-blue/30 text-brand-blue rounded-full text-xs font-semibold transition-colors"
                  >
                    Để lại thông tin liên hệ
                  </button>
                )}
              </div>
            </motion.div>
          );
        })}
        {isTyping && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3 max-w-[85%]">
            <div className="flex-shrink-0 mt-1">
              <Bot className="w-6 h-6 text-brand-blue" />
            </div>
            <div className="rounded-2xl rounded-tl-sm px-4 py-3 bg-[#1A1A1A] border border-white/5">
              <div className="flex gap-1.5 items-center h-5">
                <div className="w-1.5 h-1.5 bg-brand-blue rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-1.5 h-1.5 bg-brand-blue rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-1.5 h-1.5 bg-brand-blue rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white/[0.02] border-t border-white/5">
        {isDisabled ? (
          <div className="flex flex-col items-center gap-2">
            <p className="text-sm text-text-muted text-center">
              AI Twin của {profileName} hiện không khả dụng.
            </p>
            <button
              onClick={onOpenLeadForm}
              className="py-2 px-6 rounded-full bg-white/10 hover:bg-white/15 text-white text-sm font-medium transition-colors"
            >
              Để lại thông tin liên hệ của bạn
            </button>
          </div>
        ) : (
          <form onSubmit={handleSend} className="relative flex items-center">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Hỏi tôi bất cứ điều gì..."
              className="w-full bg-[#1A1A1A] border border-white/10 rounded-full py-3 pl-5 pr-12 text-sm text-white focus:outline-none focus:border-brand-blue/50 focus:ring-1 focus:ring-brand-blue/50 transition-all placeholder:text-text-muted"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="absolute right-2 p-2 bg-brand-blue hover:bg-electric-blue disabled:bg-white/10 disabled:text-text-muted text-white rounded-full transition-colors flex items-center justify-center"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
