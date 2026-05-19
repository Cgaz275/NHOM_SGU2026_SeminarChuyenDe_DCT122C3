'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { apiClient } from '@/lib/apiClient';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface UserProfile {
  id: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  role?: string;
  // Thêm các trường khác nếu cần
}

interface AuthContextType {
  user: UserProfile | null;
  firebaseUser: FirebaseUser | null;
  loading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  firebaseUser: null,
  loading: true,
  logout: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Trạng thái hiển thị modal tài khoản bị khóa
  const [isBannedModalOpen, setIsBannedModalOpen] = useState(false);
  const [banMessage, setBanMessage] = useState('');

  useEffect(() => {
    let unsubscribeDoc: (() => void) | null = null;

    const unsubscribeAuth = onAuthStateChanged(auth, async (fUser) => {
      setLoading(true);
      
      // Hủy lắng nghe tài liệu cũ nếu có
      if (unsubscribeDoc) {
        unsubscribeDoc();
        unsubscribeDoc = null;
      }

      if (fUser) {
        setFirebaseUser(fUser);
        try {
          // Lấy token mới và lưu vào localStorage để apiClient sử dụng
          const token = await fUser.getIdToken();
          localStorage.setItem('token', token);

          // Gọi API Backend để lấy thông tin chi tiết user
          const res = await apiClient<UserProfile>('/users/me');
          if (res.success && res.data) {
            setUser(res.data);

            // BẮT ĐẦU LẮNG NGHE REAL-TIME KHÓA TÀI KHOẢN:
            if (db) {
              unsubscribeDoc = onSnapshot(doc(db, 'users', fUser.uid), async (snapshot) => {
                if (snapshot.exists()) {
                  const userData = snapshot.data();
                  if (userData.status === 'banned') {
                    // Khi tài khoản bị khóa trong DB, lập tức mở modal cảnh báo
                    setBanMessage('Tài khoản của bạn đã bị khóa do vi phạm điều khoản dịch vụ của hệ thống. Vui lòng liên hệ email: admin@gmail.com để nhận hỗ trợ.');
                    setIsBannedModalOpen(true);
                    if (unsubscribeDoc) {
                      unsubscribeDoc();
                      unsubscribeDoc = null;
                    }
                  }
                }
              });
            }
          } else {
            console.error('Không thể lấy thông tin user từ Backend:', res.message);
            if (res.message && (res.message.includes('khóa') || res.message.includes('bị khóa') || res.message.includes('vi phạm'))) {
              setBanMessage(res.message);
              setIsBannedModalOpen(true);
            } else {
              // Có thể fallback dùng thông tin từ Firebase
              setUser({
                id: fUser.uid,
                email: fUser.email || '',
                displayName: fUser.displayName || '',
                photoURL: fUser.photoURL || '',
              });
            }
          }
        } catch (error) {
          console.error('Lỗi khi xử lý auth state changed:', error);
        }
      } else {
        setFirebaseUser(null);
        setUser(null);
        localStorage.removeItem('token');
      }
      setLoading(false);
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeDoc) unsubscribeDoc();
    };
  }, []);

  const logout = async () => {
    try {
      await auth.signOut();
      localStorage.removeItem('token');
      setFirebaseUser(null);
      setUser(null);
    } catch (error) {
      console.error('Lỗi khi đăng xuất:', error);
    }
  };

  const handleConfirmBanLogout = async () => {
    setIsBannedModalOpen(false);
    await auth.signOut();
    localStorage.removeItem('token');
    setFirebaseUser(null);
    setUser(null);
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ user, firebaseUser, loading, logout }}>
      {children}

      {/* Modal báo khóa tài khoản cao cấp hiện giữa màn hình */}
      {isBannedModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#151515] border border-red-500/20 shadow-[0_0_50px_-12px_rgba(239,68,68,0.3)] max-w-md w-full rounded-2xl p-6 text-center animate-in fade-in zoom-in duration-300">
            <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-500/20">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Tài khoản bị khóa</h3>
            <p className="text-white/70 text-sm mb-6 leading-relaxed">
              {banMessage || 'Tài khoản của bạn đã bị tạm dừng hoạt động do vi phạm điều khoản dịch vụ của hệ thống.'}
            </p>
            <button
              onClick={handleConfirmBanLogout}
              className="w-full py-3 px-4 bg-red-600 hover:bg-red-500 active:bg-red-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-red-600/20 hover:shadow-red-600/30"
            >
              Xác nhận & Đăng xuất
            </button>
          </div>
        </div>
      )}
    </AuthContext.Provider>
  );
};
