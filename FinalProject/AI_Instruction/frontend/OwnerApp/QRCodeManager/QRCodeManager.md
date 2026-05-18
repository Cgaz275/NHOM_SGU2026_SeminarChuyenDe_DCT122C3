You are a senior frontend engineer and UI/UX designer.

Continue working inside the existing Next.js 15 App Router project.

IMPORTANT:
Use the existing frontend project folder casing. Do not create a duplicated `Frontend` / `FrontEnd` folder.

Do not break existing routes:
- `/u/[username]`
- `/dashboard/profile-builder`
- `/dashboard/ai-twin`
- `/login`
- `/register`

Task:
Build a polished frontend interface for the “QR Code Manager” screen of a Persona-Based Digital Card platform.

Important language requirement:
All visible UI text must be written in Vietnamese.
The code, component names, variable names, and file names can remain in English, but anything displayed to the user must be Vietnamese.

Route:
Create the screen at:
`/dashboard/qr-manager`

Purpose:
This screen allows the card owner to view, copy, and download the unique QR code that points to their public Digital Profile.

The QR is used for:
- Demo presentation
- Printed business cards
- Posters
- Slides
- Sharing the public profile quickly

Important:
This is frontend-only for now.
Use mock data and mock API functions only.
Do not connect a real database, backend, analytics, or auth.
Make the implementation API-ready for future integration.

Visual reference:
Follow the provided reference image closely:
- Dark dashboard layout
- Left sidebar with SEMINAR logo
- Active menu item: “Quản lý QR”
- Centered large QR card
- Status badge on the top-right of the card
- QR code displayed in a white square with enough padding
- URL slug displayed below QR
- Buttons:
  - Sao chép URL
  - Tải PNG
  - Tải SVG
  - Sao chép liên kết
- Blue glow / dark-tech style

Main colors:
- Background: #0B0B0B or #000000
- Sidebar: #101010
- Card surface: #101010 or dark gradient
- Brand blue: #2367A2
- Electric blue: #008FEA
- Text primary: #FFFFFF
- Text muted: #B7B7B7
- Border: rgba(255,255,255,0.14)
- Success: #2ECC71
- Warning: #F5A524
- Danger: #E5484D

Suggested file structure:
- app/dashboard/qr-manager/page.tsx
- components/dashboard/DashboardSidebar.tsx
- components/qr-manager/QRCodeManagerPage.tsx
- components/qr-manager/QRCodePreviewCard.tsx
- components/qr-manager/QRStatusBadge.tsx
- components/qr-manager/QRActionButtons.tsx
- components/qr-manager/QRTrackingHint.tsx
- components/qr-manager/SlugWarning.tsx
- components/ui/Toast.tsx
- lib/mock-qr-manager-api.ts
- types/qr-manager.ts

If `DashboardSidebar` or `Toast` already exists, reuse it carefully.
Only modify shared components if necessary.
Do not break existing pages.

Dashboard sidebar:
Use the same dashboard sidebar style as the previous dashboard screens.

Sidebar items:
- Quản lý thông tin
- Quản lý Persona
- Quản lý QR
- Quản lý tin nhắn

For this page:
- Active item should be “Quản lý QR”.

Page layout:
Desktop:
- Full dashboard layout.
- Sidebar on the left.
- Main content on the right.
- Center the QR manager card horizontally near the top.
- The QR card should have max-width around 680px to 760px.
- Use a large rounded card with blue glow and subtle gradient.

Mobile:
- Sidebar collapses into top bar / hamburger.
- QR card becomes full width.
- Buttons stack vertically.
- QR code remains large enough to scan.
- Avoid horizontal scroll.

Page header:
Use Vietnamese text.

Title:
“Quản lý mã QR”

Subtitle:
“Chia sẻ hồ sơ số của bạn nhanh chóng qua mã QR hoặc đường dẫn cá nhân.”

QR card content:
- Main card title:
  “Mã QR hồ sơ”
- Subtitle:
  “Quét mã để mở hồ sơ công khai của bạn”
- Status badge:
  - “Đã xuất bản” if profile is published
  - “Bản nháp” if profile is draft
  - “Đang cập nhật” if profile is updating
- Large QR preview
- URL field:
  `digitalcard.app/u/anthony-simon`
- Button next to URL:
  “Sao chép URL”
- Action buttons:
  - “Tải PNG”
  - “Tải SVG”
  - “Sao chép liên kết”

QR generation requirement:
Use a real URL-to-QR library to generate the QR code from the public profile URL.

Preferred library:
Use `qrcode.react` with `QRCodeSVG`.

If no QR library exists in the project, install:
`npm install qrcode.react`

Do not use:
- QR icon
- placeholder image
- fake QR graphic
- static QR image
- lucide-react QR icon as the actual QR

The generated QR must be real, scannable, and must encode this dummy URL:
`https://digitalcard.app/u/anthony-simon`

The QR value must come from a variable:
`const publicProfileUrl = "https://digitalcard.app/u/anthony-simon";`

Do not hard-code the URL directly inside the JSX.

QR visual rules:
- QR must be black on white for strong contrast.
- QR must have enough padding / quiet zone.
- Do not use low contrast brand colors for the actual QR pattern.
- The surrounding card can use blue/black brand styling, but the QR itself must remain highly scannable.
- Minimum PNG export target should be 1000x1000px.
- SVG export should preserve vector quality.

Download behavior:
Make PNG and SVG download functional on the client side, not just fake toast.

The PNG and SVG downloads must export the real generated QR code, not a fake placeholder.
The downloaded files must encode the same `publicProfileUrl`.

Implement:
1. Copy URL
- Copies `https://digitalcard.app/u/anthony-simon` to clipboard.
- Shows toast:
  “Đã sao chép URL hồ sơ.”

2. Copy Link
- Same as Copy URL.
- Shows toast:
  “Đã sao chép liên kết.”

3. Download PNG
- Generate or export QR as PNG.
- PNG should be at least 1000x1000px.
- Filename:
  `anthony-simon-qr-code.png`
- Shows toast:
  “Đã tải mã QR PNG.”

4. Download SVG
- Export QR as SVG.
- Filename:
  `anthony-simon-qr-code.svg`
- Shows toast:
  “Đã tải mã QR SVG.”

Implementation hint:
- Use `QRCodeSVG` for the visible QR preview.
- Assign a wrapper/ref to the QR SVG.
- For SVG download, serialize the SVG node and save it as a `.svg` file.
- For PNG download, draw the serialized SVG onto a canvas with 1000x1000 size, then export it as PNG.
- Keep this logic clean and reusable.
- Do not add heavy libraries unless necessary.

Slug warning:
Add a warning section if slug was recently changed.

Mock condition:
Include a boolean mock value:
`slugChangedRecently`

If true, show warning:
“Slug đã thay đổi gần đây. Mã QR cũ có thể không còn trỏ đúng hồ sơ hiện tại.”

If false, hide the warning.

Tracking hint:
Add a small helper card or text below the QR actions:
“Lượt quét QR, lượt sao chép liên kết và lượt tải mã sẽ được ghi nhận trong Basic Analytics.”

Optional small stats preview:
Show mock metrics as small pills/cards:
- Lượt quét: 128
- Lượt sao chép: 24
- Lượt tải QR: 12

Keep these as mock data only.

Mock API:
Create:
`lib/mock-qr-manager-api.ts`

Export Promise-based functions:
- getQRCodeData()
- copyProfileUrl()
- downloadQRCodePNG()
- downloadQRCodeSVG()
- trackQREvent(eventType)

Event types:
- qr_copy_url
- qr_copy_link
- qr_download_png
- qr_download_svg

Rules:
- Use artificial delay.
- Return mock success/error responses.
- Keep the mock API easy to replace later with real backend calls.
- Even if clipboard/download is implemented in the UI component, still call mock tracking functions.

Types:
Create:
`types/qr-manager.ts`

Types:
- QRCodeData
- QRProfileStatus
- QREventType
- QRDownloadFormat
- QRActionResponse

Suggested QRCodeData shape:
- id
- ownerName
- username
- publicUrl
- displayUrl
- status
- slugChangedRecently
- scanCount
- copyCount
- downloadCount
- updatedAt

Validation/state:
Create UI states:
- Loading QR data
- Published
- Draft
- Updating
- Copying
- Downloading PNG
- Downloading SVG
- Error state

If profile status is Draft:
- Show badge:
  “Bản nháp”
- Show helper warning:
  “Hồ sơ chưa được xuất bản. Mã QR hiện chưa khả dụng cho khách truy cập.”
- Disable Download PNG/SVG and Copy buttons.

If profile status is Published:
- Enable all actions.

If profile status is Updating:
- Show badge:
  “Đang cập nhật”
- Keep actions enabled, but show slug warning if relevant.

User experience:
- Buttons should have clear loading states.
- Toasts should appear after copy/download actions.
- QR card should look polished and demo-ready.
- Do not show raw technical errors.
- Use accessible labels for buttons.
- Use keyboard-friendly controls.
- Keep the page responsive.
- Use subtle Framer Motion entrance animation.
- Keep animations simple.

Vietnamese UI copy examples:
- “Quản lý mã QR”
- “Chia sẻ hồ sơ số của bạn nhanh chóng”
- “Mã QR hồ sơ”
- “Quét mã để mở hồ sơ công khai của bạn”
- “Đã xuất bản”
- “Bản nháp”
- “Đang cập nhật”
- “Sao chép URL”
- “Tải PNG”
- “Tải SVG”
- “Sao chép liên kết”
- “Đã sao chép URL hồ sơ.”
- “Đã tải mã QR PNG.”
- “Đã tải mã QR SVG.”
- “Slug đã thay đổi gần đây. Mã QR cũ có thể không còn trỏ đúng hồ sơ hiện tại.”

Important API-ready architecture:
- Do not hard-code mock data inside deeply nested components.
- Keep mock QR data and mock API functions in `mock-qr-manager-api.ts`.
- The page should own the main state and call mock API functions.
- Child components should receive values and callbacks through props.
- Future real API integration should only require replacing mock API functions.

Do not implement:
- Real auth
- Real database
- Real analytics dashboard
- Real profile publishing logic
- Real slug editing
- Payment
- NFC integration

Manual verification checklist:
After implementation, I should be able to:
1. Run the dev server.
2. Open `/dashboard/qr-manager`.
3. See a dark dashboard layout with active “Quản lý QR” sidebar item.
4. See a large real scannable QR code generated from a URL-to-QR library.
5. Confirm it does not use a QR icon or placeholder image.
6. Scan the QR and get the dummy URL `https://digitalcard.app/u/anthony-simon`.
7. Click “Sao chép URL” and see success toast.
8. Click “Sao chép liên kết” and see success toast.
9. Click “Tải PNG” and download a PNG file named `anthony-simon-qr-code.png`.
10. Confirm the PNG is at least 1000x1000px.
11. Click “Tải SVG” and download an SVG file named `anthony-simon-qr-code.svg`.
12. Confirm both downloaded QR files encode `https://digitalcard.app/u/anthony-simon`.
13. Confirm the QR has enough white padding and strong contrast.
14. Confirm the slug warning appears when `slugChangedRecently` is true.
15. Confirm draft status disables copy/download actions.
16. Confirm mobile layout stacks cleanly.
