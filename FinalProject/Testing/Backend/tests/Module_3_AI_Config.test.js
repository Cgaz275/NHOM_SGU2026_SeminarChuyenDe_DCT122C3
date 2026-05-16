const request = require('supertest');
const app = require('../../src/app'); // Thay đổi đường dẫn thực tế tới file Express app của bạn

// Giả lập Middleware Auth để phân biệt các User khác nhau (Phục vụ TC-05)
jest.mock('../../src/middlewares/auth', () => ({
  verifyToken: (req, res, next) => {
    if (req.headers.authorization === 'Bearer token_user_A') {
      req.user = { uid: 'userA_id' };
      return next();
    }
    if (req.headers.authorization === 'Bearer token_user_B') {
      req.user = { uid: 'userB_id' };
      return next();
    }
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }
}));

// Giả lập Middleware kiểm tra quyền sở hữu thẻ (Ownership)
// Giả định: Thẻ 'card123' thuộc sở hữu của 'userA_id'
jest.mock('../../src/middlewares/cardOwnership', () => ({
  verifyOwner: (req, res, next) => {
    if (req.params.cardId === 'card123' && req.user.uid !== 'userA_id') {
      return res.status(403).json({ success: false, message: 'Bạn không có quyền chỉnh sửa thẻ này' });
    }
    return next();
  }
}));

describe('Module 3: Cấu hình AI & Nạp tri thức (Backend API)', () => {
  const baseURL = '/api/v1/cards';

  beforeEach(() => {
    // Arrange: Reset mock calls trước mỗi test
    jest.clearAllMocks();
  });

  describe('TC-01: Cấu hình AI & Knowledge Base thành công (Happy Path)', () => {
    it('Nên trả về HTTP 200 khi payload hợp lệ', async () => {
      // Arrange: Chuẩn bị payload chuẩn
      const validPayload = {
        systemPrompt: 'Bạn là trợ lý ảo thân thiện',
        toneOfVoice: 'Chuyên nghiệp',
        knowledgeBase: 'Kỹ năng: React, Node.js. Kinh nghiệm: 3 năm.'
      };

      // Act: Gửi API với quyền sở hữu hợp lệ (User A)
      const res = await request(app)
        .put(`${baseURL}/card123/ai-config`)
        .set('Authorization', 'Bearer token_user_A')
        .send(validPayload);

      // Assert: Thành công
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
    });
  });

  describe('TC-02: Bỏ trống các trường cấu hình quan trọng (Negative Path)', () => {
    it('Nên trả về HTTP 400 Bad Request khi thiếu trường bắt buộc (systemPrompt)', async () => {
      // Arrange: Payload rỗng field bắt buộc
      const invalidPayload = {
        systemPrompt: '', // Bỏ trống
        toneOfVoice: 'Chuyên nghiệp',
        knowledgeBase: ''
      };

      // Act
      const res = await request(app)
        .put(`${baseURL}/card123/ai-config`)
        .set('Authorization', 'Bearer token_user_A')
        .send(invalidPayload);

      // Assert: Validator chặn lại
      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBeDefined();
    });
  });

  describe('TC-03: Xử lý ký tự đặc biệt - Ngăn lỗi Parse JSON (Core Risk)', () => {
    it('Nên sanitize và lưu thành công nội dung có ký tự đặc biệt (ngoặc kép, ký tự escape)', async () => {
      // Arrange: Payload chứa nhiều ký tự dễ làm hỏng định dạng JSON string (VD khi sinh file persona_data.json)
      const riskyPayload = {
        systemPrompt: 'Bạn là "bot" ! \n\t',
        toneOfVoice: 'Chuyên nghiệp',
        knowledgeBase: 'Tôi làm việc ở công ty "ABC" \\ với đối tác lớn'
      };

      // Act
      const res = await request(app)
        .put(`${baseURL}/card123/ai-config`)
        .set('Authorization', 'Bearer token_user_A')
        .send(riskyPayload);

      // Assert: Đảm bảo API không bị 500 Internal Server Error và xử lý chuỗi an toàn
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
    });
  });

  describe('TC-04: Nhập nội dung quá dài vượt Token Limit (Core Risk)', () => {
    it('Nên trả về HTTP 413 hoặc 400 khi nội dung vượt quá giới hạn hệ thống', async () => {
      // Arrange: Payload khổng lồ để test chống tràn context window AI (Ví dụ 50,000 ký tự)
      const hugePayload = {
        systemPrompt: 'A',
        toneOfVoice: 'Chuyên nghiệp',
        knowledgeBase: 'B'.repeat(50000)
      };

      // Act
      const res = await request(app)
        .put(`${baseURL}/card123/ai-config`)
        .set('Authorization', 'Bearer token_user_A')
        .send(hugePayload);

      // Assert: Phải bị chặn bởi Middleware giới hạn dung lượng request hoặc thư viện Validate
      // Chấp nhận 400 (Validation) hoặc 413 (Payload Too Large)
      expect([400, 413]).toContain(res.status);
      expect(res.body.success).toBe(false);
    });
  });

  describe('TC-05: Truy cập trái phép Cấu hình AI của người khác (Security)', () => {
    it('Nên trả về HTTP 403 Forbidden khi User B cố sửa thẻ của User A', async () => {
      // Arrange: Lấy thẻ của User A (card123), nhưng đính kèm token của User B
      const validPayload = {
        systemPrompt: 'Hacked by User B',
        toneOfVoice: 'Chuyên nghiệp',
        knowledgeBase: 'Hacked'
      };

      // Act
      const res = await request(app)
        .put(`${baseURL}/card123/ai-config`)
        .set('Authorization', 'Bearer token_user_B') // Token B
        .send(validPayload);

      // Assert: Bắt buộc chặn ở middleware kiểm tra quyền sở hữu (verifyOwner)
      expect(res.status).toBe(403);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toMatch(/không có quyền/i);
    });
  });
});
