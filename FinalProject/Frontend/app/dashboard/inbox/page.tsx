import { PersonaInboxPage } from '@/components/inbox/PersonaInboxPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hộp thư Persona - Quản lý tin nhắn',
  description: 'Xem lịch sử trò chuyện, thông tin lead và tiếp quản hội thoại quan trọng.',
};

export default function InboxRoute() {
  return <PersonaInboxPage />;
}
