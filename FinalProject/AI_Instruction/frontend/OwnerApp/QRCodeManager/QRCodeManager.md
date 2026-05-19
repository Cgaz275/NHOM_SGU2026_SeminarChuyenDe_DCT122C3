# Prompt triển khai màn hình Quản lý mã QR

Bạn là một senior frontend engineer và UI/UX designer.

Tiếp tục làm việc bên trong dự án Next.js 15 App Router hiện có.

## Quan trọng

Sử dụng đúng chữ hoa/chữ thường của thư mục frontend hiện tại. Không tạo thêm thư mục trùng lặp như `Frontend` hoặc `FrontEnd`.

Không làm hỏng các route hiện có:

- `/u/[username]`
- `/dashboard/profile-builder`
- `/dashboard/ai-twin`
- `/login`
- `/register`

## Nhiệm vụ

Xây dựng giao diện frontend hoàn chỉnh cho màn hình “Quản lý mã QR” của nền tảng Persona-Based Digital Card.

## Yêu cầu ngôn ngữ

Toàn bộ nội dung hiển thị trên giao diện phải viết bằng tiếng Việt.

Code, tên component, tên biến và tên file có thể giữ bằng tiếng Anh, nhưng mọi text người dùng nhìn thấy trên UI phải là tiếng Việt.

## Route

Tạo màn hình tại:

```txt
/dashboard/qr-manager
```

## Mục đích màn hình

Màn hình này cho phép chủ thẻ xem, sao chép và tải xuống mã QR duy nhất trỏ đến hồ sơ Digital Profile công khai của họ.

Mã QR được dùng cho:

- Thuyết trình demo
- In trên danh thiếp
- Poster
- Slide
- Chia sẻ nhanh hồ sơ công khai

## Phạm vi triển khai

Đây chỉ là frontend-only ở thời điểm hiện tại.

Chỉ sử dụng mock data và mock API function.

Không kết nối database thật, backend thật, analytics thật hoặc auth thật.

Tuy nhiên, kiến trúc cần sẵn sàng để sau này có thể thay bằng API thật.

## Tham khảo giao diện

Bám sát ảnh tham khảo đã cung cấp:

- Dashboard nền tối
- Sidebar bên trái có logo SEMINAR
- Menu đang active: “Quản lý QR”
- Card QR lớn nằm ở giữa
- Badge trạng thái nằm góc trên bên phải của card
- QR code hiển thị trong ô vuông nền trắng, có padding đủ rộng
- URL slug hiển thị bên dưới QR
- Các nút:
  - Sao chép URL
  - Tải PNG
  - Tải SVG
  - Sao chép liên kết
- Phong cách dark-tech, có ánh sáng xanh / blue glow

## Màu sắc chính

- Background: `#0B0B0B` hoặc `#000000`
- Sidebar: `#101010`
- Card surface: `#101010` hoặc dark gradient
- Brand blue: `#2367A2`
- Electric blue: `#008FEA`
- Text primary: `#FFFFFF`
- Text muted: `#B7B7B7`
- Border: `rgba(255,255,255,0.14)`
- Success: `#2ECC71`
- Warning: `#F5A524`
- Danger: `#E5484D`

## Cấu trúc file gợi ý

Tạo hoặc cập nhật các file sau:

- `app/dashboard/qr-manager/page.tsx`
- `components/dashboard/DashboardSidebar.tsx`
- `components/qr-manager/QRCodeManagerPage.tsx`
- `components/qr-manager/QRCodePreviewCard.tsx`
- `components/qr-manager/QRStatusBadge.tsx`
- `components/qr-manager/QRActionButtons.tsx`
- `components/qr-manager/QRTrackingHint.tsx`
- `components/qr-manager/SlugWarning.tsx`
- `components/ui/Toast.tsx`
- `lib/mock-qr-manager-api.ts`
- `types/qr-manager.ts`

Nếu `DashboardSidebar` hoặc `Toast` đã tồn tại, hãy tái sử dụng cẩn thận.

Chỉ chỉnh sửa shared components khi thật sự cần thiết.

Không làm hỏng các page hiện có.

## Dashboard sidebar

Sử dụng cùng style sidebar dashboard với các màn hình dashboard trước đó.

Các item trong sidebar:

- Quản lý thông tin
- Quản lý Persona
- Quản lý QR
- Quản lý tin nhắn

Đối với page này:

- Item active phải là “Quản lý QR”.

## Layout trang

### Desktop

- Dùng layout dashboard đầy đủ.
- Sidebar nằm bên trái.
- Main content nằm bên phải.
- Card quản lý QR được căn giữa theo chiều ngang, nằm gần phía trên.
- QR card có `max-width` khoảng `680px` đến `760px`.
- Dùng card bo góc lớn, có blue glow và gradient nhẹ.

### Mobile

- Sidebar thu gọn thành top bar hoặc hamburger.
- QR card full width.
- Các button xếp dọc.
- QR code vẫn đủ lớn để quét.
- Tránh horizontal scroll.

## Header trang

Dùng nội dung tiếng Việt.

Title:

> Quản lý mã QR

Subtitle:

> Chia sẻ hồ sơ số của bạn nhanh chóng qua mã QR hoặc đường dẫn cá nhân.

## Nội dung QR card

Card cần có:

- Tiêu đề chính:
  > Mã QR hồ sơ
- Subtitle:
  > Quét mã để mở hồ sơ công khai của bạn
- Badge trạng thái:
  - “Đã xuất bản” nếu profile đã publish
  - “Bản nháp” nếu profile là draft
  - “Đang cập nhật” nếu profile đang cập nhật
- QR preview lớn
- URL field:
  ```txt
  digitalcard.app/u/anthony-simon
  ```
- Button cạnh URL:
  > Sao chép URL
- Action buttons:
  - “Tải PNG”
  - “Tải SVG”
  - “Sao chép liên kết”

## Yêu cầu tạo QR

Phải dùng thư viện URL-to-QR thật để generate QR code từ public profile URL.

Thư viện ưu tiên:

```txt
qrcode.react với QRCodeSVG
```

Nếu project chưa có QR library, hãy cài:

```bash
npm install qrcode.react
```

Không được dùng:

- QR icon
- Placeholder image
- Hình QR giả
- Static QR image
- Icon QR từ `lucide-react` làm QR thật

QR được tạo ra phải là QR thật, có thể quét được, và phải encode dummy URL sau:

```txt
https://digitalcard.app/u/anthony-simon
```

Giá trị QR phải lấy từ biến:

```ts
const publicProfileUrl = "https://digitalcard.app/u/anthony-simon";
```

Không hard-code URL trực tiếp bên trong JSX.

## Quy tắc hiển thị QR

- QR phải là màu đen trên nền trắng để đảm bảo độ tương phản.
- QR phải có đủ padding / quiet zone.
- Không dùng màu brand có độ tương phản thấp cho phần pattern thật của QR.
- Phần card xung quanh có thể dùng phong cách xanh/đen theo brand, nhưng QR thật phải dễ quét.
- File PNG export tối thiểu phải đạt `1000x1000px`.
- File SVG export phải giữ chất lượng vector.

## Hành vi tải xuống

Chức năng tải PNG và SVG phải hoạt động thật ở client side, không chỉ hiện toast giả.

PNG và SVG tải xuống phải export đúng QR thật đã generate, không phải placeholder.

Các file tải xuống phải encode cùng một giá trị `publicProfileUrl`.

## Các action cần implement

### 1. Copy URL

- Copy `https://digitalcard.app/u/anthony-simon` vào clipboard.
- Hiển thị toast:
  > Đã sao chép URL hồ sơ.

### 2. Copy Link

- Hành vi giống Copy URL.
- Hiển thị toast:
  > Đã sao chép liên kết.

### 3. Download PNG

- Generate hoặc export QR thành PNG.
- PNG phải đạt tối thiểu `1000x1000px`.
- Filename:
  ```txt
  anthony-simon-qr-code.png
  ```
- Hiển thị toast:
  > Đã tải mã QR PNG.

### 4. Download SVG

- Export QR thành SVG.
- Filename:
  ```txt
  anthony-simon-qr-code.svg
  ```
- Hiển thị toast:
  > Đã tải mã QR SVG.

## Gợi ý triển khai

- Dùng `QRCodeSVG` cho phần QR preview hiển thị.
- Gắn wrapper hoặc ref vào SVG QR.
- Khi tải SVG, serialize SVG node rồi lưu thành file `.svg`.
- Khi tải PNG, vẽ SVG đã serialize lên canvas kích thước `1000x1000`, sau đó export thành PNG.
- Giữ logic sạch, dễ tái sử dụng.
- Không thêm thư viện nặng nếu không cần thiết.

## Slug warning

Thêm warning section nếu slug vừa được thay đổi gần đây.

Mock condition:

```ts
slugChangedRecently
```

Nếu `true`, hiển thị warning:

> Slug đã thay đổi gần đây. Mã QR cũ có thể không còn trỏ đúng hồ sơ hiện tại.

Nếu `false`, ẩn warning.

## Tracking hint

Thêm một helper card hoặc đoạn text nhỏ bên dưới các QR action:

> Lượt quét QR, lượt sao chép liên kết và lượt tải mã sẽ được ghi nhận trong Basic Analytics.

## Optional stats preview

Hiển thị các mock metrics dạng pill/card nhỏ:

- Lượt quét: 128
- Lượt sao chép: 24
- Lượt tải QR: 12

Các số liệu này chỉ là mock data.

## Mock API

Tạo file:

```txt
lib/mock-qr-manager-api.ts
```

Export các Promise-based functions:

```ts
getQRCodeData()
copyProfileUrl()
downloadQRCodePNG()
downloadQRCodeSVG()
trackQREvent(eventType)
```

Event types:

```ts
qr_copy_url
qr_copy_link
qr_download_png
qr_download_svg
```

Quy tắc:

- Dùng artificial delay.
- Return mock success/error responses.
- Giữ mock API dễ thay thế bằng backend thật sau này.
- Ngay cả khi clipboard/download được xử lý trong UI component, vẫn cần gọi mock tracking functions.

## Types

Tạo file:

```txt
types/qr-manager.ts
```

Các type cần có:

- `QRCodeData`
- `QRProfileStatus`
- `QREventType`
- `QRDownloadFormat`
- `QRActionResponse`

Shape gợi ý cho `QRCodeData`:

```ts
{
  id: string;
  ownerName: string;
  username: string;
  publicUrl: string;
  displayUrl: string;
  status: QRProfileStatus;
  slugChangedRecently: boolean;
  scanCount: number;
  copyCount: number;
  downloadCount: number;
  updatedAt: string;
}
```

## Validation và state

Tạo các UI state sau:

- Loading QR data
- Published
- Draft
- Updating
- Copying
- Downloading PNG
- Downloading SVG
- Error state

## Quy tắc theo trạng thái profile

### Nếu profile status là Draft

- Hiển thị badge:
  > Bản nháp
- Hiển thị helper warning:
  > Hồ sơ chưa được xuất bản. Mã QR hiện chưa khả dụng cho khách truy cập.
- Disable các button Download PNG/SVG và Copy.

### Nếu profile status là Published

- Enable tất cả action.

### Nếu profile status là Updating

- Hiển thị badge:
  > Đang cập nhật
- Vẫn cho phép action hoạt động.
- Nếu slug có thay đổi gần đây thì hiển thị slug warning.

## Trải nghiệm người dùng

- Button phải có loading state rõ ràng.
- Toast xuất hiện sau các action copy/download.
- QR card cần nhìn polished, demo-ready.
- Không hiển thị raw technical errors.
- Button cần có accessible label.
- Hỗ trợ keyboard-friendly controls.
- Page phải responsive.
- Dùng Framer Motion cho entrance animation nhẹ.
- Animation đơn giản, không làm rối giao diện.

## Vietnamese UI copy examples

Có thể sử dụng các câu sau:

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

## Kiến trúc API-ready quan trọng

- Không hard-code mock data sâu bên trong nested components.
- Mock QR data và mock API functions phải nằm trong `mock-qr-manager-api.ts`.
- Page chính quản lý main state và gọi mock API functions.
- Child components nhận data và callbacks thông qua props.
- Khi tích hợp API thật trong tương lai, chỉ cần thay mock API functions.

## Không implement các phần sau

Không triển khai:

- Auth thật
- Database thật
- Analytics dashboard thật
- Logic publish profile thật
- Chỉnh sửa slug thật
- Payment
- NFC integration

## Checklist kiểm tra thủ công

Sau khi implement xong, tôi cần có thể:

1. Chạy dev server.
2. Mở `/dashboard/qr-manager`.
3. Thấy dashboard nền tối với sidebar active item “Quản lý QR”.
4. Thấy QR code lớn, thật, có thể quét được, được generate từ thư viện URL-to-QR.
5. Xác nhận không dùng QR icon hoặc placeholder image.
6. Quét QR và nhận được dummy URL `https://digitalcard.app/u/anthony-simon`.
7. Click “Sao chép URL” và thấy success toast.
8. Click “Sao chép liên kết” và thấy success toast.
9. Click “Tải PNG” và tải được file PNG tên `anthony-simon-qr-code.png`.
10. Xác nhận PNG có kích thước tối thiểu `1000x1000px`.
11. Click “Tải SVG” và tải được file SVG tên `anthony-simon-qr-code.svg`.
12. Xác nhận cả hai file QR tải xuống đều encode `https://digitalcard.app/u/anthony-simon`.
13. Xác nhận QR có đủ padding trắng và độ tương phản mạnh.
14. Xác nhận slug warning xuất hiện khi `slugChangedRecently` là `true`.
15. Xác nhận trạng thái draft sẽ disable các action copy/download.
16. Xác nhận mobile layout xếp gọn, không bị tràn ngang.
