# Cấu trúc thư mục dự án

## Tổng quan
Dự án hiện tại là một ứng dụng **Next.js 16** dùng **React 19**, **TypeScript** và **Tailwind CSS 4**.

## Cấu trúc chính

```text
.
├── AI_Instruction/
│   └── WebStructure.md
├── app/
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── public/
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── AGENTS.md
├── CLAUDE.md
├── eslint.config.mjs
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── README.md
├── tsconfig.json
└── .gitignore
```

## Giải thích từng phần

### `AI_Instruction/`
Chứa các tài liệu hướng dẫn nội bộ cho AI hoặc quy ước của dự án.

- `WebStructure.md`: mô tả cấu trúc thư mục của dự án.

### `app/`
Thư mục chính của ứng dụng theo **App Router** của Next.js.

- `favicon.ico`: biểu tượng tab trình duyệt.
- `globals.css`: CSS toàn cục, khai báo biến màu và import Tailwind.
- `layout.tsx`: layout gốc của toàn bộ ứng dụng, nơi khai báo font, metadata và khung HTML chung.
- `page.tsx`: trang chủ tại route `/`.

### `public/`
Chứa tài nguyên tĩnh để truy cập trực tiếp từ trình duyệt.

- `file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg`: các ảnh/vector mẫu đang được dùng hoặc để sẵn cho giao diện.

## Các file cấu hình quan trọng

- `package.json`: khai báo thông tin dự án, scripts và dependencies.
- `package-lock.json`: khóa phiên bản package cho npm.
- `next.config.ts`: cấu hình Next.js.
- `postcss.config.mjs`: cấu hình PostCSS.
- `eslint.config.mjs`: cấu hình ESLint.
- `tsconfig.json`: cấu hình TypeScript.
- `.gitignore`: danh sách file/thư mục không đưa vào git.

## Tài liệu và quy ước

- `README.md`: mô tả chung về dự án.
- `AGENTS.md`: hướng dẫn vận hành dành cho agent trong repo này.
- `CLAUDE.md`: tham chiếu tới quy tắc trong `AGENTS.md`.

## Ghi chú hiện trạng mã nguồn

- Giao diện hiện tại là trang mặc định của Next.js.
- `app/page.tsx` đang render nội dung landing page mẫu.
- `app/layout.tsx` đang thiết lập font `Geist` và metadata mặc định.
- `app/globals.css` đang định nghĩa biến `--background`, `--foreground` và hỗ trợ dark mode cơ bản.
