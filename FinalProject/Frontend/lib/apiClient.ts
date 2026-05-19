import { auth } from './firebase';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://latticed-willetta-subovarian.ngrok-free.dev/api/v1';

/**
 * HTTP Client đóng gói Fetch API.
 * Tự động đính kèm Token vào Header và tự động Refresh Token nếu hết hạn.
 */
export async function apiClient<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<{ success: boolean; data: T | null; message: string }> {
  const url = `${BASE_URL}${endpoint}`;
  
  // Khởi tạo headers
  const headers = new Headers(options.headers || {});
  
  // Mặc định luôn gửi JSON nếu body là object (và chưa set Content-Type)
  if (!headers.has('Content-Type') && options.body && typeof options.body === 'string') {
    headers.set('Content-Type', 'application/json');
  }

  // Tự động đính kèm Token (đối với môi trường Client-side)
  if (typeof window !== 'undefined') {
    let token = localStorage.getItem('token');
    
    // Nếu Firebase đã đăng nhập, tự động lấy token mới nhất (Firebase sẽ tự làm mới ngầm nếu đã quá 1 tiếng!)
    if (auth && auth.currentUser) {
      try {
        token = await auth.currentUser.getIdToken();
        localStorage.setItem('token', token);
      } catch (err) {
        console.error('Không thể tự động refresh Firebase Token:', err);
      }
    }

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
  }

  headers.set('ngrok-skip-browser-warning', 'true');

  const config: RequestInit = {
    ...options,
    headers,
  };

  try {
    console.log("📡 FE đang cố gọi API tới địa chỉ:", url);
    const response = await fetch(url, config);
    const result = await response.json();
    
    // Xử lý status >= 400
    if (!response.ok) {
      return {
        success: false,
        data: null,
        message: result.message || 'Lỗi từ máy chủ API',
      };
    }

    return {
      success: true,
      data: result.data !== undefined ? result.data : result, // Sửa lỗi || làm mất giá trị false
      message: result.message || 'Thành công',
    };

  } catch (error: any) {
    console.error('API Client Error:', error);
    return {
      success: false,
      data: null,
      message: error.message || 'Không thể kết nối đến máy chủ',
    };
  }
}
