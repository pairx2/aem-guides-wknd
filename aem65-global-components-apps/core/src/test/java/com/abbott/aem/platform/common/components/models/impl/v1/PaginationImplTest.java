package com.abbott.aem.platform.common.components.models.impl.v1;
import com.abbott.aem.platform.common.components.models.Pagination;
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
class PaginationImplTest {
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
        ctx.addModelsForClasses(PaginationImpl.class);
        ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/PaginationImplTest.json", "/content");
    }

    @Test
    void testGetPaginationType() {
        final String expected = "staticComp";
        ctx.currentResource("/content/pagination");
        Pagination pg = ctx.request().adaptTo(Pagination.class);
        String actual = pg.getPaginationType();
        assertEquals(expected, actual);
    }

    @Test
    void testIsHidePrevious() {
        final boolean expected = true;
        ctx.currentResource("/content/pagination");
        Pagination pg = ctx.request().adaptTo(Pagination.class);
        boolean actual = pg.isHidePrevious();
        assertEquals(expected, actual);
    }

    @Test
    void testIsHideNext() {
        final boolean expected = false;
        ctx.currentResource("/content/pagination");
        Pagination pg = ctx.request().adaptTo(Pagination.class);
        boolean actual = pg.isHideNext();
        assertEquals(expected, actual);
    }

    @Test
    void testGetPageSize() {
        final int expected = 5;
        ctx.currentResource("/content/pagination");
        Pagination pg = ctx.request().adaptTo(Pagination.class);
        int actual = pg.getPageSize();
        assertEquals(expected, actual);
    }
}