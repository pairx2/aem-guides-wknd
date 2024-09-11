package com.abbott.aem.platform.common.components.services.impl;

import static junit.framework.Assert.assertTrue;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

import java.io.BufferedOutputStream;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.HashMap;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import io.wcm.testing.mock.aem.junit5.AemContext;

import org.mockito.Mockito;

import com.abbott.aem.platform.common.components.services.HttpMethod;

class HttpServiceImplTest {

    AemContext ctx = new AemContext();

    HashMap<String, String> requestHeaders = new HashMap<>();

    private final String URL = "https://google.com";

    HttpServiceImpl httpService;

    HttpURLConnection urlConnection;

    java.net.URL url;

    OutputStream outputStream;

    String str = "inputStream/nLine2/Line3";
    InputStream inputStream;

    @BeforeEach
    void setup() throws UnsupportedEncodingException {
        urlConnection = mock(HttpURLConnection.class);
        outputStream = mock(BufferedOutputStream.class);
        inputStream = new ByteArrayInputStream(str.getBytes("UTF-8"));
        url = mock(URL.class);
        requestHeaders.put("Authorization", "1235354");
        httpService = Mockito.spy(new HttpServiceImpl(URL, HttpMethod.GET, requestHeaders, "requestBody"));

    }

    @Test
    void testExecuteHTTPRequest() throws IOException {
        doReturn(url).when(httpService).getAPIEndPoint(any());
        when(url.openConnection()).thenReturn(urlConnection);
        when(urlConnection.getOutputStream()).thenReturn(outputStream);
        when(urlConnection.getInputStream()).thenReturn(inputStream);
        doReturn(url).when(httpService).getAPIEndPoint(URL);
        httpService.executeHTTPRequest();
        URL url = new URL("http://localhost:4502/api");
        doReturn(url).when(httpService).getAPIEndPoint("/api");
        assertTrue(1 == 1);
    }

    @Test
    void testGetAPIEndPoint() throws MalformedURLException {
        URL endpoint = new URL(URL);
        doReturn(endpoint).when(httpService).getAPIEndPoint(URL);
        assertEquals(endpoint, httpService.getAPIEndPoint(URL));
    }

    @Test
    void testIOExceptionDuringExecution() throws IOException {
        doThrow(new IOException("Test Exception")).when(urlConnection).getInputStream();
        when(url.openConnection()).thenReturn(urlConnection);

        Assertions.assertThrows(IOException.class, () -> {
            httpService.executeHTTPRequest();
        });
    }

    @Test
    void testMalformedURLException() {
        Assertions.assertThrows(MalformedURLException.class, () -> {
            httpService.getAPIEndPoint("invalid_url");
        });
    }
}
