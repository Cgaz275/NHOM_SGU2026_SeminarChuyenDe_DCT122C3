import { Modal } from '@/components/ui/Modal';

interface ConfirmToggleAIModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isEnabling: boolean;
}

export function ConfirmToggleAIModal({ isOpen, onClose, onConfirm, isEnabling }: ConfirmToggleAIModalProps) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={isEnabling ? "Enable public AI?" : "Disable public AI?"}
    >
      <div className="space-y-4">
        <p className="text-sm text-white/80">
          {isEnabling 
            ? "Visitors will be able to chat with your AI Twin using the current configuration."
            : "Visitors will no longer be able to chat with your AI Twin. The public profile will show a fallback contact form instead."}
        </p>
        
        <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
          <button 
            onClick={onClose} 
            className="px-4 py-2 text-sm font-medium text-white hover:bg-white/5 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={handleConfirm} 
            className={`px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors ${
              isEnabling 
                ? 'bg-green-600 hover:bg-green-500' 
                : 'bg-red-600 hover:bg-red-500'
            }`}
          >
            {isEnabling ? 'Enable AI' : 'Disable AI'}
          </button>
        </div>
      </div>
    </Modal>
  );
}
