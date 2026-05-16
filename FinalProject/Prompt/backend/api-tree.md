%%{init: {"flowchart": {"curve": "linear"}}}%%
graph LR
    Base["Base URL: /api/v1"]

    %% Nhánh 1: Xác thực & User
    Base --> Auth["/auth"]
    Auth --> A1["POST /register<br>Đăng ký tài khoản"]
    Auth --> A2["POST /login<br>Đăng nhập"]
    Auth --> A3["POST /forgot-password<br>Quên mật khẩu"]

    Base --> Users["/users"]
    Users --> U1["GET /me<br>Lấy profile cá nhân"]
    Users --> U2["PUT /me<br>Cập nhật profile"]
    Users --> U3["GET /<br>Danh sách Users (Admin)"]
    Users --> U4["PUT /:id/status<br>Khóa/Mở User (Admin)"]

    %% Nhánh 2: Cards & Config
    Base --> Cards["/cards"]
    Cards --> C1["POST /<br>Tạo thẻ mới"]
    Cards --> C2["GET /:slug<br>Xem thẻ (Public)"]
    Cards --> C3["PUT /:cardId<br>Cập nhật thông tin/Theme"]
    Cards --> C4["GET /me<br>Lấy danh sách thẻ"]
    Cards --> C5["DELETE /:cardId<br>Xóa thẻ (Soft Delete)"]
    Cards --> C6["PUT /:cardId/ai-config<br>Cấu hình AI"]
    Cards --> C7["PUT /:cardId/takeover<br>Tạm dừng AI"]

    %% Nhánh 3: Tương tác & Tin nhắn
    Base --> Chat["/chat"]
    Chat --> CH1["POST /cards/:cardId/chat<br>Chat với AI Persona"]

    Base --> Msg["/messages"]
    Msg --> M1["POST /cards/:cardId<br>Gửi tin nhắn tĩnh (Public)"]
    Msg --> M2["GET /cards/:cardId<br>Xem danh sách tin"]
    Msg --> M3["PUT /:messageId/read<br>Đánh dấu đã đọc"]
    Msg --> M4["DELETE /:messageId<br>Xóa tin nhắn"]

    %% Nhánh 4: Admin (Reports) & Thống kê
    Base --> Reports["/reports"]
    Reports --> R1["POST /<br>Gửi báo cáo (Public)"]
    Reports --> R2["GET /<br>Xem danh sách (Admin)"]
    Reports --> R3["PUT /:reportId/resolve<br>Xử lý vi phạm (Admin)"]

    Base --> Analytics["/analytics"]
    Analytics --> AN1["POST /cards/:cardId/track-vcf<br>Tracking tải VCF"]
    Analytics --> AN2["GET /cards/:cardId<br>Thống kê thẻ"]
    Analytics --> AN3["GET /global<br>Thống kê tổng (Admin)"]

    %% Trang trí màu sắc
    style Base fill:#333,stroke:#fff,stroke-width:2px,color:#fff
    style Auth fill:#e1bee7,stroke:#8e24aa,stroke-width:2px
    style Users fill:#e1bee7,stroke:#8e24aa,stroke-width:2px
    style Cards fill:#bbdefb,stroke:#1e88e5,stroke-width:2px
    style Chat fill:#ffcc80,stroke:#f57c00,stroke-width:2px
    style Msg fill:#ffcc80,stroke:#f57c00,stroke-width:2px
    style Reports fill:#ffcdd2,stroke:#e53935,stroke-width:2px
    style Analytics fill:#c8e6c9,stroke:#43a047,stroke-width:2px