package com.abbott.aem.corp.division.core.components.models.impl;

import com.abbott.aem.corp.division.core.components.models.Header;
import com.abbott.aem.platform.common.components.services.ProxyComponentService;
import com.abbott.aem.platform.common.components.services.ProxyPaths;
import com.day.cq.wcm.api.components.Component;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.commons.lang.StringUtils;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith(AemContextExtension.class)
class HeaderImplTest {

    private final AemContext ctx = new AemContext();
    private ProxyComponentService proxyComponentService;
    private Component component;

    @BeforeEach
    public void setUp() throws Exception {
        proxyComponentService = Mockito.mock(ProxyComponentService.class);
        component = Mockito.mock(Component.class);
        ProxyPaths path = null;
        Mockito.lenient().when(proxyComponentService.getProxyPath(component, path)).thenReturn("hello");
        ctx.registerService(ProxyComponentService.class, proxyComponentService);
        ctx.addModelsForClasses(HeaderImpl.class);
        ctx.load().json("/com/abbott/aem/corp/division/core/components/models/impl/HeaderImplTest.json", "/content");
    }

    @Test
    void testGetLinkStackCount() {
        final int expected = 3;
        ctx.currentResource("/content/header");
        Header header = ctx.request().adaptTo(Header.class);
        int actual = header.getLinkStackCount();
        assertEquals(expected, actual);

        Header obj1 = new HeaderImpl();
        Header obj2 = new HeaderImpl();
        assert obj1.equals(obj2);
        assert StringUtils.isNotBlank(obj1.toString());
    }

    @Test
    void testGetLinkStackList() {
        final List<String> expected = new ArrayList<String>();
        expected.add("linkstack-1");
        expected.add("linkstack-2");
        expected.add("linkstack-3");
        ctx.currentResource("/content/header");
        Header header = ctx.request().adaptTo(Header.class);
        List<String> actual = header.getListOfLinkStack();
        assertEquals(expected, actual);
    }
}
