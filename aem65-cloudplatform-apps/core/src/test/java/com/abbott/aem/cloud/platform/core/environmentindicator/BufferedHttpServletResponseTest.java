package com.abbott.aem.cloud.platform.core.environmentindicator;

import org.apache.sling.api.SlingHttpServletResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.nio.charset.StandardCharsets;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith({MockitoExtension.class})
class BufferedHttpServletResponseTest {

    private HttpServletResponse wrappedResponse;
    private BufferedHttpServletResponse bufferedResponse;

    @BeforeEach
    public void setUp() throws IOException {
        wrappedResponse = mock(SlingHttpServletResponse.class);
        bufferedResponse = new BufferedHttpServletResponse(wrappedResponse);
    }

    @Test
    void testBufferedServletOutputInstance() throws IOException {
       bufferedResponse = new BufferedHttpServletResponse(wrappedResponse, null, null);
       assertNull(bufferedResponse.getBufferedServletOutput().getWriter());
    }

    @Test
    void testGetOutputStream() throws IOException {
        // Assert
        assertNotNull(bufferedResponse.getOutputStream());
    }

    @Test
    void testGetOutputStream_mockServletOutputStream() throws IOException {
        ServletOutputStream servletOutputStream = mock(ServletOutputStream.class);
        when(wrappedResponse.getOutputStream()).thenReturn(servletOutputStream);

        bufferedResponse = new BufferedHttpServletResponse(wrappedResponse, null, null);
        assertEquals(wrappedResponse.getOutputStream(), bufferedResponse.getOutputStream());
    }

    @Test
    void testGetOutputStream_exception() throws IOException {
        bufferedResponse.getBufferedServletOutput().getWriter().write("test");
        assertThrows(IllegalStateException.class, () -> bufferedResponse.getOutputStream());
    }

    @Test
    void testGetWriter() throws IOException {
        // Assert
        assertNotNull(bufferedResponse.getWriter());
    }

    @Test
    void testGetWriter_exception() throws IOException {
        bufferedResponse.getBufferedServletOutput().getOutputStream().flush();
        assertThrows(IllegalStateException.class,  () -> bufferedResponse.getBufferedServletOutput().getWriter());
    }

    @Test
    void testFlushBuffer() throws IOException {
        // Act
        bufferedResponse.flushBuffer();

        // Assert
        assertFalse(bufferedResponse.getBufferedServletOutput().hasPendingData());
    }

    @Test
    void testResetBuffer() {
        // Act
        bufferedResponse.resetBuffer();

        // Assert
        assertEquals(0, bufferedResponse.getBufferedServletOutput().getBufferedString().length());
    }

    @Test
    void testClose_writer() throws IOException {
        PrintWriter mockPrintWriter = mock(PrintWriter.class);
        when(wrappedResponse.getWriter()).thenReturn(mockPrintWriter);

        PrintWriter printWriter = bufferedResponse.getBufferedServletOutput().getWriter();
        printWriter.write("Test Output");
        printWriter.flush();
        printWriter.close();

        // Act
        bufferedResponse.flushBuffer();
        bufferedResponse.close();

        // Assert
        verify(mockPrintWriter, times(1)).write("Test Output");
    }

    @Test
    void testClose_outputStream() throws IOException {
        ServletOutputStream servletOutputStream = mock(ServletOutputStream.class);
        when(wrappedResponse.getOutputStream()).thenReturn(servletOutputStream);

        ServletOutputStream outputStream = bufferedResponse.getBufferedServletOutput().getOutputStream();
        outputStream.write("Test Output".getBytes());
        outputStream.flush();
        outputStream.close();

        // Act
        bufferedResponse.close();

        // Assert
        verify(wrappedResponse, times(1)).getOutputStream();
        verify(servletOutputStream, times(1)).write(any());
    }

    @Test
    void testSetFlushBufferOnClose() throws IOException {
        // Act
        bufferedResponse.setFlushBufferOnClose(true);
        bufferedResponse.close();
        // Assert
        assertEquals(0, bufferedResponse.getBufferSize());
    }


    @Test
    void getBufferedString_exceptionOutputStream() throws IOException {
        bufferedResponse.getBufferedServletOutput().getOutputStream().flush();
        assertThrows(IllegalStateException.class,  () -> bufferedResponse.getBufferedServletOutput().getBufferedString());
    }

    @Test
    void getBufferedString_exceptionWriter() throws IOException {
        bufferedResponse = new BufferedHttpServletResponse(wrappedResponse, null, null);
        bufferedResponse.getBufferedServletOutput().flushBuffer();

        assertThrows(IllegalStateException.class, () -> bufferedResponse.getBufferedServletOutput().getBufferedString());
    }

    @Test
    void testBufferedBytes() throws IOException {
        ServletOutputStream outputStream = bufferedResponse.getBufferedServletOutput().getOutputStream();
        outputStream.write("Test Output".getBytes());
        outputStream.flush();
        outputStream.close();

        byte[] actual = bufferedResponse.getBufferedServletOutput().getBufferedBytes();
        assertEquals("Test Output", new String(actual, StandardCharsets.UTF_8));
    }

    @Test
    void testBufferedBytes_exception_alreadyWritten() throws IOException {
        PrintWriter writer = bufferedResponse.getBufferedServletOutput().getWriter();
        writer.write("Test Output");
        writer.flush();
        writer.close();

        assertThrows(IllegalStateException.class, () -> bufferedResponse.getBufferedServletOutput().getBufferedBytes());
    }

    @Test
    void testBufferedBytes_exception() throws IOException {
        bufferedResponse = new BufferedHttpServletResponse(wrappedResponse, new StringWriter(), null);

        assertThrows(IllegalStateException.class, () -> bufferedResponse.getBufferedServletOutput().getBufferedBytes());
    }

    @Test
    void testGetWriterMethod() throws IOException {
        bufferedResponse.getOutputStream();
        assertEquals(BufferedServletOutput.ResponseWriteMethod.OUTPUTSTREAM, bufferedResponse.getBufferedServletOutput().getWriteMethod());
    }

    @Test
    void testHasPendingData() throws IOException {
        bufferedResponse.getOutputStream().toString();
        assertFalse(bufferedResponse.getBufferedServletOutput().hasPendingData());
    }

    @Test
    void testHasPendingData_writerNull() {
        bufferedResponse = new BufferedHttpServletResponse(wrappedResponse, null, null);
        assertFalse(bufferedResponse.getBufferedServletOutput().hasPendingData());
    }

    @Test
    void testIsBuffering() throws IOException {
        bufferedResponse = new BufferedHttpServletResponse(wrappedResponse, null, null);
        bufferedResponse.getBufferedServletOutput().getWriter();
        bufferedResponse.getBufferedServletOutput().flushBuffer();
        verify(wrappedResponse, times(1)).flushBuffer();
    }
}
