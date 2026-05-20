# Hướng dẫn Documentation Công nghệ Dự án

**Tài liệu này là Source of Truth** về công nghệ stack được sử dụng trong dự án **Persona-Based Website for Digital Twin Card**.

### Nguyên tắc sử dụng Documentation

- **Ưu tiên hàng đầu**: Tìm kiếm tài liệu đã tải sẵn trong thư mục **`AI_Instruction/Source of truth/Tech Documents`** (dạng PDF).
- Nếu chưa có hoặc cần thông tin mới nhất → Sử dụng các link chính thức dưới đây.
- Không nhất thiết phải dùng phiên bản mới nhất, mà phải chọn **phiên bản ổn định, tương thích và phù hợp nhất** với kiến trúc hệ thống hiện tại.
- Khi triển khai, phải đảm bảo các công nghệ phối hợp tốt với nhau (đặc biệt là Next.js 15 + Firebase + TypeScript).

### Technology Stack & Documentation

| STT | Công nghệ                    | Loại                  | Phiên bản     | Mô tả chính                                                      | Link Documentation chính thức |
|-----|------------------------------|-----------------------|---------------|------------------------------------------------------------------|-------------------------------|
| 1   | **Next.js**                  | Frontend Framework    | 15            | App Router, SSR/SSG, Server Actions, Routing                     | [Next.js Docs](https://nextjs.org/docs) |
| 2   | **React**                    | UI Library            | 18+           | Component-based UI                                               | [React Docs](https://react.dev) |
| 3   | **Tailwind CSS**             | Styling Framework     | 3.x           | Utility-first CSS                                                | [Tailwind CSS Docs](https://tailwindcss.com/docs) |
| 4   | **TypeScript**               | Programming Language  | 5.x           | Static type checking                                             | [TypeScript Handbook](https://www.typescriptlang.org/docs/) |
| 5   | **Node.js**                  | JavaScript Runtime    | 20+           | Server runtime                                                   | [Node.js Docs](https://nodejs.org/en/docs) |
| 6   | **Express.js**               | Backend Framework     | 4.x           | Web application framework                                        | [Express.js Docs](https://expressjs.com/) |
| 7   | **Firebase**                 | Backend-as-a-Service  | Latest        | Auth, Firestore, Storage, Hosting                                | [Firebase Documentation](https://firebase.google.com/docs) |
| 8   | **Firebase Firestore**       | NoSQL Database        | -             | Realtime Database                                                | [Firestore Docs](https://firebase.google.com/docs/firestore) |
| 9   | **Firebase Authentication**  | Authentication        | -             | Email, Google OAuth, JWT                                         | [Firebase Auth Docs](https://firebase.google.com/docs/auth) |
| 10  | **OpenAI / OpenRouter**      | AI/LLM Service        | gpt-4o-mini   | AI Digital Twin, Prompt Engineering                              | [OpenAI Platform Docs](https://platform.openai.com/docs) |
| 11  | **Cypress**                  | E2E Testing           | 13.x          | End-to-End Testing                                               | [Cypress Docs](https://docs.cypress.io/) |
| 12  | **Jest**                     | Unit Testing          | 29.x          | Unit & Component Testing                                         | [Jest Documentation](https://jestjs.io/docs) |
| 13  | **Postman**                  | API Testing           | Latest        | API Development & Testing                                        | [Postman Learning Center](https://learning.postman.com/) |
| 14  | **Lighthouse**               | Performance Audit     | -             | Performance, Accessibility, SEO, Best Practices                  | [Lighthouse Docs](https://developer.chrome.com/docs/lighthouse/) |
| 15  | **QR Code Generator**        | Library               | Latest        | Tạo mã QR Code                                                   | [qrcode npm](https://www.npmjs.com/package/qrcode) |

---

**Hướng dẫn cho AI Agent:**

- Khi cần tra cứu tài liệu → **Ưu tiên kiểm tra thư mục Tech Documents** trước.
- Khi implement code, phải tuân thủ đúng phiên bản và best practices được ghi trong các tài liệu chính thức.
- Nếu phát hiện xung đột hoặc có công nghệ thay thế tốt hơn → Đề xuất và báo cáo cho nhóm trước khi thay đổi.

---
