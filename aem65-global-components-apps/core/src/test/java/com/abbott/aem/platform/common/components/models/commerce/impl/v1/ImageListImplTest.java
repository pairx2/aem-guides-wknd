package com.abbott.aem.platform.common.components.models.commerce.impl.v1;

import com.abbott.aem.platform.common.components.services.ProxyComponentService;
import com.abbott.aem.platform.common.components.services.ProxyPaths;
import com.day.cq.wcm.api.components.Component;
import io.wcm.testing.mock.aem.junit5.AemContext;
import org.apache.sling.api.resource.Resource;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith(MockitoExtension.class)
class ImageListImplTest {

    private final AemContext ctx = new AemContext();
    private ProxyComponentService proxyComponentService;
    private Component component;

    @Mock
    private List<Resource> imageList;

    @BeforeEach
    void setUp() throws Exception {
        proxyComponentService = Mockito.mock(ProxyComponentService.class);
        component = Mockito.mock(Component.class);
        ProxyPaths path = null;
        Mockito.lenient().when(proxyComponentService.getProxyPath(component, path)).thenReturn("hello");
        ctx.registerService(ProxyComponentService.class, proxyComponentService);
    }

    @Test
    void testGetProductImageList() {
        MockitoAnnotations.initMocks(this);
        ImageListImpl imageList1 = new ImageListImpl();
        imageList1.imageList = imageList;
        List<Resource> actualSectionItems = imageList1.getImageList();
        assertEquals(imageList, actualSectionItems);
    }

}
