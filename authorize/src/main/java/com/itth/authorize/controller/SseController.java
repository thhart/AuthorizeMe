package com.itth.authorize.controller;

import com.itth.authorize.service.listener.ModelListener;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;

@RestController
@AllArgsConstructor
public class SseController {
    @Autowired
    private ModelListener modelListener;

    @GetMapping(value = "/events", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<String> handleSse() {
        return modelListener.getEvents();
    }
}
