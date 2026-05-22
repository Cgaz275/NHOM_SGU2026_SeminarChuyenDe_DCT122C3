export type AdminUserStatus = 'verified' | 'locked';

export interface AdminUser {
  id: string;
  accountId: string;
  fullName: string;
  email: string;
  registeredAt: string;
  status: AdminUserStatus;
}

export type AdminReportStatus = 'pending' | 'resolved';

export interface AdminReport {
  id: string;
  accountId: string;
  fullName: string;
  email: string;
  accountStatus: AdminUserStatus;
  reason: string;
  createdAt: string;
  reportStatus: AdminReportStatus;
}

export type AdminActionType = 'lock' | 'unlock' | 'resolve';

export interface AdminActionResponse {
  success: boolean;
  message?: string;
}

export interface AdminPermissionState {
  hasPermission: boolean;
  isLoading: boolean;
}
