import { AdminReportStatus } from '@/types/admin';

export function ReportStatusBadge({ status }: { status: AdminReportStatus }) {
  let label = '';
  let colorClass = '';

  switch (status) {
    case 'resolved':
      label = 'Đã xử lý';
      colorClass = 'bg-[#2ECC71]/10 text-[#2ECC71] border border-[#2ECC71]/20';
      break;
    case 'pending':
      label = 'Chưa xử lý';
      colorClass = 'bg-[#F5A524]/10 text-[#F5A524] border border-[#F5A524]/20';
      break;
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClass}`}>
      {label}
    </span>
  );
}
