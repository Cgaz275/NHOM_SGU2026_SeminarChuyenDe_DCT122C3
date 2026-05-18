import { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { FAQItem } from '@/types/ai-twin';

interface AddFAQModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (item: Omit<FAQItem, 'id'>) => void;
  initialData?: FAQItem | null;
}

export function AddFAQModal({ isOpen, onClose, onAdd, initialData }: AddFAQModalProps) {
  const [question, setQuestion] = useState(initialData?.question || '');
  const [answer, setAnswer] = useState(initialData?.answer || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({ question, answer });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={initialData ? "Sửa Câu hỏi thường gặp" : "Thêm Câu hỏi thường gặp mới"} subtitle="Thêm các câu hỏi thường gặp.">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-white mb-2">Câu hỏi</label>
          <input required type="text" value={question} onChange={e => setQuestion(e.target.value)} className="w-full bg-[#101010] border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#008FEA] focus:outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-white mb-2">Câu trả lời</label>
          <textarea required value={answer} onChange={e => setAnswer(e.target.value)} rows={4} className="w-full bg-[#101010] border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#008FEA] focus:outline-none resize-none" />
        </div>
        <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
          <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-white hover:bg-white/5 rounded-lg transition-colors">Hủy</button>
          <button type="submit" className="px-4 py-2 text-sm font-medium bg-[#008FEA] text-white rounded-lg hover:bg-[#007AC8] transition-colors">{initialData ? 'Lưu' : 'Thêm'}</button>
        </div>
      </form>
    </Modal>

  );
}
