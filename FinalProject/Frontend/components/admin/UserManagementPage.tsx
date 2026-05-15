'use client';

import { useState, useEffect, useMemo } from 'react';
import { Plus, Eye, Lock, Unlock } from 'lucide-react';
import { AdminUser, AdminActionType } from '@/types/admin';
import { getAdminUsers, lockUser, unlockUser } from '@/lib/mock-admin-api';
import { AdminTable } from './AdminTable';
import { AdminSearchBar } from './AdminSearchBar';
import { AdminPagination } from './AdminPagination';
import { UserStatusBadge } from './UserStatusBadge';
import { AdminEmptyState } from './AdminEmptyState';
import { AdminLoadingState } from './AdminLoadingState';
import { ConfirmAdminActionModal } from './ConfirmAdminActionModal';
import { UserDetailModal } from './UserDetailModal';
import { Toast } from '@/components/ui/Toast';

const PAGE_SIZE = 7;

export function UserManagementPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Modals state
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  
  const [actionModalOpen, setActionModalOpen] = useState(false);
  const [actionType, setActionType] = useState<AdminActionType | null>(null);
  const [isActionLoading, setIsActionLoading] = useState(false);
  
  // Toast state
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  const [isToastVisible, setIsToastVisible] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const data = await getAdminUsers();
      setUsers(data);
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

  const filteredUsers = useMemo(() => {
    if (!searchQuery.trim()) return users;
    const lowerQuery = searchQuery.toLowerCase();
    return users.filter(
      (user) =>
        user.fullName.toLowerCase().includes(lowerQuery) ||
        user.email.toLowerCase().includes(lowerQuery) ||
        user.status.toLowerCase().includes(lowerQuery)
    );
  }, [users, searchQuery]);

  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    return filteredUsers.slice(startIndex, startIndex + PAGE_SIZE);
  }, [filteredUsers, currentPage]);

  const totalPages = Math.ceil(filteredUsers.length / PAGE_SIZE);

  // Reset to page 1 on search
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);



  const openActionModal = (user: AdminUser, type: AdminActionType) => {
    setSelectedUser(user);
    setActionType(type);
    setActionModalOpen(true);
  };

  const handleConfirmAction = async () => {
    if (!selectedUser || !actionType) return;
    
    setIsActionLoading(true);
    try {
      let result;
      if (actionType === 'lock') {
        result = await lockUser(selectedUser.id);
      } else if (actionType === 'unlock') {
        result = await unlockUser(selectedUser.id);
      }

      if (result?.success) {
        showToast(result.message || 'Thành công.', 'success');
        // Update local state directly to avoid refetch
        setUsers(users.map(u => {
          if (u.id === selectedUser.id) {
            return { ...u, status: actionType === 'lock' ? 'locked' : 'verified' };
          }
          return u;
        }));
      } else {
        showToast(result?.message || 'Có lỗi xảy ra.', 'error');
      }
    } catch (error) {
      showToast('Có lỗi xảy ra khi thực hiện thao tác.', 'error');
    } finally {
      setIsActionLoading(false);
      setActionModalOpen(false);
      setSelectedUser(null);
      setActionType(null);
    }
  };

  if (isLoading) {
    return <AdminLoadingState />;
  }

  return (
    <div className="flex flex-col h-full bg-[#101010]">
      {/* Header & Toolbar */}
      <div className="p-6 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-white">Quản lý người dùng</h2>
          <p className="text-sm text-white/50 mt-1">Xem, tìm kiếm và quản lý trạng thái tài khoản người dùng.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <AdminSearchBar 
            placeholder="Tìm kiếm theo email, tên, trạng thái..."
            value={searchQuery}
            onChange={setSearchQuery}
          />

        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 flex-1 flex flex-col">
        {filteredUsers.length === 0 ? (
          <AdminEmptyState message="Chưa có người dùng nào." />
        ) : (
          <>
            <AdminTable 
              columns={["#", "ID tài khoản", "Tên đầy đủ", "Email", "Ngày đăng ký", "Trạng thái xác thực", "Thao tác quản lý"]}
            >
              {paginatedUsers.map((user, index) => (
                <tr key={user.id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-4 py-3 text-white/50">{(currentPage - 1) * PAGE_SIZE + index + 1}</td>
                  <td className="px-4 py-3 font-medium text-white/90">{user.accountId}</td>
                  <td className="px-4 py-3 text-white">{user.fullName}</td>
                  <td className="px-4 py-3 text-white/70">{user.email}</td>
                  <td className="px-4 py-3 text-white/70">{new Date(user.registeredAt).toLocaleDateString('vi-VN')}</td>
                  <td className="px-4 py-3"><UserStatusBadge status={user.status} /></td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => { setSelectedUser(user); setIsDetailModalOpen(true); }}
                        className="p-1.5 text-white/50 hover:text-white hover:bg-white/10 rounded-md transition-colors"
                        title="Xem chi tiết"
                      >
                        <Eye size={18} />
                      </button>
                      
                      {user.status === 'locked' ? (
                        <button 
                          onClick={() => openActionModal(user, 'unlock')}
                          className="p-1.5 text-success/70 hover:text-success hover:bg-success/10 rounded-md transition-colors"
                          title="Mở khóa tài khoản"
                        >
                          <Unlock size={18} />
                        </button>
                      ) : (
                        <button 
                          onClick={() => openActionModal(user, 'lock')}
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
      <UserDetailModal 
        isOpen={isDetailModalOpen} 
        onClose={() => { setIsDetailModalOpen(false); setSelectedUser(null); }} 
        user={selectedUser} 
      />

      <ConfirmAdminActionModal
        isOpen={actionModalOpen}
        onClose={() => { setActionModalOpen(false); setSelectedUser(null); setActionType(null); }}
        onConfirm={handleConfirmAction}
        isLoading={isActionLoading}
        title={actionType === 'lock' ? 'Khóa tài khoản?' : 'Mở khóa tài khoản?'}
        message={
          actionType === 'lock'
            ? 'Tài khoản này sẽ không thể sử dụng các chức năng của hệ thống cho đến khi được mở khóa.'
            : 'Tài khoản này sẽ có thể sử dụng lại hệ thống.'
        }
        confirmText={actionType === 'lock' ? 'Khóa tài khoản' : 'Mở khóa'}
        isDestructive={actionType === 'lock'}
      />

      <Toast 
        message={toastMessage} 
        isVisible={isToastVisible} 
        type={toastType} 
      />
    </div>
  );
}
