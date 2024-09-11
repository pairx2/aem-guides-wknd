package com.abbott.aem.platform.search.coveoconnector.core.cloudfront;

import org.junit.jupiter.api.Test;
import org.mockito.MockedStatic;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.mockStatic;
import static org.mockito.Mockito.when;

class HMACEncryptionTest {
    private final HMACEncryption hmacEncryption = new HMACEncryption();

    @Test
    void testGetCallReference() {
        String callReference = hmacEncryption.getCallReference();

        assertTrue(callReference.contains("GMT"));
    }

    @Test
    void testGetAuth() {
        //Stub data
        String secretKey = "secretKey";
        String accessKey = "accessKey";

        // Test the method
        String auth = hmacEncryption.getAuth(secretKey, accessKey);
        assertTrue(auth.contains("AWS "+accessKey));
    }

    @Test
    void testGetAuthWhenNoSuchAlgorithmException() throws NoSuchAlgorithmException {
        //Stub data
        String secretKey = "secretKey";
        String accessKey = "accessKey";

        MockedStatic<Mac> mockedStatic = mockStatic(Mac.class);
        when(Mac.getInstance("HmacSHA1")).thenThrow(new NoSuchAlgorithmException("NSAE"));

        // Test the method
        String auth = hmacEncryption.getAuth(secretKey, accessKey);
        assertEquals("", auth);
        mockedStatic.close();
    }


    @Test
    void testGetAuthWhenInvalidKeyException() throws NoSuchAlgorithmException, InvalidKeyException, InvalidKeyException {
        //Stub data
        String secretKey = "secretKey";
        String accessKey = "accessKey";

        MockedStatic<Mac> mockedStatic = mockStatic(Mac.class);
        Mac mac = mock(Mac.class);
        when(Mac.getInstance("HmacSHA1")).thenReturn(mac);
        doThrow(new InvalidKeyException("IKE")).when(mac).init(any(SecretKeySpec.class));

        // Test the method
        String auth = hmacEncryption.getAuth(secretKey, accessKey);
        assertEquals("", auth);
        mockedStatic.close();
    }
}


