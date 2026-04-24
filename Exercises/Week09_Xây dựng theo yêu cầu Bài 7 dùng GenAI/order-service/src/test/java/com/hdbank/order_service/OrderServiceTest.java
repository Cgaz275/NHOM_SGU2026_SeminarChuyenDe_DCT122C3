package com.hdbank.order_service;

import com.hdbank.order_service.dto.OrderLineItemsDto;
import com.hdbank.order_service.dto.OrderRequest;
import com.hdbank.order_service.event.OrderEvent;
import com.hdbank.order_service.mapper.OrderMapper;
import com.hdbank.order_service.model.Order;
import com.hdbank.order_service.repository.OrderRepository;
import com.hdbank.order_service.service.OrderService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.math.BigDecimal;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class OrderServiceTest {

    @Mock
    private OrderRepository orderRepository;

    @Mock
    private OrderMapper orderMapper;

    @Mock
    private WebClient.Builder webClientBuilder;

    @Mock
    private KafkaTemplate<String, Object> kafkaTemplate;

    @Mock
    private WebClient webClient;

    @Mock
    @SuppressWarnings("rawtypes")
    private WebClient.RequestHeadersUriSpec requestHeadersUriSpec;

    @Mock
    @SuppressWarnings("rawtypes")
    private WebClient.RequestHeadersSpec requestHeadersSpec;

    @Mock
    private WebClient.ResponseSpec responseSpec;

    @InjectMocks
    private OrderService orderService;

    @BeforeEach
    @SuppressWarnings("unchecked")
    void setUp() {
        when(webClientBuilder.build()).thenReturn(webClient);
        when(webClient.get()).thenReturn(requestHeadersUriSpec);
        when(requestHeadersUriSpec.uri(anyString())).thenReturn(requestHeadersSpec);
        when(requestHeadersSpec.retrieve()).thenReturn(responseSpec);
        when(responseSpec.bodyToMono(Boolean.class)).thenReturn(Mono.just(true));
    }

    @Test
    void placeOrder_Success_SendsKafkaMessage() {
        // Arrange
        OrderRequest request = new OrderRequest(List.of(
                new OrderLineItemsDto(null, "IPHONE_13", BigDecimal.valueOf(1200), 1)
        ));

        when(orderMapper.mapToModel(any())).thenReturn(new com.hdbank.order_service.model.OrderLineItems());

        // Act
        String result = orderService.placeOrder(request);

        // Assert
        assertEquals("Order Placed Successfully", result);
        verify(orderRepository, times(1)).save(any(Order.class));

        ArgumentCaptor<OrderEvent> eventCaptor = ArgumentCaptor.forClass(OrderEvent.class);
        verify(kafkaTemplate, times(1)).send(eq("notificationTopic"), eventCaptor.capture());

        OrderEvent capturedEvent = eventCaptor.getValue();
        assertEquals("Order Placed Successfully", capturedEvent.getMessage());
    }
}
