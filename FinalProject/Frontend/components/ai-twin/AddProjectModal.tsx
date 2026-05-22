import { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { ProjectItem } from '@/types/ai-twin';

interface AddProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (item: Omit<ProjectItem, 'id'>) => void;
  initialData?: ProjectItem | null;
}

export function AddProjectModal({ isOpen, onClose, onAdd, initialData }: AddProjectModalProps) {
  const [projectName, setProjectName] = useState(initialData?.projectName || '');
  const [startDate, setStartDate] = useState(initialData?.startDate || '');
  const [endDate, setEndDate] = useState(initialData?.endDate || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [projectUrl, setProjectUrl] = useState(initialData?.projectUrl || '');
  const [tagsInput, setTagsInput] = useState(initialData?.tags.join(', ') || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tags = tagsInput.split(',').map(t => t.trim()).filter(Boolean);
    onAdd({ projectName, startDate, endDate, description, projectUrl, tags });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={initialData ? "Sửa dự án" : "Thêm dự án mới"} subtitle="Thêm một dự án để AI của bạn có thể giải thích.">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-white mb-2">Tên dự án</label>
          <input required type="text" value={projectName} onChange={e => setProjectName(e.target.value)} className="w-full bg-[#101010] border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#008FEA] focus:outline-none" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-white mb-2">Ngày bắt đầu</label>
            <input required type="date" value={startDate} onChange={e => setStartDate(e.target.value)} onKeyDown={e => e.preventDefault()} className="w-full bg-[#101010] border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#008FEA] focus:outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-white mb-2">Ngày kết thúc</label>
            <input required type="date" value={endDate} onChange={e => setEndDate(e.target.value)} onKeyDown={e => e.preventDefault()} className="w-full bg-[#101010] border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#008FEA] focus:outline-none" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">Mô tả</label>
          <textarea required value={description} onChange={e => setDescription(e.target.value)} rows={3} className="w-full bg-[#101010] border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#008FEA] focus:outline-none resize-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-white mb-2">URL dự án (Tùy chọn)</label>
          <input type="url" value={projectUrl} onChange={e => setProjectUrl(e.target.value)} placeholder="https://" className="w-full bg-[#101010] border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#008FEA] focus:outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-white mb-2">Thẻ (Cách nhau bằng dấu phẩy)</label>
          <input type="text" value={tagsInput} onChange={e => setTagsInput(e.target.value)} placeholder="React, Node.js, Design" className="w-full bg-[#101010] border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#008FEA] focus:outline-none" />
        </div>
        <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
          <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-white hover:bg-white/5 rounded-lg transition-colors">Hủy</button>
          <button type="submit" className="px-4 py-2 text-sm font-medium bg-[#008FEA] text-white rounded-lg hover:bg-[#007AC8] transition-colors">{initialData ? 'Lưu' : 'Thêm'}</button>
        </div>
      </form>
    </Modal>
  );
}
