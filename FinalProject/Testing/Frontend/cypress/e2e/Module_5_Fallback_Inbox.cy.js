describe('Module 5: Fallback & Inbox (Frontend E2E)', () => {
  const apiBaseURL = '**/api/v1';

  beforeEach(() => {
    // Tẩy sạch state trước mỗi bài test
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  describe('Phần 1: Form liên hệ tĩnh (Khách vãng lai)', () => {
    beforeEach(() => {
      // Giả lập khách truy cập vào Public Card (Đang tắt AI)
      cy.visit('/cards/test-slug');
    });

    it('TC-01: Gửi Form liên hệ tĩnh thành công và reset form', () => {
      // Arrange: Mock API gửi form
      cy.intercept('POST', `${apiBaseURL}/messages/cards/*`, {
        statusCode: 201,
        body: { success: true, message: 'Đã gửi tin nhắn thành công, chúng tôi sẽ liên hệ lại sớm' },
        delay: 500 // Giả lập độ trễ mạng để test UI Loading
      }).as('submitForm');

      // Act: Điền form
      cy.get('input[name="name"]').type('Khach Hang');
      cy.get('input[name="email"]').type('khach@gmail.com');
      cy.get('input[name="phone"]').type('0901234567');
      cy.get('textarea[name="content"]').type('Cần tư vấn dịch vụ');
      cy.get('[data-cy="btn-submit-form"]').click();

      // Assert:
      cy.contains('Đang gửi...').should('be.visible'); // Kiểm tra text nút chuyển trạng thái Loading
      cy.wait('@submitForm');
      cy.contains('Đã gửi tin nhắn thành công').should('be.visible'); // Kiểm tra Toast Message
      
      // Form phải tự động clear sau khi gửi thành công
      cy.get('input[name="name"]').should('have.value', '');
      cy.get('textarea[name="content"]').should('have.value', '');
    });

    it('TC-04: Ngăn gửi và báo lỗi khi nhập thiếu thông tin hoặc sai định dạng email', () => {
      // Act: Bỏ qua field 'name', điền email sai format
      cy.get('input[name="email"]').type('sai_dinh_dang_mail');
      cy.get('[data-cy="btn-submit-form"]').click();

      // Assert: Các validator ở Frontend phải hoạt động
      cy.contains('Vui lòng nhập Họ tên').should('be.visible');
      cy.get('input[name="name"]').should('have.class', 'border-red-500'); // Viền đỏ báo lỗi
      cy.contains('Email không hợp lệ').should('be.visible');
    });

    it('TC-05: Chặn Spam Form (Nhận mã lỗi 429 từ Backend)', () => {
      // Arrange: Giả định user spam và nhận Rate Limit HTTP 429
      cy.intercept('POST', `${apiBaseURL}/messages/cards/*`, {
        statusCode: 429,
        body: { success: false, message: 'Bạn thao tác quá nhanh, vui lòng thử lại sau' }
      }).as('spamForm');

      // Act
      cy.get('input[name="name"]').type('Spammer');
      cy.get('input[name="email"]').type('spam@gmail.com');
      cy.get('textarea[name="content"]').type('Spam content');
      cy.get('[data-cy="btn-submit-form"]').click();

      // Assert: Bắt và hiển thị lỗi từ API
      cy.wait('@spamForm');
      cy.contains('Bạn thao tác quá nhanh').should('be.visible');
    });

    it('TC-06: Graceful Degradation - Tự động Fallback sang Form tĩnh khi LLM Chatbot sập', () => {
      // Arrange: Truy cập vào trang thẻ đang BẬT AI Chatbot
      cy.visit('/cards/ai-slug');
      cy.get('[data-cy="btn-open-chat"]').click();

      // Giả lập hệ thống AI (OpenRouter) bị lỗi 503 hoặc Timeout
      cy.intercept('POST', `${apiBaseURL}/chat/cards/*/chat`, {
        statusCode: 503,
        body: { success: false, message: 'Service Unavailable' },
        delay: 2000
      }).as('chatCrash');

      // Act: Khách nhắn tin đầu tiên
      cy.get('[data-cy="chat-input"]').type('Alo, có ai không?');
      cy.get('[data-cy="btn-send-chat"]').click();

      // Assert: 
      cy.wait('@chatCrash');
      // UI phải khéo léo báo lỗi và chuyển sang giao diện form tĩnh để hứng Lead
      cy.contains('AI đang bảo trì').should('be.visible');
      cy.get('[data-cy="fallback-static-form"]').should('be.visible');
    });
  });

  describe('Phần 2: Quản lý Inbox (Chủ thẻ)', () => {
    beforeEach(() => {
      // Arrange: Đăng nhập với quyền chủ thẻ và vào Inbox
      cy.setCookie('token', 'owner_token');
      cy.visit('/dashboard/inbox');
    });

    it('TC-02: Đánh dấu tin nhắn đã đọc và giảm số lượng Notification', () => {
      // Arrange: Giả lập gọi API read thành công
      cy.intercept('PUT', `${apiBaseURL}/messages/*/read`, {
        statusCode: 200,
        body: { success: true }
      }).as('readMsg');

      // Kiểm tra trạng thái ban đầu: Tin nhắn chưa đọc (in đậm) và có 1 thông báo
      cy.get('[data-cy="unread-badge"]').should('contain', '1');
      cy.get('[data-cy="msg-item-123"]').should('have.class', 'font-bold');

      // Act: Click xem tin nhắn
      cy.get('[data-cy="msg-item-123"]').click();

      // Assert: Trạng thái UI thay đổi lập tức sau khi gọi API
      cy.wait('@readMsg');
      cy.get('[data-cy="msg-item-123"]').should('not.have.class', 'font-bold'); // Mất in đậm
      cy.get('[data-cy="unread-badge"]').should('not.exist'); // Badge đếm lùi về 0 (ẩn)
    });

    it('TC-03: Xóa tin nhắn thành công', () => {
      // Arrange: Giả lập gọi API xóa thành công
      cy.intercept('DELETE', `${apiBaseURL}/messages/*`, {
        statusCode: 200,
        body: { success: true }
      }).as('deleteMsg');

      // Act: Nhấn icon Xóa và xác nhận trên Modal
      cy.get('[data-cy="btn-delete-msg-123"]').click();
      cy.get('[data-cy="btn-confirm-delete"]').click();

      // Assert: Dòng tin nhắn bị xóa khỏi DOM và hiển thị Toast
      cy.wait('@deleteMsg');
      cy.contains('Đã xóa tin nhắn').should('be.visible');
      cy.get('[data-cy="msg-item-123"]').should('not.exist');
    });
  });
});
