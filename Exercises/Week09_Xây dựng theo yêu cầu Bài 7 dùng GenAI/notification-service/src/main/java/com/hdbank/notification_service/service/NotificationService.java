package com.hdbank.notification_service.service;

import com.hdbank.notification_service.event.OrderEvent;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class NotificationService {

    public void processNotification(OrderEvent event) {
        if (event == null) {
            log.warn("Received null notification event");
            return;
        }
        log.info("Received notification for order: {}", event.getOrderNumber());
        System.out.println("Sending email for order: " + event.getOrderNumber());
    }
}
