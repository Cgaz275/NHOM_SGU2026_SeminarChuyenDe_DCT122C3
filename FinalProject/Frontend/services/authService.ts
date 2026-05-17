import { apiClient } from '../lib/apiClient';

export const loginService = async (email: string, password: string) => {
  return await apiClient<any>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
};
