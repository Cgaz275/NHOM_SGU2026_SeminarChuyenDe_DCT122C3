# Project Seminar

## 1. Tổng quan dự án

Project Seminar là một website giới thiệu học phần/dự án theo phong cách landing page hiện đại, tập trung vào ba nội dung chính:

- Giới thiệu tổng quan về nhóm và định hướng thực hiện dự án
- Trình bày các dự án nhóm đã thực hiện theo từng giai đoạn
- Cung cấp trải nghiệm **AI Digital Twin** để người dùng trò chuyện với từng thành viên hoặc đại diện nhóm

Dự án được xây dựng bằng Next.js theo App Router, giao diện tối, thành phần giao diện được tách theo từng khu vực chức năng để dễ bảo trì và mở rộng.

## 2. Thông tin nhanh

| Mục | Giá trị |
| --- | --- |
| Tên dự án | `digitaltwin` |
| Mục tiêu | Xây dựng website giới thiệu nhóm và dự án, tích hợp AI Digital Twin để tương tác với người dùng |
| Framework chính | Next.js 16 |
| UI Runtime | React 19 |
| Ngôn ngữ | TypeScript |
| Styling | Tailwind CSS 4 + CSS toàn cục |
| Kiến trúc định tuyến | App Router (`app/`) |
| Tích hợp ngoài | n8n webhook cho tính năng chat |
| Package manager phù hợp | npm |

## 3. Chức năng chính

| Nhóm chức năng | Mô tả |
| --- | --- |
| Landing page | Hiển thị phần mở đầu, năng lực công nghệ, hình ảnh nhóm và lời mời liên hệ |
| About | Giới thiệu nhóm, thành viên và thông tin nền của dự án |
| Team Projects | Trình bày danh sách các dự án/đề tài đã thực hiện |
| Digital Twin | Cho phép chọn persona và trò chuyện với AI đại diện cho nhóm hoặc từng thành viên |
| Contact CTA | Khu vực kêu gọi kết nối, hợp tác hoặc trao đổi thêm |

## 4. Các route hiện có

| Route | Vai trò |
| --- | --- |
| `/` | Trang chủ, tổng hợp phần hero, công nghệ, đội ngũ và liên hệ |
| `/about` | Trang giới thiệu nhóm và thành viên |
| `/teamproject` | Trang danh sách các dự án nhóm |
| `/digital-twin` | Trang trò chuyện với AI Digital Twin |

## 5. Cấu trúc thư mục quan trọng

| Thư mục / Tệp | Vai trò |
| --- | --- |
| `app/` | Khai báo route và layout cấp ứng dụng |
| `app/layout.tsx` | Layout gốc, metadata và font toàn cục |
| `app/page.tsx` | Điểm vào của trang chủ |
| `app/about/page.tsx` | Route giới thiệu nhóm |
| `app/teamproject/page.tsx` | Route danh sách dự án nhóm |
| `app/digital-twin/page.tsx` | Route AI Digital Twin |
| `components/seminar/` | Các khối giao diện dùng cho landing page và trang seminar |
| `components/about/` | Các component dùng cho trang giới thiệu |
| `components/projects/` | Dữ liệu và component hiển thị dự án |
| `components/ui/` | Các component giao diện dùng lại |
| `lib/services/n8n/` | Lớp dịch vụ gửi yêu cầu chat tới n8n webhook |
| `public/` | Tài nguyên tĩnh như hình ảnh, biểu tượng |
| `app/globals.css` | Thiết lập style toàn cục |

## 6. Công nghệ sử dụng

| Công nghệ | Vai trò trong dự án |
| --- | --- |
| Next.js | Xây dựng ứng dụng web theo mô hình App Router |
| React | Tổ chức giao diện theo component |
| TypeScript | Tăng độ an toàn kiểu dữ liệu khi phát triển |
| Tailwind CSS | Xây dựng giao diện nhanh, thống nhất và dễ mở rộng |
| ESLint | Kiểm tra chất lượng mã nguồn |
| n8n | Xử lý webhook phục vụ tính năng AI Digital Twin |

## 7. Cách khởi chạy dự án ở môi trường local

### 7.1. Yêu cầu

| Thành phần | Khuyến nghị |
| --- | --- |
| Node.js | Phiên bản LTS mới |
| npm | Đi kèm Node.js |
| Kết nối mạng | Cần thiết nếu muốn sử dụng tính năng chat với n8n webhook |

### 7.2. Cài đặt và chạy

| Bước | Lệnh | Mục đích |
| --- | --- | --- |
| 1 | `npm install` | Cài đặt toàn bộ dependency |
| 2 | `npm run dev` | Khởi chạy môi trường phát triển |
| 3 | Mở trình duyệt tại địa chỉ do Next.js cung cấp | Kiểm tra giao diện và chức năng |

Sau khi chạy `npm run dev`, ứng dụng thường được phục vụ ở môi trường local development của Next.js.

## 8. Các lệnh thường dùng

| Lệnh | Mô tả |
| --- | --- |
| `npm run dev` | Chạy dự án ở chế độ phát triển |
| `npm run build` | Build ứng dụng cho môi trường production |
| `npm run start` | Chạy bản build production |
| `npm run lint` | Kiểm tra lỗi lint trong mã nguồn |

## 9. Lưu ý khi vận hành

| Nội dung | Chi tiết |
| --- | --- |
| Tính năng Digital Twin | Trang chat gửi dữ liệu tới một webhook n8n bên ngoài |
| Phụ thuộc dịch vụ ngoài | Nếu webhook không khả dụng, tính năng chat có thể trả lỗi hoặc không phản hồi như mong đợi |
| Dữ liệu dự án | Danh sách dự án nhóm hiện được khai báo tĩnh trong mã nguồn |
| Giao diện | Dự án ưu tiên trình bày hình ảnh, landing page và trải nghiệm giới thiệu nhóm |

## 10. Điểm bắt đầu nên đọc nếu muốn mở rộng dự án

| Mục tiêu | Tệp nên xem trước |
| --- | --- |
| Chỉnh trang chủ | `app/page.tsx`, `components/seminar-landing.tsx`, `components/seminar/` |
| Chỉnh trang giới thiệu | `app/about/page.tsx`, `components/about/` |
| Chỉnh trang dự án nhóm | `app/teamproject/page.tsx`, `components/projects/` |
| Chỉnh AI Digital Twin | `app/digital-twin/page.tsx`, `components/seminar/digital-twin-chat.tsx`, `lib/services/n8n/webhook.ts` |
| Chỉnh style toàn cục | `app/globals.css` |

## 11. Tóm tắt

Dự án này phù hợp để giới thiệu nhóm, trưng bày các đầu việc đã thực hiện và minh họa trải nghiệm tương tác với AI Digital Twin trong một giao diện web hiện đại. Cấu trúc thư mục hiện tại đã được chia tương đối rõ theo route, khu vực giao diện và lớp dịch vụ, thuận lợi cho việc tiếp tục phát triển hoặc tùy biến nội dung.
