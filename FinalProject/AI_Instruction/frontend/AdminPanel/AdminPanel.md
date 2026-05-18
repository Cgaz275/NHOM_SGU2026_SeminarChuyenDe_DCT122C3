You are a senior frontend engineer and UI/UX designer.

Continue working inside the existing Next.js 15 App Router project.

IMPORTANT:
Use the existing frontend project folder casing. Do not create a duplicated `Frontend` / `FrontEnd` folder.

Do not break existing routes:
- `/u/[username]`
- `/dashboard/profile-builder`
- `/dashboard/ai-twin`
- `/dashboard/qr-manager`
- `/dashboard/inbox`
- `/login`
- `/register`

Task:
Build a polished frontend interface for the “Admin Panel” of a Persona-Based Digital Card platform.

Important language requirement:
All visible UI text must be written in Vietnamese.
The code, component names, variable names, and file names can remain in English, but anything displayed to the user must be Vietnamese.

Route:
Create the admin panel at:
`/admin`

Also support:
- `/admin/users`
- `/admin/reports`

If the user opens `/admin`, redirect or default to `/admin/users`.

Purpose:
Admin Panel is used by administrators to manage user accounts and handle reported users.

Scope:
Only implement these 2 admin features:
1. Quản lý người dùng
2. Quản lý báo cáo

Do NOT implement:
- Analytics dashboard
- AI usage chart
- Platform statistics
- Card management
- Template management
- System settings
- Payment
- Export reports
- Advanced moderation workflow

This is frontend-only for now.
Use mock data and mock API functions only.
Do not connect a real database, backend, authentication, or admin permission system.
Make the UI API-ready for future backend integration.

Visual reference:
Follow the provided reference images closely:
- Dark admin layout.
- Sidebar on the left.
- Large “ADMIN” logo text at top-left.
- Sidebar items:
  - Quản lý người dùng
  - Quản lý báo cáo
- Main content on the right.
- Large rounded dark container.
- Data table with dark blue-gray surface.
- Search box on the top-right.
- Pagination at the bottom.
- Status badges with green/red/gray indicators.
- Admin action buttons in each row.
- Premium dark-tech dashboard style.

Main colors:
- Background: #000000 or #0B0B0B
- Sidebar: #101010
- Card surface: #101010
- Table surface: #121A24 or dark navy gray
- Brand blue: #2367A2
- Electric blue: #008FEA
- Text primary: #FFFFFF
- Text muted: #B7B7B7
- Border: rgba(255,255,255,0.14)
- Success: #2ECC71
- Danger: #E5484D
- Warning: #F5A524
- Disabled: #6B7280

Suggested file structure:
- app/admin/page.tsx
- app/admin/users/page.tsx
- app/admin/reports/page.tsx
- components/admin/AdminLayout.tsx
- components/admin/AdminSidebar.tsx
- components/admin/AdminTable.tsx
- components/admin/AdminSearchBar.tsx
- components/admin/AdminPagination.tsx
- components/admin/UserManagementPage.tsx
- components/admin/ReportManagementPage.tsx
- components/admin/UserStatusBadge.tsx
- components/admin/ReportStatusBadge.tsx
- components/admin/AdminActionButtons.tsx
- components/admin/ConfirmAdminActionModal.tsx
- components/admin/UserDetailModal.tsx
- components/admin/ReportDetailModal.tsx
- components/admin/AdminEmptyState.tsx
- components/admin/AdminLoadingState.tsx
- components/admin/PermissionDeniedState.tsx
- components/ui/Toast.tsx
- lib/mock-admin-api.ts
- types/admin.ts

If `Toast` already exists, reuse it carefully.
Only modify shared components if necessary.
Do not break existing pages.

Admin layout:
Desktop:
- Full screen dark layout.
- Left sidebar width around 220px.
- Main content on the right.
- Main content centered with a max width around 1100px or 1200px.
- Content card should have large rounded corners, subtle border, and soft blue glow.

Mobile:
- Sidebar collapses into a top bar or drawer.
- Tables should become horizontally scrollable.
- Search bar should stack above table.
- Action buttons remain accessible.
- Avoid layout breaking on small screens.

Admin sidebar:
Logo:
“ADMIN”

Menu items:
1. “Quản lý người dùng”
   Route: `/admin/users`

2. “Quản lý báo cáo”
   Route: `/admin/reports`

Active state:
- Highlight active menu item with blue accent.
- Do not show other admin items.

Page 1: User Management

Route:
`/admin/users`

Page title:
“Quản lý người dùng”

Description:
“Xem, tìm kiếm và quản lý trạng thái tài khoản người dùng.”

Toolbar:
- Do NOT add the “Thêm tài khoản mới” button.
- The toolbar should only contain the search input and any minimal layout spacing needed.
- Search input placeholder:
  “Tìm kiếm theo email, tên, trạng thái...”

User table columns:
1. “#”
2. “ID tài khoản”
3. “Tên đầy đủ”
4. “Email”
5. “Ngày đăng ký”
6. “Trạng thái xác thực”
7. “Thao tác quản lý”

User status values:
Only use these 2 statuses:
- “Đã xác thực”
- “Đã khóa”

Do NOT use:
- “Chưa xác thực”

Status visual rules:
- Đã xác thực: green dot / green badge
- Đã khóa: red or gray locked badge

User row actions:
- View detail
  Tooltip / label:
  “Xem chi tiết”
- Lock account
  Tooltip / label:
  “Khóa tài khoản”
- Unlock account
  Tooltip / label:
  “Mở khóa tài khoản”

Important:
Lock/unlock account must show confirmation modal before applying.

Confirm lock modal:
Title:
“Khóa tài khoản?”

Message:
“Tài khoản này sẽ không thể sử dụng các chức năng của hệ thống cho đến khi được mở khóa.”

Buttons:
- “Hủy”
- “Khóa tài khoản”

Confirm unlock modal:
Title:
“Mở khóa tài khoản?”

Message:
“Tài khoản này sẽ có thể sử dụng lại hệ thống.”

Buttons:
- “Hủy”
- “Mở khóa”

After lock success:
Toast:
“Đã khóa tài khoản.”

After unlock success:
Toast:
“Đã mở khóa tài khoản.”

User detail modal:
Title:
“Chi tiết người dùng”

Show only:
- ID tài khoản
- Tên đầy đủ
- Email
- Ngày đăng ký
- Trạng thái xác thực

Do not add advanced profile/card management in this modal.

Search behavior:
- Filter users by:
  - Full name
  - Email
  - Status
- Client-side mock search is fine.

Pagination:
- Show pagination at bottom:
  “Trước”
  page numbers
  “Sau”
- Mock pagination is fine.
- Use page size 7 or 10.

Sorting:
Optional but useful:
- Sort by name
- Sort by registration date
- Sort by status
If implemented, keep simple and client-side only.

Page 2: Report Management

Route:
`/admin/reports`

Page title:
“Quản lý báo cáo”

Description:
“Theo dõi và xử lý các tài khoản bị người khác báo cáo.”

Toolbar:
- Search input placeholder:
  “Tìm kiếm theo email, tên, trạng thái, lý do...”

Report table columns:
1. “#”
2. “ID tài khoản”
3. “Tên đầy đủ”
4. “Email”
5. “Trạng thái xác thực”
6. “Lý do bị báo cáo”
7. “Ngày tạo”
8. “Trạng thái báo cáo”
9. “Thao tác quản lý”

Account status values in reports:
Only use these 2 statuses:
- “Đã xác thực”
- “Đã khóa”

Do NOT use:
- “Chưa xác thực”

Report reasons examples:
- “Quấy rối”
- “Nội dung không phù hợp”
- “Tài khoản giả mạo”
- “Vi phạm điều khoản”
- “Tên tài khoản không hợp lệ”
- “Nội dung bạo lực”

Report status values:
- “Chưa xử lý”
- “Đã xử lý”

Report status visual rules:
- Chưa xử lý: warning/yellow badge
- Đã xử lý: green badge

Report row actions:
- View report detail
  Tooltip / label:
  “Xem chi tiết”
- Resolve report
  Tooltip / label:
  “Đánh dấu đã xử lý”
- Lock/unlock related account
  Tooltip / label:
  “Khóa tài khoản” / “Mở khóa tài khoản”

Report detail modal:
Title:
“Chi tiết báo cáo”

Show:
- ID tài khoản
- Tên đầy đủ
- Email
- Trạng thái xác thực
- Lý do bị báo cáo
- Ngày tạo
- Trạng thái báo cáo

Do not add complex moderation workflow.

Resolve report confirmation modal:
Title:
“Đánh dấu báo cáo đã xử lý?”

Message:
“Báo cáo này sẽ được chuyển sang trạng thái đã xử lý.”

Buttons:
- “Hủy”
- “Xác nhận”

After resolve success:
Toast:
“Báo cáo đã được xử lý.”

Search behavior:
- Filter reports by:
  - Full name
  - Email
  - Account status
  - Report reason
  - Report status
- Client-side mock search is fine.

Pagination:
- Same style as User Management.

States to design:
1. Loading
Text:
“Đang tải dữ liệu...”

2. No data
For users:
“Chưa có người dùng nào.”

For reports:
“Chưa có báo cáo nào.”

3. Permission denied
Text:
“Bạn không có quyền truy cập Admin Panel.”

Subtext:
“Vui lòng đăng nhập bằng tài khoản quản trị viên.”

Button:
“Quay lại”

4. Confirm action
Used for:
- Lock account
- Unlock account
- Resolve report

5. Report resolved
Show status:
“Đã xử lý”

Mock data:
Create realistic mock data.

At least 10 users:
Each user should include:
- id
- accountId
- fullName
- email
- registeredAt
- status

User status must only be:
- verified
- locked

Example users:
1. Alyvia Kelley - a.kelley@gmail.com - Đã xác thực
2. Jaiden Nixon - jaiden.n@gmail.com - Đã xác thực
3. Ace Foley - ace.fo@yahoo.com - Đã khóa
4. Nikolai Schmidt - nikolai.schmidt1964@outlook.com - Đã khóa
5. Clayton Charles - me@clayton.com - Đã xác thực
6. Prince Chen - prince.chen1997@gmail.com - Đã xác thực
7. Mina Tran - mina.tran@gmail.com - Đã xác thực
8. An Nguyen - an.nguyen@gmail.com - Đã xác thực
9. Bao Pham - bao.pham@gmail.com - Đã khóa
10. Linh Vo - linh.vo@gmail.com - Đã xác thực

At least 8 reports:
Each report should include:
- id
- accountId
- fullName
- email
- accountStatus
- reason
- createdAt
- reportStatus

Report accountStatus must only be:
- verified
- locked

Mock API:
Create:
`lib/mock-admin-api.ts`

Export Promise-based functions:
- getAdminUsers()
- getAdminReports()
- getUserById(userId)
- getReportById(reportId)
- lockUser(userId)
- unlockUser(userId)
- resolveReport(reportId)
- checkAdminPermission()

Rules:
- Use artificial delay.
- Return mock success/error responses.
- Keep mock API easy to replace later with real backend calls.
- Do not make the demo unstable with random errors unless fully handled.

Types:
Create:
`types/admin.ts`

Required types:
- AdminUser
- AdminReport
- AdminUserStatus
- AdminReportStatus
- AdminActionType
- AdminActionResponse
- AdminPermissionState

Suggested AdminUser shape:
- id
- accountId
- fullName
- email
- registeredAt
- status

Suggested AdminReport shape:
- id
- accountId
- fullName
- email
- accountStatus
- reason
- createdAt
- reportStatus

Required status enums:
AdminUserStatus:
- verified
- locked

AdminReportStatus:
- pending
- resolved

Important:
Do NOT include `unverified` in AdminUserStatus.
Do NOT render “Chưa xác thực” anywhere in the UI.

Important API-ready architecture:
- Do not hard-code mock data inside deeply nested components.
- Keep mock admin data and mock API functions in `mock-admin-api.ts`.
- Page components should own loading and action state.
- Child components should receive values and callbacks through props.
- Future real API integration should only require replacing mock API functions.

UX requirements:
- All visible UI text must be Vietnamese.
- Tables must be readable and not too cramped.
- Use sticky or clear table headers if useful.
- Use status badges with icons/dots.
- Use clear hover state for table rows.
- Use accessible buttons and labels.
- Use confirmation modals for dangerous actions.
- Use toast feedback for success/error actions.
- Do not show raw technical errors.
- Keep animation subtle.
- Keep the interface clean and limited to the defined scope.

Do not implement:
- Advanced analytics
- AI usage charts
- Platform statistics
- Settings page
- Template management
- Card management
- Payment
- Export CSV/PDF
- Real authentication
- Real backend
- Real database
- Add account feature
- “Thêm tài khoản mới” button
- “Chưa xác thực” user status

Manual verification checklist:
After implementation, I should be able to:
1. Run the dev server.
2. Open `/admin`.
3. Confirm it redirects or defaults to `/admin/users`.
4. Open `/admin/users`.
5. See the dark admin layout with active “Quản lý người dùng” sidebar item.
6. Confirm there is no “Thêm tài khoản mới” button.
7. Confirm user statuses only show “Đã xác thực” and “Đã khóa”.
8. Search users by name, email, and status.
9. View user detail modal.
10. Lock a user with confirmation modal.
11. Unlock a user with confirmation modal.
12. See success toast after lock/unlock.
13. Use pagination.
14. Open `/admin/reports`.
15. See active “Quản lý báo cáo” sidebar item.
16. Confirm report account statuses only show “Đã xác thực” and “Đã khóa”.
17. Search reports by name, email, reason, and status.
18. View report detail modal.
19. Resolve a report with confirmation modal.
20. Lock/unlock related account from report table with confirmation.
21. See “Đã xử lý” status after resolving a report.
22. Confirm loading, no data, and permission denied states exist.
23. Confirm mobile layout works with scrollable tables.