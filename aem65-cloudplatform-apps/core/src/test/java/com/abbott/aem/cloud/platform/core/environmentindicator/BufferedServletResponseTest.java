package com.abbott.aem.cloud.platform.core.environmentindicator;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.sling.testing.mock.sling.servlet.MockSlingHttpServletResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import javax.servlet.ServletOutputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.nio.charset.StandardCharsets;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@ExtendWith(AemContextExtension.class)
class BufferedServletResponseTest {

    private BufferedServletResponse bufferedResponse;

    private AemContext context = new AemContext();

    @BeforeEach
    void setUp() {
        // Initialize your BufferedServletResponse instance.
        // Create a HttpServletResponse instance using the AemContext.
        MockSlingHttpServletResponse response = context.response();
        StringWriter writer = new StringWriter();
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

        // Create a new BufferedServletResponse instance.
        bufferedResponse = new BufferedServletResponse(response, writer, outputStream);
    }

    @Test
    void testConstructorWithServletResponse() {
        assertEquals(new BufferedServletResponse(context.response()).getResponse(), context.response());
    }

    @Test
    void testGetOutputStream() throws IOException {
        // Call the getOutputStream method and write some data to it.
        ServletOutputStream outputStream = bufferedResponse.getOutputStream();
        outputStream.write("Test data".getBytes());
        outputStream.flush();

        // You can assert the content of the output stream.
        byte[] actual = bufferedResponse.getBufferedServletOutput().getBufferedBytes();
        assertEquals("Test data", new String(actual, StandardCharsets.UTF_8));
    }

    @Test
    void testGetWriter() throws IOException {
        // Call the getWriter method and write some data to it.
        PrintWriter writer = bufferedResponse.getWriter();
        writer.write("Test data");
        writer.flush();

        // You can assert the content of the writer.
        assertEquals("Test data", bufferedResponse.getBufferedServletOutput().getBufferedString());
    }

    @Test
    void testFlushBuffer() throws IOException {
        // Call the flushBuffer method
        bufferedResponse.flushBuffer();

        // Assert the behavior, e.g., check if the output is flushed to the underlying buffer.
        // All data is flushed, so no pending data upon flush
        assertFalse(bufferedResponse.getBufferedServletOutput().hasPendingData());
    }

    @Test
    void testResetBuffer() throws IOException {
        // Call the resetBuffer method
        PrintWriter writer = bufferedResponse.getWriter();
        writer.write("Test data");
        writer.flush();

        bufferedResponse.resetBuffer();

        // Assert the behavior, e.g., check if the buffer is reset.
        // Upon reset the content length will be reset to zero
        assertEquals(0, bufferedResponse.getBufferedServletOutput().getBufferedString().length());
    }

    @Test
    void testClose() throws IOException {
        // Call the close method
        bufferedResponse.getOutputStream().write("TEST".getBytes());
        bufferedResponse.close();

        // Assert the behavior, e.g., check if the output is closed.
        // OR check the response as it will only flush the response on close
        assertEquals("TEST", context.response().getOutputAsString());
    }

    @Test
    void testGetBufferedServletOutput() throws IOException {
        // Call the getBufferedServletOutput method
        BufferedServletOutput output = bufferedResponse.getBufferedServletOutput();

        // Assert the behavior, e.g., check if it returns the expected BufferedServletOutput instance.
        assertNotNull(output);
    }
}
