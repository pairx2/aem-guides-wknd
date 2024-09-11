package com.abbott.aem.cloud.platform.core.util;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;

import javax.servlet.ServletOutputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.StringWriter;
import java.nio.charset.StandardCharsets;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

@ExtendWith({MockitoExtension.class, AemContextExtension.class})
class BufferedServletOutputTest {

    @InjectMocks
    private BufferedServletOutput bufferedServletOutput;

    private final AemContext context = new AemContext();

    @BeforeEach
    void setUp() {
        bufferedServletOutput = new BufferedServletOutput(context.response());
    }

    @Test
    void testGetOutputStream() throws IOException {
        ServletOutputStream outputStream = bufferedServletOutput.getOutputStream();
        assertNotNull(outputStream);
    }

    @Test
    void testGetOutputStream_whenServletOutputStreamIsNull() throws IOException {
        BufferedServletOutput output = new BufferedServletOutput(context.response(), new StringWriter(), null);
        output.getOutputStream();

        //it will always return ServletOutputStream from context.response()
        assertEquals(output.getOutputStream(), context.response().getOutputStream());
    }

    @Test
    void testGetOutputStream_whenIllegalStateException() throws IOException {
        bufferedServletOutput.getWriter();
        assertThrows(IllegalStateException.class, () -> bufferedServletOutput.getOutputStream());
    }

    @Test
    void testGetWriter() throws IOException {
        BufferedServletOutput.ResponseWriteMethod writerMethod = bufferedServletOutput.getWriteMethod();

        bufferedServletOutput.getWriter();
        assertNull(writerMethod);
        assertEquals(BufferedServletOutput.ResponseWriteMethod.WRITER, bufferedServletOutput.getWriteMethod());
    }

    @Test
    void testGetWriter_whenPrintWriterIsNull() throws IOException {
        BufferedServletOutput output = new BufferedServletOutput(context.response(), null, new ByteArrayOutputStream());
        output.getWriter();

        //it will always return PrintWriter from context.response()
        assertEquals(output.getWriter(), context.response().getWriter());
    }

    @Test
    void testGetWriteMethod_whenIllegalStateException() throws IOException {
        bufferedServletOutput.getOutputStream().write("Test".getBytes());
        assertThrows(IllegalStateException.class, () -> bufferedServletOutput.getWriter());
    }

    @Test
    void testGetWriteMethod() throws IOException {
        BufferedServletOutput.ResponseWriteMethod writerMethod = bufferedServletOutput.getWriteMethod();

        bufferedServletOutput.getWriter();
        assertNull(writerMethod);
        assertEquals(BufferedServletOutput.ResponseWriteMethod.WRITER, bufferedServletOutput.getWriteMethod());
    }

    @Test
    void testGetBufferedString() throws IOException {
        bufferedServletOutput.getWriter().write("Test String");
        assertEquals("Test String", bufferedServletOutput.getBufferedString());
    }

    @Test
    void testGetBufferedString_whenWriterIsNull() {
       BufferedServletOutput output =  new BufferedServletOutput(context.response(), null, new ByteArrayOutputStream());
       assertThrows(IllegalStateException.class, output::getBufferedString);
    }

    @Test
    void testGetBufferedString_whenIllegalStateException() throws IOException {
        bufferedServletOutput.getOutputStream().write("Test".getBytes());
        assertThrows(IllegalStateException.class, bufferedServletOutput::getBufferedString);
    }

    @Test
    void testGetBufferedBytes() throws IOException {
        ServletOutputStream outputStream = bufferedServletOutput.getOutputStream();
        outputStream.write("Test Bytes".getBytes());
        assertArrayEquals("Test Bytes".getBytes(), bufferedServletOutput.getBufferedBytes());
    }

    @Test
    void testGetBufferedBytes_whenOutputStreamIsNull() {
        BufferedServletOutput output = new BufferedServletOutput(context.response(), new StringWriter(), null);
        assertThrows(IllegalStateException.class, output::getBufferedBytes);
    }

    @Test
    void testGetBufferedBytes_whenIllegalStateException() throws IOException {
        bufferedServletOutput.getWriter().write("Test");
        assertThrows(IllegalStateException.class, bufferedServletOutput::getBufferedBytes);
    }

    @Test
    void testResetBuffer_whenWriter() throws IOException {
        bufferedServletOutput.getWriter().write("Test String");

        //it will reset the buffered content to empty
        bufferedServletOutput.resetBuffer();
        assertEquals("", bufferedServletOutput.getBufferedString());
    }

    @Test
    void testResetBuffer_whenOutputStream() throws IOException {
        bufferedServletOutput.getOutputStream().write("Test String".getBytes());
        String preResetBufferedBytes = new String(bufferedServletOutput.getBufferedBytes(), StandardCharsets.UTF_8);

        //it will reset buffered content to empty
        bufferedServletOutput.resetBuffer();
        assertEquals("Test String", preResetBufferedBytes);
        assertEquals("", new String(bufferedServletOutput.getBufferedBytes(), StandardCharsets.UTF_8));
    }

    @Test
    void testClose() throws IOException {
        ServletOutputStream outputStream = bufferedServletOutput.getOutputStream();
        outputStream.write("Test Bytes".getBytes());
        bufferedServletOutput.close();
        assertEquals("Test Bytes", context.response().getOutputAsString());
    }

    @Test
    void testFlushBuffer() throws IOException {
        //it will be false
        boolean isCommittedPreFlush = context.response().isCommitted();

        bufferedServletOutput.getWriter().write("TEST");

        // make the flush true
        bufferedServletOutput.flushBuffer();
        // it will actually flush the data based on tru flushBuffer flag
        bufferedServletOutput.close();

        assertFalse(isCommittedPreFlush);
        assertTrue(context.response().isCommitted());
    }
}
