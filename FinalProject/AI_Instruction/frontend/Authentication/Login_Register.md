You are a senior frontend engineer and UI/UX designer.

Continue working inside the existing Next.js 15 App Router project.

IMPORTANT:
Use the existing frontend project folder casing. Do not create a duplicated `Frontend` / `FrontEnd` folder.
Do not break existing routes:
- `/u/[username]`
- `/dashboard/profile-builder`
- `/dashboard/ai-twin`

Task:
Build polished Login and Register pages for the Persona-Based Digital Card platform.

Important language requirement:
All visible UI text must be written in Vietnamese.
The code, component names, variable names, and file names can remain in English, but anything displayed to the user must be Vietnamese.

Image asset:
Use this image for the left-side AI illustration:
`/login/ai.jpg`

The actual file is located at:
`frontend/public/login/ai.jpg`

Use Next.js image path:
`/login/ai.jpg`

Do not use external image URLs.

Routes:
Create these routes:
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
- components/ui/Toast.tsx if needed
- lib/mock-auth-api.ts
- types/auth.ts

Purpose:
The login/register pages allow the card owner to access the dashboard where they manage their digital card and AI Digital Twin.

This is frontend-only for now.
Use mock authentication behavior.
Do not connect real authentication, real Google OAuth, database, backend, or session storage yet.
Make the structure API-ready so the mock auth service can be replaced later.

Visual reference:
Follow the provided reference images closely.

Layout:
Desktop:
- Full-screen dark layout.
- Two-column design.
- Left column:
  - Large uppercase headline.
  - Short supporting text.
  - AI illustration image.
- Right column:
  - Centered auth card.
  - Rounded dark card.
  - Blue outer glow.
  - Form fields.
  - Primary blue CTA button.
  - Secondary links.
  - Google sign-in button on Login page.
- Keep generous spacing and premium dark-tech style.

Mobile:
- Single-column layout.
- Hero text can be shortened or stacked above the form.
- AI image may be smaller or hidden if screen height is too small.
- Auth card should be full-width with comfortable padding.
- Avoid horizontal scroll.

Design style:
- Background: #000000 or #0B0B0B
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
- Large bold headline on the left.
- Rounded card with radius around 32px to 40px.
- Blue glow around the card.
- Pill-shaped blue buttons.
- Clean white inputs.
- Smooth hover/focus states.
- Subtle Framer Motion entrance animation.

Left hero content:
Use Vietnamese text.

Headline:
“CHÀO MỪNG BẠN TRỞ LẠI VỚI DIGITAL TWIN”

Supporting text:
“Quản lý thẻ cá nhân số và AI Persona của bạn trong một không gian duy nhất.”

Image:
Use `/login/ai.jpg`.
Place below the supporting text.
Use rounded corners or soft shadow if suitable.
The image should not stretch or distort.

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
- Validate email required and valid format.
- Validate password required.
- On submit, call mock `loginWithEmail(email, password)`.
- Show loading state on the button:
  “Đang đăng nhập...”
- On success:
  - Show toast: “Đăng nhập thành công.”
  - Mock redirect to `/dashboard/profile-builder`.
- On error:
  - Show inline error or toast: “Email hoặc mật khẩu không đúng.”
- Google button:
  - Call mock `loginWithGoogle()`.
  - Show toast: “Đăng nhập Google thành công.”
  - Mock redirect to `/dashboard/profile-builder`.
- “Tạo tài khoản mới” links to `/register`.
- “Quên mật khẩu?” can be a mock link or button. On click show toast:
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
- Validate email required and valid format.
- Validate password required.
- Password must be at least 8 characters.
- Confirm password must match password.
- Terms checkbox must be checked.
- On submit, call mock `registerWithEmail(email, password)`.
- Show loading state:
  “Đang tạo tài khoản...”
- On success:
  - Show toast: “Tạo tài khoản thành công.”
  - Mock redirect to `/dashboard/profile-builder`.
- On error:
  - Show inline error or toast: “Không thể tạo tài khoản. Vui lòng thử lại.”
- “Đã có tài khoản? Đăng nhập” links to `/login`.

Mock API:
Create:
`lib/mock-auth-api.ts`

Export Promise-based functions:
- loginWithEmail(email, password)
- loginWithGoogle()
- registerWithEmail(email, password)
- requestPasswordReset(email)

Rules:
- Use artificial delay.
- Mock login success for any valid email/password.
- Mock register success for valid fields.
- Return structured success/error responses.
- Keep this easy to replace later with NextAuth, Supabase Auth, Firebase Auth, or backend API calls.

Types:
Create:
`types/auth.ts`

Types:
- LoginFormData
- RegisterFormData
- AuthResponse
- AuthError

Component structure:
AuthLayout:
- Receives children.
- Renders the two-column layout.
- Contains the left hero area.
- Contains right auth card area.

AuthHero:
- Renders the headline, subtitle, and AI image.
- Use `/login/ai.jpg`.

LoginForm:
- Handles login form UI and validation.
- Calls mock auth API through props or directly from page.

RegisterForm:
- Handles register form UI and validation.
- Calls mock auth API through props or directly from page.

GoogleButton:
- Reusable Google-style button.
- Include a simple Google “G” mark using text or lucide/icon approximation if no asset exists.
- Do not import external Google assets.

UX requirements:
- Use accessible labels.
- Inputs must have visible focus states.
- Errors must appear near the related field.
- Buttons must show disabled/loading states.
- Pressing Enter should submit the form.
- Do not show raw technical errors.
- Keep animations subtle.
- Do not over-engineer with external form libraries unless necessary.
- React state is acceptable.

Important:
This is frontend-only.
Do not implement real authentication.
Do not store real tokens.
Do not connect real Google OAuth.
Do not add protected route middleware yet.
Do not break existing dashboard or public profile pages.

Manual verification checklist:
After implementation, I should be able to:
1. Run the dev server.
2. Open `/login`.
3. See the dark two-column login page with Vietnamese text.
4. See the AI image from `/login/ai.jpg`.
5. Submit an empty login form and see validation errors.
6. Enter valid mock login data and see success toast.
7. Click “Tiếp tục với Google” and see mock success behavior.
8. Click “Tạo tài khoản mới” and go to `/register`.
9. Open `/register`.
10. Submit empty register form and see validation errors.
11. Test password mismatch error.
12. Test unchecked terms error.
13. Submit valid mock register data and see success toast.
14. Confirm mobile layout works well.
