const request = require('supertest');
const app = require('../../src/app'); // Thay đổi đường dẫn thực tế tới file Express app của bạn

// Mock thư viện Firebase Admin
jest.mock('firebase-admin', () => ({
  auth: () => ({
    verifyIdToken: jest.fn(),
  }),
}));
const admin = require('firebase-admin');

describe('Module 1: Xác thực & Người dùng (Auth API)', () => {
  const baseURL = '/api/v1';

  beforeEach(() => {
    // Arrange: Xóa bỏ dữ liệu mock cũ trước mỗi hàm test để đảm bảo tính độc lập
    jest.clearAllMocks();
  });

  describe('TC-01 & TC-02: Đăng nhập thành công (Google OAuth / Magic Link)', () => {
    it('Nên trả về HTTP 200 và JWT token khi đăng nhập thành công với Firebase Token hợp lệ', async () => {
      // Arrange: Cấu hình Firebase mock trả về dữ liệu user hợp lệ
      const mockToken = 'valid_firebase_token';
      admin.auth().verifyIdToken.mockResolvedValue({
        uid: 'user123',
        email: 'test@example.com',
        name: 'Test User'
      });

      // Act: Gửi POST request tới API đăng nhập
      const res = await request(app)
        .post(`${baseURL}/auth/login`)
        .send({ token: mockToken });

      // Assert: Kiểm tra Status Code và cấu trúc trả về { success, data, message }
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('token'); // Đảm bảo Backend có sinh ra JWT
    });
  });

  describe('TC-03: Nhập sai định dạng Email', () => {
    it('Nên trả về HTTP 400 Bad Request khi payload email sai định dạng', async () => {
      // Arrange: Chuẩn bị email sai định dạng
      const invalidPayload = { email: 'invalid_email_format' };

      // Act: Gửi request
      const res = await request(app)
        .post(`${baseURL}/auth/login`) // Hoặc route gửi magic link
        .send(invalidPayload);

      // Assert: Phải bị chặn bởi Validator (Joi/Yup) và trả về 400
      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBeDefined();
    });
  });

  describe('TC-04: Cố tình truy cập Route bảo vệ không có Token', () => {
    it('Nên trả về HTTP 401 Unauthorized khi thiếu header Authorization', async () => {
      // Act: Gọi GET /users/me mà KHÔNG truyền token
      const res = await request(app)
        .get(`${baseURL}/users/me`);

      // Assert: Middleware Auth phải chặn lại
      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
    });
  });

  describe('TC-05: Truy cập Route bảo vệ với Token hết hạn / Không hợp lệ', () => {
    it('Nên trả về HTTP 401 Unauthorized khi token bị giả mạo', async () => {
      // Arrange: Chuẩn bị 1 JWT token sai
      const invalidToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI...fake';

      // Act: Gọi API truyền token fake
      const res = await request(app)
        .get(`${baseURL}/users/me`)
        .set('Authorization', `Bearer ${invalidToken}`);

      // Assert: Bắt buộc từ chối truy cập
      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
    });
  });

  describe('TC-06: Xử lý khi Firebase Auth bị Timeout (Edge Case)', () => {
    it('Nên bắt Error và trả về HTTP 503 khi Firebase mất kết nối', async () => {
      // Arrange: Giả lập thư viện Firebase bị lỗi mạng / Timeout
      const mockToken = 'timeout_token';
      admin.auth().verifyIdToken.mockRejectedValue(new Error('Firebase network error / Timeout'));

      // Act: Gọi API Login
      const res = await request(app)
        .post(`${baseURL}/auth/login`)
        .send({ token: mockToken });

      // Assert: Không được crash server, phải catch lỗi và trả về 503 (hoặc 500)
      expect(res.status).toBe(503);
      expect(res.body.success).toBe(false);
    });
  });
});
