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
    <Modal isOpen={isOpen} onClose={onClose} title={initialData ? "Edit skill" : "Add new skill"} subtitle="Add a skill your AI can talk about.">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-white mb-2">Skill Name</label>
          <input required type="text" value={name} onChange={e => setName(e.target.value)} className="w-full bg-[#101010] border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#008FEA] focus:outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-white mb-2">Level</label>
          <select value={level} onChange={e => setLevel(e.target.value as SkillItem['level'])} className="w-full bg-[#101010] border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#008FEA] focus:outline-none">
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
            <option value="Expert">Expert</option>
          </select>
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
