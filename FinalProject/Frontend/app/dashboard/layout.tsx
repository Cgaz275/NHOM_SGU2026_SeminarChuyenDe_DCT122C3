'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  // Hiển thị loading trong khi đang kiểm tra trạng thái đăng nhập
  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#008FEA] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Nếu không có user và không loading, sẽ redirect ở useEffect
  if (!user) {
    return null;
  }

  // Nếu đã đăng nhập, hiển thị nội dung
  // Lưu ý: Hiện tại các trang con đang tự gọi DashboardSidebar, 
  // nên ở đây chỉ trả về children để tránh bị lặp lại Sidebar.
  return <>{children}</>;
}
