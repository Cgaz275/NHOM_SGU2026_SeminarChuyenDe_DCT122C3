const request = require('supertest');
const app = require('../../src/app'); // Thay đổi đường dẫn thực tế tới file Express app của bạn

// Giả lập Middleware Auth để test các route cần đăng nhập
jest.mock('../../src/middlewares/auth', () => ({
  verifyToken: (req, res, next) => {
    if (req.headers.authorization === 'Bearer valid_token') {
      req.user = { uid: 'user123' };
      return next();
    }
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }
}));

describe('Module 2: Quản lý Thẻ & Profile Builder (Backend API)', () => {
  const baseURL = '/api/v1/cards';

  beforeEach(() => {
    // Arrange: Reset mock calls trước mỗi test
    jest.clearAllMocks();
  });

  describe('TC-01: Tạo & Cập nhật Profile (Happy Path)', () => {
    it('Nên trả về HTTP 200 và cập nhật thẻ khi payload hợp lệ', async () => {
      // Arrange: Chuẩn bị payload chuẩn
      const validPayload = {
        bio: 'New Bio',
        facebook: 'https://fb.com/test'
      };

      // Act: Gọi API cập nhật bằng token hợp lệ
      const res = await request(app)
        .put(`${baseURL}/card123`)
        .set('Authorization', 'Bearer valid_token')
        .send(validPayload);

      // Assert: Status 200, cấu trúc chuẩn
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.message).toBeDefined();
    });
  });

  describe('TC-02 & TC-03: Load data Public Card cho QR và VCF', () => {
    it('Nên trả về HTTP 200 kèm toàn bộ thông tin contact khi thẻ đang Public', async () => {
      // Act: Lấy dữ liệu công khai (không cần token)
      const res = await request(app).get(`${baseURL}/public-slug`);

      // Assert: Phải lấy được dữ liệu thành công
      // Chú thích: Frontend sẽ tự lấy JSON này để gen ra QR code hoặc file .vcf
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('name');
    });
  });

  describe('TC-04: Cập nhật URL mạng xã hội sai định dạng (Negative Path)', () => {
    it('Nên trả về HTTP 400 Bad Request khi validation thất bại', async () => {
      // Arrange: Payload chứa URL sai định dạng
      const invalidPayload = { facebook: 'not-a-valid-link' };

      // Act
      const res = await request(app)
        .put(`${baseURL}/card123`)
        .set('Authorization', 'Bearer valid_token')
        .send(invalidPayload);

      // Assert: Bị validator (VD: Joi/Yup) chặn lại
      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBeDefined();
    });
  });

  describe('TC-05: Rò rỉ thông tin cá nhân (Privacy Leak - Core Risk)', () => {
    it('Phải LỌC BỎ (omit) phoneNumber và email khỏi response API nếu user đã cài đặt ẩn', async () => {
      // Arrange: (Giả định DB có một record hidden-slug với cài đặt hideContact = true)

      // Act: Gọi API lấy thông tin Public (Giống như một khách hàng ngoài gọi)
      const res = await request(app).get(`${baseURL}/hidden-slug`);

      // Assert: TUYỆT ĐỐI không được trả về sđt hoặc email, hoặc phải là null
      // Đây là bài toán bảo mật rất quan trọng
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      
      const cardData = res.body.data || {};
      const hasPhone = cardData.phoneNumber !== undefined && cardData.phoneNumber !== null;
      const hasEmail = cardData.email !== undefined && cardData.email !== null;
      
      expect(hasPhone).toBe(false);
      expect(hasEmail).toBe(false);
    });
  });

  describe('TC-06: Truy cập Thẻ bị khóa / Đã xóa', () => {
    it('Nên trả về HTTP 404 khi cố tình truy cập thẻ đã bị xóa (Soft Delete = true)', async () => {
      // Act
      const res = await request(app).get(`${baseURL}/deleted-slug`);

      // Assert
      expect(res.status).toBe(404);
      expect(res.body.success).toBe(false);
    });

    it('Nên trả về HTTP 403 Forbidden khi cố tình truy cập thẻ đang bị khóa (Banned)', async () => {
      // Act
      const res = await request(app).get(`${baseURL}/banned-slug`);

      // Assert
      expect(res.status).toBe(403);
      expect(res.body.success).toBe(false);
    });
  });
});
