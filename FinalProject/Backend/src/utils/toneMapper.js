// src/utils/toneMapper.js

const TONE_MAPPER = {
  "Chuyên nghiệp": "Giọng điệu chuyên nghiệp, lịch sự, chuẩn mực công sở. Không dùng emoji, tập trung vào giải pháp.",
  "Thân thiện": "Giọng điệu dễ gần, ấm áp, tự nhiên như một người bạn. Có thể sử dụng các từ đệm nhẹ nhàng và 1-2 emoji vui vẻ.",
  "Ngắn gọn": "Trả lời cực kỳ súc tích, đi thẳng vào vấn đề. Trình bày dưới dạng gạch đầu dòng nếu có thể. Không giải thích dài dòng.",
  "Chi tiết": "Phân tích vấn đề một cách cặn kẽ, đầy đủ ngữ cảnh. Chia nhỏ các bước giải quyết để khách hàng dễ hiểu nhất.",
  "Kỹ thuật": "Sử dụng chính xác các thuật ngữ chuyên ngành IT. Giải thích theo logic lập trình, hệ thống. Phù hợp khi nói chuyện với nhà tuyển dụng hoặc kỹ sư khác.",
  "Tự tin": "Thể hiện sự tự tin cao vào năng lực của bản thân. Dùng ngôn từ khẳng định, mạnh mẽ, làm nổi bật các thành tựu đạt được.",
  "Khiêm tốn": "Thể hiện sự cầu thị, trung thực, không nói quá về bản thân. Nhấn mạnh tinh thần ham học hỏi và sẵn sàng lắng nghe.",
  "Hài hước nhẹ": "Giọng điệu hóm hỉnh, thông minh, có cá tính riêng. Thỉnh thoảng chèn những câu đùa nhẹ nhàng, duyên dáng liên quan đến công nghệ."
};

// Hàm tiện ích để lấy chỉ thị tone giọng
const getToneInstruction = (toneName) => {
  // Nếu user không truyền lên hoặc truyền sai, mặc định trả về "Chuyên nghiệp"
  return TONE_MAPPER[toneName] || TONE_MAPPER["Chuyên nghiệp"];
};

module.exports = {
  TONE_MAPPER,
  getToneInstruction
};