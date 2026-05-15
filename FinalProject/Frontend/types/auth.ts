export interface LoginFormData {
  email: string;
  password?: string;
}

export interface RegisterFormData {
  email: string;
  password?: string;
  confirmPassword?: string;
  agreeToTerms?: boolean;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: {
    id: string;
    email: string;
    name?: string;
  };
}

export interface AuthError {
  success: false;
  message: string;
}
