import { Modal } from '@/components/ui/Modal';
import { Loader2 } from 'lucide-react';

interface ConfirmAdminActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText: string;
  isDestructive?: boolean;
  isLoading?: boolean;
}

export function ConfirmAdminActionModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText,
  isDestructive = false,
  isLoading = false,
}: ConfirmAdminActionModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="space-y-6">
        <p className="text-white/80">{message}</p>
        
        <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2 text-sm font-medium text-white bg-[#1A1A1A] border border-white/10 rounded-lg hover:bg-white/5 transition-colors disabled:opacity-50"
          >
            Hủy
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className={`flex items-center justify-center min-w-[100px] px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors disabled:opacity-50 ${
              isDestructive
                ? 'bg-danger hover:bg-danger/80'
                : 'bg-brand-blue hover:bg-brand-blue/80'
            }`}
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
}
