describe('Module 1: Xác thực & Người dùng (Frontend E2E)', () => {
  const apiBaseURL = '**/api/v1';

  beforeEach(() => {
    // Arrange: Khôi phục trạng thái ban đầu trước mỗi test (Xóa cookies, storage)
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  describe('TC-01 & TC-02: Đăng nhập thành công', () => {
    it('Đăng nhập bằng Google thành công và chuyển hướng tới Dashboard', () => {
      // Arrange: Giả lập (Mock) API trả về thành công kèm JWT token
      cy.intercept('POST', `${apiBaseURL}/auth/login`, {
        statusCode: 200,
        body: {
          success: true,
          data: {
            token: 'fake-jwt-token',
            user: { name: 'Test User', email: 'test@example.com' }
          }
        }
      }).as('loginSuccess');

      // Act: Truy cập trang đăng nhập và thao tác
      cy.visit('/login');
      
      // Giả lập thao tác bấm nút "Đăng nhập với Google"
      // Chú ý: Vì không thể thao tác popup Google thực tế trong Cypress, ta sẽ click nút trigger logic gọi API.
      cy.get('[data-cy="btn-google-login"]').click();

      // Assert: Kiểm tra gọi API và UI chuyển hướng
      cy.wait('@loginSuccess');
      cy.url().should('include', '/dashboard');
      cy.contains('Đăng nhập thành công').should('be.visible');
    });

    it('Gửi Magic Link thành công', () => {
      // Arrange: Giả lập API gửi link
      cy.intercept('POST', `${apiBaseURL}/auth/magic-link`, {
        statusCode: 200,
        body: { success: true, message: 'Link đăng nhập đã được gửi' }
      }).as('magicLinkSuccess');

      // Act: Nhập email và nhấn nút
      cy.visit('/login');
      cy.get('input[name="email"]').type('test@example.com');
      cy.get('[data-cy="btn-magic-link"]').click();

      // Assert: UI hiển thị thông báo
      cy.wait('@magicLinkSuccess');
      cy.contains('Link đăng nhập đã được gửi').should('be.visible');
    });
  });

  describe('TC-03: Nhập sai định dạng Email', () => {
    it('Hiển thị lỗi validation khi nhập sai định dạng email', () => {
      // Arrange: Truy cập trang login
      cy.visit('/login');

      // Act: Nhập sai định dạng và click gửi
      cy.get('input[name="email"]').type('invalid_email_format');
      cy.get('[data-cy="btn-magic-link"]').click();

      // Assert: UI hiển thị lỗi mà không gọi API
      cy.contains('Email không đúng định dạng').should('be.visible');
    });
  });

  describe('TC-04 & TC-05: Chặn truy cập Route bảo vệ', () => {
    it('Redirect về trang Đăng nhập khi truy cập Dashboard mà không có token', () => {
      // Act: Truy cập trực tiếp trang dashboard (Protected Route)
      cy.visit('/dashboard');

      // Assert: Bị đẩy về trang login
      cy.url().should('include', '/login');
    });

    it('Redirect về Login khi API báo lỗi 401 Unauthorized', () => {
      // Arrange: Đã có token giả mạo, giả lập API gọi lấy profile bị 401
      cy.setCookie('token', 'invalid_token');
      cy.intercept('GET', `${apiBaseURL}/users/me`, {
        statusCode: 401,
        body: { success: false, message: 'Token hết hạn' }
      }).as('unauthorizedCall');

      // Act: Cố gắng truy cập Dashboard
      cy.visit('/dashboard');

      // Assert: Chuyển hướng về đăng nhập và xóa cookie
      cy.wait('@unauthorizedCall');
      cy.url().should('include', '/login');
      cy.getCookie('token').should('not.exist');
    });
  });

  describe('TC-06: Firebase Timeout (Edge Case)', () => {
    it('Hiển thị thông báo lỗi thân thiện khi API quá tải (Timeout/503)', () => {
      // Arrange: Giả lập API chết hoặc trả về 503, thêm delay để test trạng thái Loading
      cy.intercept('POST', `${apiBaseURL}/auth/login`, {
        statusCode: 503,
        body: { success: false, message: 'Hệ thống xác thực đang quá tải, vui lòng thử lại sau' },
        delay: 2000 // Giả lập mạng chậm 2 giây
      }).as('loginTimeout');

      // Act: Nhấn đăng nhập
      cy.visit('/login');
      cy.get('[data-cy="btn-google-login"]').click();

      // Assert: Đảm bảo UI hiện trạng thái Loading sau đó báo lỗi mà không bị crash
      cy.contains('Đang xử lý').should('be.visible'); // Kiểm tra text nút chuyển sang Loading
      cy.wait('@loginTimeout');
      cy.contains('Hệ thống xác thực đang quá tải').should('be.visible');
    });
  });
});
