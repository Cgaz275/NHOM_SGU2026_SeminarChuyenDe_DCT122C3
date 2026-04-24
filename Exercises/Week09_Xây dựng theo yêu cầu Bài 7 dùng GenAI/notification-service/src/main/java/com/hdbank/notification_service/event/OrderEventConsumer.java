package com.hdbank.notification_service.event;

import com.hdbank.notification_service.service.NotificationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class OrderEventConsumer {

    private final NotificationService notificationService;

    @KafkaListener(topics = "notificationTopic", groupId = "notification-group")
    public void consume(OrderEvent event) {
        log.info("Consumed OrderEvent: {}", event);
        notificationService.processNotification(event);
    }
}
