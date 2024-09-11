package com.abbott.magento.identity.models;

import org.apache.jackrabbit.oak.spi.security.authentication.external.ExternalIdentityRef;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertTrue;

class ExternalUserImplTest {

    ExternalUserImpl externalUser;

    ExternalIdentityRef ref;

    @BeforeEach
    void setUp() {
        ref = new ExternalIdentityRef("id", "providerName");
        externalUser = new ExternalUserImpl("name", ref, "id", null);
    }

    @Test
    void testToString() {
        assertTrue(!externalUser.toString().isEmpty());
    }
}