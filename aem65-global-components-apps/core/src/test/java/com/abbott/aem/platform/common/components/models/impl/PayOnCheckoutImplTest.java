package com.abbott.aem.platform.common.components.models.impl;


import com.abbott.aem.platform.common.components.models.PayOnCheckout;
import com.day.cq.commons.Externalizer;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;

import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith(AemContextExtension.class)
class PayOnCheckoutImplTest {

    private final AemContext ctx = new AemContext();

    private final Externalizer externalizer  = Mockito.mock(Externalizer.class);

    @BeforeEach
    void setUp() {

        ctx.addModelsForClasses(PayOnCheckoutImpl.class);
        ctx.registerService(Externalizer.class,externalizer);
        ctx.load().json("/com/abbott/aem/platform/common/components/models/commerce/impl/v1/PayOnCheckoutImpl.json", "/content");
    }

    @Test
    void testGetCheckoutSummaryPageUrl() {
        ctx.currentResource("/content/payOnCheckout");
        PayOnCheckout payOnCheckout = ctx.request().adaptTo(PayOnCheckout.class);
        final String expected = "/content/checkout/summary/page/path";
        assert payOnCheckout != null;
        String actual = payOnCheckout.getCheckoutSummaryPageUrl();
        assertEquals(expected, actual);
    }

    @Test
    void testGetConsumerComponentOptionWhenNotNullAndNotBlank() {
        ctx.currentResource("/content/payOnCheckout");
        PayOnCheckout payOnCheckout = ctx.request().adaptTo(PayOnCheckout.class);
        final String expected = "Pay On Checkout";
        assert payOnCheckout != null;
        String actual = payOnCheckout.getConsumerComponentOption();
        assertEquals(expected, actual);
    }
}