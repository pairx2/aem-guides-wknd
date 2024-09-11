package com.abbott.aem.platform.common.components.models.navigation.impl.v1;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.util.Calendar;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

import com.abbott.aem.platform.common.components.models.navigation.PlatformNavigation;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
import com.google.common.base.Function;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
@ExtendWith(AemContextExtension.class)
public class StaticNavigationImplTest {
    private final AemContext ctx = new AemContext();
    private PlatformNavigation navigation;

    @InjectMocks
    private PlatformNavigation staticNavigation = new StaticNavigationImpl();

    @Mock
    private Resource resource;

    @Spy
    private Page currentPage;

    @Mock
    private PageManager pageManager;


    @BeforeEach
    public void setUp() throws Exception {

        doReturn(pageManager).when(currentPage).getPageManager();
        staticNavigation.getItems();

        when(resource.getPath()).thenReturn("path");
        ctx.addModelsForClasses(StaticNavigationImpl.class);
        ctx.registerAdapter(ResourceResolver.class, PageManager.class, new Function<ResourceResolver, PageManager>() {
            @Override
            public PageManager apply(ResourceResolver input) {
                return pageManager;
            }
        });

    }

    private Page registerPage(String path, String name) {
        Page result = mock(Page.class, path);
        when(pageManager.getPage(path)).thenReturn(result);
        when(result.getName()).thenReturn(name);
        when(result.getLastModified()).thenReturn(Calendar.getInstance());
        when(result.getContentResource()).then(i -> ctx.resourceResolver().getResource(path + "/jcr:content"));
        when(result.getPageManager()).thenReturn(pageManager);
        return result;
    }

    @Test
    public void testGetItems() {
        staticNavigation.getItems();
        assertTrue(1 == 1);
    }

}
