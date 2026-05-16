'use client';

import { useState, useEffect, useMemo } from 'react';
import { Eye, CheckCircle, Lock, Unlock } from 'lucide-react';
import { AdminReport, AdminActionType } from '@/types/admin';
import { getAdminReports, resolveReport, lockUser, unlockUser } from '@/lib/mock-admin-api';
import { AdminTable } from './AdminTable';
import { AdminSearchBar } from './AdminSearchBar';
import { AdminPagination } from './AdminPagination';
import { ReportStatusBadge } from './ReportStatusBadge';
import { UserStatusBadge } from './UserStatusBadge';
import { AdminEmptyState } from './AdminEmptyState';
import { AdminLoadingState } from './AdminLoadingState';
import { ConfirmAdminActionModal } from './ConfirmAdminActionModal';
import { ReportDetailModal } from './ReportDetailModal';
import { Toast } from '@/components/ui/Toast';

const PAGE_SIZE = 7;

export function ReportManagementPage() {
  const [reports, setReports] = useState<AdminReport[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Modals state
  const [selectedReport, setSelectedReport] = useState<AdminReport | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  
  const [actionModalOpen, setActionModalOpen] = useState(false);
  const [actionType, setActionType] = useState<AdminActionType | null>(null);
  const [isActionLoading, setIsActionLoading] = useState(false);
  
  // Toast state
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  const [isToastVisible, setIsToastVisible] = useState(false);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    setIsLoading(true);
    try {
      const data = await getAdminReports();
      setReports(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToastMessage(message);
    setToastType(type);
    setIsToastVisible(true);
    setTimeout(() => setIsToastVisible(false), 3000);
  };

  const filteredReports = useMemo(() => {
    if (!searchQuery.trim()) return reports;
    const lowerQuery = searchQuery.toLowerCase();
    return reports.filter(
      (report) =>
        report.fullName.toLowerCase().includes(lowerQuery) ||
        report.email.toLowerCase().includes(lowerQuery) ||
        report.accountStatus.toLowerCase().includes(lowerQuery) ||
        report.reason.toLowerCase().includes(lowerQuery) ||
        report.reportStatus.toLowerCase().includes(lowerQuery)
    );
  }, [reports, searchQuery]);

  const paginatedReports = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    return filteredReports.slice(startIndex, startIndex + PAGE_SIZE);
  }, [filteredReports, currentPage]);

  const totalPages = Math.ceil(filteredReports.length / PAGE_SIZE);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const openActionModal = (report: AdminReport, type: AdminActionType) => {
    setSelectedReport(report);
    setActionType(type);
    setActionModalOpen(true);
  };

  const handleConfirmAction = async () => {
    if (!selectedReport || !actionType) return;
    
    setIsActionLoading(true);
    try {
      let result;
      if (actionType === 'resolve') {
        result = await resolveReport(selectedReport.id);
        if (result?.success) {
          showToast(result.message || 'Thành công.', 'success');
          setReports(reports.map(r => r.id === selectedReport.id ? { ...r, reportStatus: 'resolved' } : r));
        } else {
          showToast(result?.message || 'Có lỗi xảy ra.', 'error');
        }
      } else if (actionType === 'lock') {
        result = await lockUser(selectedReport.accountId);
        if (result?.success) {
          showToast(result.message || 'Thành công.', 'success');
          // Update all reports for this account id
          setReports(reports.map(r => r.accountId === selectedReport.accountId ? { ...r, accountStatus: 'locked' } : r));
        } else {
          showToast(result?.message || 'Có lỗi xảy ra.', 'error');
        }
      } else if (actionType === 'unlock') {
        result = await unlockUser(selectedReport.accountId);
        if (result?.success) {
          showToast(result.message || 'Thành công.', 'success');
          // Update all reports for this account id
          setReports(reports.map(r => r.accountId === selectedReport.accountId ? { ...r, accountStatus: 'verified' } : r));
        } else {
          showToast(result?.message || 'Có lỗi xảy ra.', 'error');
        }
      }
    } catch (error) {
      showToast('Có lỗi xảy ra khi thực hiện thao tác.', 'error');
    } finally {
      setIsActionLoading(false);
      setActionModalOpen(false);
      setSelectedReport(null);
      setActionType(null);
    }
  };

  const getActionModalContent = () => {
    switch (actionType) {
      case 'resolve':
        return {
          title: 'Đánh dấu báo cáo đã xử lý?',
          message: 'Báo cáo này sẽ được chuyển sang trạng thái đã xử lý.',
          confirmText: 'Xác nhận',
          isDestructive: false
        };
      case 'lock':
        return {
          title: 'Khóa tài khoản?',
          message: 'Tài khoản này sẽ không thể sử dụng các chức năng của hệ thống cho đến khi được mở khóa.',
          confirmText: 'Khóa tài khoản',
          isDestructive: true
        };
      case 'unlock':
        return {
          title: 'Mở khóa tài khoản?',
          message: 'Tài khoản này sẽ có thể sử dụng lại hệ thống.',
          confirmText: 'Mở khóa',
          isDestructive: false
        };
      default:
        return { title: '', message: '', confirmText: '', isDestructive: false };
    }
  };

  const modalContent = getActionModalContent();

  if (isLoading) {
    return <AdminLoadingState />;
  }

  return (
    <div className="flex flex-col h-full bg-[#101010]">
      {/* Header & Toolbar */}
      <div className="p-6 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-white">Quản lý báo cáo</h2>
          <p className="text-sm text-white/50 mt-1">Theo dõi và xử lý các tài khoản bị người khác báo cáo.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <AdminSearchBar 
            placeholder="Tìm kiếm theo email, tên, lý do..."
            value={searchQuery}
            onChange={setSearchQuery}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 flex-1 flex flex-col">
        {filteredReports.length === 0 ? (
          <AdminEmptyState message="Chưa có báo cáo nào." />
        ) : (
          <>
            <AdminTable 
              columns={["#", "ID tài khoản", "Tên đầy đủ", "Email", "Trạng thái xác thực", "Lý do bị báo cáo", "Ngày tạo", "Trạng thái báo cáo", "Thao tác quản lý"]}
            >
              {paginatedReports.map((report, index) => (
                <tr key={report.id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-4 py-3 text-white/50">{(currentPage - 1) * PAGE_SIZE + index + 1}</td>
                  <td className="px-4 py-3 font-medium text-white/90">{report.accountId}</td>
                  <td className="px-4 py-3 text-white">{report.fullName}</td>
                  <td className="px-4 py-3 text-white/70">{report.email}</td>
                  <td className="px-4 py-3"><UserStatusBadge status={report.accountStatus} /></td>
                  <td className="px-4 py-3 text-white/80 max-w-[200px] truncate" title={report.reason}>{report.reason}</td>
                  <td className="px-4 py-3 text-white/70">{new Date(report.createdAt).toLocaleDateString('vi-VN')}</td>
                  <td className="px-4 py-3"><ReportStatusBadge status={report.reportStatus} /></td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => { setSelectedReport(report); setIsDetailModalOpen(true); }}
                        className="p-1.5 text-white/50 hover:text-white hover:bg-white/10 rounded-md transition-colors"
                        title="Xem chi tiết"
                      >
                        <Eye size={18} />
                      </button>
                      
                      {report.reportStatus === 'pending' && (
                        <button 
                          onClick={() => openActionModal(report, 'resolve')}
                          className="p-1.5 text-brand-blue/70 hover:text-brand-blue hover:bg-brand-blue/10 rounded-md transition-colors"
                          title="Đánh dấu đã xử lý"
                        >
                          <CheckCircle size={18} />
                        </button>
                      )}

                      {report.accountStatus === 'locked' ? (
                        <button 
                          onClick={() => openActionModal(report, 'unlock')}
                          className="p-1.5 text-success/70 hover:text-success hover:bg-success/10 rounded-md transition-colors"
                          title="Mở khóa tài khoản"
                        >
                          <Unlock size={18} />
                        </button>
                      ) : (
                        <button 
                          onClick={() => openActionModal(report, 'lock')}
                          className="p-1.5 text-danger/70 hover:text-danger hover:bg-danger/10 rounded-md transition-colors"
                          title="Khóa tài khoản"
                        >
                          <Lock size={18} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </AdminTable>
            
            <AdminPagination 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </div>

      {/* Modals & Toasts */}
      <ReportDetailModal 
        isOpen={isDetailModalOpen} 
        onClose={() => { setIsDetailModalOpen(false); setSelectedReport(null); }} 
        report={selectedReport} 
      />

      <ConfirmAdminActionModal
        isOpen={actionModalOpen}
        onClose={() => { setActionModalOpen(false); setSelectedReport(null); setActionType(null); }}
        onConfirm={handleConfirmAction}
        isLoading={isActionLoading}
        title={modalContent.title}
        message={modalContent.message}
        confirmText={modalContent.confirmText}
        isDestructive={modalContent.isDestructive}
      />

      <Toast 
        message={toastMessage} 
        isVisible={isToastVisible} 
        type={toastType} 
      />
    </div>
  );
}
