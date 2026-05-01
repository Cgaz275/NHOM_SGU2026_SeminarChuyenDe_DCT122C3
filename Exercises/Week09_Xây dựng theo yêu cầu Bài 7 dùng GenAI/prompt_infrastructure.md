# PROMPT: KHỞI TẠO HẠ TẦNG DOCKER COMPOSE CHO MICROSERVICES SYSTEM

## 1. BỐI CẢNH DỰ ÁN

Tôi đang phát triển một hệ thống Microservices sử dụng Spring Boot 4.0.5 bao gồm các service:

- api-gateway (Cổng 8080)
- discovery-server (Eureka - Cổng 8761)
- notification-service (Cổng 8083)
- order-service (Cổng 8081)

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

**Trong file `docker-compose.yml`**, hãy định nghĩa 4 service: `discovery-server`, `api-gateway`, `order-service`, `notification-service`.

- Sử dụng cấu hình `build: ./<tên-thư-mục-service>` để Docker Compose tự build image.
- Expose đúng các cổng: 8080, 8761, 8081, 8083.
- Cấu hình biến môi trường EUREKA_CLIENT_SERVICEURL_DEFAULTZONE trỏ về `discovery-server`.
- Sử dụng `depends_on` để đảm bảo: `discovery-server` chạy trước gateway/order/notification; `kafka` chạy trước order/notification; `mysql-db` chạy trước order.

**Tạo `Dockerfile`**: Tự động tạo nội dung file `Dockerfile` (để tôi đặt vào từng thư mục service):

- Base image: `openjdk:21` (Để khớp với bản Java bạn đang dùng trong ảnh trước).
- Copy file `.jar` từ thư mục `target/*.jar` vào container và đổi tên thành `app.jar`.
- Cấu hình lệnh chạy: `ENTRYPOINT ["java", "-jar", "/app.jar"]`.
- EXPOSE đúng cổng: Gateway (8080), Discovery (8761), Notification (8083), Order (8081).

## 4. RÀNG BUỘC KỸ THUẬT

- Thiết lập một `networks` chung tên là `spring-microservices-network`.
- Có cấu hình `healthcheck` cho Kafka để đảm bảo nó chỉ "Ready" khi boker đã sẵn sàng.
- Các container phải có `restart: always`.

## 5. ĐẦU RA YÊU CẦU

1. File `docker-compose.yml` hoàn chỉnh.
2. File `prometheus.yml` (nếu cần thiết cho cấu hình Prometheus).
3. Nội dung file `Dockerfile` mẫu cho các service.
4. Hướng dẫn các lệnh Terminal để build `.jar` và khởi động hệ thống này.
