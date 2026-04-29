# PROMPT: HOÀN THIỆN discovery-server

## 1. THÔNG TIN DỰ ÁN & BỐI CẢNH
- **Tên Service:** discovery-server.
- **Mục tiêu:** Xây dựng Discovery Server để hiểu cơ chế Service Discovery trong kiến trúc microservices. Sử dụng Eureka Server để đăng ký, quản lý và cho phép các service tự động tìm thấy nhau.
- **Package Root:** `com.hdbank.discovery_server` (Tuyệt đối tuân thủ package này).
- **Cấu trúc hiện tại:** Đã có khung project, các file cần hoàn thiện nằm trong `src/main/java/com/hdbank/discovery_server/`.

## 2. TECH STACK YÊU CẦU
- **Framework:** Spring Boot.
- **Service Discovery:** Spring Cloud Netflix Eureka Server.
- **Monitoring:** Spring Boot Actuator.
- **Utility:** Lombok.
- **Deployment:** Docker.

## 3. CẤU TRÚC THƯ MỤC
AI phải tạo code theo đúng cấu trúc phân lớp sau (package bắt đầu bằng `com.hdbank.discovery_server`):
- `main/java/com/hdbank/discovery_server/`: Chứa `DiscoveryServerApplication.java`.
- `main/resources/`: Chứa `application.properties` và `banner.txt`.
- `test/java/com/hdbank/discovery_server/`: Chứa `DiscoveryServerApplicationTests.java`.

## 4. CHI TIẾT CÁC FILE CẦN TẠO

### Task 1: Khởi tạo Application Class (trong package `com.hdbank.discovery_server`)
- **DiscoveryServerApplication.java**: Thêm annotation `@EnableEurekaServer` vào class main.

### Task 2: Cấu hình `application.properties`
Cung cấp nội dung file bao gồm:
- `spring.application.name=discovery-server`.
- `server.port=8761`.
- Actuator: Expose endpoint `/actuator/health`.
- Đảm bảo hỗ trợ các service (`product-service`, `inventory-service`, `order-service`, `notification-service`, `api-gateway`) đăng ký thông qua `eureka.client.serviceUrl.defaultZone=http://localhost:8761/eureka`.


## 5. RÀNG BUỘC ĐẦU RA
1. Chỉ cung cấp code hoàn chỉnh cho các file trên.
2. Code phải chạy được ngay, không lỗi import.
3. Đảm bảo dashboard truy cập được tại `http://localhost:8761`.
4. Tự động thêm các Spring Annotation và Lombok cần thiết để tối ưu mã nguồn. 