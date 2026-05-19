Bạn là một Senior Frontend Engineer kiêm UI/UX Designer.

Tiếp tục làm việc bên trong project Next.js 15 App Router hiện có.

## QUAN TRỌNG

Toàn bộ source code phải được viết trong thư mục tên chính xác là:

`Frontend`


## Nhiệm vụ

Xây dựng giao diện frontend hoàn chỉnh cho màn hình:

`Profile Builder / Card Editor`

Đây là màn hình dashboard dành cho chủ sở hữu thẻ, dùng để tạo và chỉnh sửa Public Digital Profile. Người dùng có thể nhập thông tin cá nhân, upload avatar, thêm social links, cấu hình quyền riêng tư, chọn theme, xem preview realtime, lưu nháp và publish card.

Chưa xây backend thật.

Chỉ sử dụng mock data và mock API functions.

UI cần được thiết kế theo hướng API-ready để sau này dễ thay bằng backend thật.

## Bối cảnh project

Hệ thống cho phép người dùng tạo digital business card cá nhân có tích hợp AI Digital Twin.

Profile Builder là nơi người dùng chỉnh sửa dữ liệu trước khi public profile được xuất bản tại URL dạng:

`/u/[username]`

## Phong cách giao diện

Giao diện phải khớp với phong cách dark-tech hiện có của project:

- Nền tối
- Panel màu đen hoặc xám đậm
- Accent xanh dương
- Card bo góc
- Border mỏng
- Form field sạch, dễ đọc
- Có sidebar navigation
- Cảm giác premium dashboard

## Hướng thiết kế chính

Lấy cảm hứng từ reference image đã có:

- Sidebar bên trái có logo “SEMINAR” và các menu item.
- Khu vực nội dung chính gồm nhiều form section dạng card bo góc, xếp dọc.
- Các section gồm:
  - Basic Info
  - Media
  - Social Links
  - Privacy
  - Theme
  - Publish
- Desktop hiển thị form ở bên trái/khu vực chính và live preview ở bên phải.
- Mobile hiển thị form theo từng bước, có nút mở preview dạng drawer/modal.

## Tech requirements

- Dùng Next.js 15 App Router.
- Dùng TypeScript.
- Dùng Tailwind CSS.
- Dùng Framer Motion cho transition nhẹ.
- Dùng lucide-react icons.
- Chỉ dùng mock data.
- Không kết nối database thật.
- Không kết nối authentication thật.
- Không kết nối storage thật.
- Không gọi API thật.
- Code phải sạch, dễ bảo trì, componentized.
- Thiết kế code theo hướng dễ thay mock API bằng real API sau này.

## Route cần tạo

Tạo màn hình tại route:

`/dashboard/profile-builder`

Suggested file path:

`FrontEnd/app/dashboard/profile-builder/page.tsx`

## Cấu trúc file/folder bắt buộc

Tạo hoặc cập nhật các file sau:

- `FrontEnd/app/dashboard/profile-builder/page.tsx`
- `FrontEnd/components/dashboard/DashboardSidebar.tsx`
- `FrontEnd/components/profile-builder/ProfileBuilderForm.tsx`
- `FrontEnd/components/profile-builder/BasicInfoSection.tsx`
- `FrontEnd/components/profile-builder/MediaUploadSection.tsx`
- `FrontEnd/components/profile-builder/SocialLinksSection.tsx`
- `FrontEnd/components/profile-builder/PrivacySection.tsx`
- `FrontEnd/components/profile-builder/ThemeSelectorSection.tsx`
- `FrontEnd/components/profile-builder/PublishSection.tsx`
- `FrontEnd/components/profile-builder/LiveProfilePreview.tsx`
- `FrontEnd/components/profile-builder/MobilePreviewDrawer.tsx`
- `FrontEnd/components/profile-builder/ProfileBuilderStateBar.tsx`
- `FrontEnd/components/profile-builder/SlugInput.tsx`
- `FrontEnd/components/ui/Toast.tsx`
- `FrontEnd/services/cardService.ts`
- `FrontEnd/types/profile-builder.ts`

Nếu project đã có shared components phù hợp thì được reuse, nhưng không được làm hỏng Public Digital Profile page hiện có.

## Design tokens

Dùng cùng visual language với project hiện tại.

### Colors

- Background: `#0B0B0B`
- Sidebar: `#101010`
- Surface/card: `#101010`
- Input background: `#FFFFFF` hoặc `#F5F5F5` để dễ đọc
- Brand blue: `#2367A2`
- Electric blue: `#008FEA`
- Text primary: `#FFFFFF`
- Text muted: `#B7B7B7`
- Border: `rgba(255,255,255,0.14)`
- Danger: `#E5484D`
- Success: `#2ECC71`
- Warning: `#F5A524`

## Layout requirements

### Desktop

- Full screen dashboard layout.
- Sidebar bên trái fixed hoặc sticky, width khoảng 220px.
- Sidebar items:
  - Manage Profile
  - Manage Persona
  - Manage QR
  - Manage Messages
- Active item là: Manage Profile.
- Main content gồm:
  - Header row với title: `Profile Builder`
  - Subtitle: `Edit your public digital card and preview changes in real time.`
  - Status bar hiển thị trạng thái: Draft Saved / Unsaved Changes / Published.
  - Form column.
  - Live preview column.
- Form column nên rộng hơn preview, hoặc dùng layout 60/40.
- Live preview sticky trên desktop.

### Mobile

- Sidebar collapse thành top bar hoặc hamburger menu.
- Form chuyển sang step-based sections:
  1. Basic Info
  2. Media
  3. Social Links
  4. Privacy
  5. Theme
  6. Publish
- Có nút: `Preview`
- Preview mở bằng drawer/modal.
- Tất cả control phải touch-friendly.

---

# Core Sections

## 1. Basic Info Section

### Fields

- Full Name
- Role / Title
- Slogan
- Bio
- Slug

### Rules

- Full Name bắt buộc.
- Role / Title bắt buộc.
- Slogan không bắt buộc.
- Bio tối đa 300 ký tự.
- Hiển thị character counter cho Bio.
- Slug bắt buộc.
- Slug được hiển thị dưới dạng:

`digitalcard.app/u/[slug]`

### Validate slug format

Slug chỉ được chứa:

- chữ thường
- số
- dấu gạch ngang `-`
- không có khoảng trắng

### Slug availability

Giả lập kiểm tra slug bằng mock API.

Nếu slug không khả dụng, hiển thị lỗi:

`This slug is already taken.`

Nếu slug hợp lệ và khả dụng, hiển thị success:

`Slug is available.`

### Data binding bắt buộc

- Full Name bind vào `data.basicInfo.fullName`
- Role / Title bind vào `data.basicInfo.role`
- Slogan bind vào `data.basicInfo.slogan`
- Bio bind vào `data.basicInfo.bio`
- Slug bind vào `data.basicInfo.slug`

Không được dùng root-level fields như:

- `data.fullName`
- `data.role`
- `data.bio`
- `data.slug`

---

## 2. Media Upload Section

### Fields

- Avatar upload

### Rules

- Avatar max size: 5MB.
- Chỉ accept image files.
- Khi chọn ảnh, hiển thị preview ngay lập tức.
- Nếu chưa có ảnh, hiển thị gradient placeholder.
- Chỉ mock upload, không upload storage thật.
- Nếu mock API fail, hiển thị trạng thái upload failed.
- Thêm helper text:

`Images are previewed locally. Real upload will be connected later.`

### Data binding bắt buộc

- Avatar URL bind vào `data.media.avatarUrl`

Không được dùng:

- `data.avatarUrl`

Không được thêm `coverUrl` trừ khi type được update rõ ràng. Với task này chỉ implement avatar upload vì data model hiện tại chỉ có `avatarUrl`.

---

## 3. Social Links Section

### Fields

- Facebook
- Instagram
- X / Twitter
- GitHub
- Behance
- Dribbble
- Portfolio
- Email
- Phone

### Rules

- Các URL field cần validate URL format.
- Email cần validate email format.
- Phone có thể là free text, nhưng không được rỗng nếu Show Phone đang bật.
- Tự động hiển thị icon social tương ứng nếu field có dữ liệu.
- Field social rỗng thì không hiển thị trong public preview.

### Data binding bắt buộc

- Facebook bind vào `data.socialLinks.facebook`
- Instagram bind vào `data.socialLinks.instagram`
- X / Twitter bind vào `data.socialLinks.x`
- GitHub bind vào `data.socialLinks.github`
- Behance bind vào `data.socialLinks.behance`
- Dribbble bind vào `data.socialLinks.dribbble`
- Portfolio bind vào `data.socialLinks.portfolio`
- Email bind vào `data.socialLinks.email`
- Phone bind vào `data.socialLinks.phone`

Không được dùng:

- `data.email`
- `data.phone`

---

## 4. Privacy Section

### Toggles

- Show Email
- Show Phone
- Show Social Links
- Allow AI to mention contact info

### Rules

- Các toggle phải ảnh hưởng đến live preview ngay lập tức.
- Nếu Show Email tắt, email không được hiển thị trong preview.
- Nếu Show Phone tắt, phone không được hiển thị trong preview.
- Nếu Show Social Links tắt, social icons phải bị ẩn trong preview.
- Nếu Allow AI to mention contact info tắt, hiển thị helper text:

`AI will not be allowed to share your email or phone number.`

### Data binding bắt buộc

- Show Email bind vào `data.privacy.showEmail`
- Show Phone bind vào `data.privacy.showPhone`
- Show Social Links bind vào `data.privacy.showSocialLinks`
- Allow AI to mention contact info bind vào `data.privacy.allowAiContactMention`

---

## 5. Theme Selector Section

### Options

- Dark Blue
- Minimal Black
- Electric Blue
- Glass Card

### Font style selector

- Modern Sans
- Tech Display
- Clean Professional

### Rules

- Khi đổi theme, Live Preview phải thay đổi theo.
- Tất cả theme vẫn phải nằm trong dark-tech brand style.
- Không tạo light mode cho màn hình này, trừ khi chỉ dùng cho preview.

### Data binding bắt buộc

- Theme option bind vào `data.theme.theme`
- Font style bind vào `data.theme.fontStyle`

---

## 6. Publish Section

### Actions

- Save Draft
- Publish Card
- Reset Changes

### Rules

- Save Draft gọi mock API.
- Publish phải validate required fields trước.
- Nếu thiếu required fields, highlight lỗi.
- Nếu publish thành công, show toast:

`Card published successfully.`

- Nếu save draft thành công, show toast:

`Draft saved.`

- Reset Changes restore lại initial mock data sau khi confirm.
- Hiển thị summary nhỏ gồm:
  - Required fields completed
  - Slug status
  - Privacy status
  - Last saved time

---

# Live Preview

Tạo component:

`LiveProfilePreview`

Component này mô phỏng public profile card.

## Preview content

- Avatar hoặc gradient placeholder
- Full Name
- Role
- Slogan
- Bio
- Social icons nếu được bật
- Email/phone nếu được bật
- Skills placeholder pills
- Button: `Ask my AI Twin`
- Button: `Save Contact`

## Preview requirements

- Cập nhật realtime khi form thay đổi.
- Update phải tạo cảm giác instant và dưới 200ms.
- Preview phải nhìn rõ như một public card thật.
- Có badge nhỏ:
  - Draft
  - Ready to Publish
  - Published
- Preview hỗ trợ toggle:
  - Mobile preview
  - Desktop preview

## Data usage bắt buộc trong preview

- Dùng `data.basicInfo.fullName` để hiển thị name.
- Dùng `data.basicInfo.role` để hiển thị role.
- Dùng `data.basicInfo.slogan` để hiển thị slogan.
- Dùng `data.basicInfo.bio` để hiển thị bio.
- Dùng `data.media.avatarUrl` để hiển thị avatar.
- Chỉ dùng `data.socialLinks.email` khi `data.privacy.showEmail` là `true`.
- Chỉ dùng `data.socialLinks.phone` khi `data.privacy.showPhone` là `true`.
- Chỉ dùng social links khi `data.privacy.showSocialLinks` là `true`.
- Dùng `data.skills` cho skill pills.
- Không đọc field từ root-level properties không tồn tại.

---

# State handling

Cần tạo UI states cho các trường hợp:

- Loading initial profile data
- Draft saved
- Unsaved changes
- Saving draft
- Publishing
- Published successfully
- Validation error
- Slug unavailable
- Upload failed
- Network/mock API error

---

# Mock API

Tạo hoặc cập nhật file:

`FrontEnd/services/cardService.ts`

File này export các Promise-based functions:

- `getProfileDraft()`
- `saveProfileDraft(data)`
- `publishProfile(data)`
- `checkSlugAvailability(slug)`
- `mockUploadAvatar(file)`
- `resetProfileDraft()`

## Mock API rules

- Có artificial delay.
- Return mock success/error.
- `checkSlugAvailability` phải trả unavailable cho các slug:
  - `admin`
  - `test`
  - `anthony-simon`
  - `digitalcard`
- Các slug hợp lệ khác thì trả available.
- Mock API phải dễ thay bằng real API sau này.
- Không kết nối backend thật.

---

# Mock data shape

Mock profile được return bởi `getProfileDraft()` và `resetProfileDraft()` phải match chính xác type:

`ProfileBuilderData`

Sử dụng structure sau:

```ts
const mockProfileDraft: ProfileBuilderData = {
  id: 'profile-001',
  basicInfo: {
    fullName: 'Anthony Simon',
    role: 'Frontend Developer',
    slogan: 'Building modern digital experiences with AI.',
    bio: 'I am a frontend developer focused on clean UI, modern web apps, and AI-powered digital profile experiences.',
    slug: 'anthony-simon'
  },
  media: {
    avatarUrl: ''
  },
  socialLinks: {
    facebook: 'https://facebook.com/anthony.simon',
    instagram: 'https://instagram.com/anthony.simon',
    x: 'https://x.com/anthonysimon',
    github: 'https://github.com/anthonysimon',
    behance: 'https://behance.net/anthonysimon',
    dribbble: 'https://dribbble.com/anthonysimon',
    portfolio: 'https://anthony.dev',
    email: 'anthony@example.com',
    phone: '+84 901 234 567'
  },
  privacy: {
    showEmail: true,
    showPhone: true,
    showSocialLinks: true,
    allowAiContactMention: true
  },
  theme: {
    theme: 'Dark Blue',
    fontStyle: 'Modern Sans'
  },
  lastSavedAt: null,
  skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'UI/UX']
};
```
# Validation requirements

Implement validation rõ ràng:

Required fields
data.basicInfo.fullName
data.basicInfo.role
data.basicInfo.slug
Bio
Tối đa 300 ký tự.
Slug
Chỉ lowercase letters, numbers, hyphen.
Không có khoảng trắng.
Check availability bằng mock API.
URL fields

Validate các field:

Facebook
Instagram
X / Twitter
GitHub
Behance
Dribbble
Portfolio
Email

Validate email format.

Phone

Nếu data.privacy.showPhone === true thì phone không được rỗng.

Component behavior
ProfileBuilderForm
Nhận data, setData, validation errors và handlers từ parent.
Render tất cả section.
Không tự tạo data shape khác.
BasicInfoSection
Chỉ làm việc với data.basicInfo.
Có SlugInput riêng.
Có bio counter.
SlugInput
Validate format.
Gọi checkSlugAvailability.
Có loading state khi check.
Hiển thị success/error message.
MediaUploadSection
Chỉ update data.media.avatarUrl.
Preview ảnh local bằng object URL hoặc mock URL.
Không thêm cover image.
SocialLinksSection
Chỉ update data.socialLinks.
Empty field không xuất hiện ở preview.
PrivacySection
Chỉ update data.privacy.
Toggle phải ảnh hưởng preview realtime.
ThemeSelectorSection
Chỉ update data.theme.
Theme thay đổi phải phản ánh trong LiveProfilePreview.
PublishSection
Gọi save/publish/reset handlers.
Hiển thị summary trạng thái.
LiveProfilePreview
Chỉ đọc data từ đúng nested fields.
Không dùng root-level fields.
Respect privacy toggles.
Hiển thị skills từ data.skills.
MobilePreviewDrawer
Dùng cho mobile.
Mở bằng nút Preview.
Hiển thị cùng component LiveProfilePreview.
ProfileBuilderStateBar

Hiển thị một trong các trạng thái:

Draft Saved
Unsaved Changes
Saving Draft
Publishing
Published
Error
UX details
Có loading skeleton hoặc loading panel khi load initial profile.
Có toast cho save/publish/error.
Có disabled state cho button khi đang saving/publishing.
Có confirmation trước khi Reset Changes.
Form input phải dễ đọc trên nền tối.
Error message phải rõ ràng.
Không dùng alert browser thô nếu có thể tránh.
Dùng motion nhẹ, không lạm dụng animation.
Không được làm
Không gọi API thật.
Không dùng database thật.
Không dùng auth thật.
Không upload file lên storage thật.
Không đổi folder root thành frontend hoặc tên khác.
Không làm hỏng public profile page hiện có.
Không dùng root-level field sai shape như:
data.fullName
data.role
data.bio
data.slug
data.avatarUrl
data.email
data.phone
Không thêm coverUrl nếu chưa cập nhật type chính thức.
Không tạo mock data lệch với ProfileBuilderData.
Acceptance criteria

Task được xem là hoàn thành khi:

Route /dashboard/profile-builder hoạt động.
Giao diện đúng phong cách dark-tech dashboard.
Desktop có form + sticky live preview.
Mobile có step-based form + preview drawer/modal.
Mock data load đúng shape ProfileBuilderData.
Tất cả field bind đúng nested path.
Slug validation và mock availability check hoạt động.
Save Draft, Publish Card, Reset Changes hoạt động bằng mock API.
Live preview cập nhật realtime.
Privacy toggles ảnh hưởng preview đúng.
Theme selector ảnh hưởng preview.
Không có kết nối backend thật.
Code sạch, componentized, TypeScript type-safe.