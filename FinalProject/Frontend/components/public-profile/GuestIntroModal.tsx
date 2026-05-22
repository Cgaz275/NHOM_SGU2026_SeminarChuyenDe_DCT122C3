'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, MessageCircle, Sparkles, X, Loader2, History, ArrowRight } from 'lucide-react';

interface GuestInfo {
  name: string;
  contact: string;
}

interface GuestIntroModalProps {
  isOpen: boolean;
  aiDisplayName: string;
  profileName: string;
  cardId: string; // cần để tìm lịch sử
  onSubmit: (info: GuestInfo, foundHistoryCount?: number) => Promise<void>;
  onClose: () => void;
}

export function GuestIntroModal({
  isOpen,
  aiDisplayName,
  profileName,
  cardId,
  onSubmit,
  onClose,
}: GuestIntroModalProps) {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) { setError('Vui lòng nhập tên của bạn'); return; }
    if (!contact.trim()) { setError('Vui lòng nhập Email hoặc Zalo'); return; }
    setError('');
    setIsLoading(true);
    try {
      await onSubmit({ name: name.trim(), contact: contact.trim() });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', duration: 0.4 }}
            className="relative w-full max-w-md bg-[#1A1A1A] border border-white/10 rounded-2xl p-6 shadow-2xl overflow-hidden"
          >
            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#2367A2]/20 via-transparent to-[#008FEA]/10 pointer-events-none" />

            {/* Close button */}
            <button
              onClick={onClose}
              disabled={isLoading}
              className="absolute top-4 right-4 p-1.5 text-white/40 hover:text-white hover:bg-white/10 rounded-full transition-colors disabled:opacity-30"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header */}
            <div className="relative flex flex-col items-center text-center mb-6">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#2367A2] to-[#008FEA] flex items-center justify-center mb-3 shadow-[0_0_30px_rgba(0,143,234,0.4)]">
                {isLoading
                  ? <Loader2 className="w-7 h-7 text-white animate-spin" />
                  : <Sparkles className="w-7 h-7 text-white" />
                }
              </div>
              <h2 className="text-xl font-bold text-white mb-1">
                {isLoading ? 'Đang tìm lịch sử...' : 'Xin chào! 👋'}
              </h2>
              <p className="text-white/60 text-sm leading-relaxed">
                {isLoading
                  ? 'Hệ thống đang kiểm tra xem bạn đã từng trò chuyện trước đây chưa...'
                  : <>
                      Trước khi nói chuyện với{' '}
                      <span className="text-[#008FEA] font-medium">{aiDisplayName || `AI Twin của ${profileName}`}</span>
                      , hãy để lại thông tin để{' '}
                      <span className="text-white/80 font-medium">{profileName}</span> có thể liên hệ lại nhé!
                    </>
                }
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="relative space-y-4">
              {/* Name field */}
              <div>
                <label className="block text-xs font-medium text-white/50 mb-1.5 uppercase tracking-wider">
                  Tên của bạn *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nguyễn Văn A"
                    disabled={isLoading}
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#008FEA] transition-colors disabled:opacity-50"
                    autoFocus
                  />
                </div>
              </div>

              {/* Contact field */}
              <div>
                <label className="block text-xs font-medium text-white/50 mb-1.5 uppercase tracking-wider">
                  Email hoặc Zalo *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                  <input
                    type="text"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="email@gmail.com hoặc số Zalo"
                    disabled={isLoading}
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#008FEA] transition-colors disabled:opacity-50"
                  />
                </div>
              </div>

              {/* History hint */}
              <div className="flex items-center gap-2 bg-white/5 rounded-lg px-3 py-2">
                <History className="w-3.5 h-3.5 text-white/30 flex-shrink-0" />
                <p className="text-white/30 text-xs">
                  Nhập đúng email/Zalo đã dùng trước để tiếp tục hội thoại cũ
                </p>
              </div>

              {/* Error */}
              {error && <p className="text-red-400 text-xs">{error}</p>}

              {/* Privacy note */}
              <p className="text-white/30 text-xs text-center">
                🔒 Thông tin của bạn sẽ chỉ được chia sẻ với {profileName}
              </p>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-[#2367A2] to-[#008FEA] text-white font-semibold text-sm hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(0,143,234,0.3)] hover:shadow-[0_0_30px_rgba(0,143,234,0.5)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading
                  ? <><Loader2 className="w-4 h-4 animate-spin" /> Đang tìm lịch sử...</>
                  : <><MessageCircle className="w-4 h-4" /> Bắt đầu trò chuyện <ArrowRight className="w-4 h-4" /></>
                }
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
