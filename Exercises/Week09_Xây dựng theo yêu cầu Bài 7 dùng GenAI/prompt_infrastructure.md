# PROMPT: KHỞI TẠO HẠ TẦNG DOCKER COMPOSE CHO MICROSERVICES SYSTEM

## 1. BỐI CẢNH DỰ ÁN
Tôi đang phát triển một hệ thống Microservices sử dụng Spring Boot 4.0.5 bao gồm các service:
- api-gateway
- discovery-server (Eureka)
- notification-service (Chạy cổng 8083)
- order-service

## 2. MỤC TIÊU
Tạo file `docker-compose.yml` đặt tại thư mục gốc để quản lý toàn bộ hạ tầng dùng chung (Infrastructure) giúp các service trên giao tiếp được với nhau.

## 3. DANH SÁCH CÁC CONTAINER CẦN TẠO
Hãy viết file `docker-compose.yml` bao gồm các dịch vụ sau:

### A. Message Broker (Kafka Stack)
- **Zookeeper**: Chạy cổng 2181.
- **Kafka**: 
  - Chạy cổng 9092.
  - Cấu hình `KAFKA_ADVERTISED_LISTENERS` để cả các service chạy bên trong Docker và các service chạy local (ngoài Docker bằng lệnh mvnw) đều có thể kết nối được tới `localhost:9092`.

### B. Observability (Giám sát & Tracing)
- **Zipkin**: Chạy cổng 9411 (Để thu thập trace dữ liệu).
- **Prometheus**: Chạy cổng 9090 (Để thu thập metrics từ Actuator).
  - Tự động tạo thêm file `prometheus.yml` cấu hình job scan metrics từ các service trên.

### C. Application Services (Dockerfiles) 
Hãy tự động tạo file `Dockerfile` cho từng Microservice sau:
- Thư mục: `api-gateway`, `discovery-server`, `notification-service`, `order-service`.
- Nội dung mỗi `Dockerfile`:
  - Base image: `openjdk:21` (Để khớp với bản Java bạn đang dùng trong ảnh trước).
  - Copy file `.jar` từ thư mục `target/*.jar` vào container và đổi tên thành `app.jar`.
  - Cấu hình lệnh chạy: `ENTRYPOINT ["java", "-jar", "/app.jar"]`.
  - EXPOSE đúng cổng: Gateway (8080), Discovery (8761), Notification (8083), Order (8081).

## 4. RÀNG BUỘC KỸ THUẬT
- Sử dụng `version: '3.8'`.
- Thiết lập một `networks` chung tên là `spring-microservices-network`.
- Có cấu hình `healthcheck` cho Kafka để đảm bảo nó chỉ "Ready" khi boker đã sẵn sàng.
- Các container phải có `restart: always`.

## 5. ĐẦU RA YÊU CẦU
1. File `docker-compose.yml` hoàn chỉnh.
2. File `prometheus.yml` (nếu cần thiết cho cấu hình Prometheus).
3. Hướng dẫn các lệnh Terminal để khởi động hệ thống này.