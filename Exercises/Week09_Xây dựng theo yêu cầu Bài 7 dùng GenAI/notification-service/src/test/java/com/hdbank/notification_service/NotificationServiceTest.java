package com.hdbank.notification_service;

import com.hdbank.notification_service.event.OrderEvent;
import com.hdbank.notification_service.service.NotificationService;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;

public class NotificationServiceTest {

    private final NotificationService notificationService = new NotificationService();

    @Test
    public void testProcessNotification_ValidEvent() {
        OrderEvent event = new OrderEvent("ORD-12345", "Test Message");
        assertDoesNotThrow(() -> notificationService.processNotification(event), 
                "processNotification should not throw any exception when given a valid event");
    }

    @Test
    public void testProcessNotification_NullFields() {
        OrderEvent event = new OrderEvent(null, null);
        assertDoesNotThrow(() -> notificationService.processNotification(event), 
                "processNotification should not throw exception even if fields are null");
    }

    @Test
    public void testProcessNotification_NullEvent() {
        assertDoesNotThrow(() -> notificationService.processNotification(null), 
                "processNotification should handle null event gracefully without throwing NullPointerException");
    }
}
