import { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { ServiceItem } from '@/types/ai-twin';

interface AddServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (item: Omit<ServiceItem, 'id'>) => void;
  initialData?: ServiceItem | null;
}

export function AddServiceModal({ isOpen, onClose, onAdd, initialData }: AddServiceModalProps) {
  const [serviceName, setServiceName] = useState(initialData?.serviceName || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [pricingNote, setPricingNote] = useState(initialData?.pricingNote || '');
  const [callToAction, setCallToAction] = useState(initialData?.callToAction || 'Liên hệ với tôi để biết thêm chi tiết');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({ serviceName, description, pricingNote, callToAction });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={initialData ? "Sửa dịch vụ" : "Thêm dịch vụ mới"} subtitle="Thêm một dịch vụ mà AI của bạn có thể cung cấp.">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-white mb-2">Tên dịch vụ</label>
          <input required type="text" value={serviceName} onChange={e => setServiceName(e.target.value)} className="w-full bg-[#101010] border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#008FEA] focus:outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-white mb-2">Mô tả</label>
          <textarea required value={description} onChange={e => setDescription(e.target.value)} rows={3} className="w-full bg-[#101010] border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#008FEA] focus:outline-none resize-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-white mb-2">Giá cả (Tùy chọn)</label>
          <div className="relative">
            <input type="number" min="0" placeholder="VD: 500000" value={pricingNote} onChange={e => setPricingNote(e.target.value)} className="w-full bg-[#101010] border border-white/10 rounded-lg px-4 py-2 pr-16 text-white focus:border-[#008FEA] focus:outline-none" />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 text-sm font-medium">VND</span>
          </div>
          <p className="text-xs text-white/40 mt-1">Nếu để trống, AI sẽ yêu cầu khách truy cập để lại thông tin liên hệ để báo giá.</p>
        </div>


        <div>
          <label className="block text-sm font-medium text-white mb-2">Lời kêu gọi hành động</label>
          <input required type="text" value={callToAction} onChange={e => setCallToAction(e.target.value)} className="w-full bg-[#101010] border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#008FEA] focus:outline-none" />
        </div>
        <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
          <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-white hover:bg-white/5 rounded-lg transition-colors">Hủy</button>
          <button type="submit" className="px-4 py-2 text-sm font-medium bg-[#008FEA] text-white rounded-lg hover:bg-[#007AC8] transition-colors">{initialData ? 'Lưu' : 'Thêm'}</button>
        </div>
      </form>
    </Modal>
  );
}
