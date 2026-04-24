package com.hdbank.notification_service.service;

import com.hdbank.notification_service.event.OrderEvent;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;

public class NotificationServiceTest {

    private final NotificationService notificationService = new NotificationService();

    @Test
    public void testProcessNotification() {
        // Prepare valid event
        OrderEvent event = new OrderEvent("ORD-12345", "Test Message");

        // Verify that the method runs successfully without throwing NullPointerException
        assertDoesNotThrow(() -> notificationService.processNotification(event), 
                "processNotification should not throw any exception when given a valid event");
    }

    @Test
    public void testProcessNotification_NullOrderNumber() {
        // Prepare event with null fields
        OrderEvent event = new OrderEvent(null, null);

        // Verify that the method runs successfully and handles null fields gracefully
        assertDoesNotThrow(() -> notificationService.processNotification(event), 
                "processNotification should not throw NullPointerException even if fields are null");
    }
}
