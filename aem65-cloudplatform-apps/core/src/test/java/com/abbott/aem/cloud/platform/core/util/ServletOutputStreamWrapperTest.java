package com.abbott.aem.cloud.platform.core.util;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;

import javax.servlet.WriteListener;
import java.io.IOException;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.mock;

@ExtendWith({MockitoExtension.class, AemContextExtension.class})
class ServletOutputStreamWrapperTest {

    @InjectMocks
    private ServletOutputStreamWrapper servletOutputStreamWrapper;

    private final AemContext context = new AemContext();

    @BeforeEach
    void setUp() {
        servletOutputStreamWrapper = new ServletOutputStreamWrapper(context.response().getOutputStream());
    }

    @Test
    void testIsReady() {
        assertTrue(servletOutputStreamWrapper.isReady());
    }

    @Test
    void testSetWriteListener() {
        assertThrows(UnsupportedOperationException.class, () -> servletOutputStreamWrapper.setWriteListener(null));
    }

    @Test
    void testWriteByteArray() throws IOException {
        byte[] byteArray = "Test Data".getBytes();
        servletOutputStreamWrapper.write(byteArray, 0, byteArray.length);
        assertEquals("Test Data",context.response().getOutputAsString());
    }

    @Test
    void testWriteInt() throws IOException {
        int data = 65; // ASCII code for 'A'
        servletOutputStreamWrapper.write(data);
        assertEquals("A", context.response().getOutputAsString());
    }

    @Test
    void testWriteListener() {
        // Since the implementation of setWriteListener() throws UnsupportedOperationException,
        // it is expected that the method does not support write listeners.
        WriteListener writeListener = mock(WriteListener.class);
        assertThrows(UnsupportedOperationException.class, () -> servletOutputStreamWrapper.setWriteListener(writeListener));
    }
}
