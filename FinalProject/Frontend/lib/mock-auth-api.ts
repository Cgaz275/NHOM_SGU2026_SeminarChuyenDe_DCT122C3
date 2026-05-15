import { AuthResponse } from '../types/auth';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function loginWithEmail(email: string, password?: string): Promise<AuthResponse> {
  await delay(1500); // Artificial delay
  
  if (!email || !password) {
    throw new Error('Email và mật khẩu là bắt buộc');
  }

  // Mock success for any input
  return {
    success: true,
    message: 'Đăng nhập thành công.',
    user: {
      id: 'mock-user-id',
      email,
      name: 'Nguyễn Văn A'
    }
  };
}

export async function loginWithGoogle(): Promise<AuthResponse> {
  await delay(1000); // Artificial delay
  
  return {
    success: true,
    message: 'Đăng nhập Google thành công.',
    user: {
      id: 'mock-google-id',
      email: 'user@gmail.com',
      name: 'Google User'
    }
  };
}

export async function registerWithEmail(email: string, password?: string): Promise<AuthResponse> {
  await delay(1500); // Artificial delay
  
  if (!email || !password) {
    throw new Error('Email và mật khẩu là bắt buộc');
  }

  // Mock success for any valid input
  return {
    success: true,
    message: 'Tạo tài khoản thành công.',
    user: {
      id: 'mock-new-user',
      email,
      name: 'New User'
    }
  };
}

export async function requestPasswordReset(email: string): Promise<AuthResponse> {
  await delay(1000); // Artificial delay
  
  if (!email) {
    throw new Error('Email là bắt buộc');
  }

  return {
    success: true,
    message: 'Email đặt lại mật khẩu đã được gửi.',
  };
}
