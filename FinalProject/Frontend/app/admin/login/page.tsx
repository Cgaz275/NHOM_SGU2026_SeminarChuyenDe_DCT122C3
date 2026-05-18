import { AdminLoginForm } from '@/components/admin/AdminLoginForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Login | Digital Twin',
  description: 'Trang đăng nhập dành cho Quản trị viên.',
};

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-[#0B0B0B] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#2367A2]/10 blur-[100px] rounded-full pointer-events-none"></div>
      
      <AdminLoginForm />
    </div>
  );
}
