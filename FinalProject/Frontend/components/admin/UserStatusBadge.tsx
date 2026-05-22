import { AdminUserStatus } from '@/types/admin';

export function UserStatusBadge({ status }: { status: AdminUserStatus }) {
  let label = '';
  let colorClass = '';

  switch (status) {
    case 'verified':
      label = 'Đã xác thực';
      colorClass = 'bg-[#2ECC71]/10 text-[#2ECC71] border border-[#2ECC71]/20';
      break;
    case 'locked':
      label = 'Đã khóa';
      colorClass = 'bg-[#E5484D]/10 text-[#E5484D] border border-[#E5484D]/20';
      break;
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClass}`}>
      {label}
    </span>
  );
}
