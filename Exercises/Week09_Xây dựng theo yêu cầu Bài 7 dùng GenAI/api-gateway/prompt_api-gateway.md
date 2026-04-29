# PROMPT: HOÀN THIỆN api-gateway

## 1. THÔNG TIN DỰ ÁN & BỐI CẢNH
- **Tên Service:** api-gateway.
- **Mục tiêu:** Xây dựng API Gateway sử dụng Spring Cloud Gateway để định tuyến các request từ client đến các service tương ứng. Tích hợp với Eureka Discovery Server để tìm/định tuyến động và tích hợp Actuator cùng Prometheus để giám sát hệ thống.
- **Package Root:** `com.hdbank.api_gateway` (Tuyệt đối tuân thủ package này).
- **Cấu trúc hiện tại:** Đã có khung project, các file cần hoàn thiện nằm trong `src/main/java/com/hdbank/api_gateway/`.

## 2. TECH STACK YÊU CẦU
- **Framework:** Spring Boot.
- **API Gateway:** Spring Cloud Gateway.
- **Service Discovery:** Spring Cloud Eureka Client.
- **Monitoring:** Spring Boot Actuator, Micrometer Registry Prometheus.
- **Utility:** Lombok.
- **Deployment:** Docker.

## 3. CẤU TRÚC THƯ MỤC
AI phải tạo code theo đúng cấu trúc phân lớp sau (package bắt đầu bằng `com.hdbank.api_gateway`):
- `config/`: Chứa các file cấu hình.
- `filter/`: Chứa các custom filter.
- `main/java/com/hdbank/api_gateway/`: Chứa `ApiGatewayApplication.java`.
- `main/resources/`: Chứa `application.properties` và `banner.txt`.

## 4. CHI TIẾT CÁC FILE CẦN TẠO

### Task 1: Khởi tạo Application Class (trong package `com.hdbank.api_gateway`)
- **ApiGatewayApplication.java**: Khai báo class main của Spring Boot.

### Task 2: Cấu hình `application.properties`
Cung cấp nội dung file bao gồm:
- `spring.application.name=api-gateway`.
- Eureka: `eureka.client.serviceUrl.defaultZone=http://localhost:8761/eureka`. Gateway phải tự động tìm địa chỉ của các service thông qua Eureka.
- **Cấu hình Routing**:
  - Route `/api/product/**` đến `product-service`.
  - Route `/api/order/**` đến `order-service`.
  - Route `/api/inventory/**` đến `inventory-service`.
- **Actuator & Prometheus**:
  - Expose Health check: `/actuator/health`.
  - Expose Metrics: `/actuator/prometheus`.


### Task 4: Phần mở rộng (Nếu có thời gian)
- Thêm Global Filter để log request
- Thêm Rate Limiting
- Thêm JWT Authentication

## 5. RÀNG BUỘC ĐẦU RA
1. Chỉ cung cấp code hoàn chỉnh cho các file trên.
2. Code phải chạy được ngay, không lỗi import và định tuyến chính xác.
3. Expose đầy đủ endpoint cho Actuator và Prometheus.
4. Tự động thêm các Spring Annotation và Lombok cần thiết để tối ưu mã nguồn.