package com.abbott.magento.identity.models;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith(MockitoExtension.class)
class AuthCredentialsTest {

    private static final String USER_NAME = "admin_user";
    private static final String USER_PASS = "admin_pass";

    @InjectMocks
    AuthCredentials authCredentials;

    @BeforeEach
    void setUp() {
        authCredentials.setPassword(USER_PASS);
        authCredentials.setUsername(USER_NAME);
        authCredentials = new AuthCredentials(USER_NAME, USER_PASS);
    }

    @Test
    void getUsername() {
        assertEquals(USER_NAME, authCredentials.getUsername());
    }

    @Test
    void getPassword() {
        assertEquals(USER_PASS, authCredentials.getPassword());
    }
}