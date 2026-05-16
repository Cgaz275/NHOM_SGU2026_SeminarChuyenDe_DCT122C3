const request = require('supertest');
const app = require('../../src/app'); // Cập nhật đường dẫn app của dự án thực tế

// Giả lập Middleware Authentication để test các quyền riêng tư (Xem/Xóa tin nhắn trong Inbox)
jest.mock('../../src/middlewares/auth', () => ({
  verifyToken: (req, res, next) => {
    // Chỉ cho phép truy cập nếu có token hợp lệ
    if (req.headers.authorization === 'Bearer valid_owner_token') {
      req.user = { uid: 'owner123' };
      return next();
    }
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }
}));

// Giả lập Middleware Rate Limiter (Ngăn Spam Form) - VD: Tối đa 3 req/phút
let messageRequestCount = 0;
jest.mock('../../src/middlewares/rateLimiter', () => ({
  messageLimiter: (req, res, next) => {
    messageRequestCount++;
    if (messageRequestCount > 3) {
      return res.status(429).json({ success: false, message: 'Too Many Requests: Bạn thao tác quá nhanh' });
    }
    next();
  }
}));

describe('Module 5: Fallback & Inbox (Backend API)', () => {
  const baseURL = '/api/v1/messages';

  beforeEach(() => {
    // Arrange: Khôi phục toàn bộ mock và reset biến đếm
    jest.clearAllMocks();
    messageRequestCount = 0;
  });

  describe('TC-01: Gửi Form liên hệ tĩnh thành công (Happy Path)', () => {
    it('Nên lưu tin nhắn mới vào DB và trả về HTTP 201 Created', async () => {
      // Arrange: Khách vãng lai gửi payload hợp lệ
      const validPayload = {
        name: 'Nguyen Van A',
        email: 'test@example.com',
        phone: '0901234567',
        content: 'Tôi muốn nhờ tư vấn dịch vụ thiết kế.'
      };

      // Act: Gọi API (Public, không cần Auth)
      const res = await request(app)
        .post(`${baseURL}/cards/card123`)
        .send(validPayload);

      // Assert
      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.message).toMatch(/thành công/i);
    });
  });

  describe('TC-02: Chủ thẻ đánh dấu đã đọc tin nhắn trong Inbox', () => {
    it('Nên cập nhật trường isRead = true và trả về HTTP 200 OK', async () => {
      // Act: Chủ thẻ đăng nhập và gửi request đánh dấu đã đọc
      const res = await request(app)
        .put(`${baseURL}/msg123/read`)
        .set('Authorization', 'Bearer valid_owner_token');

      // Assert
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
    });
  });

  describe('TC-03: Chủ thẻ xóa tin nhắn trong Inbox', () => {
    it('Nên trả về HTTP 200 OK khi xóa thành công một tin nhắn', async () => {
      // Act: Chủ thẻ gửi request Xóa
      const res = await request(app)
        .delete(`${baseURL}/msg123`)
        .set('Authorization', 'Bearer valid_owner_token');

      // Assert
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
    });
  });

  describe('TC-04: Nhập thiếu thông tin Form tĩnh (Negative Path)', () => {
    it('Nên bị chặn bởi Validator và trả về HTTP 400 Bad Request', async () => {
      // Arrange: Payload thiếu 'name' và sai định dạng 'email'
      const invalidPayload = {
        email: 'khongphaimail',
        phone: '0901234567',
        content: 'Test message rác'
      };

      // Act
      const res = await request(app)
        .post(`${baseURL}/cards/card123`)
        .send(invalidPayload);

      // Assert
      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBeDefined(); // Phải có câu báo lỗi cụ thể
    });
  });

  describe('TC-05: Tấn công Spam Form tĩnh (Core Risk)', () => {
    it('Nên chặn request từ lần gửi thứ 4 trở đi với HTTP 429 Too Many Requests', async () => {
      // Arrange & Act: Sử dụng vòng lặp gửi liên tục 4 requests
      const validPayload = { name: 'Spammer', email: 'spam@mail.com', content: 'Spam' };
      let res;
      for (let i = 1; i <= 4; i++) {
        res = await request(app)
          .post(`${baseURL}/cards/card123`)
          .send(validPayload);
      }

      // Assert: Chỉ lấy kết quả của request thứ 4 (đã quá limit là 3)
      expect(res.status).toBe(429);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toMatch(/Too Many Requests/i);
    });
  });
});
