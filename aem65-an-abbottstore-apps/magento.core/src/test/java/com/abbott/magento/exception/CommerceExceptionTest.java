package com.abbott.magento.exception;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;

class CommerceExceptionTest {

    CommerceException commerceException;

    @Mock
    Throwable throwable;

    @BeforeEach
    @Test
    void setUp() {
        commerceException = new CommerceException("msg", throwable);
        commerceException = new CommerceException("message");
    }
}