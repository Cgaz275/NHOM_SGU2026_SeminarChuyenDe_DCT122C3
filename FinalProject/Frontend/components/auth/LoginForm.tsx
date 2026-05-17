'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { Toast } from '@/components/ui/Toast';
import { loginWithGoogle } from '@/lib/mock-auth-api';
import { loginService } from '@/services/authService';
import { GoogleButton } from './GoogleButton';
import Link from 'next/link';

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  
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
    if (!password) {
      showToast('Vui lòng nhập mật khẩu.', 'error');
      return false;
    }
    return true;
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    setIsLoading(true);
    try {
      const res = await loginService(email, password);
      if (res.success) {
        // Lưu token nếu có
        if (res.data && res.data.token) {
          localStorage.setItem('token', res.data.token);
        }
        showToast(res.message || 'Đăng nhập thành công.', 'success');
        setTimeout(() => {
          router.push('/dashboard/profile-builder');
        }, 1000);
      } else {
        showToast(res.message || 'Email hoặc mật khẩu không đúng.', 'error');
      }
    } catch (error: any) {
      showToast(error.message || 'Đã xảy ra lỗi khi kết nối tới máy chủ.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    try {
      await loginWithGoogle();
      showToast('Đăng nhập Google thành công.', 'success');
      setTimeout(() => {
        router.push('/dashboard/profile-builder');
      }, 1000);
    } catch (error) {
      showToast('Không thể đăng nhập bằng Google.', 'error');
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleForgotPassword = (e: React.MouseEvent) => {
    e.preventDefault();
    showToast('Tính năng đặt lại mật khẩu sẽ được bổ sung sau.', 'success');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="bg-[#101010] p-8 md:p-10 rounded-[32px] border border-white/5 relative z-10 shadow-2xl"
    >
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-white mb-2">Đăng nhập</h2>
        <p className="text-[#B7B7B7] text-sm">Quản lý hồ sơ số và AI Twin của bạn</p>
      </div>

      <form onSubmit={handleEmailLogin} className="space-y-5">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-[#B7B7B7] ml-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Nhập email của bạn"
            className="w-full px-5 py-3.5 bg-white text-[#111111] placeholder-gray-500 rounded-full focus:outline-none focus:ring-2 focus:ring-[#008FEA] transition-all"
            disabled={isLoading || isGoogleLoading}
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-[#B7B7B7] ml-1">Mật khẩu</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Nhập mật khẩu"
            className="w-full px-5 py-3.5 bg-white text-[#111111] placeholder-gray-500 rounded-full focus:outline-none focus:ring-2 focus:ring-[#008FEA] transition-all"
            disabled={isLoading || isGoogleLoading}
          />
        </div>

        <div className="flex justify-end pt-1">
          <button 
            type="button" 
            onClick={handleForgotPassword}
            className="text-sm text-[#008FEA] hover:text-[#2367A2] transition-colors"
          >
            Quên mật khẩu?
          </button>
        </div>

        <button
          type="submit"
          disabled={isLoading || isGoogleLoading}
          className="w-full flex items-center justify-center gap-2 bg-[#2367A2] hover:bg-[#008FEA] text-white py-3.5 px-4 rounded-full font-medium transition-all focus:outline-none focus:ring-2 focus:ring-[#008FEA] focus:ring-offset-2 focus:ring-offset-[#101010] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
          {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
        </button>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-3 bg-[#101010] text-[#B7B7B7]">Hoặc</span>
          </div>
        </div>

        <GoogleButton 
          onClick={handleGoogleLogin} 
          isLoading={isGoogleLoading}
          disabled={isLoading || isGoogleLoading}
        >
          Tiếp tục với Google
        </GoogleButton>

        <p className="text-center text-sm text-[#B7B7B7] pt-4">
          Chưa có tài khoản?{' '}
          <Link href="/register" className="text-[#008FEA] hover:text-[#2367A2] transition-colors font-medium">
            Tạo tài khoản mới
          </Link>
        </p>
      </form>

      <Toast message={toast.message} isVisible={toast.isVisible} type={toast.type} />
    </motion.div>
  );
}
