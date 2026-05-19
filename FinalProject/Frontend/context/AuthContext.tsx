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
                    // Khi tài khoản bị khóa trong DB, lập tức cảnh báo và kickout!
                    alert('Tài khoản của bạn đã bị khóa do vi phạm điều khoản dịch vụ.');
                    if (unsubscribeDoc) {
                      unsubscribeDoc();
                      unsubscribeDoc = null;
                    }
                    await auth.signOut();
                    localStorage.removeItem('token');
                    setFirebaseUser(null);
                    setUser(null);
                    window.location.href = '/login';
                  }
                }
              });
            }
          } else {
            console.error('Không thể lấy thông tin user từ Backend:', res.message);
            if (res.message && (res.message.includes('khóa') || res.message.includes('bị khóa') || res.message.includes('vi phạm'))) {
              alert(res.message || 'Tài khoản của bạn đã bị khóa.');
              await auth.signOut();
              localStorage.removeItem('token');
              setFirebaseUser(null);
              setUser(null);
              window.location.href = '/login';
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

  return (
    <AuthContext.Provider value={{ user, firebaseUser, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
