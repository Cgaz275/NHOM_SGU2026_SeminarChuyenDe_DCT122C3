import { Modal } from '@/components/ui/Modal';
import { AdminReport } from '@/types/admin';
import { ReportStatusBadge } from './ReportStatusBadge';
import { UserStatusBadge } from './UserStatusBadge';

interface ReportDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  report: AdminReport | null;
}

export function ReportDetailModal({ isOpen, onClose, report }: ReportDetailModalProps) {
  if (!report) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Chi tiết báo cáo">
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-2 py-2 border-b border-white/10">
          <span className="text-white/50 text-sm">ID tài khoản:</span>
          <span className="col-span-2 text-white font-medium">{report.accountId}</span>
        </div>
        <div className="grid grid-cols-3 gap-2 py-2 border-b border-white/10">
          <span className="text-white/50 text-sm">Tên đầy đủ:</span>
          <span className="col-span-2 text-white font-medium">{report.fullName}</span>
        </div>
        <div className="grid grid-cols-3 gap-2 py-2 border-b border-white/10">
          <span className="text-white/50 text-sm">Email:</span>
          <span className="col-span-2 text-white font-medium">{report.email}</span>
        </div>
        <div className="grid grid-cols-3 gap-2 py-2 border-b border-white/10">
          <span className="text-white/50 text-sm items-center flex">Trạng thái tài khoản:</span>
          <div className="col-span-2">
            <UserStatusBadge status={report.accountStatus} />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 py-2 border-b border-white/10">
          <span className="text-white/50 text-sm">Lý do bị báo cáo:</span>
          <span className="col-span-2 text-danger font-medium">{report.reason}</span>
        </div>
        <div className="grid grid-cols-3 gap-2 py-2 border-b border-white/10">
          <span className="text-white/50 text-sm">Ngày tạo:</span>
          <span className="col-span-2 text-white font-medium">
            {new Date(report.createdAt).toLocaleDateString('vi-VN')}
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2 py-2">
          <span className="text-white/50 text-sm items-center flex">Trạng thái báo cáo:</span>
          <div className="col-span-2">
            <ReportStatusBadge status={report.reportStatus} />
          </div>
        </div>
      </div>
    </Modal>
  );
}
