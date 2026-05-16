import {
  Conversation,
  InboxActionResponse,
  ChatMessage,
} from '@/types/inbox';

// Mock data
let mockConversations: Conversation[] = [
  {
    id: 'conv_1',
    visitorName: 'Labubu',
    visitorEmail: 'labubu@gmail.com',
    visitorPhone: '0700700707',
    source: 'qr',
    status: 'unread',
    mode: 'ai_active',
    leadTag: 'new_lead',
    lastMessage: 'Cho tôi xin thông tin liên hệ.',
    lastMessageAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    unreadCount: 1,
    isArchived: false,
    emailNotificationEnabled: true,
    lead: {
      name: 'Labubu',
      email: 'labubu@gmail.com',
      phone: '0700700707',
    },
    messages: [
      {
        id: 'msg_1',
        sender: 'visitor',
        content: 'Xin chào, bạn là AI hả?',
        createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
      },
      {
        id: 'msg_2',
        sender: 'ai',
        content: 'Mình là AI Twin của Anthony. Mình có thể trả lời về kỹ năng, dự án và kinh nghiệm của Anthony.',
        createdAt: new Date(Date.now() - 1000 * 60 * 14).toISOString(),
      },
      {
        id: 'msg_3',
        sender: 'visitor',
        content: 'Cho tôi xin thông tin liên hệ.',
        createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
      },
    ],
  },
  {
    id: 'conv_2',
    visitorName: 'Minh Anh',
    visitorEmail: 'minhanh@example.com',
    visitorPhone: '0912345678',
    source: 'link',
    status: 'read',
    mode: 'human_takeover',
    leadTag: 'interested',
    lastMessage: 'Dạ, em cảm ơn anh.',
    lastMessageAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    unreadCount: 0,
    isArchived: false,
    emailNotificationEnabled: false,
    lead: {
      name: 'Minh Anh',
      email: 'minhanh@example.com',
      phone: '0912345678',
    },
    messages: [
      {
        id: 'msg_4',
        sender: 'visitor',
        content: 'Tôi muốn hợp tác với bạn trong một dự án mới.',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
      },
      {
        id: 'msg_5',
        sender: 'ai',
        content: 'Tuyệt vời! Bạn có thể để lại thông tin liên hệ để Anthony gọi lại cho bạn nhé.',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3 + 5000).toISOString(),
      },
      {
        id: 'msg_event_1',
        sender: 'system',
        content: 'Chủ thẻ đã tiếp quản hội thoại.',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2 + 10000).toISOString(),
        isSystemEvent: true,
      },
      {
        id: 'msg_6',
        sender: 'owner',
        content: 'Chào Minh Anh, mình là Anthony đây. Bạn có thể chia sẻ thêm về dự án không?',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2 + 15000).toISOString(),
      },
      {
        id: 'msg_7',
        sender: 'visitor',
        content: 'Dạ, em cảm ơn anh.',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
      },
    ],
  },
  {
    id: 'conv_3',
    visitorName: 'Khách ẩn danh',
    visitorEmail: '',
    visitorPhone: '',
    source: 'qr',
    status: 'read',
    mode: 'ai_active',
    leadTag: 'none',
    lastMessage: 'Kể cho tôi nghe về Anthony đi.',
    lastMessageAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    unreadCount: 0,
    isArchived: false,
    emailNotificationEnabled: false,
    messages: [
      {
        id: 'msg_8',
        sender: 'visitor',
        content: 'Kể cho tôi nghe về Anthony đi.',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
      },
      {
        id: 'msg_9',
        sender: 'ai',
        content: 'Anthony có kinh nghiệm về thiết kế sản phẩm, lập trình web và xây dựng AI Persona.',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5 + 2000).toISOString(),
      },
    ],
  },
  {
    id: 'conv_4',
    visitorName: 'Công ty ABC',
    visitorEmail: 'contact@abc.vn',
    visitorPhone: '0281234567',
    source: 'form',
    status: 'unread',
    mode: 'ai_paused',
    leadTag: 'needs_reply',
    lastMessage: 'Báo giá dịch vụ làm web.',
    lastMessageAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    unreadCount: 1,
    isArchived: false,
    emailNotificationEnabled: true,
    lead: {
      name: 'Công ty ABC',
      email: 'contact@abc.vn',
      phone: '0281234567',
    },
    messages: [
      {
        id: 'msg_10',
        sender: 'visitor',
        content: 'Báo giá dịch vụ làm web.',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      },
      {
        id: 'msg_event_2',
        sender: 'system',
        content: 'AI đã tạm dừng do thiết lập từ form.',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 + 1000).toISOString(),
        isSystemEvent: true,
      },
    ],
  },
  {
    id: 'conv_5',
    visitorName: 'Tuấn Designer',
    visitorEmail: 'tuan.design@example.com',
    visitorPhone: '0909009009',
    source: 'link',
    status: 'archived',
    mode: 'ai_active',
    leadTag: 'new_lead',
    lastMessage: 'Thanks.',
    lastMessageAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    unreadCount: 0,
    isArchived: true,
    emailNotificationEnabled: false,
    lead: {
      name: 'Tuấn Designer',
      email: 'tuan.design@example.com',
      phone: '0909009009',
    },
    messages: [
      {
        id: 'msg_11',
        sender: 'visitor',
        content: 'Giao diện web của bạn đẹp quá, mình rất thích.',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
      },
      {
        id: 'msg_12',
        sender: 'ai',
        content: 'Cảm ơn bạn Tuấn! Mình sử dụng Next.js, Tailwind CSS và Framer Motion để xây dựng đó.',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48 + 3000).toISOString(),
      },
      {
        id: 'msg_13',
        sender: 'visitor',
        content: 'Thanks.',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48 + 10000).toISOString(),
      },
    ],
  },
];

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getConversations(): Promise<Conversation[]> {
  await delay(800);
  return [...mockConversations].sort(
    (a, b) => new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime()
  );
}

export async function getConversationById(id: string): Promise<Conversation | undefined> {
  await delay(300);
  return mockConversations.find((c) => c.id === id);
}

export async function sendOwnerMessage(conversationId: string, content: string): Promise<InboxActionResponse> {
  await delay(500);
  const conv = mockConversations.find((c) => c.id === conversationId);
  if (!conv) return { success: false, message: 'Không tìm thấy hội thoại' };

  const newMessage: ChatMessage = {
    id: `msg_owner_${Date.now()}`,
    sender: 'owner',
    content,
    createdAt: new Date().toISOString(),
  };

  conv.messages.push(newMessage);
  conv.lastMessage = content;
  conv.lastMessageAt = newMessage.createdAt;
  
  // Make sure to unarchive if it was archived
  if (conv.isArchived) {
    conv.isArchived = false;
    conv.status = 'read';
  }

  return { success: true };
}

export async function toggleHumanTakeover(conversationId: string, enabled: boolean): Promise<InboxActionResponse> {
  await delay(600);
  const conv = mockConversations.find((c) => c.id === conversationId);
  if (!conv) return { success: false, message: 'Không tìm thấy hội thoại' };

  conv.mode = enabled ? 'human_takeover' : 'ai_active';
  
  const eventMessage: ChatMessage = {
    id: `msg_event_${Date.now()}`,
    sender: 'system',
    content: enabled ? 'Chủ thẻ đã tiếp quản hội thoại. AI tạm dừng.' : 'Chủ thẻ đã trả lại hội thoại cho AI.',
    createdAt: new Date().toISOString(),
    isSystemEvent: true,
  };
  
  conv.messages.push(eventMessage);

  return { success: true };
}

export async function markConversationRead(conversationId: string, read: boolean): Promise<InboxActionResponse> {
  await delay(200);
  const conv = mockConversations.find((c) => c.id === conversationId);
  if (!conv) return { success: false, message: 'Không tìm thấy hội thoại' };

  conv.status = read ? 'read' : 'unread';
  conv.unreadCount = read ? 0 : 1;

  return { success: true };
}

export async function archiveConversation(conversationId: string): Promise<InboxActionResponse> {
  await delay(400);
  const conv = mockConversations.find((c) => c.id === conversationId);
  if (!conv) return { success: false, message: 'Không tìm thấy hội thoại' };

  conv.isArchived = true;
  conv.status = 'archived';

  return { success: true };
}

export async function restoreConversation(conversationId: string): Promise<InboxActionResponse> {
  await delay(400);
  const conv = mockConversations.find((c) => c.id === conversationId);
  if (!conv) return { success: false, message: 'Không tìm thấy hội thoại' };

  conv.isArchived = false;
  conv.status = 'read';

  return { success: true };
}

export async function deleteConversation(conversationId: string): Promise<InboxActionResponse> {
  await delay(600);
  mockConversations = mockConversations.filter((c) => c.id !== conversationId);
  return { success: true };
}

export async function updateEmailNotification(conversationId: string, enabled: boolean): Promise<InboxActionResponse> {
  await delay(300);
  const conv = mockConversations.find((c) => c.id === conversationId);
  if (!conv) return { success: false, message: 'Không tìm thấy hội thoại' };

  conv.emailNotificationEnabled = enabled;

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
