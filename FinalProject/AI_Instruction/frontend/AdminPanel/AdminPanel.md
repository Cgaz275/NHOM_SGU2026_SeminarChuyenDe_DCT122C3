Bạn là một senior frontend engineer và UI/UX designer.

Tiếp tục làm việc bên trong project Next.js 15 App Router hiện có.

QUAN TRỌNG:
Sử dụng đúng casing của thư mục frontend hiện tại trong project. Không tạo thêm thư mục trùng lặp như `Frontend` / `FrontEnd`.

Không được làm hỏng các route hiện có:
- `/u/[username]`
- `/dashboard/profile-builder`
- `/dashboard/ai-twin`
- `/dashboard/qr-manager`
- `/dashboard/inbox`
- `/login`
- `/register`

Nhiệm vụ:
Xây dựng giao diện frontend hoàn chỉnh và chỉn chu cho “Admin Panel” của nền tảng Persona-Based Digital Card.

Yêu cầu ngôn ngữ quan trọng:
Toàn bộ text hiển thị trên UI phải viết bằng tiếng Việt.
Code, tên component, tên biến và tên file có thể giữ tiếng Anh, nhưng bất kỳ nội dung nào người dùng nhìn thấy trên giao diện đều phải là tiếng Việt.

Route:
Tạo admin panel tại:
`/admin`

Đồng thời hỗ trợ các route:
- `/admin/users`
- `/admin/reports`

Nếu người dùng mở `/admin`, hãy redirect hoặc default sang `/admin/users`.

Mục đích:
Admin Panel được dùng bởi quản trị viên để quản lý tài khoản người dùng và xử lý các tài khoản bị báo cáo.

Phạm vi:
Chỉ triển khai đúng 2 chức năng admin sau:
1. Quản lý người dùng
2. Quản lý báo cáo

Không được triển khai:
- Analytics dashboard
- Biểu đồ AI usage
- Thống kê nền tảng
- Quản lý card
- Quản lý template
- Cài đặt hệ thống
- Thanh toán
- Export reports
- Quy trình kiểm duyệt nâng cao

Hiện tại chỉ làm frontend-only.
Sử dụng mock data và mock API functions.
Không kết nối database thật, backend thật, authentication thật hoặc hệ thống phân quyền admin thật.
Thiết kế UI theo hướng API-ready để dễ thay mock API bằng backend thật trong tương lai.

Tham chiếu giao diện:
Bám sát các ảnh reference đã cung cấp:
- Layout admin nền tối.
- Sidebar nằm bên trái.
- Logo chữ lớn “ADMIN” ở góc trên bên trái.
- Sidebar chỉ có các item:
  - Quản lý người dùng
  - Quản lý báo cáo
- Nội dung chính nằm bên phải.
- Container chính bo góc lớn, nền tối.
- Bảng dữ liệu có surface màu dark blue-gray.
- Ô tìm kiếm nằm phía trên bên phải.
- Pagination nằm phía dưới.
- Status badge có indicator màu xanh lá / đỏ / xám.
- Mỗi row có các nút thao tác admin.
- Tổng thể theo phong cách premium dark-tech dashboard.

Màu chủ đạo:
- Background: `#000000` hoặc `#0B0B0B`
- Sidebar: `#101010`
- Card surface: `#101010`
- Table surface: `#121A24` hoặc dark navy gray
- Brand blue: `#2367A2`
- Electric blue: `#008FEA`
- Text primary: `#FFFFFF`
- Text muted: `#B7B7B7`
- Border: `rgba(255,255,255,0.14)`
- Success: `#2ECC71`
- Danger: `#E5484D`
- Warning: `#F5A524`
- Disabled: `#6B7280`

Cấu trúc file đề xuất:
- `app/admin/page.tsx`
- `app/admin/users/page.tsx`
- `app/admin/reports/page.tsx`
- `components/admin/AdminLayout.tsx`
- `components/admin/AdminSidebar.tsx`
- `components/admin/AdminTable.tsx`
- `components/admin/AdminSearchBar.tsx`
- `components/admin/AdminPagination.tsx`
- `components/admin/UserManagementPage.tsx`
- `components/admin/ReportManagementPage.tsx`
- `components/admin/UserStatusBadge.tsx`
- `components/admin/ReportStatusBadge.tsx`
- `components/admin/AdminActionButtons.tsx`
- `components/admin/ConfirmAdminActionModal.tsx`
- `components/admin/UserDetailModal.tsx`
- `components/admin/ReportDetailModal.tsx`
- `components/admin/AdminEmptyState.tsx`
- `components/admin/AdminLoadingState.tsx`
- `components/admin/PermissionDeniedState.tsx`
- `components/ui/Toast.tsx`
- `lib/mock-admin-api.ts`
- `types/admin.ts`

Nếu `Toast` đã tồn tại, hãy tái sử dụng cẩn thận.
Chỉ chỉnh shared components khi thật sự cần thiết.
Không được làm hỏng các page hiện có.

Admin layout:

Desktop:
- Full screen dark layout.
- Sidebar bên trái, width khoảng `220px`.
- Main content nằm bên phải.
- Main content căn giữa với max width khoảng `1100px` hoặc `1200px`.
- Content card cần bo góc lớn, border nhẹ và có soft blue glow.

Mobile:
- Sidebar collapse thành top bar hoặc drawer.
- Table phải có horizontal scroll.
- Search bar nên stack phía trên table.
- Các nút thao tác vẫn phải dễ bấm.
- Tránh layout bị vỡ trên màn hình nhỏ.

Admin sidebar:

Logo:
“ADMIN”

Menu items:
1. “Quản lý người dùng”
   Route: `/admin/users`

2. “Quản lý báo cáo”
   Route: `/admin/reports`

Active state:
- Highlight item đang active bằng blue accent.
- Không hiển thị thêm bất kỳ admin item nào khác.

Trang 1: User Management

Route:
`/admin/users`

Page title:
“Quản lý người dùng”

Description:
“Xem, tìm kiếm và quản lý trạng thái tài khoản người dùng.”

Toolbar:
- Không thêm button “Thêm tài khoản mới”.
- Toolbar chỉ chứa search input và phần spacing/layout tối thiểu nếu cần.
- Placeholder của search input:
  “Tìm kiếm theo email, tên, trạng thái...”

Các cột trong user table:
1. “#”
2. “ID tài khoản”
3. “Tên đầy đủ”
4. “Email”
5. “Ngày đăng ký”
6. “Trạng thái xác thực”
7. “Thao tác quản lý”

User status values:
Chỉ sử dụng đúng 2 trạng thái:
- “Đã xác thực”
- “Đã khóa”

Không được dùng:
- “Chưa xác thực”

Quy tắc hiển thị status:
- Đã xác thực: green dot / green badge
- Đã khóa: red hoặc gray locked badge

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

Quan trọng:
Lock/unlock account phải hiển thị confirmation modal trước khi áp dụng thay đổi.

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

Sau khi lock thành công:
Toast:
“Đã khóa tài khoản.”

Sau khi unlock thành công:
Toast:
“Đã mở khóa tài khoản.”

User detail modal:
Title:
“Chi tiết người dùng”

Chỉ hiển thị:
- ID tài khoản
- Tên đầy đủ
- Email
- Ngày đăng ký
- Trạng thái xác thực

Không thêm quản lý profile/card nâng cao trong modal này.

Search behavior:
- Filter users theo:
  - Full name
  - Email
  - Status
- Client-side mock search là đủ.

Pagination:
- Hiển thị pagination phía dưới:
  “Trước”
  page numbers
  “Sau”
- Mock pagination là đủ.
- Dùng page size 7 hoặc 10.

Sorting:
Optional nhưng hữu ích:
- Sort theo name
- Sort theo registration date
- Sort theo status
Nếu triển khai sorting, giữ đơn giản và client-side only.

Trang 2: Report Management

Route:
`/admin/reports`

Page title:
“Quản lý báo cáo”

Description:
“Theo dõi và xử lý các tài khoản bị người khác báo cáo.”

Toolbar:
- Placeholder của search input:
  “Tìm kiếm theo email, tên, trạng thái, lý do...”

Các cột trong report table:
1. “#”
2. “ID tài khoản”
3. “Tên đầy đủ”
4. “Email”
5. “Trạng thái xác thực”
6. “Lý do bị báo cáo”
7. “Ngày tạo”
8. “Trạng thái báo cáo”
9. “Thao tác quản lý”

Account status values trong reports:
Chỉ dùng đúng 2 trạng thái:
- “Đã xác thực”
- “Đã khóa”

Không được dùng:
- “Chưa xác thực”

Ví dụ report reasons:
- “Quấy rối”
- “Nội dung không phù hợp”
- “Tài khoản giả mạo”
- “Vi phạm điều khoản”
- “Tên tài khoản không hợp lệ”
- “Nội dung bạo lực”

Report status values:
- “Chưa xử lý”
- “Đã xử lý”

Quy tắc hiển thị report status:
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

Hiển thị:
- ID tài khoản
- Tên đầy đủ
- Email
- Trạng thái xác thực
- Lý do bị báo cáo
- Ngày tạo
- Trạng thái báo cáo

Không thêm workflow kiểm duyệt phức tạp.

Resolve report confirmation modal:
Title:
“Đánh dấu báo cáo đã xử lý?”

Message:
“Báo cáo này sẽ được chuyển sang trạng thái đã xử lý.”

Buttons:
- “Hủy”
- “Xác nhận”

Sau khi resolve thành công:
Toast:
“Báo cáo đã được xử lý.”

Search behavior:
- Filter reports theo:
  - Full name
  - Email
  - Account status
  - Report reason
  - Report status
- Client-side mock search là đủ.

Pagination:
- Cùng style với User Management.

Các state cần thiết kế:

1. Loading
Text:
“Đang tải dữ liệu...”

2. No data
Đối với users:
“Chưa có người dùng nào.”

Đối với reports:
“Chưa có báo cáo nào.”

3. Permission denied
Text:
“Bạn không có quyền truy cập Admin Panel.”

Subtext:
“Vui lòng đăng nhập bằng tài khoản quản trị viên.”

Button:
“Quay lại”

4. Confirm action
Dùng cho:
- Lock account
- Unlock account
- Resolve report

5. Report resolved
Hiển thị status:
“Đã xử lý”

Mock data:
Tạo mock data thực tế.

Ít nhất 10 users:
Mỗi user cần có:
- `id`
- `accountId`
- `fullName`
- `email`
- `registeredAt`
- `status`

User status chỉ được là:
- `verified`
- `locked`

Ví dụ users:
1. Alyvia Kelley - `a.kelley@gmail.com` - Đã xác thực
2. Jaiden Nixon - `jaiden.n@gmail.com` - Đã xác thực
3. Ace Foley - `ace.fo@yahoo.com` - Đã khóa
4. Nikolai Schmidt - `nikolai.schmidt1964@outlook.com` - Đã khóa
5. Clayton Charles - `me@clayton.com` - Đã xác thực
6. Prince Chen - `prince.chen1997@gmail.com` - Đã xác thực
7. Mina Tran - `mina.tran@gmail.com` - Đã xác thực
8. An Nguyen - `an.nguyen@gmail.com` - Đã xác thực
9. Bao Pham - `bao.pham@gmail.com` - Đã khóa
10. Linh Vo - `linh.vo@gmail.com` - Đã xác thực

Ít nhất 8 reports:
Mỗi report cần có:
- `id`
- `accountId`
- `fullName`
- `email`
- `accountStatus`
- `reason`
- `createdAt`
- `reportStatus`

Report `accountStatus` chỉ được là:
- `verified`
- `locked`

Mock API:
Tạo file:
`lib/mock-admin-api.ts`

Export các Promise-based functions:
- `getAdminUsers()`
- `getAdminReports()`
- `getUserById(userId)`
- `getReportById(reportId)`
- `lockUser(userId)`
- `unlockUser(userId)`
- `resolveReport(reportId)`
- `checkAdminPermission()`

Rules:
- Dùng artificial delay.
- Return mock success/error responses.
- Giữ mock API dễ thay thế bằng backend thật sau này.
- Không làm demo bất ổn bằng random errors, trừ khi đã handle đầy đủ.

Types:
Tạo file:
`types/admin.ts`

Required types:
- `AdminUser`
- `AdminReport`
- `AdminUserStatus`
- `AdminReportStatus`
- `AdminActionType`
- `AdminActionResponse`
- `AdminPermissionState`

Suggested `AdminUser` shape:
- `id`
- `accountId`
- `fullName`
- `email`
- `registeredAt`
- `status`

Suggested `AdminReport` shape:
- `id`
- `accountId`
- `fullName`
- `email`
- `accountStatus`
- `reason`
- `createdAt`
- `reportStatus`

Required status enums:

`AdminUserStatus`:
- `verified`
- `locked`

`AdminReportStatus`:
- `pending`
- `resolved`

Quan trọng:
Không thêm `unverified` vào `AdminUserStatus`.
Không render chữ “Chưa xác thực” ở bất kỳ đâu trên UI.

Kiến trúc API-ready quan trọng:
- Không hard-code mock data trong các component con nằm sâu.
- Tách mock admin data và mock API functions trong `mock-admin-api.ts`.
- Page components chịu trách nhiệm quản lý loading state và action state.
- Child components nhận values và callbacks thông qua props.
- Khi tích hợp API thật trong tương lai, chỉ cần thay các mock API functions.

UX requirements:
- Toàn bộ text hiển thị trên UI phải là tiếng Việt.
- Table phải dễ đọc, không quá chật.
- Có thể dùng sticky hoặc clear table headers nếu hữu ích.
- Dùng status badges kèm icons/dots.
- Có hover state rõ ràng cho table rows.
- Buttons và labels cần accessible.
- Dùng confirmation modals cho các action nguy hiểm.
- Dùng toast feedback cho success/error actions.
- Không hiển thị raw technical errors cho người dùng.
- Animation nhẹ, không lạm dụng.
- Giao diện sạch, gọn và chỉ giới hạn trong đúng scope đã định nghĩa.

Không được triển khai:
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
- Button “Thêm tài khoản mới”
- User status “Chưa xác thực”

Manual verification checklist:
Sau khi triển khai, tôi phải có thể:
1. Chạy dev server.
2. Mở `/admin`.
3. Xác nhận route này redirect hoặc default sang `/admin/users`.
4. Mở `/admin/users`.
5. Thấy dark admin layout với sidebar item “Quản lý người dùng” đang active.
6. Xác nhận không có button “Thêm tài khoản mới”.
7. Xác nhận user statuses chỉ hiển thị “Đã xác thực” và “Đã khóa”.
8. Search users theo tên, email và trạng thái.
9. Xem user detail modal.
10. Khóa user bằng confirmation modal.
11. Mở khóa user bằng confirmation modal.
12. Thấy success toast sau khi lock/unlock.
13. Dùng được pagination.
14. Mở `/admin/reports`.
15. Thấy sidebar item “Quản lý báo cáo” đang active.
16. Xác nhận report account statuses chỉ hiển thị “Đã xác thực” và “Đã khóa”.
17. Search reports theo tên, email, lý do và trạng thái.
18. Xem report detail modal.
19. Resolve report bằng confirmation modal.
20. Lock/unlock related account từ report table bằng confirmation modal.
21. Thấy status “Đã xử lý” sau khi resolve report.
22. Xác nhận có loading, no data và permission denied states.
23. Xác nhận mobile layout hoạt động tốt với scrollable tables.
