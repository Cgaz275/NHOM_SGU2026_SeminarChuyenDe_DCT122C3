# 🛠️ CONTROLLER GUIDELINE
**Vị trí trong Kiến trúc:** Layered Architecture (Route -> **Controller** -> Service -> Database)

Tài liệu này quy định cách viết mã nguồn cho tầng Controller trong backend Node.js/Express.js của dự án Persona-Based Digital Card.

## 1. VAI TRÒ CỦA CONTROLLER
- **Nhiệm vụ chính:** Tiếp nhận HTTP Request (`req`), giải nén và kiểm tra (validation) sơ bộ dữ liệu đầu vào (Params, Query, Body), gọi tới tầng `Service` để xử lý nghiệp vụ, và trả về HTTP Response (`res`) cho client.
- **Tuyệt đối KHÔNG:** Không viết trực tiếp các thao tác truy vấn Database (Firestore), logic Authentication (Firebase Admin), hay gọi API bên thứ ba (OpenAI) bên trong Controller. Tất cả những việc nặng nhọc này phải được đẩy sang tầng `Service`.

## 2. CHUẨN MỰC XỬ LÝ (BEST PRACTICES)

### 2.1. Standard JSON Response
Mọi API trả về bắt buộc phải tuân thủ chuẩn JSON đồng nhất của hệ thống:
```json
{
  "success": true | false,
  "data": { ... } | null,
  "message": "Chuỗi thông báo mô tả kết quả"
}
```

### 2.2. Xử lý lỗi (Error Handling)
- **Bắt buộc:** Mọi logic bên trong Controller phải được bọc bằng `try...catch`. Tuyệt đối không để lọt lỗi Unhandled Promise Rejection làm sập (crash) server.
- **HTTP Status Codes chuẩn:**
  - `200` / `201`: Xử lý thành công (`success: true`).
  - `400`: Lỗi đầu vào từ Client (Bad Request - ví dụ thiếu tham số, sai định dạng).
  - `401` / `403`: Lỗi xác thực/Phân quyền (Unauthorized / Forbidden).
  - `404`: Không tìm thấy tài nguyên (Not Found).
  - `500`: Lỗi nội bộ Server (Internal Server Error) - bắt trong khối `catch`.

### 2.3. Extract Params từ Request
Nên giải nén tường minh các biến từ `req` (Ví dụ: `const { cardId } = req.params;`, `const { text } = req.body;`) trước khi truyền vào Service để Service hoàn toàn độc lập với đối tượng `req` của Express, giúp Service dễ dàng Unit Test hơn.

## 3. CẤU TRÚC MẪU (TEMPLATE CONTROLLER)
Dưới đây là cấu trúc chuẩn mực khi viết một hàm Controller:

```javascript
const exampleService = require('../services/exampleService');

/**
 * [Tên chức năng] - Ví dụ: Lấy chi tiết thẻ
 * Route: GET /api/v1/cards/:cardId
 */
const getCardDetails = async (req, res) => {
  try {
    // 1. Trích xuất dữ liệu đầu vào
    const { cardId } = req.params;

    // 2. Kiểm tra sơ bộ (Validation cơ bản)
    if (!cardId) {
      return res.status(400).json({
        success: false,
        data: null,
        message: 'Thiếu tham số bắt buộc: cardId'
      });
    }

    // 3. Gọi Service xử lý nghiệp vụ
    const cardData = await exampleService.getCardById(cardId);

    // 4. Kiểm tra kết quả trả về từ Service (ví dụ: Không tìm thấy)
    if (!cardData) {
      return res.status(404).json({
        success: false,
        data: null,
        message: 'Không tìm thấy thông tin thẻ'
      });
    }

    // 5. Trả về Response thành công
    return res.status(200).json({
      success: true,
      data: cardData,
      message: 'Lấy thông tin thẻ thành công'
    });

  } catch (error) {
    // 6. Xử lý Exception/Lỗi Server ở Catch block
    console.error('[exampleController.getCardDetails] Error:', error);
    
    // Nếu Service chủ động throw lỗi có kèm status code (tùy chọn)
    const statusCode = error.statusCode || 500;
    const message = statusCode === 500 ? 'Lỗi hệ thống nội bộ' : error.message;

    return res.status(statusCode).json({
      success: false,
      data: null,
      message: message
    });
  }
};

module.exports = {
  getCardDetails,
};
```

## 4. RÀNG BUỘC (CONSTRAINTS) DÀNH CHO BACKEND AGENT
- Khi được giao viết/chỉnh sửa một endpoint mới, Agent **bắt buộc** phải tuân theo luồng xử lý và cấu trúc mẫu trên.
- Khi throw lỗi từ `Service` (bằng `throw new Error()`), `Controller` bắt buộc phải đón lỗi và phản hồi cho client an toàn, tuyệt đối không rò rỉ stack trace lỗi ra ngoài response.
