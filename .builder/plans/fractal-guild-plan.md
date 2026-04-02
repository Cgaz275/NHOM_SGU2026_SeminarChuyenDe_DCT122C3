# Seminar Landing Page — Tiếp tục phát triển theo Figma

## Tổng quan những gì đã làm

### Landing page (`/`) — `components/seminar/`
| Component | File | Nội dung |
|---|---|---|
| Navbar | `navbar.tsx` | Logo + nav links + Contact CTA |
| Hero | `hero.tsx` | Tiêu đề lớn + floating cards (CREATIVE / COMMITMENT) |
| TechStack | `tech-stack.tsx` | Mô tả công nghệ + pill tags |
| Masterpiece | `masterpiece.tsx` | Projects section + ảnh + mô tả |
| TeamSection | `team-section.tsx` | Digital Twin section + grid ảnh thành viên |
| ContactCTA | `contact-cta.tsx` | Email form section |
| Footer | `footer.tsx` | Social links + copyright |

### About page (`/about`) — `components/about/`
| Component | File | Nội dung |
|---|---|---|
| AboutHero | `about-hero.tsx` | ABOUT US header (split panel) |
| BinaryMatrix | `binary-matrix.tsx` | Canvas animation mưa binary 01 |
| TeamIntro | `team-intro.tsx` | BinaryMatrix + text giới thiệu team |
| MemberCard | `member-card.tsx` | Card 1 thành viên (reusable) |
| MembersSection | `members-section.tsx` | Danh sách 4 thành viên |

### UI primitives — `components/ui/`
- `SectionHeading` — Heading + kicker + description
- `SkillTag` — Pill tag (dùng trong TechStack)

### Cần dọn dẹp
- `components/landing/` chứa file cũ (`LandingPage`, `HeroMockup`, `FeatureGrid`) **không được dùng** — sẽ xóa.

---

## Phân tích Figma vs Hiện trạng

### About page
Figma hiển thị 4 member card với nội dung text **khác** với code hiện tại:

| Thành viên | Text trong Figma | Text trong code |
|---|---|---|
| Châu Gia Anh | "...serves as our primary strategist and lead communicator...bridges the gap between vision and execution..." | Text khác nhau |
| Đào Thị Thanh Tâm | "...wears two hats as our Business Analyst and Tester. She's the friendly face..." | Text khác nhau |
| Dương Lê Khánh | "Khánh is a dynamic and highly versatile Fullstack Developer who serves as the team's ultimate 'all-rounder'..." | Gần giống |
| Phan Thành Đại | "Đại is the technical powerhouse of the team, specializing in AI-driven solutions..." | Gần giống |

Meet button labels trong Figma: "Meet Tâm", "Meet Khánh", "Meet Đại" — khớp với code.

### Những cải thiện cần làm

1. **Cập nhật descriptions** trong `members-section.tsx` để khớp Figma
2. **Xóa legacy folder** `components/landing/` (không dùng)
3. **Styling nhỏ**: chiều cao tối thiểu của member-card-photo trên mobile (đảm bảo ảnh vuông, không bị squish)
4. **About hero**: Figma cho thấy hero có chiều cao rõ ràng hơn trên desktop (~28rem đang set, ok), nhưng trên mobile cần padding thêm
5. **BinaryMatrix**: text màu xanh `rgba(33, 93, 153, 0.8)` — khớp Figma

---

## Kế hoạch thực thi

### Bước 1: Dọn dẹp legacy
- Xóa `components/landing/landing-page.tsx`, `hero-mockup.tsx`, `feature-grid.tsx`

### Bước 2: Cập nhật nội dung member cards
- Sửa descriptions trong `members-section.tsx` theo đúng Figma
- Đảm bảo `meetLabel` khớp Figma

### Bước 3: Tinh chỉnh styling About page
- `member-card-photo`: thêm `min-height` trên mobile để không bị nhỏ quá
- `about-hero`: điều chỉnh padding mobile
- Đảm bảo `member-card-body` padding nhất quán

### Bước 4: Kiểm tra layout tổng thể
- Xem lại toàn bộ `/about` page trên mobile + desktop
- Xem lại landing page `/` không bị ảnh hưởng

---

## Nguyên tắc giữ nguyên
- **Không** triển khai quá nhiều logic trong 1 file — mỗi component có 1 nhiệm vụ
- **Reuse** CSS classes đã định nghĩa trong `globals.css`
- **Không** thêm inline style — chỉ dùng Tailwind hoặc CSS class
- **Không** tạo file mới nếu edit file cũ là đủ
