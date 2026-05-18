'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { apiClient } from '@/lib/apiClient';

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
    const unsubscribe = onAuthStateChanged(auth, async (fUser) => {
      setLoading(true);
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
          } else {
            console.error('Không thể lấy thông tin user từ Backend:', res.message);
            // Có thể fallback dùng thông tin từ Firebase
            setUser({
              id: fUser.uid,
              email: fUser.email || '',
              displayName: fUser.displayName || '',
              photoURL: fUser.photoURL || '',
            });
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

    return () => unsubscribe();
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
