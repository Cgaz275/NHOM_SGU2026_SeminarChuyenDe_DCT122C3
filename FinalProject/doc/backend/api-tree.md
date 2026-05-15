%%{init: {"flowchart": {"curve": "linear"}}}%%
graph LR
    Base["Base URL: /api/v1"]

    %% Nhánh 1: Xác thực & User
    Base --> Auth["/auth"]
    Auth --> A1["POST /register<br>Đăng ký tài khoản"]
    Auth --> A2["POST /login<br>Đăng nhập"]
    Auth --> A3["POST /forgot-password<br>Gửi Magic Link đặt lại mật khẩu"]

    Base --> Users["/users"]
    Users --> U1["GET /me<br>Lấy profile cá nhân"]
    Users --> U2["PUT /me<br>Cập nhật profile (eKYC)"]
    Users --> U3["GET /<br>Danh sách Users (Admin)"]

    %% Nhánh 2: Cards & Config
    Base --> Cards["/cards"]
    Cards --> C1["POST /<br>Tạo thẻ mới (Auto Active)"]
    Cards --> C2["GET /:slug<br>Khách xem thẻ bằng Link/QR"]
    Cards --> C3["PUT /:cardId<br>Cập nhật thông tin/Theme"]
    Cards --> C4["GET /me<br>Lấy danh sách thẻ của User"]
    Cards --> C5["PUT /:cardId/ai-config<br>Cấu hình System Prompt & Takeover"]

    %% Nhánh 3: Tương tác & Tin nhắn
    Base --> Chat["/chat"]
    Chat --> CH1["POST /cards/:cardId/chat<br>Chat trực tiếp với AI Persona"]

    Base --> Msg["/cards/:cardId/messages"]
    Msg --> M1["POST /<br>Khách gửi tin nhắn tĩnh"]
    Msg --> M2["GET /<br>Chủ thẻ xem danh sách tin"]
    Msg --> M3["PUT /:messageId/read<br>Đánh dấu đã đọc"]

    %% Nhánh 4: Admin (Reports) & Thống kê
    Base --> Reports["/reports"]
    Reports --> R1["POST /<br>Khách gửi báo cáo vi phạm"]
    Reports --> R2["GET /<br>Xem danh sách báo cáo (Admin)"]
    Reports --> R3["PUT /:reportId/resolve<br>Xử lý vi phạm/Khóa thẻ (Admin)"]

    Base --> Analytics["/analytics"]
    Analytics --> AN1["POST /cards/:cardId/track-vcf<br>Tracking lượt tải danh bạ VCF"]
    Analytics --> AN2["GET /cards/:cardId<br>Thống kê lượt xem/quét của thẻ"]
    Analytics --> AN3["GET /global<br>Thống kê tổng (Token, Users) (Admin)"]

    %% Trang trí màu sắc
    style Base fill:#333,stroke:#fff,stroke-width:2px,color:#fff
    style Auth fill:#e1bee7,stroke:#8e24aa,stroke-width:2px
    style Users fill:#e1bee7,stroke:#8e24aa,stroke-width:2px
    style Cards fill:#bbdefb,stroke:#1e88e5,stroke-width:2px
    style Chat fill:#ffcc80,stroke:#f57c00,stroke-width:2px
    style Msg fill:#ffcc80,stroke:#f57c00,stroke-width:2px
    style Reports fill:#ffcdd2,stroke:#e53935,stroke-width:2px
    style Analytics fill:#c8e6c9,stroke:#43a047,stroke-width:2px