package com.abbott.aem.platform.common.components.models.commerce.impl.v1;

import com.abbott.aem.platform.common.components.models.commerce.SubscriptionHistory;
import com.abbott.aem.platform.common.components.services.ProxyComponentService;
import com.abbott.aem.platform.common.components.services.ProxyPaths;
import com.day.cq.wcm.api.components.Component;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;

import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith(AemContextExtension.class)
class SubscriptionHistoryImplTest {


    private SubscriptionHistory subscriptionHistory;
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
        ctx.addModelsForClasses(SubscriptionHistoryImpl.class);
        ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/SubscriptionHistoryImplTest.json", "/content");
        ctx.currentResource("/content/subscriptionHistory");
        subscriptionHistory = ctx.request().adaptTo(SubscriptionHistory.class);

    }

    @Test
    void testMaxNumber() {
        final int expected = 1;
        int actual = subscriptionHistory.getMaxNumber();
        assertEquals(expected, actual);
    }

    @Test
    void testSubscriptionCategory() {
        final String expected = "subscriptionCategory";
        String actual = subscriptionHistory.getSubscriptionCategory();
        assertEquals(expected, actual);
    }

    @Test
    void testSubscriptionDetailPage() {
        final String expected = "subscriptionDetailPage";
        String actual = subscriptionHistory.getSubscriptionDetailPage();
        assertEquals(expected, actual);
    }

}
