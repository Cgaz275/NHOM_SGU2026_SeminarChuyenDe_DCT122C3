import { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { SkillItem } from '@/types/ai-twin';

interface AddSkillModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (item: Omit<SkillItem, 'id'>) => void;
  initialData?: SkillItem | null;
}

export function AddSkillModal({ isOpen, onClose, onAdd, initialData }: AddSkillModalProps) {
  const [name, setName] = useState(initialData?.name || '');
  const [level, setLevel] = useState<SkillItem['level']>(initialData?.level || 'Intermediate');
  const [description, setDescription] = useState(initialData?.description || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({ name, level, description });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={initialData ? "Sửa kỹ năng" : "Thêm kỹ năng mới"} subtitle="Thêm một kỹ năng để AI của bạn có thể nói về.">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-white mb-2">Tên kỹ năng</label>
          <input required type="text" value={name} onChange={e => setName(e.target.value)} className="w-full bg-[#101010] border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#008FEA] focus:outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-white mb-2">Trình độ</label>
          <select value={level} onChange={e => setLevel(e.target.value as SkillItem['level'])} className="w-full bg-[#101010] border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#008FEA] focus:outline-none">
            <option value="Beginner">Sơ cấp</option>
            <option value="Intermediate">Trung cấp</option>
            <option value="Advanced">Cao cấp</option>
            <option value="Expert">Chuyên gia</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-white mb-2">Mô tả</label>
          <textarea required value={description} onChange={e => setDescription(e.target.value)} rows={3} className="w-full bg-[#101010] border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#008FEA] focus:outline-none resize-none" />
        </div>
        <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
          <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-white hover:bg-white/5 rounded-lg transition-colors">Hủy</button>
          <button type="submit" className="px-4 py-2 text-sm font-medium bg-[#008FEA] text-white rounded-lg hover:bg-[#007AC8] transition-colors">{initialData ? 'Lưu' : 'Thêm'}</button>
        </div>
      </form>
    </Modal>
  );
}
