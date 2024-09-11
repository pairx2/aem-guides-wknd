package com.abbott.magento.components;

import org.apache.sling.api.resource.ValueMap;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@ExtendWith(MockitoExtension.class)
class MagentoCheckoutIframeTest {

    @InjectMocks
    MagentoCheckoutIframe magentoCheckoutIframe;

    @Mock
    ValueMap valueMap;

    @Test
    void getCheckoutSuccessPath() {
        assertEquals("", magentoCheckoutIframe.getCheckoutSuccessPath());
    }

    @Test
    void getMagentoCheckoutUrl() {
        assertNotNull(magentoCheckoutIframe.getMagentoCheckoutUrl());
    }
}