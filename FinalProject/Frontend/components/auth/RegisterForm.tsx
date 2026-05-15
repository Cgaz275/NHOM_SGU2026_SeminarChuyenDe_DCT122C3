'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { Toast } from '@/components/ui/Toast';
import { registerWithEmail } from '@/lib/mock-auth-api';
import Link from 'next/link';

export function RegisterForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error'; isVisible: boolean }>({
    message: '',
    type: 'success',
    isVisible: false
  });

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type, isVisible: true });
    setTimeout(() => {
      setToast(prev => ({ ...prev, isVisible: false }));
    }, 3000);
  };

  const validate = () => {
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      showToast('Email không hợp lệ.', 'error');
      return false;
    }
    if (!password || password.length < 8) {
      showToast('Mật khẩu phải có ít nhất 8 ký tự.', 'error');
      return false;
    }
    if (password !== confirmPassword) {
      showToast('Mật khẩu xác nhận không khớp.', 'error');
      return false;
    }
    if (!agreeTerms) {
      showToast('Bạn phải đồng ý với Điều khoản dịch vụ.', 'error');
      return false;
    }
    return true;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    setIsLoading(true);
    try {
      await registerWithEmail(email, password);
      showToast('Tạo tài khoản thành công.', 'success');
      setTimeout(() => {
        router.push('/dashboard/profile-builder');
      }, 1000);
    } catch (error) {
      showToast('Không thể tạo tài khoản. Vui lòng thử lại.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="bg-[#101010] p-8 md:p-10 rounded-[32px] border border-white/5 relative z-10 shadow-2xl"
    >
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-white mb-2">Đăng ký</h2>
        <p className="text-[#B7B7B7] text-sm">Bắt đầu tạo thẻ cá nhân số và AI Persona của bạn</p>
      </div>

      <form onSubmit={handleRegister} className="space-y-4.5">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-[#B7B7B7] ml-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Nhập email của bạn"
            className="w-full px-5 py-3 bg-white text-[#111111] placeholder-gray-500 rounded-full focus:outline-none focus:ring-2 focus:ring-[#008FEA] transition-all"
            disabled={isLoading}
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-[#B7B7B7] ml-1">Mật khẩu</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Tạo mật khẩu"
            className="w-full px-5 py-3 bg-white text-[#111111] placeholder-gray-500 rounded-full focus:outline-none focus:ring-2 focus:ring-[#008FEA] transition-all"
            disabled={isLoading}
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-[#B7B7B7] ml-1">Xác nhận mật khẩu</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Nhập lại mật khẩu"
            className="w-full px-5 py-3 bg-white text-[#111111] placeholder-gray-500 rounded-full focus:outline-none focus:ring-2 focus:ring-[#008FEA] transition-all"
            disabled={isLoading}
          />
        </div>

        <div className="flex items-center gap-2 pt-2 pb-4 ml-1">
          <input
            type="checkbox"
            id="terms"
            checked={agreeTerms}
            onChange={(e) => setAgreeTerms(e.target.checked)}
            className="w-4 h-4 rounded border-gray-600 bg-[#1A1A1A] text-[#008FEA] focus:ring-[#008FEA] focus:ring-offset-[#101010] transition-colors"
            disabled={isLoading}
          />
          <label htmlFor="terms" className="text-sm text-[#B7B7B7] cursor-pointer hover:text-white transition-colors">
            Tôi đồng ý với Điều khoản dịch vụ
          </label>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 bg-[#2367A2] hover:bg-[#008FEA] text-white py-3.5 px-4 rounded-full font-medium transition-all focus:outline-none focus:ring-2 focus:ring-[#008FEA] focus:ring-offset-2 focus:ring-offset-[#101010] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
          {isLoading ? 'Đang tạo tài khoản...' : 'Tạo tài khoản'}
        </button>

        <p className="text-center text-sm text-[#B7B7B7] pt-4">
          Đã có tài khoản?{' '}
          <Link href="/login" className="text-[#008FEA] hover:text-[#2367A2] transition-colors font-medium">
            Đăng nhập
          </Link>
        </p>
      </form>

      <Toast message={toast.message} isVisible={toast.isVisible} type={toast.type} />
    </motion.div>
  );
}
