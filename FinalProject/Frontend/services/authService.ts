import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  UserCredential,
  GoogleAuthProvider, 
  signInWithPopup
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

export const loginWithGoogle = async () => {
  try {
    // 1. Khởi tạo nhà cung cấp Google
    const provider = new GoogleAuthProvider();
    
    // 2. Bật Popup cho user đăng nhập
    const result = await signInWithPopup(auth, provider);
    
    // 3. Rút trích dữ liệu sau khi đăng nhập thành công
    const user = result.user;
    const idToken = await user.getIdToken(); 

    console.log("Đăng nhập thành công! Tên:", user.displayName);
    console.log("Email:", user.email);
    console.log("Avatar:", user.photoURL);

    // Lưu token vào localStorage để các request sau tự động dùng
    localStorage.setItem('token', idToken);

    // 4. Kiểm tra xem user đã có thẻ chưa
    const cardsRes = await apiClient<any[]>('/cards/me');

    if (cardsRes.success && cardsRes.data && cardsRes.data.length === 0) {
      // Chưa có thẻ, tự động tạo thẻ mới với thông tin từ Google
      console.log("Tài khoản mới, tự động tạo thẻ...");
      await apiClient('/cards', {
        method: 'POST',
        body: JSON.stringify({
          fullName: user.displayName || '',
          jobTitle: 'Người dùng mới',
          slogan: '',
          bio: `Xin chào, tôi là ${user.displayName || 'người dùng mới'}`,
          avatarUrl: user.photoURL || '',
          socialLinks: {
            email: user.email || ''
          }
        })
      });
    }

    return { 
      success: true, 
      data: {
        uid: user.uid,
        email: user.email,
        name: user.displayName,
        avatar: user.photoURL,
        idToken: idToken
      } 
    };

  } catch (error: any) {
    if (error.code === 'auth/popup-closed-by-user') {
      console.log("Người dùng đã đóng popup đăng nhập.");
      return { success: false, message: 'Bạn đã đóng cửa sổ đăng nhập Google.' };
    }
    console.error("Lỗi đăng nhập Google:", error);
    return { success: false, message: error.message || 'Đăng nhập Google thất bại.' };
  }
};