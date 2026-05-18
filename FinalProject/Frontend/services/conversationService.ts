import { apiClient } from '../lib/apiClient';
import { Conversation, InboxActionResponse } from '@/types/inbox';

export async function getConversations(): Promise<Conversation[]> {
  const res = await apiClient<Conversation[]>('/conversations');
  if (res.success && res.data) {
    return res.data;
  }
  return [];
}

export async function sendOwnerMessage(conversationId: string, content: string): Promise<InboxActionResponse> {
  const res = await apiClient<any>(`/conversations/${conversationId}/messages`, {
    method: 'POST',
    body: JSON.stringify({ content }),
  });
  return { success: res.success, message: res.message };
}

export async function toggleHumanTakeover(conversationId: string, enabled: boolean): Promise<InboxActionResponse> {
  const res = await apiClient<any>(`/conversations/${conversationId}/takeover`, {
    method: 'PUT',
    body: JSON.stringify({ enabled }),
  });
  return { success: res.success, message: res.message };
}

export async function markConversationRead(conversationId: string, read: boolean): Promise<InboxActionResponse> {
  const res = await apiClient<any>(`/conversations/${conversationId}/read`, {
    method: 'PUT',
    body: JSON.stringify({ read }),
  });
  return { success: res.success, message: res.message };
}

export async function archiveConversation(conversationId: string): Promise<InboxActionResponse> {
  const res = await apiClient<any>(`/conversations/${conversationId}/archive`, {
    method: 'PUT',
  });
  return { success: res.success, message: res.message };
}

export async function restoreConversation(conversationId: string): Promise<InboxActionResponse> {
  const res = await apiClient<any>(`/conversations/${conversationId}/restore`, {
    method: 'PUT',
  });
  return { success: res.success, message: res.message };
}

export async function deleteConversation(conversationId: string): Promise<InboxActionResponse> {
  const res = await apiClient<any>(`/conversations/${conversationId}`, {
    method: 'DELETE',
  });
  return { success: res.success, message: res.message };
}

export async function updateEmailNotification(conversationId: string, enabled: boolean): Promise<InboxActionResponse> {
  // Tạm thời chưa có API riêng cho cái này ở BE, ta có thể bỏ qua hoặc giả lập thành công
  return { success: true };
}

export async function copyLeadField(value: string): Promise<InboxActionResponse> {
  try {
    await navigator.clipboard.writeText(value);
    return { success: true };
  } catch (err) {
    return { success: false, message: 'Không thể sao chép' };
  }
}
