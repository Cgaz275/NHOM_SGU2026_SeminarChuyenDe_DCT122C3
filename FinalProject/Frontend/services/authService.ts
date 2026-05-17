import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  UserCredential
} from 'firebase/auth';
import { auth } from '../lib/firebase';
import { apiClient } from '../lib/apiClient';

/**
 * Đăng ký tài khoản với Firebase và đồng bộ thông tin với Backend
 */
export const registerService = async (email: string, password: string) => {
  try {
    // 1. Tạo tài khoản trên Firebase
    const userCredential: UserCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // 2. Lấy ID Token từ Firebase
    const idToken = await user.getIdToken();
    
    // 3. Gửi Token lên Backend để khởi tạo User trong Firestore của Backend
    const backendRes = await apiClient<any>('/auth/register', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${idToken}`
      },
      body: JSON.stringify({ email })
    });

    if (!backendRes.success) {
      throw new Error(backendRes.message || 'Lỗi đồng bộ Backend');
    }

    return {
      success: true,
      token: idToken,
      user: backendRes.data,
      message: 'Đăng ký thành công'
    };
  } catch (error: any) {
    console.error('Lỗi đăng ký:', error);
    return {
      success: false,
      message: error.message || 'Đăng ký thất bại'
    };
  }
};

/**
 * Đăng nhập tài khoản với Firebase và lấy token gửi lên Backend
 */
export const loginService = async (email: string, password: string) => {
  try {
    // 1. Đăng nhập qua Firebase
    const userCredential: UserCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // 2. Lấy ID Token
    const idToken = await user.getIdToken();
    
    // 3. Gửi Token lên Backend để verify và lấy session info (tuỳ chọn nhưng tốt để check)
    const backendRes = await apiClient<any>('/auth/login', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${idToken}`
      }
    });

    if (!backendRes.success) {
      throw new Error(backendRes.message || 'Lỗi từ Backend');
    }

    return {
      success: true,
      token: idToken,
      user: backendRes.data,
      message: 'Đăng nhập thành công'
    };
  } catch (error: any) {
    console.error('Lỗi đăng nhập:', error);
    return {
      success: false,
      message: error.message || 'Đăng nhập thất bại. Vui lòng kiểm tra lại email/mật khẩu.'
    };
  }
};

/**
 * Đăng xuất
 */
export const logoutService = async () => {
  try {
    await signOut(auth);
    localStorage.removeItem('token');
    return { success: true };
  } catch (error) {
    return { success: false };
  }
};
