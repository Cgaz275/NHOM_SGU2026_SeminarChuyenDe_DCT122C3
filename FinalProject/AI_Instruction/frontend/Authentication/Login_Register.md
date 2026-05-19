Bạn là một senior frontend engineer và UI/UX designer.

Tiếp tục làm việc bên trong dự án Next.js 15 App Router hiện có.

IMPORTANT:
Sử dụng đúng kiểu viết hoa/thường của folder frontend hiện tại. Không tạo thêm folder trùng lặp như `Frontend` / `FrontEnd`.

Không được làm hỏng các route hiện có:
- `/u/[username]`
- `/dashboard/profile-builder`
- `/dashboard/ai-twin`

Task:
Xây dựng trang Login và Register hoàn chỉnh, chỉn chu cho nền tảng Persona-Based Digital Card.

Important language requirement:
Toàn bộ text hiển thị trên UI phải được viết bằng tiếng Việt.
Code, tên component, tên biến và tên file có thể giữ tiếng Anh, nhưng mọi nội dung hiển thị cho người dùng phải là tiếng Việt.

Image asset:
Sử dụng ảnh này cho phần minh họa AI bên trái:
`/login/ai.jpg`

File thực tế nằm tại:
`frontend/public/login/ai.jpg`

Sử dụng đường dẫn ảnh của Next.js:
`/login/ai.jpg`

Không sử dụng URL ảnh bên ngoài.

Routes:
Tạo các route sau:
- `/login`
- `/register`

Suggested file structure:
- app/login/page.tsx
- app/register/page.tsx
- components/auth/AuthLayout.tsx
- components/auth/LoginForm.tsx
- components/auth/RegisterForm.tsx
- components/auth/AuthHero.tsx
- components/auth/GoogleButton.tsx
- components/ui/Toast.tsx nếu cần
- lib/mock-auth-api.ts
- types/auth.ts

Purpose:
Trang login/register cho phép chủ sở hữu digital card truy cập dashboard để quản lý thẻ cá nhân số và AI Digital Twin của họ.

Hiện tại chỉ làm frontend-only.
Sử dụng mock authentication behavior.
Không kết nối authentication thật, Google OAuth thật, database, backend hoặc session storage ở giai đoạn này.
Thiết kế cấu trúc API-ready để sau này có thể thay mock auth service bằng API thật.

Visual reference:
Bám sát các hình ảnh tham khảo đã cung cấp.

Layout:
Desktop:
- Giao diện dark layout toàn màn hình.
- Thiết kế 2 cột.
- Cột trái:
  - Headline lớn, viết hoa.
  - Đoạn mô tả ngắn.
  - Ảnh minh họa AI.
- Cột phải:
  - Auth card được căn giữa.
  - Card tối màu, bo góc.
  - Có hiệu ứng blue outer glow.
  - Có các form fields.
  - Nút CTA chính màu xanh.
  - Các link phụ.
  - Nút đăng nhập bằng Google trên trang Login.
- Giữ spacing rộng rãi và phong cách dark-tech cao cấp.

Mobile:
- Layout một cột.
- Hero text có thể được rút gọn hoặc xếp phía trên form.
- Ảnh AI có thể nhỏ hơn hoặc ẩn đi nếu chiều cao màn hình quá thấp.
- Auth card full-width với padding thoải mái.
- Tránh horizontal scroll.

Design style:
- Background: #000000 hoặc #0B0B0B
- Card surface: #101010
- Brand blue: #2367A2
- Electric blue glow: #008FEA
- Text primary: #FFFFFF
- Text muted: #B7B7B7
- Input background: #FFFFFF
- Input text: #111111
- Danger: #E5484D
- Success: #2ECC71

Use:
- Headline lớn, đậm ở bên trái.
- Card bo góc khoảng 32px đến 40px.
- Blue glow xung quanh card.
- Nút xanh dạng pill.
- Input trắng, sạch sẽ.
- Hover/focus state mượt.
- Framer Motion entrance animation nhẹ nhàng.

Left hero content:
Sử dụng text tiếng Việt.

Headline:
“CHÀO MỪNG BẠN TRỞ LẠI VỚI DIGITAL TWIN”

Supporting text:
“Quản lý thẻ cá nhân số và AI Persona của bạn trong một không gian duy nhất.”

Image:
Sử dụng `/login/ai.jpg`.
Đặt ảnh bên dưới đoạn supporting text.
Có thể dùng rounded corners hoặc soft shadow nếu phù hợp.
Ảnh không được bị kéo giãn hoặc méo.

Login page:
Route:
`/login`

Auth card content:
Title:
“Đăng nhập”

Subtitle:
“Quản lý hồ sơ số và AI Twin của bạn”

Fields:
- Email
- Mật khẩu

Placeholders:
- Email: “Nhập email của bạn”
- Password: “Nhập mật khẩu”

Links:
- “Quên mật khẩu?”
- “Tạo tài khoản mới”

Buttons:
- Primary button: “Đăng nhập”
- Google button: “Tiếp tục với Google”

Behavior:
- Validate email bắt buộc và đúng định dạng.
- Validate password bắt buộc.
- Khi submit, gọi mock `loginWithEmail(email, password)`.
- Hiển thị loading state trên button:
  “Đang đăng nhập...”
- Khi success:
  - Hiển thị toast: “Đăng nhập thành công.”
  - Mock redirect đến `/dashboard/profile-builder`.
- Khi error:
  - Hiển thị inline error hoặc toast: “Email hoặc mật khẩu không đúng.”
- Google button:
  - Gọi mock `loginWithGoogle()`.
  - Hiển thị toast: “Đăng nhập Google thành công.”
  - Mock redirect đến `/dashboard/profile-builder`.
- “Tạo tài khoản mới” link đến `/register`.
- “Quên mật khẩu?” có thể là mock link hoặc button. Khi click, hiển thị toast:
  “Tính năng đặt lại mật khẩu sẽ được bổ sung sau.”

Register page:
Route:
`/register`

Auth card content:
Title:
“Đăng ký”

Subtitle:
“Bắt đầu tạo thẻ cá nhân số và AI Persona của bạn”

Fields:
- Email
- Mật khẩu
- Xác nhận mật khẩu

Placeholders:
- Email: “Nhập email của bạn”
- Password: “Tạo mật khẩu”
- Confirm Password: “Nhập lại mật khẩu”

Checkbox:
Text:
“Tôi đồng ý với Điều khoản dịch vụ”

Buttons:
- Primary button: “Tạo tài khoản”

Links:
- “Đã có tài khoản? Đăng nhập”

Behavior:
- Validate email bắt buộc và đúng định dạng.
- Validate password bắt buộc.
- Password phải có ít nhất 8 ký tự.
- Confirm password phải trùng với password.
- Terms checkbox phải được tick.
- Khi submit, gọi mock `registerWithEmail(email, password)`.
- Hiển thị loading state:
  “Đang tạo tài khoản...”
- Khi success:
  - Hiển thị toast: “Tạo tài khoản thành công.”
  - Mock redirect đến `/dashboard/profile-builder`.
- Khi error:
  - Hiển thị inline error hoặc toast: “Không thể tạo tài khoản. Vui lòng thử lại.”
- “Đã có tài khoản? Đăng nhập” link đến `/login`.

Mock API:
Tạo:
`lib/mock-auth-api.ts`

Export các Promise-based functions:
- loginWithEmail(email, password)
- loginWithGoogle()
- registerWithEmail(email, password)
- requestPasswordReset(email)

Rules:
- Sử dụng artificial delay.
- Mock login success với bất kỳ email/password hợp lệ nào.
- Mock register success với các field hợp lệ.
- Trả về structured success/error responses.
- Giữ phần này dễ thay thế sau này bằng NextAuth, Supabase Auth, Firebase Auth hoặc backend API calls.

Types:
Tạo:
`types/auth.ts`

Types:
- LoginFormData
- RegisterFormData
- AuthResponse
- AuthError

Component structure:
AuthLayout:
- Nhận children.
- Render layout 2 cột.
- Chứa khu vực hero bên trái.
- Chứa khu vực auth card bên phải.

AuthHero:
- Render headline, subtitle và ảnh AI.
- Sử dụng `/login/ai.jpg`.

LoginForm:
- Xử lý UI và validation của login form.
- Gọi mock auth API thông qua props hoặc gọi trực tiếp từ page.

RegisterForm:
- Xử lý UI và validation của register form.
- Gọi mock auth API thông qua props hoặc gọi trực tiếp từ page.

GoogleButton:
- Button Google-style tái sử dụng được.
- Thêm ký hiệu Google “G” đơn giản bằng text hoặc lucide/icon approximation nếu không có asset.
- Không import asset Google bên ngoài.

UX requirements:
- Sử dụng accessible labels.
- Inputs phải có focus states dễ thấy.
- Errors phải hiển thị gần field liên quan.
- Buttons phải có disabled/loading states.
- Nhấn Enter phải submit form.
- Không hiển thị raw technical errors.
- Animation nhẹ nhàng, không quá lố.
- Không over-engineer bằng external form libraries nếu không cần thiết.
- Có thể dùng React state.

Important:
Đây là frontend-only.
Không implement authentication thật.
Không lưu token thật.
Không kết nối Google OAuth thật.
Không thêm protected route middleware ở giai đoạn này.
Không làm hỏng dashboard hoặc public profile pages hiện có.

Manual verification checklist:
Sau khi implementation, tôi phải có thể:
1. Chạy dev server.
2. Mở `/login`.
3. Thấy trang login dark layout 2 cột với text tiếng Việt.
4. Thấy ảnh AI từ `/login/ai.jpg`.
5. Submit login form rỗng và thấy validation errors.
6. Nhập mock login data hợp lệ và thấy success toast.
7. Click “Tiếp tục với Google” và thấy mock success behavior.
8. Click “Tạo tài khoản mới” và chuyển đến `/register`.
9. Mở `/register`.
10. Submit register form rỗng và thấy validation errors.
11. Test lỗi password mismatch.
12. Test lỗi chưa tick terms.
13. Submit mock register data hợp lệ và thấy success toast.
14. Xác nhận mobile layout hoạt động tốt.