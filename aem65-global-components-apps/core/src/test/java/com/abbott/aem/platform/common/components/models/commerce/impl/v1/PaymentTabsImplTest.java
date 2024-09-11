package com.abbott.aem.platform.common.components.models.commerce.impl.v1;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ValueMap;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class PaymentTabsImplTest {

    @Mock
    private SlingHttpServletRequest slingHttpServletRequest;

    @Mock
    private Resource resource;

    @InjectMocks
    private PaymentTabsImpl paymentTabsImpl;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
    }
    @Test
    void testGetPaymentTypes() {
        Resource child1 = mock(Resource.class);
        Resource child2 = mock(Resource.class);

        ValueMap vm1 = mock(ValueMap.class);
        when(vm1.get("paymentType", String.class)).thenReturn("Credit Card");

        ValueMap vm2 = mock(ValueMap.class);
        when(vm2.get("paymentType", String.class)).thenReturn("PayPal");

        when(child1.getName()).thenReturn("creditCard");
        when(child1.getValueMap()).thenReturn(vm1);
        when(child2.getName()).thenReturn("paypal");
        when(child2.getValueMap()).thenReturn(vm2);

        when(resource.getChildren()).thenReturn(Stream.of(child1, child2).collect(Collectors.toList()));
        when(slingHttpServletRequest.getResource()).thenReturn(resource);

        Map<String, String> expectedPaymentTypes = new HashMap<>();
        expectedPaymentTypes.put("creditCard", "Credit Card");
        expectedPaymentTypes.put("paypal", "PayPal");

        assertEquals(expectedPaymentTypes, paymentTabsImpl.getPaymentTypes());
    }
}