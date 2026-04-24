package com.hdbank.order_service.service;

import com.hdbank.order_service.dto.OrderRequest;
import com.hdbank.order_service.event.OrderEvent;
import com.hdbank.order_service.mapper.OrderMapper;
import com.hdbank.order_service.model.Order;
import com.hdbank.order_service.repository.OrderRepository;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import io.github.resilience4j.retry.annotation.Retry;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderMapper orderMapper;
    private final WebClient.Builder webClientBuilder;
    private final KafkaTemplate<String, Object> kafkaTemplate;

    @CircuitBreaker(name = "inventory", fallbackMethod = "fallbackMethod")
    @Retry(name = "inventory")
    public String placeOrder(OrderRequest orderRequest) {
        Order order = new Order();
        order.setOrderNumber(UUID.randomUUID().toString());

        order.setOrderLineItemsList(
                orderRequest.getOrderLineItemsDtoList()
                        .stream()
                        .map(orderMapper::mapToModel)
                        .toList()
        );

        log.info("Calling inventory service to check stock");
        // Giả lập gọi inventory-service
        Boolean isStock = webClientBuilder.build().get()
                .uri("http://inventory-service/api/inventory")
                .retrieve()
                .bodyToMono(Boolean.class)
                .block();

        if (Boolean.FALSE.equals(isStock)) {
            throw new IllegalArgumentException("Product is not in stock, please try again later");
        }

        orderRepository.save(order);
        log.info("Order Saved");

        kafkaTemplate.send("notificationTopic", new OrderEvent(order.getOrderNumber(), "Order Placed Successfully"));

        return "Order Placed Successfully";
    }

    public String fallbackMethod(OrderRequest orderRequest, RuntimeException runtimeException) {
        log.info("Cannot Place Order. Executing Fallback logic: {}", runtimeException.getMessage());
        return "Oops! Something went wrong, please order after some time!";
    }
}
