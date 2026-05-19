import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send } from 'lucide-react';

interface LeadFallbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (message: string) => Promise<void>;
  profileName: string;
}

export function LeadFallbackModal({ isOpen, onClose, onSubmit, profileName }: LeadFallbackModalProps) {
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!message.trim()) {
      setError('Vui lòng nhập tin nhắn của bạn.');
      return;
    }

    try {
      setIsSubmitting(true);
      await onSubmit(message.trim());
      onClose();
      setMessage('');
    } catch (err) {
      setError('Không thể gửi tin nhắn. Vui lòng thử lại sau.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-card w-full max-w-md rounded-2xl border border-white/10 shadow-2xl pointer-events-auto overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="flex items-center justify-between p-6 border-b border-white/5 bg-white/[0.02]">
                <div>
                  <h3 className="text-xl font-bold text-white">Để lại tin nhắn cho tôi</h3>
                  <p className="text-sm text-text-muted mt-1">
                    AI hiện tại đang tạm dừng hoặc không online. Vui lòng để lại tin nhắn, {profileName} sẽ đọc và trả lời trực tiếp cho bạn!
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 -mr-2 text-text-muted hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto bg-card">
                <form id="lead-fallback-form" onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <div className="p-3 rounded-lg bg-danger/10 border border-danger/20 text-danger text-sm">
                      {error}
                    </div>
                  )}
                  
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">
                      Nội dung tin nhắn *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-blue/50 focus:ring-1 focus:ring-brand-blue/50 transition-all resize-none placeholder:text-white/20 text-sm"
                      placeholder="Nhập nội dung bạn muốn gửi..."
                    />
                  </div>

                  <p className="text-xs text-text-muted">
                    Tin nhắn này sẽ được gửi trực tiếp đến hộp thư của {profileName} và AI sẽ tạm dừng để đợi chủ sở hữu trả lời.
                  </p>
                </form>
              </div>

              <div className="p-6 border-t border-white/5 bg-white/[0.02] flex gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-2.5 rounded-xl border border-white/10 hover:bg-white/5 text-white font-medium transition-colors text-sm"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  form="lead-fallback-form"
                  disabled={isSubmitting || !message.trim()}
                  className="flex-1 py-2.5 rounded-xl bg-brand-blue hover:bg-electric-blue text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
                >
                  {isSubmitting ? (
                    <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      Gửi tin nhắn <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
