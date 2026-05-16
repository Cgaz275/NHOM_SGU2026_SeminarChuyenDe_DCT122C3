describe('Module 2: Quản lý Thẻ & Profile Builder (Frontend E2E)', () => {
  const apiBaseURL = '**/api/v1';

  beforeEach(() => {
    // Arrange: Xóa trạng thái và set một token giả để test các màn hình yêu cầu Auth
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  describe('TC-01: Tạo & Cập nhật Profile (Happy Path)', () => {
    it('Cập nhật thông tin thẻ thành công và hiển thị Preview ngay lập tức', () => {
      // Arrange: Giả lập API gọi cập nhật thẻ
      cy.setCookie('token', 'fake-jwt-token');
      cy.intercept('PUT', `${apiBaseURL}/cards/*`, {
        statusCode: 200,
        body: {
          success: true,
          data: { bio: 'New Bio', facebook: 'https://fb.com/test' },
          message: 'Cập nhật thành công'
        },
        delay: 500 // Giả lập mạng chậm một chút để test UI trạng thái "Đang lưu..."
      }).as('updateCard');

      // Act: Thao tác giao diện cập nhật form
      cy.visit('/dashboard/cards/edit/123'); // Giả lập URL có ID thẻ
      cy.get('textarea[name="bio"]').clear().type('New Bio');
      cy.get('input[name="facebook"]').clear().type('https://fb.com/test');
      cy.get('[data-cy="btn-save-profile"]').click();

      // Assert: Kiểm tra trạng thái loading và kết quả UI
      cy.contains('Đang lưu...').should('be.visible');
      cy.wait('@updateCard');
      cy.contains('Cập nhật thành công').should('be.visible'); // Kiểm tra Toast message
      cy.get('[data-cy="card-preview-bio"]').should('contain', 'New Bio'); // Preview update
    });
  });

  describe('TC-02 & TC-03: Tải xuống VCF và QR Code', () => {
    it('Tải xuống file VCF thành công khi nhấn Lưu Danh Bạ', () => {
      // Arrange: MOCK API lấy thông tin trang Public Card
      cy.intercept('GET', `${apiBaseURL}/cards/test-slug`, {
        statusCode: 200,
        body: { success: true, data: { name: 'Test User', phoneNumber: '0123456789' } }
      }).as('getCard');

      // Act: Truy cập thẻ public
      cy.visit('/cards/test-slug');
      cy.wait('@getCard');

      // Assert: Cypress không thực sự tải file về máy dễ dàng, 
      // ta kiểm tra nút bấm có thuộc tính sinh ra blob href hoặc download chuẩn.
      cy.get('[data-cy="btn-save-vcf"]').should('have.attr', 'href').and('include', 'blob:');
    });

    it('Tải ảnh QR Code thành công', () => {
      cy.setCookie('token', 'fake-jwt-token');
      cy.visit('/dashboard/cards/123/qr');
      
      // Kiểm tra thẻ canvas render QR Code và nút Tải xuống có thuộc tính download
      cy.get('[data-cy="qr-canvas"]').should('be.visible');
      cy.get('[data-cy="btn-download-qr"]').should('have.attr', 'download');
    });
  });

  describe('TC-04: Cập nhật URL mạng xã hội sai định dạng (Negative Path)', () => {
    it('Ngăn submit form và hiện lỗi đỏ khi nhập sai link mạng xã hội', () => {
      // Arrange
      cy.setCookie('token', 'fake-jwt-token');
      cy.visit('/dashboard/cards/edit/123');

      // Act
      cy.get('input[name="facebook"]').clear().type('not-a-valid-link');
      cy.get('[data-cy="btn-save-profile"]').click();

      // Assert: Báo lỗi phía dưới ô input, không gọi API 
      cy.contains('Đường dẫn không hợp lệ').should('be.visible');
      cy.get('input[name="facebook"]').should('have.class', 'border-red-500'); // Viền ô input đổi màu đỏ
    });
  });

  describe('TC-05: Rò rỉ thông tin cá nhân (Privacy Leak)', () => {
    it('Không render Số điện thoại/Email khi JSON trả về null do đã ẩn', () => {
      // Arrange: Giả lập Backend trả về cục JSON đã omit (ẩn) email và sđt (Rủi ro cốt lõi)
      cy.intercept('GET', `${apiBaseURL}/cards/hidden-slug`, {
        statusCode: 200,
        body: {
          success: true,
          data: {
            name: 'Privacy User',
            phoneNumber: null, // Test bắt buộc JSON không chứa data này
            email: null
          }
        }
      }).as('getHiddenCard');

      // Act
      cy.visit('/cards/hidden-slug');
      cy.wait('@getHiddenCard');

      // Assert: Giao diện không được hiển thị nút/icon liên lạc
      cy.get('[data-cy="contact-phone"]').should('not.exist');
      cy.get('[data-cy="contact-email"]').should('not.exist');
    });
  });

  describe('TC-06: Truy cập Thẻ bị khóa / Đã xóa', () => {
    it('Hiển thị màn hình 404 khi nhận lỗi 404 từ Backend', () => {
      // Arrange: API trả 404 Not Found
      cy.intercept('GET', `${apiBaseURL}/cards/deleted-slug`, {
        statusCode: 404,
        body: { success: false, message: 'Thẻ này không tồn tại hoặc đã bị xóa' }
      }).as('getDeletedCard');

      // Act
      cy.visit('/cards/deleted-slug');
      cy.wait('@getDeletedCard');

      // Assert: Chuyển sang UI Custom 404
      cy.contains('Thẻ này không tồn tại hoặc đã bị xóa').should('be.visible');
    });

    it('Hiển thị màn hình Bị Khóa khi nhận lỗi 403 từ Backend', () => {
      // Arrange: API trả 403 Forbidden
      cy.intercept('GET', `${apiBaseURL}/cards/banned-slug`, {
        statusCode: 403,
        body: { success: false, message: 'Thẻ đã bị khóa do vi phạm' }
      }).as('getBannedCard');

      // Act
      cy.visit('/cards/banned-slug');
      cy.wait('@getBannedCard');

      // Assert: Chuyển sang UI Cảnh báo khóa thẻ
      cy.contains('Thẻ đã bị khóa do vi phạm').should('be.visible');
    });
  });
});
