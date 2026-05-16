describe('Module 6: Human Takeover (Frontend E2E)', () => {
  const apiBaseURL = '**/api/v1';

  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  describe('Phần 1: Thao tác của Chủ thẻ (Dashboard Inbox)', () => {
    beforeEach(() => {
      // Giả lập chủ thẻ đăng nhập thành công
      cy.setCookie('token', 'owner_token');
      cy.visit('/dashboard/inbox/card123'); // Truy cập thẳng vào hộp thoại của thẻ 123
    });

    it('TC-01: Bật chế độ Tiếp quản thành công (Happy Path)', () => {
      // Arrange: Mock API báo chuyển trạng thái thành công
      cy.intercept('PUT', `${apiBaseURL}/cards/*/takeover`, {
        statusCode: 200,
        body: { success: true, data: { isAiPaused: true } }
      }).as('takeoverChat');

      // Act: Chủ thẻ bấm nút Tiếp quản
      cy.get('[data-cy="btn-takeover"]').click();

      // Assert: Giao diện phải thay đổi lập tức
      cy.wait('@takeoverChat');
      cy.contains('Đang tiếp quản').should('be.visible'); // Đổi nhãn nút
      cy.get('[data-cy="owner-chat-input"]').should('not.be.disabled'); // Mở khóa ô chat
    });

    it('TC-03: Tắt chế độ Tiếp quản, trao quyền lại cho AI', () => {
      // Arrange: Giả định trạng thái ban đầu là Đang tiếp quản
      cy.intercept('PUT', `${apiBaseURL}/cards/*/takeover`, {
        statusCode: 200,
        body: { success: true, data: { isAiPaused: false } }
      }).as('releaseAi');

      // Act: Bấm nút trao quyền lại
      cy.get('[data-cy="btn-release-ai"]').click();

      // Assert
      cy.wait('@releaseAi');
      cy.contains('Nhường quyền cho AI').should('be.visible');
    });
  });

  describe('Phần 2: Trải nghiệm của Khách hàng (Public Card)', () => {
    beforeEach(() => {
      cy.visit('/cards/test-slug');
      cy.get('[data-cy="btn-open-chat"]').click();
    });

    it('TC-02: Chat Realtime - Hiển thị tin nhắn và avatar của người thật', () => {
      // Arrange: Giả lập việc Client Polling hoặc nhận tin nhắn Socket từ Chủ thẻ
      cy.intercept('GET', `${apiBaseURL}/messages/cards/*`, {
        statusCode: 200,
        body: { 
          success: true, 
          data: [
            { senderRole: 'owner', content: 'Chào bạn, tôi là Admin', createdAt: new Date() }
          ] 
        }
      }).as('syncMessages');

      // Assert: Giao diện phải nhận biết được đây là tin nhắn của người thật
      cy.wait('@syncMessages');
      cy.contains('Chào bạn, tôi là Admin').should('be.visible');
      // Đảm bảo đổi UI: Ẩn avatar AI Robot, hiện Avatar của Admin/Chủ thẻ
      cy.get('[data-cy="avatar-human-admin"]').should('be.visible');
    });

    it('TC-05: Giao diện Khách hàng xử lý êm mượt khi bị ngắt AI (Race Condition)', () => {
      // Arrange: Giả lập vừa nhắn thì AI bị Pause
      cy.intercept('POST', `${apiBaseURL}/chat/cards/*/chat`, {
        statusCode: 403,
        body: { success: false, message: 'Tính năng AI đang bị tạm dừng bởi chủ thẻ.' }
      }).as('chatPaused');

      // Act
      cy.get('[data-cy="chat-input"]').type('Alo');
      cy.get('[data-cy="btn-send-chat"]').click();

      // Assert: Không báo lỗi đỏ, mà hiển thị thông báo "Chủ thẻ đang tham gia"
      cy.wait('@chatPaused');
      cy.contains('Chủ thẻ đang tham gia trò chuyện cùng bạn').should('be.visible');
    });
  });
});
