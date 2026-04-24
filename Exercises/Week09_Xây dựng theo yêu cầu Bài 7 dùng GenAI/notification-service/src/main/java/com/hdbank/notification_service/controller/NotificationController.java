package com.hdbank.notification_service.controller;

import com.hdbank.notification_service.event.OrderEvent;
import com.hdbank.notification_service.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    @GetMapping("/test-log")
    public String testLog() {
        OrderEvent testEvent = new OrderEvent("TEST-001", "This is a test notification");
        notificationService.processNotification(testEvent);
        return "Test log triggered successfully. Please check the console!";
    }
}
