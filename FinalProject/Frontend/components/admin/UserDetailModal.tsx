import { Modal } from '@/components/ui/Modal';
import { AdminUser } from '@/types/admin';
import { UserStatusBadge } from './UserStatusBadge';

interface UserDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: AdminUser | null;
}

export function UserDetailModal({ isOpen, onClose, user }: UserDetailModalProps) {
  if (!user) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Chi tiết người dùng">
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-2 py-2 border-b border-white/10">
          <span className="text-white/50 text-sm">ID tài khoản:</span>
          <span className="col-span-2 text-white font-medium">{user.accountId}</span>
        </div>
        <div className="grid grid-cols-3 gap-2 py-2 border-b border-white/10">
          <span className="text-white/50 text-sm">Tên đầy đủ:</span>
          <span className="col-span-2 text-white font-medium">{user.fullName}</span>
        </div>
        <div className="grid grid-cols-3 gap-2 py-2 border-b border-white/10">
          <span className="text-white/50 text-sm">Email:</span>
          <span className="col-span-2 text-white font-medium">{user.email}</span>
        </div>
        <div className="grid grid-cols-3 gap-2 py-2 border-b border-white/10">
          <span className="text-white/50 text-sm">Ngày đăng ký:</span>
          <span className="col-span-2 text-white font-medium">
            {new Date(user.registeredAt).toLocaleDateString('vi-VN')}
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2 py-2">
          <span className="text-white/50 text-sm items-center flex">Trạng thái:</span>
          <div className="col-span-2">
            <UserStatusBadge status={user.status} />
          </div>
        </div>
      </div>
    </Modal>
  );
}
