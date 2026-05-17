import { useState, useRef, useEffect } from 'react';
import { AITwinConfig, TestChatMessage } from '@/types/ai-twin';
import { 
  sendTestMessage, 
  regenerateTestResponse, 
  resetTestConversation 
} from '@/services/aiTwinService';
import { Send, RotateCcw, RefreshCcw, User, Bot, AlertTriangle } from 'lucide-react';

interface TestChatSectionProps {
  config: AITwinConfig;
}

export function TestChatSection({ config }: TestChatSectionProps) {
  const [messages, setMessages] = useState<TestChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const isPromptTooLong = config.systemPrompt.length > 2000;
  const isKnowledgeTooLong = JSON.stringify(config.knowledgeBase).length > 15000;
  const isDisabled = isPromptTooLong || isKnowledgeTooLong;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isDisabled) return;

    const userMsg: TestChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await sendTestMessage(config, userMsg.content);
      setMessages((prev) => [...prev, response]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsTyping(false);
    }
  };

  const handleRegenerate = async () => {
    if (messages.length === 0 || isDisabled) return;
    
    // Remove last assistant message if it exists to replace it
    const lastMsg = messages[messages.length - 1];
    let msgsToKeep = messages;
    if (lastMsg.role === 'assistant') {
      msgsToKeep = messages.slice(0, -1);
      setMessages(msgsToKeep);
    }

    setIsTyping(true);
    try {
      const response = await regenerateTestResponse(config, msgsToKeep);
      setMessages((prev) => [...prev, response]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsTyping(false);
    }
  };

  const handleReset = async () => {
    if (window.confirm('Reset this test conversation?')) {
      await resetTestConversation();
      setMessages([]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {isDisabled && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-start gap-3">
          <AlertTriangle className="text-red-400 shrink-0 mt-0.5" size={20} />
          <div>
            <h3 className="text-sm font-semibold text-red-400">Cannot test AI</h3>
            <p className="text-sm text-red-400/80 mt-1">
              {isPromptTooLong && "System prompt exceeds 2,000 characters. "}
              {isKnowledgeTooLong && "Knowledge base exceeds 15,000 characters. "}
              Please reduce the size to test.
            </p>
          </div>
        </div>
      )}

      <div className="bg-[#1A1A1A] border border-white/10 rounded-xl overflow-hidden flex flex-col h-[600px]">
        {/* Header */}
        <div className="p-4 border-b border-white/10 bg-[#101010] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#008FEA]/20 flex items-center justify-center border border-[#008FEA]/30">
              <Bot size={20} className="text-[#008FEA]" />
            </div>
            <div>
              <h2 className="text-white font-medium">Test your AI Twin</h2>
              <div className="flex items-center gap-2 text-xs text-white/50">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                Sandbox Mode (Not Public)
              </div>
            </div>
          </div>
          <button 
            onClick={handleReset}
            className="p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            title="Reset conversation"
          >
            <RefreshCcw size={18} />
          </button>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-white/40 space-y-4">
              <Bot size={48} className="opacity-50" />
              <p className="max-w-xs">
                Start a conversation to test how your AI responds based on your current knowledge base and rules.
              </p>
            </div>
          ) : (
            messages.map((msg) => (
              <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  msg.role === 'user' ? 'bg-white/10' : 'bg-[#008FEA]/20 border border-[#008FEA]/30'
                }`}>
                  {msg.role === 'user' ? <User size={16} className="text-white" /> : <Bot size={16} className="text-[#008FEA]" />}
                </div>
                <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  msg.role === 'user' 
                    ? 'bg-[#008FEA] text-white rounded-tr-sm' 
                    : 'bg-[#2A2A2A] text-white/90 rounded-tl-sm'
                }`}>
                  <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            ))
          )}
          
          {isTyping && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-[#008FEA]/20 flex items-center justify-center shrink-0 border border-[#008FEA]/30">
                <Bot size={16} className="text-[#008FEA]" />
              </div>
              <div className="bg-[#2A2A2A] rounded-2xl rounded-tl-sm px-4 py-4 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce"></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-white/10 bg-[#101010]">
          {messages.length > 0 && messages[messages.length - 1].role === 'assistant' && (
            <div className="flex justify-center mb-4">
              <button 
                onClick={handleRegenerate}
                disabled={isDisabled || isTyping}
                className="flex items-center gap-2 text-xs text-white/60 hover:text-white transition-colors disabled:opacity-50"
              >
                <RotateCcw size={14} /> Regenerate response
              </button>
            </div>
          )}
          
          <div className="relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isDisabled || isTyping}
              placeholder="Message your AI..."
              className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl pl-4 pr-12 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#008FEA] transition-colors resize-none disabled:opacity-50"
              rows={1}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isDisabled || isTyping}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-[#008FEA] text-white rounded-lg hover:bg-[#007AC8] transition-colors disabled:opacity-50 disabled:hover:bg-[#008FEA]"
            >
              <Send size={16} />
            </button>
          </div>
          <div className="text-center mt-2">
            <p className="text-[10px] text-white/40">This is a test chat. Messages are not public.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
