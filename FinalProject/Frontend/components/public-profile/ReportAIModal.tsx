import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertTriangle } from 'lucide-react';
import { ReportData } from '../../types/public-profile';

interface ReportAIModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ReportData) => Promise<void>;
}

const QUICK_REASONS = [
  'Phản hồi thô lỗ',
  'Thông tin sai lệch',
  'Spam',
  'Vấn đề riêng tư',
  'Khác',
];

export function ReportAIModal({ isOpen, onClose, onSubmit }: ReportAIModalProps) {
  const [selectedReason, setSelectedReason] = useState<string>('');
  const [details, setDetails] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedReason) return;

    try {
      setIsSubmitting(true);
      await onSubmit({ reason: selectedReason, details });
      onClose();
      setSelectedReason('');
      setDetails('');
    } catch (err) {
      // Handle error gracefully if needed
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
              <div className="flex items-center justify-between p-6 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-danger/10 rounded-full text-danger">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Báo cáo AI</h3>
                    <p className="text-sm text-text-muted mt-1">
                      Hãy cho chúng tôi biết điều gì đã xảy ra.
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 -mr-2 text-text-muted hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto">
                <form id="report-form" onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-text-muted mb-3">
                      Lý do báo cáo <span className="text-danger">*</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {QUICK_REASONS.map((reason) => (
                        <button
                          key={reason}
                          type="button"
                          onClick={() => setSelectedReason(reason)}
                          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                            selectedReason === reason
                              ? 'bg-danger text-white border-transparent'
                              : 'bg-white/5 border border-white/10 text-text-muted hover:text-white hover:border-white/30'
                          }`}
                        >
                          {reason}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-muted mb-1.5">
                      Chi tiết bổ sung <span className="text-xs opacity-50">(Không bắt buộc)</span>
                    </label>
                    <textarea
                      rows={3}
                      value={details}
                      onChange={(e) => setDetails(e.target.value)}
                      className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-danger/50 focus:ring-1 focus:ring-danger/50 transition-all resize-none"
                      placeholder="Vui lòng cung cấp thêm ngữ cảnh nếu cần..."
                    />
                  </div>
                </form>
              </div>

              <div className="p-6 border-t border-white/5 bg-white/[0.02] flex gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-2.5 rounded-full border border-white/10 hover:bg-white/5 text-white font-medium transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  form="report-form"
                  disabled={isSubmitting || !selectedReason}
                  className="flex-1 py-2.5 rounded-full bg-danger hover:bg-red-500 text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  ) : (
                    'Gửi báo cáo'
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
