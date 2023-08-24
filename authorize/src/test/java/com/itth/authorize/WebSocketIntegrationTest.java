package com.itth.authorize;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.messaging.converter.StringMessageConverter;
import org.springframework.messaging.simp.stomp.StompFrameHandler;
import org.springframework.messaging.simp.stomp.StompHeaders;
import org.springframework.messaging.simp.stomp.StompSession;
import org.springframework.messaging.simp.stomp.StompSessionHandlerAdapter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.web.socket.client.standard.StandardWebSocketClient;
import org.springframework.web.socket.messaging.WebSocketStompClient;
import org.springframework.web.socket.sockjs.client.SockJsClient;
import org.springframework.web.socket.sockjs.client.WebSocketTransport;

import java.lang.reflect.Type;
import java.util.Collections;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.TimeUnit;

import static org.junit.Assert.assertEquals;


@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class WebSocketIntegrationTest {

    @LocalServerPort
    private int port;

    private WebSocketStompClient stompClient;
    private StompSession stompSession;

    @Before
    public void setup() throws Exception {
        this.stompClient = new WebSocketStompClient(new SockJsClient(
                Collections.singletonList(new WebSocketTransport(new StandardWebSocketClient()))));
        this.stompClient.setMessageConverter(new StringMessageConverter()); // Use StringMessageConverter
        this.stompSession = stompClient.connect("ws://localhost:" + port + "/websocket-endpoint", new StompSessionHandlerAdapter() {}).get(8, TimeUnit.SECONDS);
    }

    @Test
    public void testWebSocketConnection() throws Exception {
        // Subscribe to a topic
        BlockingQueue<String> blockingQueue = new LinkedBlockingQueue<>();
//        stompSession.subscribe("/topic/model-updated", new DefaultStompFrameHandler(blockingQueue));
        stompSession.subscribe("/topic/model-updated", new DefaultStompFrameHandler(blockingQueue));

        stompSession.send("/app/update-model", "Test Message");

        // Assert that the message is received
        assertEquals("Test Message", blockingQueue.poll(2, TimeUnit.SECONDS));
    }

    private class DefaultStompFrameHandler implements StompFrameHandler {
        private final BlockingQueue<String> blockingQueue;

        public DefaultStompFrameHandler(BlockingQueue<String> blockingQueue) {
            this.blockingQueue = blockingQueue;
        }

        @Override
        public Type getPayloadType(StompHeaders headers) {
            return String.class;
        }

        @Override
        public void handleFrame(StompHeaders headers, Object payload) {
            blockingQueue.offer((String) payload);
        }
    }
}
