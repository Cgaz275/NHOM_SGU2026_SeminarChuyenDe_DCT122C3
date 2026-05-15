import { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { ExperienceItem } from '@/types/ai-twin';

interface AddExperienceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (item: Omit<ExperienceItem, 'id'>) => void;
  initialData?: ExperienceItem | null;
}

export function AddExperienceModal({ isOpen, onClose, onAdd, initialData }: AddExperienceModalProps) {
  const [companyName, setCompanyName] = useState(initialData?.companyName || '');
  const [role, setRole] = useState(initialData?.role || '');
  const [startDate, setStartDate] = useState(initialData?.startDate || '');
  const [endDate, setEndDate] = useState(initialData?.endDate || '');
  const [description, setDescription] = useState(initialData?.description || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({ companyName, role, startDate, endDate, description });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={initialData ? "Edit experience" : "Add new experience"} subtitle="Add work experience your AI can reference.">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-white mb-2">Company Name</label>
          <input required type="text" value={companyName} onChange={e => setCompanyName(e.target.value)} className="w-full bg-[#101010] border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#008FEA] focus:outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-white mb-2">Role</label>
          <input required type="text" value={role} onChange={e => setRole(e.target.value)} className="w-full bg-[#101010] border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#008FEA] focus:outline-none" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-white mb-2">Start Date</label>
            <input required type="text" placeholder="e.g. 2020" value={startDate} onChange={e => setStartDate(e.target.value)} className="w-full bg-[#101010] border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#008FEA] focus:outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-white mb-2">End Date</label>
            <input required type="text" placeholder="e.g. Present" value={endDate} onChange={e => setEndDate(e.target.value)} className="w-full bg-[#101010] border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#008FEA] focus:outline-none" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-white mb-2">Description</label>
          <textarea required value={description} onChange={e => setDescription(e.target.value)} rows={3} className="w-full bg-[#101010] border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#008FEA] focus:outline-none resize-none" />
        </div>
        <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
          <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-white hover:bg-white/5 rounded-lg transition-colors">Cancel</button>
          <button type="submit" className="px-4 py-2 text-sm font-medium bg-[#008FEA] text-white rounded-lg hover:bg-[#007AC8] transition-colors">{initialData ? 'Save' : 'Add'}</button>
        </div>
      </form>
    </Modal>
  );
}
