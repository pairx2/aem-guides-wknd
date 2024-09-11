package com.abbott.aem.an.abbottstore.utils;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.abbott.magento.exception.CommerceException;

import javax.net.ssl.HttpsURLConnection;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.OutputStream;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.lenient;

@ExtendWith(MockitoExtension.class)
class RequestHandlerTest {

    @Mock
    RequestHandler requestHandler;

    @Mock
    HttpsURLConnection httpsURLConnection;

    @Mock
    DataOutputStream dataOutputStream;

    @Mock
    OutputStream outputStream;

    @BeforeEach
    void setUp() throws IOException {
        lenient().when(httpsURLConnection.getOutputStream()).thenReturn(outputStream);
        lenient().when(new DataOutputStream(httpsURLConnection.getOutputStream())).thenReturn(dataOutputStream);
    }

    @Test
    void postResponse() {
        RequestHandler.PostResponse("https://test-api.com", "test data");
    }
    @Test
    void verifyResponse() {
    	 assertThrows(UnsupportedOperationException.class,()-> new RequestHandler());
         RequestHandler.VerifyResponse("https://www.test-api.com/", "test data");
    }
}