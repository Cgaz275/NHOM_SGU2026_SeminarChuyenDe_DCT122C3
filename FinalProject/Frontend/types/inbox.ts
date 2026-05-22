export type ConversationStatus = 'unread' | 'read' | 'archived';
export type ConversationMode = 'ai_active' | 'human_takeover' | 'ai_paused';
export type ConversationSource = 'qr' | 'link' | 'form';
export type LeadTag = 'new_lead' | 'interested' | 'needs_reply' | 'none';
export type ChatMessageSender = 'visitor' | 'ai' | 'owner' | 'system';

export interface ChatMessage {
  id: string;
  sender: ChatMessageSender;
  content: string;
  createdAt: string;
  isSystemEvent?: boolean;
}

export interface LeadInfo {
  name: string;
  email: string;
  phone: string;
}

export interface Conversation {
  id: string;
  visitorName: string;
  visitorEmail: string;
  visitorPhone: string;
  source: ConversationSource;
  status: ConversationStatus;
  mode: ConversationMode;
  leadTag: LeadTag;
  lastMessage: string;
  lastMessageAt: string;
  unreadCount: number;
  isArchived: boolean;
  emailNotificationEnabled: boolean;
  lead?: LeadInfo;
  messages: ChatMessage[];
}

export interface ConversationFilter {
  search: string;
  type: 'all' | 'unread' | 'archived' | 'new_lead' | 'ai_paused';
}

export interface InboxActionResponse {
  success: boolean;
  message?: string;
}
