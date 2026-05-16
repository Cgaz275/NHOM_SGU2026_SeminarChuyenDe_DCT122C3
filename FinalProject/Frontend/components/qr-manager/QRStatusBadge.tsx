import { QRProfileStatus } from '@/types/qr-manager';

interface QRStatusBadgeProps {
  status: QRProfileStatus;
}

export function QRStatusBadge({ status }: QRStatusBadgeProps) {
  let label = '';
  let colorClass = '';

  switch (status) {
    case 'published':
      label = 'Đã xuất bản';
      colorClass = 'bg-[#2ECC71]/10 text-[#2ECC71] border-[#2ECC71]/20';
      break;
    case 'draft':
      label = 'Bản nháp';
      colorClass = 'bg-[#F5A524]/10 text-[#F5A524] border-[#F5A524]/20';
      break;
    case 'updating':
      label = 'Đang cập nhật';
      colorClass = 'bg-[#008FEA]/10 text-[#008FEA] border-[#008FEA]/20';
      break;
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${colorClass}`}>
      {label}
    </span>
  );
}
