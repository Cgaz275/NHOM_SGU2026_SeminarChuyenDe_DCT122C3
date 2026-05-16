describe('Module 4: Tương tác Chatbot AI (RAG) (Frontend E2E)', () => {
  const apiBaseURL = '**/api/v1/chat';

  beforeEach(() => {
    // Arrange: Reset trạng thái trước mỗi test
    cy.clearCookies();
    cy.clearLocalStorage();
    
    // Giả lập khách hàng đang truy cập vào Public Card
    cy.visit('/cards/test-slug');
    
    // Giả lập thao tác mở cửa sổ chat
    // Tùy theo thiết kế UI, ở đây giả định có nút nổi mở chat popup
    cy.get('[data-cy="btn-open-chat"]').click();
  });

  describe('TC-01 & TC-02: Tương tác Chat cơ bản và Thu thập Lead', () => {
    it('Hiển thị bong bóng chat, hiệu ứng "AI đang gõ" và nhận câu trả lời', () => {
      // Arrange: Giả lập API gọi LLM
      cy.intercept('POST', `${apiBaseURL}/cards/*/chat`, {
        statusCode: 200,
        body: { success: true, data: { reply: 'Tôi có kinh nghiệm làm React 3 năm.' } },
        delay: 1500 // Delay để test kỹ trạng thái Loading của UI
      }).as('chatRequest');

      // Act: Gõ và gửi tin nhắn
      cy.get('[data-cy="chat-input"]').type('Bạn có kinh nghiệm làm React bao lâu rồi?');
      cy.get('[data-cy="btn-send-chat"]').click();

      // Assert:
      // 1. Kiểm tra bong bóng chat của khách hiển thị ngay lập tức
      cy.contains('Bạn có kinh nghiệm làm React bao lâu rồi?').should('be.visible');
      // 2. Kiểm tra hiệu ứng Loading "AI đang gõ..."
      cy.contains('AI đang gõ...').should('be.visible');
      // 3. Đợi API và kiểm tra bong bóng chat của AI
      cy.wait('@chatRequest');
      cy.contains('Tôi có kinh nghiệm làm React 3 năm.').should('be.visible');
      // 4. Loading phải biến mất
      cy.contains('AI đang gõ...').should('not.exist');
    });

    it('Giao diện hiển thị phản hồi thu thập Lead (Số điện thoại)', () => {
      // Arrange: Giả lập API ghi nhận Lead
      cy.intercept('POST', `${apiBaseURL}/cards/*/chat`, {
        statusCode: 200,
        body: { success: true, data: { reply: 'Cảm ơn, số điện thoại của bạn đã được ghi nhận.' } }
      }).as('leadRequest');

      // Act
      cy.get('[data-cy="chat-input"]').type('Số của tôi là 0901234567');
      cy.get('[data-cy="btn-send-chat"]').click();

      // Assert
      cy.wait('@leadRequest');
      cy.contains('Cảm ơn, số điện thoại của bạn đã được ghi nhận.').should('be.visible');
    });
  });

  describe('TC-03: Gửi tin nhắn rỗng (Negative Path)', () => {
    it('Nút Gửi bị vô hiệu hóa khi không có nội dung, không phát sinh API Call', () => {
      // Arrange: Tạo spy để theo dõi xem API có bị gọi lọt không
      cy.intercept('POST', `${apiBaseURL}/cards/*/chat`, cy.spy().as('apiSpy'));

      // Act: Chỉ gõ khoảng trắng
      cy.get('[data-cy="chat-input"]').type('    '); 

      // Assert:
      // Cách 1: Nút Gửi bị disabled
      cy.get('[data-cy="btn-send-chat"]').should('be.disabled');
      
      // Cách 2: Ép click thử và đảm bảo API LLM không hề bị gọi (tiết kiệm chi phí)
      cy.get('[data-cy="btn-send-chat"]').click({ force: true });
      cy.get('@apiSpy').should('not.have.been.called');
    });
  });

  describe('TC-04: Spam Rate Limit (Core Risk)', () => {
    it('Hiển thị thông báo thân thiện khi bị chặn Rate Limit (HTTP 429 từ Backend)', () => {
      // Arrange: Mock thẳng lỗi 429 từ Backend (Giả định khách đang bị spam)
      cy.intercept('POST', `${apiBaseURL}/cards/*/chat`, {
        statusCode: 429,
        body: { success: false, message: 'Too Many Requests' }
      }).as('rateLimitChat');

      // Act
      cy.get('[data-cy="chat-input"]').type('Spam message');
      cy.get('[data-cy="btn-send-chat"]').click();

      // Assert: Khung chat hiện lỗi hoặc Toast báo đỏ
      cy.wait('@rateLimitChat');
      cy.contains('Bạn đã gửi quá nhiều tin nhắn').should('be.visible'); // Hoặc message tùy Dev thiết kế
    });
  });

  describe('TC-05 & TC-06: Hiển thị phản hồi an toàn cho Prompt Injection & Hỏi ngoài lề', () => {
    it('Hiển thị câu trả lời lịch sự từ chối khi khách hỏi ngoài chuyên môn (Hallucination Control)', () => {
      // Arrange: Giả định Backend (Guardrails) đã chặn LLM trả lời tào lao và trả về chuỗi từ chối
      cy.intercept('POST', `${apiBaseURL}/cards/*/chat`, {
        statusCode: 200,
        body: { success: true, data: { reply: 'Tôi chỉ là trợ lý ảo, tôi không có thông tin về vấn đề này.' } }
      }).as('guardrailChat');

      // Act
      cy.get('[data-cy="chat-input"]').type('Giá Bitcoin hôm nay?');
      cy.get('[data-cy="btn-send-chat"]').click();

      // Assert
      cy.wait('@guardrailChat');
      cy.contains('tôi không có thông tin về vấn đề này.').should('be.visible');
    });
  });
});
