import { AdminUser, AdminReport, AdminActionResponse } from '../types/admin';

let mockUsers: AdminUser[] = [
  { id: '1', accountId: 'ACC-001', fullName: 'Alyvia Kelley', email: 'a.kelley@gmail.com', registeredAt: '2023-11-12T10:00:00Z', status: 'verified' },
  { id: '2', accountId: 'ACC-002', fullName: 'Jaiden Nixon', email: 'jaiden.n@gmail.com', registeredAt: '2023-11-15T14:30:00Z', status: 'verified' },
  { id: '3', accountId: 'ACC-003', fullName: 'Ace Foley', email: 'ace.fo@yahoo.com', registeredAt: '2023-11-20T09:15:00Z', status: 'locked' },
  { id: '4', accountId: 'ACC-004', fullName: 'Nikolai Schmidt', email: 'nikolai.schmidt1964@outlook.com', registeredAt: '2023-12-01T16:45:00Z', status: 'locked' },
  { id: '5', accountId: 'ACC-005', fullName: 'Clayton Charles', email: 'me@clayton.com', registeredAt: '2023-12-05T11:20:00Z', status: 'verified' },
  { id: '6', accountId: 'ACC-006', fullName: 'Prince Chen', email: 'prince.chen1997@gmail.com', registeredAt: '2023-12-10T08:50:00Z', status: 'verified' },
  { id: '7', accountId: 'ACC-007', fullName: 'Mina Tran', email: 'mina.tran@gmail.com', registeredAt: '2024-01-12T13:10:00Z', status: 'verified' },
  { id: '8', accountId: 'ACC-008', fullName: 'An Nguyen', email: 'an.nguyen@gmail.com', registeredAt: '2024-01-18T15:00:00Z', status: 'verified' },
  { id: '9', accountId: 'ACC-009', fullName: 'Bao Pham', email: 'bao.pham@gmail.com', registeredAt: '2024-02-02T10:30:00Z', status: 'locked' },
  { id: '10', accountId: 'ACC-010', fullName: 'Linh Vo', email: 'linh.vo@gmail.com', registeredAt: '2024-02-14T09:40:00Z', status: 'verified' },
];

let mockReports: AdminReport[] = [
  { id: '1', accountId: 'ACC-003', fullName: 'Ace Foley', email: 'ace.fo@yahoo.com', accountStatus: 'locked', reason: 'Quấy rối', createdAt: '2024-03-01T10:00:00Z', reportStatus: 'pending' },
  { id: '2', accountId: 'ACC-004', fullName: 'Nikolai Schmidt', email: 'nikolai.schmidt1964@outlook.com', accountStatus: 'locked', reason: 'Nội dung không phù hợp', createdAt: '2024-03-02T11:20:00Z', reportStatus: 'resolved' },
  { id: '3', accountId: 'ACC-007', fullName: 'Mina Tran', email: 'mina.tran@gmail.com', accountStatus: 'verified', reason: 'Tài khoản giả mạo', createdAt: '2024-03-05T14:15:00Z', reportStatus: 'pending' },
  { id: '4', accountId: 'ACC-009', fullName: 'Bao Pham', email: 'bao.pham@gmail.com', accountStatus: 'locked', reason: 'Vi phạm điều khoản', createdAt: '2024-03-10T09:30:00Z', reportStatus: 'pending' },
  { id: '5', accountId: 'ACC-002', fullName: 'Jaiden Nixon', email: 'jaiden.n@gmail.com', accountStatus: 'verified', reason: 'Tên tài khoản không hợp lệ', createdAt: '2024-03-12T16:00:00Z', reportStatus: 'resolved' },
  { id: '6', accountId: 'ACC-001', fullName: 'Alyvia Kelley', email: 'a.kelley@gmail.com', accountStatus: 'verified', reason: 'Nội dung bạo lực', createdAt: '2024-03-15T08:45:00Z', reportStatus: 'pending' },
  { id: '7', accountId: 'ACC-008', fullName: 'An Nguyen', email: 'an.nguyen@gmail.com', accountStatus: 'verified', reason: 'Quấy rối', createdAt: '2024-03-20T11:10:00Z', reportStatus: 'resolved' },
  { id: '8', accountId: 'ACC-010', fullName: 'Linh Vo', email: 'linh.vo@gmail.com', accountStatus: 'verified', reason: 'Nội dung không phù hợp', createdAt: '2024-03-25T13:25:00Z', reportStatus: 'pending' },
];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function getAdminUsers(): Promise<AdminUser[]> {
  const res = await apiClient<any[]>('/users');
  if (res.success && res.data) {
    return res.data.map((u: any) => ({
      id: u.id,
      accountId: u.id.substring(0, 8),
      fullName: u.fullName || 'No Name',
      email: u.email,
      registeredAt: u.createdAt?._seconds ? new Date(u.createdAt._seconds * 1000).toISOString() : new Date().toISOString(),
      status: u.status === 'banned' ? 'locked' : 'verified',
    }));
  }
  return [];
}

export async function getAdminReports(): Promise<AdminReport[]> {
  const res = await apiClient<any[]>('/reports');
  if (res.success && res.data) {
    return res.data.map((r: any) => ({
      id: r.id,
      accountId: r.cardId ? r.cardId.substring(0, 8) : 'N/A',
      fullName: r.fullName || 'Ẩn danh',
      email: r.email || 'N/A',
      accountStatus: 'verified',
      reason: r.reason,
      createdAt: r.createdAt?._seconds ? new Date(r.createdAt._seconds * 1000).toISOString() : new Date().toISOString(),
      reportStatus: r.status || 'pending',
    }));
  }
  return [];
}


export async function getUserById(userId: string): Promise<AdminUser | null> {
  const users = await getAdminUsers();
  return users.find(u => u.id === userId || u.accountId === userId) || null;
}

export async function getReportById(reportId: string): Promise<AdminReport | null> {
  const reports = await getAdminReports();
  return reports.find(r => r.id === reportId) || null;
}

export async function lockUser(userId: string): Promise<AdminActionResponse> {
  const res = await apiClient<any>(`/users/${userId}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status: 'banned' })
  });
  if (res.success) {
    return { success: true, message: 'Đã khóa tài khoản thành công.' };
  }
  return { success: false, message: res.message || 'Không thể khóa tài khoản.' };
}

export async function unlockUser(userId: string): Promise<AdminActionResponse> {
  const res = await apiClient<any>(`/users/${userId}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status: 'active' })
  });
  if (res.success) {
    return { success: true, message: 'Đã mở khóa tài khoản thành công.' };
  }
  return { success: false, message: res.message || 'Không thể mở khóa tài khoản.' };
}

export async function resolveReport(reportId: string): Promise<AdminActionResponse> {
  const res = await apiClient<any>(`/reports/${reportId}/resolve`, {
    method: 'PUT'
  });
  if (res.success) {
    return { success: true, message: 'Đã xử lý báo cáo thành công.' };
  }
  return { success: false, message: res.message || 'Không thể xử lý báo cáo.' };
}


import { apiClient } from './apiClient';

export async function checkAdminPermission(): Promise<boolean> {
  try {
    const res = await apiClient<any>('/users/me');
    if (res.success && res.data && res.data.role === 'admin') {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
}

