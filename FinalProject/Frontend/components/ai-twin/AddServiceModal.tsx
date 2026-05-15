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
  const [callToAction, setCallToAction] = useState(initialData?.callToAction || 'Contact me for more details');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({ serviceName, description, pricingNote, callToAction });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={initialData ? "Edit service" : "Add new service"} subtitle="Add a service your AI can offer.">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-white mb-2">Service Name</label>
          <input required type="text" value={serviceName} onChange={e => setServiceName(e.target.value)} className="w-full bg-[#101010] border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#008FEA] focus:outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-white mb-2">Description</label>
          <textarea required value={description} onChange={e => setDescription(e.target.value)} rows={3} className="w-full bg-[#101010] border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#008FEA] focus:outline-none resize-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-white mb-2">Pricing Note (Optional)</label>
          <input type="text" placeholder="e.g. Starting at $500" value={pricingNote} onChange={e => setPricingNote(e.target.value)} className="w-full bg-[#101010] border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#008FEA] focus:outline-none" />
          <p className="text-xs text-white/40 mt-1">If empty, AI will ask the visitor to leave contact info for a quote.</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-white mb-2">Call to Action</label>
          <input required type="text" value={callToAction} onChange={e => setCallToAction(e.target.value)} className="w-full bg-[#101010] border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#008FEA] focus:outline-none" />
        </div>
        <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
          <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-white hover:bg-white/5 rounded-lg transition-colors">Cancel</button>
          <button type="submit" className="px-4 py-2 text-sm font-medium bg-[#008FEA] text-white rounded-lg hover:bg-[#007AC8] transition-colors">{initialData ? 'Save' : 'Add'}</button>
        </div>
      </form>
    </Modal>
  );
}
