package com.abbott.aem.cloud.platform.core.util;

import org.apache.sling.api.SlingHttpServletResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.StringWriter;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;

@ExtendWith({ MockitoExtension.class })
class BufferedSlingHttpServletResponseTest {

	private SlingHttpServletResponse wrappedResponse;
	private BufferedSlingHttpServletResponse bufferedResponse;

	@BeforeEach
	public void setUp() throws IOException {
		wrappedResponse = mock(SlingHttpServletResponse.class);
		bufferedResponse = new BufferedSlingHttpServletResponse(wrappedResponse);
	}

	@Test
	void testConstructor() throws IOException {
		ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
		wrappedResponse = mock(SlingHttpServletResponse.class);
		bufferedResponse = new BufferedSlingHttpServletResponse(wrappedResponse, new StringWriter(),
				byteArrayOutputStream);
		assertNotNull(bufferedResponse.getBufferedServletOutput().getOutputStream());
	}

	@Test
	void testConstructor1() throws IOException {
		wrappedResponse = mock(SlingHttpServletResponse.class);
		bufferedResponse = new BufferedSlingHttpServletResponse(wrappedResponse, null, null);
		assertNull(bufferedResponse.getBufferedServletOutput().getOutputStream());
	}

	@Test
	void testGetOutputStream() throws IOException {
		ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
		assertNotNull(bufferedResponse.getOutputStream());
	}

	@Test
	void testGetWriter() throws IOException {
		assertNotNull(bufferedResponse.getWriter());
	}

	@Test
	void testFlushBuffer() throws IOException {
		bufferedResponse.flushBuffer();
		assertNotNull(bufferedResponse.getBufferedServletOutput().getBufferedBytes());
	}

	@Test
	void testResetBuffer() {
		bufferedResponse.resetBuffer();
		assertEquals(0, bufferedResponse.getBufferedServletOutput().getBufferedString().length());
	}

	@Test
	void testClose() throws IOException {
		bufferedResponse.close();
		assertNotNull(bufferedResponse.getBufferedServletOutput().getBufferedBytes());
	}

}
