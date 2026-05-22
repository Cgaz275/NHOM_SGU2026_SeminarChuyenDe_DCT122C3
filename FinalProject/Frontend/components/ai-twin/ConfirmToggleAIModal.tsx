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
      title={isEnabling ? "Bật AI công khai?" : "Tắt AI công khai?"}
    >
      <div className="space-y-4">
        <p className="text-sm text-white/80">
          {isEnabling 
            ? "Khách truy cập sẽ có thể trò chuyện với AI Twin của bạn bằng cấu hình hiện tại."
            : "Khách truy cập sẽ không thể trò chuyện với AI Twin của bạn nữa. Trang cá nhân công khai sẽ hiển thị form liên hệ dự phòng thay thế."}
        </p>
        
        <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
          <button 
            onClick={onClose} 
            className="px-4 py-2 text-sm font-medium text-white hover:bg-white/5 rounded-lg transition-colors"
          >
            Hủy
          </button>
          <button 
            onClick={handleConfirm} 
            className={`px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors ${
              isEnabling 
                ? 'bg-green-600 hover:bg-green-500' 
                : 'bg-red-600 hover:bg-red-500'
            }`}
          >
            {isEnabling ? 'Bật AI' : 'Tắt AI'}
          </button>
        </div>
      </div>
    </Modal>
  );
}
