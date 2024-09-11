package com.abbott.magento.catalog.common;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith(MockitoExtension.class)
class AuthCredentialsTest {

    private static final String TEST_USER_NAME = "username";
    private static final String TEST_USER_PASS = "password";

    @InjectMocks
    AuthCredentials credentials;

    @Test
    void getUsername() {
        credentials.setUsername(TEST_USER_NAME);
        assertEquals(TEST_USER_NAME, credentials.getUsername());
    }

    @Test
    void getPassword() {
        credentials.setPassword(TEST_USER_PASS);
        assertEquals(TEST_USER_PASS, credentials.getPassword());
    }
}