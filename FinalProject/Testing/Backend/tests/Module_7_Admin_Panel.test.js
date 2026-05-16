const request = require('supertest');
const app = require('../../src/app');

// Giả lập hệ thống Authentication & Authorization
jest.mock('../../src/middlewares/auth', () => ({
  // 1. Hàm kiểm tra JWT token chung
  verifyToken: (req, res, next) => {
    if (req.headers.authorization === 'Bearer admin_token') {
      req.user = { uid: 'admin_id', role: 'admin' };
      return next();
    }
    if (req.headers.authorization === 'Bearer user_token') {
      req.user = { uid: 'user_id', role: 'user' };
      return next();
    }
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  },
  
  // 2. Middleware then chốt chặn riêng cho nhóm API /admin
  verifyAdmin: (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
      return next();
    }
    // Chặn đứng bất kì ai không phải admin
    return res.status(403).json({ success: false, message: 'Forbidden: Bạn không có quyền thực hiện hành động này' });
  }
}));

describe('Module 7: Quản trị (Admin Panel) (Backend API)', () => {
  const baseURL = '/api/v1';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('TC-05: Kiểm tra Lỗ hổng phân quyền - Broken Access Control (Core Risk)', () => {
    it('BẮT BUỘC trả về HTTP 403 Forbidden khi User thường cố gắng gọi API Admin', async () => {
      // Act: Gửi request lấy danh sách toàn bộ User bằng token của tài khoản NGƯỜI DÙNG THƯỜNG
      const res = await request(app)
        .get(`${baseURL}/users`)
        .set('Authorization', 'Bearer user_token'); // Truyền token user

      // Assert: Phải bị chặn bởi Middleware verifyAdmin
      expect(res.status).toBe(403);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toMatch(/không có quyền/i);
    });

    it('BẮT BUỘC trả về HTTP 403 Forbidden khi User thường cố tình gọi API Khóa tài khoản', async () => {
      const res = await request(app)
        .put(`${baseURL}/users/target-user-id/status`)
        .set('Authorization', 'Bearer user_token')
        .send({ status: 'banned' });

      expect(res.status).toBe(403);
    });
  });

  describe('TC-01: Admin lấy danh sách và tìm kiếm User (Happy Path)', () => {
    it('Nên trả về HTTP 200 OK kèm danh sách dữ liệu khi gọi bằng Token Admin', async () => {
      // Act: Gửi request hợp lệ
      const res = await request(app)
        .get(`${baseURL}/users?search=Nguyen`)
        .set('Authorization', 'Bearer admin_token'); // Truyền đúng token admin

      // Assert
      expect(res.status).toBe(200);
      // expect(res.body.data).toBeInstanceOf(Array); // Tùy thuộc cấu trúc Mock logic bên trong
    });
  });

  describe('TC-02: Admin khóa tài khoản User (Happy Path)', () => {
    it('Nên cập nhật trạng thái User thành "banned" và trả về HTTP 200 OK', async () => {
      // Act
      const res = await request(app)
        .put(`${baseURL}/users/user123/status`)
        .set('Authorization', 'Bearer admin_token')
        .send({ status: 'banned' });

      // Assert
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
    });
  });

  describe('TC-03: Admin xử lý Báo cáo vi phạm - Resolve Report (Happy Path)', () => {
    it('Nên xử lý báo cáo thành công và trả về HTTP 200 OK', async () => {
      // Act
      const res = await request(app)
        .put(`${baseURL}/reports/rep123/resolve`)
        .set('Authorization', 'Bearer admin_token')
        .send({ action: 'ban_card', duration: '1_month' });

      // Assert
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
    });
  });

  describe('TC-04: Xử lý dữ liệu đầu vào sai (Negative Path)', () => {
    it('Nên trả về HTTP 404 Not Found khi Admin thao tác trên User ID không tồn tại', async () => {
      // Act: Truyền một ID rác
      const res = await request(app)
        .put(`${baseURL}/users/id-khong-ton-tai/status`)
        .set('Authorization', 'Bearer admin_token')
        .send({ status: 'banned' });

      // Assert: Controller ở BE sẽ báo lỗi 404 do ko query thấy DB
      expect(res.status).toBe(404);
      expect(res.body.success).toBe(false);
    });
  });
});
