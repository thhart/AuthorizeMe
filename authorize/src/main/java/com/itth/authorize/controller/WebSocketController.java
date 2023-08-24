package com.itth.authorize.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class WebSocketController {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/update-model")
    public void updateModel(String message) {
        // Process the message (if needed)
        // Send a message to the subscribed topic
        messagingTemplate.convertAndSend("/topic/model-updated", message);
    }
}