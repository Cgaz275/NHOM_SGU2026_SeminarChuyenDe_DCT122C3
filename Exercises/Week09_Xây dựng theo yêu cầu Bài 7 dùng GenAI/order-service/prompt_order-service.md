# PROMPT: HOÀN THIỆN order-service

## 1. THÔNG TIN DỰ ÁN & BỐI CẢNH

- **Tên Service:** order-service.
- **Mục tiêu:** Xây dựng Microservice quản lý đơn hàng, lưu trữ dữ liệu vào MySQL, gọi Inventory Service thông qua Resilience4j và gửi tin nhắn đến Kafka khi đặt hàng thành công.
- **Package Root:** `com.hdbank.order_service` (Tuyệt đối tuân thủ package này).
- **Cấu trúc hiện tại:** Đã có khung project từ Spring Initializr, các file cần hoàn thiện nằm trong `src/main/java/com/hdbank/order_service/`.

## 2. TECH STACK YÊU CẦU

- **Framework:** Spring Boot 3.x.
- **Messaging:** Spring Kafka.
- **Resilience:** Resilience4j.
- **Service Discovery:** Spring Cloud Eureka Client.
- **Monitoring:** Actuator, Micrometer Registry Prometheus, Zipkin.
- **Utility:** Lombok, MapStruct.
- **Database:** Spring Data JPA, MySQL.

## 3. CẤU TRÚC THƯ MỤC

AI phải tạo code theo đúng cấu trúc phân lớp sau (package bắt đầu bằng `com.hdbank.order_service`):

- `model/`: Các Entity JPA.
- `event/`: Đối tượng OrderEvent gửi đi Kafka.
- `service/`: Interface và Class xử lý nghiệp vụ.
- `config/`: Cấu hình Kafka và Resilience4j.
- `controller/`: REST Controller để test thủ công.
- `repository/`: Các Interface Spring Data JPA.
- `dto/`: Các DTO cho API Request/Response.
- `mapper/`: Các Interface MapStruct để map giữa Entity và DTO.

## 4. CHI TIẾT CÁC FILE CẦN TẠO

### Task 1: Tạo các Entity JPA (trong package `com.hdbank.order_service.model`)

- **Order.java**: `Long id`, `String orderNumber`, `List<OrderLineItems> orderLineItemsList` (Annotation `@OneToMany`).
- **OrderLineItems.java**: `Long id`, `String skuCode`, `BigDecimal price`, `Integer quantity`.
- Sử dụng Lombok: `@Entity`, `@Getter`, `@Setter`, `@NoArgsConstructor`.

### Task 2: Tạo DTO & Event (trong package `com.hdbank.order_service.dto` và `.event`)

- **OrderRequest.java**: Chứa `List<OrderLineItemsDto>`. 
- **OrderEvent.java**: Chứa `String orderNumber`, `String message`.
- Sử dụng Lombok: `@Data`, `@AllArgsConstructor`, `@NoArgsConstructor`.

### Task 3: Tạo `OrderService.java` (trong package `com.hdbank.order_service.service`)

- Method `placeOrder(OrderRequest request)`:
  - Map `OrderRequest` sang Entity `Order`. 
  - **Inventory Check**: Sử dụng `WebClient` hoặc `RestTemplate` gọi tới `inventory-service` (giả lập). 
  - **Resilience4j**: Thêm `@CircuitBreaker(name = "inventory")` và `@Retry` cho method gọi kho. 
  - **MySQL**: Lưu đơn hàng thành công vào DB. 
  - **Kafka**: Sử dụng `KafkaTemplate` gửi `OrderEvent` tới topic `notificationTopic`.

### Task 4: Tạo `OrderController.java` (trong package `com.hdbank.order_service.controller`)

- Endpoint: `POST /api/order`. 
- Nhận `OrderRequest`, gọi `orderService.placeOrder`. 
- Trả về: HTTP 201 và String "Order Placed".

### Task 5: Tạo `KafkaProducerConfig.java` (trong package `com.hdbank.order_service.config`)
- Cấu hình `ProducerFactory` và `KafkaTemplate` để serialize `OrderEvent` thành JSON.

### Task 6: Cấu hình `application.properties`

Cung cấp nội dung file bao gồm: 
- `server.port=8081`
- `spring.application.name=order-service`
- DB: Cấu hình URL MySQL `order_db`, username/password. 
- Eureka: `eureka.client.serviceUrl.defaultZone=http://localhost:8761/eureka`. 
- Kafka: `spring.kafka.bootstrap-servers=localhost:9092`. 
- Resilience4j: Cấu hình ngưỡng lỗi (failure-rate-threshold) là 50%. 
- Actuator: Expose `health` và `prometheus`.

### Task 7: Viết Unit Test (trong thư mục `src/test/java/com/hdbank/order_service/`)

- Tạo `OrderServiceTest.java`. 
- Test case: Đặt hàng thành công và kiểm tra Kafka bắn tin nhắn.

## 5. RÀNG BUỘC ĐẦU RA

1. Chỉ cung cấp code hoàn chỉnh cho các file trên.
2. Code phải chạy được ngay, không lỗi import.
3. Sử dụng đúng Java 17+ và logic kết nối Kafka/DB.
4. Tự động thêm các Spring Annotation (@Service, @RestController, @Repository) và các Lombok Annotation (@Data, @NoArgsConstructor, @AllArgsConstructor, @Slf4j) để tối ưu mã nguồn.
