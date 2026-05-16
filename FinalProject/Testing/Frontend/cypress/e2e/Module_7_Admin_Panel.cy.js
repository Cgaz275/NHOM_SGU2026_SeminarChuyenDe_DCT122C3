describe('Module 7: Quản trị (Admin Panel) (Frontend E2E)', () => {
  const apiBaseURL = '**/api/v1';

  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  describe('TC-05: Kiểm tra Lỗ hổng phân quyền trên Giao diện (Core Risk)', () => {
    it('Người dùng thông thường KHÔNG BAO GIỜ được thấy Menu Admin hoặc truy cập trang Admin', () => {
      // Arrange: Đăng nhập bằng tài khoản User thường
      cy.setCookie('token', 'user_token');
      cy.setCookie('role', 'user');
      cy.visit('/dashboard');

      // Assert 1: Menu Admin phải bị ẩn hoàn toàn khỏi DOM
      cy.get('[data-cy="nav-admin-panel"]').should('not.exist');

      // Assert 2: Thử truy cập lén qua thanh địa chỉ URL
      cy.visit('/admin/users', { failOnStatusCode: false });
      
      // Kì vọng UI sẽ redirect bật ra ngoài (về Home) hoặc hiển thị trang báo lỗi 403 Không có quyền
      cy.url().should('not.include', '/admin');
    });
  });

  describe('Thao tác của Quản trị viên (Admin)', () => {
    beforeEach(() => {
      // Arrange: Đăng nhập đúng với quyền Admin
      cy.setCookie('token', 'admin_token');
      cy.setCookie('role', 'admin');
    });

    it('TC-01: Xem danh sách và Tìm kiếm Người dùng (Debounce Search)', () => {
      // Arrange: Mock API lấy danh sách
      cy.intercept('GET', `${apiBaseURL}/users*`, {
        statusCode: 200,
        body: { 
          success: true, 
          data: [{ id: 'user123', name: 'Nguyen Van A', email: 'a@gmail.com', status: 'active' }] 
        }
      }).as('getUsers');

      cy.visit('/admin/users');

      // Assert bảng hiển thị
      cy.wait('@getUsers');
      cy.contains('Nguyen Van A').should('be.visible');

      // Act: Nhập từ khóa tìm kiếm
      cy.get('[data-cy="search-user-input"]').type('Nguyen');
      
      // Assert: Đảm bảo có gọi API tìm kiếm với query
      cy.wait('@getUsers');
    });

    it('TC-02: Khóa tài khoản User thành công và thay đổi UI lập tức', () => {
      // Arrange: Mock API khóa tài khoản
      cy.intercept('PUT', `${apiBaseURL}/users/*/status`, {
        statusCode: 200,
        body: { success: true, message: 'Khóa tài khoản thành công' }
      }).as('banUser');

      cy.visit('/admin/users');

      // Act: Bấm nút khóa (Banned)
      cy.get('[data-cy="btn-ban-user123"]').click();
      cy.get('[data-cy="btn-confirm-ban"]').click(); // Bấm xác nhận trên Modal

      // Assert: Xác nhận API gọi thành công và hiển thị Toast Message
      cy.wait('@banUser');
      cy.contains('Khóa tài khoản thành công').should('be.visible');
    });

    it('TC-03: Xử lý Báo cáo vi phạm (Resolve Report)', () => {
      // Arrange: Mock API xử lý báo cáo
      cy.intercept('PUT', `${apiBaseURL}/reports/*/resolve`, {
        statusCode: 200,
        body: { success: true, message: 'Đã xử lý báo cáo thành công' }
      }).as('resolveReport');

      cy.visit('/admin/reports');

      // Act: Admin xem báo cáo và đưa ra hình phạt
      cy.get('[data-cy="btn-resolve-rep123"]').click();
      
      // Chọn thời hạn khóa từ Dropdown
      cy.get('select[data-cy="ban-duration-select"]').select('1_month');
      cy.get('[data-cy="btn-confirm-resolve"]').click();

      // Assert
      cy.wait('@resolveReport');
      cy.contains('xử lý báo cáo thành công').should('be.visible');
    });
  });
});
