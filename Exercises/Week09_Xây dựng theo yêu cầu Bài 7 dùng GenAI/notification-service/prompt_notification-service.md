# PROMPT: HOÀN THIỆN notification_service

## 1. THÔNG TIN DỰ ÁN & BỐI CẢNH

- **Tên Service:** notification_service.
- **Mục tiêu:** Xây dựng Event-Driven Microservices nhận message từ Kafka khi có đơn hàng mới và giả lập gửi thông báo.
- **Package Root:** `com.hdbank.notification_service` (Tuyệt đối tuân thủ package này).
- **Cấu trúc hiện tại:** Đã có khung project từ Spring Initializr, các file cần hoàn thiện nằm trong `src/main/java/com/hdbank/notification_service/`.

## 2. TECH STACK YÊU CẦU

- **Framework:** Spring Boot 3.x.
- **Messaging:** Spring Kafka.
- **Service Discovery:** Spring Cloud Eureka Client.
- **Monitoring:** Actuator, Micrometer Registry Prometheus.
- **Tracing:** Micrometer Tracing (Zipkin).
- **Utility:** Lombok.

## 3. CẤU TRÚC THƯ MỤC

AI phải tạo code theo đúng cấu trúc phân lớp sau (package bắt đầu bằng `com.hdbank.notification_service`):

- `config/`: Chứa cấu hình Kafka.
- `event/`: Chứa DTO (Data Transfer Object) và Kafka Consumer (Listener).
- `service/`: Chứa Logic xử lý thông báo.

## 4. CHI TIẾT CÁC FILE CẦN TẠO

### Task 1: Tạo DTO `OrderEvent.java` (trong package `com.hdbank.notification_service.event`)

- Các field: `String orderNumber`, `String message`.
- Sử dụng Lombok: `@Data`, `@AllArgsConstructor`, `@NoArgsConstructor`.

### Task 2: Tạo `NotificationService.java` (trong package `com.hdbank.notification_service.service`)

- Chứa method `processNotification(OrderEvent event)`:
  - Thực hiện: `log.info("Received notification for order: {}", event.getOrderNumber())`.
  - Giả lập gửi email: In ra console "Sending email for order: {}".

### Task 3: Hoàn thiện `OrderEventConsumer.java` (trong package `com.hdbank.notification_service.event`)

- Sử dụng `@KafkaListener(topics = "notificationTopic", groupId = "notification-group")`.
- Nhận message kiểu `OrderEvent` và gọi `NotificationService.processNotification(event)` để xử lý.

### Task 4: Tạo `KafkaConsumerConfig.java` (trong package `com.hdbank.notification_service.config`)

- Cấu hình ConcurrentKafkaListenerContainerFactory.

- Thiết lập DefaultKafkaConsumerFactory sử dụng JsonDeserializer cho phần Value để tự động convert message về object OrderEvent.

- Đảm bảo cấu hình TRUSTED_PACKAGES là "\*" hoặc com.hdbank.notification_service.event.

### Task 5: Cấu hình `application.properties`

Cung cấp nội dung file bao gồm:

- `server.port=8083`
- `spring.application.name=notification_service`
- Eureka: `eureka.client.serviceUrl.defaultZone=http://localhost:8761/eureka`.
- Kafka:
  `spring.kafka.bootstrap-servers=localhost:9092`
  `spring.kafka.consumer.group-id=notification-group`
  `spring.kafka.consumer.auto-offset-reset=earliest`
  `spring.kafka.consumer.key-deserializer=org.apache.kafka.common.serialization.StringDeserializer`
  `spring.kafka.consumer.value-deserializer=org.springframework.kafka.support.serializer.JsonDeserializer`
  `spring.kafka.consumer.properties.spring.json.trusted.packages=*`
- Actuator: Expose endpoint `/actuator/health` và `/actuator/prometheus`.
- Tracing: Cấu hình Zipkin tại `http://localhost:9411`.

### Task 6: Tạo REST Controller để test thủ công (trong package `com.hdbank.notification_service.controller`)
- Tạo `NotificationController.java`.
- Viết 1 endpoint `@GetMapping("/test-log")` để khi gọi qua trình duyệt, nó sẽ tự gọi `NotificationService` in ra một dòng log giả lập. Việc này giúp tôi kiểm tra service có hoạt động mà không cần chờ message từ Kafka.

### Task 7: Viết Unit Test (trong thư mục `src/test/java/com/hdbank/notification_service/`)
- Tạo file `NotificationServiceTest.java`.
- Viết test case để đảm bảo method `processNotification` chạy đúng và không bị lỗi null pointer.

## 5. RÀNG BUỘC ĐẦU RA

1. Chỉ cung cấp code hoàn chỉnh cho các file trên.
2. Code phải chạy được ngay, không lỗi import.
3. Sử dụng đúng Java 17+ và cú pháp Spring Boot mới nhất.
4. Tự động thêm `@Service`, `@Configuration`, `@Component`, `@Slf4j` vào các lớp tương ứng.
