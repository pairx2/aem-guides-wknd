package com.abbott.aem.bts.cybersecurity.services.impl;

import com.abbott.aem.bts.cybersecurity.services.impl.HttpServiceImpl.HttpMethod;
import io.wcm.testing.mock.aem.junit5.AemContext;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.HashMap;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class HttpServiceImplTest {

    AemContext ctx = new AemContext();

    HashMap<String, String> requestHeaders = new HashMap<>();

    private final String URL = "https://www.google.com/";
    HttpServiceImpl httpService;
    HttpURLConnection urlConnection;
    java.net.URL url;
    OutputStream outputStream;
    String str = "inputStream/nLine2/Line3";
    InputStream inputStream;

    @BeforeEach
    void setup() throws UnsupportedEncodingException, MalformedURLException {
        requestHeaders.put("q", "search");
        urlConnection = mock(HttpURLConnection.class);
        outputStream = mock(BufferedOutputStream.class);
        inputStream = new ByteArrayInputStream(str.getBytes("UTF-8"));
        url = new URL(URL);
        httpService = Mockito.spy(new HttpServiceImpl(URL, HttpMethod.GET, requestHeaders, ""));
    }

    @Test
    void testExecuteHTTPRequest() throws IOException {
        when(httpService.getAPIEndPoint(URL)).thenReturn(url);
        when(urlConnection.getOutputStream()).thenReturn(outputStream);
        when(urlConnection.getInputStream()).thenReturn(inputStream);
        assertNotNull(httpService.executeHTTPRequest());
    }

    @Test
    void testToString() throws IOException {
        assertEquals("inputStream/nLine2/Line3", httpService.toString(inputStream));
    }

    @Test
    void testSetRequestBody() throws IOException {
        assertThrows(NullPointerException.class, () -> {
            httpService.setRequestBody(urlConnection);
        });
        verify(httpService, times(1)).setRequestBody(urlConnection);
    }

    @Test
    void testGetResponseCode() throws IOException {
        int responseCode = 200;
        Mockito.when(urlConnection.getResponseCode()).thenReturn(responseCode);
        assertEquals(responseCode, httpService.getResponseCode(urlConnection));
    }

}
