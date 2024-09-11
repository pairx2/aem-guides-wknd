package com.abbott.magento.identity.models;

import junit.framework.Assert;
import org.apache.jackrabbit.oak.spi.security.authentication.external.ExternalIdentityException;
import org.apache.jackrabbit.oak.spi.security.authentication.external.ExternalIdentityRef;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.HashMap;
import java.util.Map;

@ExtendWith(MockitoExtension.class)
class ExternalIdentityImplTest {

    ExternalIdentityImpl externalIdentity;

    ExternalIdentityRef ref;

    Map<String, Object> properties = new HashMap<>();

    @BeforeEach
    void setUp() {
        ref = new ExternalIdentityRef("id", "providerName");
        properties.put("groups", ref);
        externalIdentity = new ExternalIdentityImpl("providerName", ref, "id", properties);

    }

    @Test
    void getExternalId() {
        Assertions.assertNotNull(externalIdentity.getExternalId());
    }

    @Test
    void getId() {
        Assert.assertNotNull(externalIdentity.getId());
    }

    @Test
    void getPrincipalName() {
        Assert.assertNotNull(externalIdentity.getPrincipalName());
    }

    @Test
    void getIntermediatePath() {
        Assert.assertNull(externalIdentity.getIntermediatePath());
    }

    @Test
    void getDeclaredGroups() throws ExternalIdentityException {
        Assert.assertNotNull(externalIdentity.getDeclaredGroups());
    }

    @Test
    void getProperties() {
        Assert.assertNotNull(externalIdentity.getProperties());
    }

    @Test
    void testToString() {
        Assert.assertNotNull(!externalIdentity.toString().isEmpty());
    }
}