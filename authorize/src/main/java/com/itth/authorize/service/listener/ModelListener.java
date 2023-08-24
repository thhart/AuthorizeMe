package com.itth.authorize.service.listener;

import jakarta.persistence.PostPersist;
import jakarta.persistence.PostRemove;
import jakarta.persistence.PostUpdate;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEvent;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Sinks;

import java.time.Duration;

@Service
@Log4j2
public class ModelListener {
    @Autowired
    private ApplicationEventPublisher eventPublisher;
    private static Sinks.Many<String> sink = Sinks.many().multicast().onBackpressureBuffer();
    
    @PostUpdate
    @PostPersist
    @PostRemove
    public void postUpdate(Object object) {
        log.info("Object updated: " + object);
        sink.emitNext(String.valueOf(System.currentTimeMillis()), (signalType, emitResult) -> false);
        eventPublisher.publishEvent(new ApplicationEvent(object) {
            @Override
            public Object getSource() {
                return object;
            }
        });
    }

    public Flux<String> getEvents() {
        return sink.asFlux().sample(Duration.ofMillis(512));
    }
}
