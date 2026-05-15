import Link from 'next/link';
import { ShieldAlert } from 'lucide-react';

export function PermissionDeniedState() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#0B0B0B] text-white">
      <ShieldAlert className="h-16 w-16 text-danger mb-6" />
      <h1 className="text-2xl font-bold mb-2">Bạn không có quyền truy cập Admin Panel.</h1>
      <p className="text-white/60 mb-8">Vui lòng đăng nhập bằng tài khoản quản trị viên.</p>
      <Link 
        href="/"
        className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors border border-white/10"
      >
        Quay lại
      </Link>
    </div>
  );
}
