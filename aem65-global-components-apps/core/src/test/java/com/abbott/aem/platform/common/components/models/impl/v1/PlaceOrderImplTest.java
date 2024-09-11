package com.abbott.aem.platform.common.components.models.impl.v1;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;

import com.abbott.aem.platform.common.components.models.PlaceOrder;
import com.abbott.aem.platform.common.components.services.ProxyComponentService;
import com.abbott.aem.platform.common.components.services.ProxyPaths;
import com.day.cq.wcm.api.components.Component;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith(AemContextExtension.class)
class PlaceOrderImplTest {

    PlaceOrder placeOrder;
    
    private final AemContext ctx = new AemContext();
    private ProxyComponentService proxyComponentService;
    private Component component;

    @BeforeEach
    void setUp() throws Exception {
        proxyComponentService = Mockito.mock(ProxyComponentService.class);
        component = Mockito.mock(Component.class);
        ProxyPaths path = null;
        Mockito.lenient().when(proxyComponentService.getProxyPath(component, path)).thenReturn("hello");
        ctx.registerService(ProxyComponentService.class, proxyComponentService);
        ctx.addModelsForClasses(PlaceOrderImpl.class);
        ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/PlaceOrderImplTest.json", "/content/placeorder");
        ctx.currentResource("/content/placeorder");
        placeOrder = ctx.request().adaptTo(PlaceOrder.class);
    }

    @Test
    void testSuccessPathUrl() {
        final String expected = "/content/adc/navecomm/global/en/home/shop/checkout/order-summary";
        String actual = placeOrder.getSuccessPageShortenedUrl();
        assertEquals(expected, actual);
    }

    @Test
    void testErrorPathUrl() {
        final String expected = "/content/adc/navecomm/global/en/home/shop/checkout";
        String actual = placeOrder.getErrorPageShortenedUrl();
        assertEquals(expected, actual);
    }

    @Test
    void testPurchaseAATracking() {
        final String expected = "true";
        String actual = placeOrder.getPurchaseAATracking();
        assertEquals(expected, actual);
    }
}
