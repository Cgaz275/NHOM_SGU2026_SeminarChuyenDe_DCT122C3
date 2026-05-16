describe('Module 3: Cấu hình AI & Nạp tri thức (Frontend E2E)', () => {
  const apiBaseURL = '**/api/v1';

  beforeEach(() => {
    // Arrange: Khôi phục trạng thái ban đầu, giả lập user đã đăng nhập
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.setCookie('token', 'fake-jwt-token');
  });

  describe('TC-01: Cấu hình AI & Knowledge Base thành công (Happy Path)', () => {
    it('Lưu cấu hình AI thành công và hiển thị thông báo', () => {
      // Arrange: Giả lập API lưu cấu hình trả về thành công
      cy.intercept('PUT', `${apiBaseURL}/cards/*/ai-config`, {
        statusCode: 200,
        body: { success: true, message: 'Cấu hình AI thành công' },
        delay: 500 // Giả lập mạng để test UI trạng thái "Đang xử lý..."
      }).as('saveAiConfig');

      // Act: Thao tác điền form Cấu hình AI
      cy.visit('/dashboard/cards/123/ai-config');
      
      cy.get('textarea[name="systemPrompt"]').clear().type('Bạn là trợ lý ảo thân thiện');
      cy.get('select[name="toneOfVoice"]').select('Chuyên nghiệp');
      cy.get('textarea[name="knowledgeBase"]').clear().type('Kỹ năng: React, Node.js. Kinh nghiệm: 3 năm.');
      
      cy.get('[data-cy="btn-save-ai-config"]').click();

      // Assert: Kiểm tra trạng thái xử lý và kết quả
      cy.contains('Đang xử lý...').should('be.visible');
      cy.wait('@saveAiConfig');
      cy.contains('Cấu hình AI thành công').should('be.visible');
      
      // Giả sử có một badge trên UI hiển thị trạng thái AI
      cy.get('[data-cy="ai-status-badge"]').should('contain', 'AI Ready');
    });
  });

  describe('TC-02: Bỏ trống các trường cấu hình quan trọng (Negative Path)', () => {
    it('Chặn submit form và báo lỗi khi để trống System Prompt', () => {
      // Arrange
      cy.visit('/dashboard/cards/123/ai-config');

      // Act: Xóa trắng ô bắt buộc và click lưu
      cy.get('textarea[name="systemPrompt"]').clear();
      cy.get('[data-cy="btn-save-ai-config"]').click();

      // Assert: Form không được submit, hiển thị text lỗi ngay dưới ô nhập liệu
      cy.contains('System Prompt không được để trống').should('be.visible');
      cy.get('textarea[name="systemPrompt"]').should('have.class', 'border-red-500'); // Kiểm tra viền đỏ
    });
  });

  describe('TC-04: Nhập nội dung quá dài vượt Token Limit (Core Risk)', () => {
    it('Hiển thị lỗi và chặn gửi khi nội dung Knowledge Base vượt quá giới hạn', () => {
      // Arrange
      cy.visit('/dashboard/cards/123/ai-config');

      // Act: Giả lập paste một đoạn text cực dài (bằng invoke val để tránh test chạy quá chậm khi gõ)
      const veryLongText = 'A'.repeat(15000); // Vượt giới hạn giả định là 10.000 ký tự
      cy.get('textarea[name="knowledgeBase"]').invoke('val', veryLongText).trigger('input');
      
      cy.get('[data-cy="btn-save-ai-config"]').click();

      // Assert: UI Validation phải chặn lại và cảnh báo
      cy.contains('Nội dung vượt quá giới hạn').should('be.visible');
      // Tùy chọn: Cypress cũng có thể kiểm tra xem API có bị gọi hay không
      // cy.get('@saveAiConfig').should('not.have.been.called');
    });

    it('Hiển thị lỗi từ Backend nếu vượt qua được Frontend Validation (API trả HTTP 413)', () => {
      // Arrange: Cố tình mock API trả lỗi Payload Too Large
      cy.intercept('PUT', `${apiBaseURL}/cards/*/ai-config`, {
        statusCode: 413,
        body: { success: false, message: 'Dữ liệu cấu hình quá lớn (Vượt Token Limit)' }
      }).as('saveAiConfigTooLarge');

      // Act
      cy.visit('/dashboard/cards/123/ai-config');
      cy.get('textarea[name="systemPrompt"]').clear().type('Valid prompt');
      cy.get('[data-cy="btn-save-ai-config"]').click();

      // Assert
      cy.wait('@saveAiConfigTooLarge');
      cy.contains('Dữ liệu cấu hình quá lớn').should('be.visible');
    });
  });
});
