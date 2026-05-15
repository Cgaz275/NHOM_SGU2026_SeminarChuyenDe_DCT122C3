import { useState, useRef, useEffect } from 'react';
import { MoreVertical, CheckCircle, Circle, Archive, RotateCcw, Trash2, Bell } from 'lucide-react';
import { Conversation } from '@/types/inbox';

interface ConversationActionsProps {
  conversation: Conversation;
  onMarkRead: (read: boolean) => void;
  onArchive: () => void;
  onRestore: () => void;
  onDelete: () => void;
  onToggleEmailNotification: (enabled: boolean) => void;
}

export function ConversationActions({
  conversation,
  onMarkRead,
  onArchive,
  onRestore,
  onDelete,
  onToggleEmailNotification,
}: ConversationActionsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const isRead = conversation.status === 'read';
  const isArchived = conversation.status === 'archived';

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
      >
        <MoreVertical size={20} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-56 bg-[#1A1A1A] border border-white/10 rounded-xl shadow-xl overflow-hidden z-50">
          <div className="py-1">
            <button
              onClick={() => {
                onMarkRead(!isRead);
                setIsOpen(false);
              }}
              className="w-full px-4 py-2 text-left text-sm text-white hover:bg-white/5 flex items-center gap-3"
            >
              {isRead ? <Circle size={16} className="text-white/50" /> : <CheckCircle size={16} className="text-[#008FEA]" />}
              {isRead ? 'Đánh dấu chưa đọc' : 'Đánh dấu đã đọc'}
            </button>

            {!isArchived ? (
              <button
                onClick={() => {
                  onArchive();
                  setIsOpen(false);
                }}
                className="w-full px-4 py-2 text-left text-sm text-white hover:bg-white/5 flex items-center gap-3"
              >
                <Archive size={16} className="text-white/50" />
                Lưu trữ
              </button>
            ) : (
              <button
                onClick={() => {
                  onRestore();
                  setIsOpen(false);
                }}
                className="w-full px-4 py-2 text-left text-sm text-white hover:bg-white/5 flex items-center gap-3"
              >
                <RotateCcw size={16} className="text-white/50" />
                Khôi phục
              </button>
            )}

            <button
              onClick={() => {
                onToggleEmailNotification(!conversation.emailNotificationEnabled);
                setIsOpen(false);
              }}
              className="w-full px-4 py-2 text-left text-sm text-white hover:bg-white/5 flex items-center gap-3"
            >
              <Bell size={16} className={conversation.emailNotificationEnabled ? 'text-[#008FEA]' : 'text-white/50'} />
              {conversation.emailNotificationEnabled ? 'Tắt thông báo email' : 'Bật thông báo email'}
            </button>
            
            <div className="h-px bg-white/10 my-1" />

            <button
              onClick={() => {
                onDelete();
                setIsOpen(false);
              }}
              className="w-full px-4 py-2 text-left text-sm text-danger hover:bg-danger/10 flex items-center gap-3"
            >
              <Trash2 size={16} />
              Xóa
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
