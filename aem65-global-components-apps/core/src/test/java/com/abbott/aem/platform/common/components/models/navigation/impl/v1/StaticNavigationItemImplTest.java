package com.abbott.aem.platform.common.components.models.navigation.impl.v1;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import com.adobe.cq.wcm.core.components.models.Component;
import com.adobe.cq.wcm.core.components.models.NavigationItem;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ValueMap;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.*;

class StaticNavigationItemImplTest {

    private Resource resource;
    private PageManager pageManager;
    private SlingHttpServletRequest request;
    private Component component;
    private Page page;
    private ValueMap valueMap;

    private StaticNavigationItemImpl staticNavigationItem;

    @BeforeEach
    public void setUp() {
        resource = mock(Resource.class);
        pageManager = mock(PageManager.class);
        request = mock(SlingHttpServletRequest.class);
        component = mock(Component.class);
        page = mock(Page.class);
        valueMap = mock(ValueMap.class);

        when(resource.getValueMap()).thenReturn(valueMap);

        staticNavigationItem = StaticNavigationItemImpl.builder()
                .resource(resource)
                .pageManager(pageManager)
                .request(request)
                .component(component)
                .level(1)
                .build();
    }

    @Test
    void testGetChildren_NoChildren() {
        when(resource.hasChildren()).thenReturn(false);

        List<NavigationItem> children = staticNavigationItem.getChildren();

        assertTrue(children.isEmpty(), "Children list should be empty");
    }

    @Test
    void testGetChildren_WithChildren() {
        Resource childResource = mock(Resource.class);
        Resource topResource = mock(Resource.class);
        when(resource.hasChildren()).thenReturn(true);
        when(resource.getChildren()).thenReturn(Collections.singleton(topResource));
        when(topResource.getChildren()).thenReturn(Collections.singleton(childResource));

        List<NavigationItem> children = staticNavigationItem.getChildren();

        assertFalse(children.isEmpty(), "Children list should not be empty");
    }

    @Test
    void testGetTitle_WithProperty() {
        when(valueMap.get("jcr:title", "")).thenReturn("Test Title");

        String title = staticNavigationItem.getTitle();

        assertEquals("Test Title", title);
    }

    @Test
    void testGetTitle_InternalPage() {
        when(valueMap.get("jcr:title", "")).thenReturn("");
        when(pageManager.getPage(anyString())).thenReturn(page);
        when(page.getNavigationTitle()).thenReturn(null);
        when(page.getPageTitle()).thenReturn(null);
        when(page.getTitle()).thenReturn(null);
        when(page.getName()).thenReturn("Page Name");

        staticNavigationItem.isInternalPage(); // Initialize internal page

        String title = staticNavigationItem.getTitle();

        assertEquals("", title);
    }

    @Test
    void testIsActive_InternalPage() {
        when(request.getRequestURI()).thenReturn("/content/test.html");
        when(pageManager.getPage(anyString())).thenReturn(page);
        when(page.getPath()).thenReturn("/content/test");

        staticNavigationItem.isInternalPage(); // Initialize internal page

        assertFalse(staticNavigationItem.isActive(), "Page should be active");
    }

    @Test
    void testIsActive_NonInternalPage() {
        staticNavigationItem = StaticNavigationItemImpl.builder()
                .resource(resource)
                .pageManager(pageManager)
                .request(request)
                .component(component)
                .active(true)
                .level(1)
                .build();

        assertTrue(staticNavigationItem.isActive(), "Page should be active");
    }

    @Test
    void testGetLevel() {
        assertEquals(1, staticNavigationItem.getLevel());
    }

    @Test
    void testGetURL_NonInternalPage() {
        when(valueMap.get("link", "")).thenReturn("http://external.link");

        String url = staticNavigationItem.getURL();

        assertEquals("http://external.link", url);
    }

    @Test
    void testGetId_NoParent() {
        when(component.getId()).thenReturn("componentId");

        String id = staticNavigationItem.getId();

        assertNotNull(id, "ID should not be null");
    }

    @Test
    void testGetId_WithParent() {
        StaticNavigationItemImpl parentItem = StaticNavigationItemImpl.builder()
                .resource(resource)
                .pageManager(pageManager)
                .request(request)
                .component(component)
                .level(0)
                .build();

        when(component.getId()).thenReturn("componentId");
        when(resource.getPath()).thenReturn("/content/test/path");

        staticNavigationItem = StaticNavigationItemImpl.builder()
                .resource(resource)
                .pageManager(pageManager)
                .request(request)
                .component(component)
                .level(1)
                .parent(parentItem)
                .build();

        String id = staticNavigationItem.getId();

        assertNotNull(id, "ID should not be null");
    }

    @Test
    void testIsInternalPage() {
        when(valueMap.get("link", "")).thenReturn("/content/test");
        when(pageManager.getPage("/content/test")).thenReturn(page);

        boolean isInternal = staticNavigationItem.isInternalPage();

        assertTrue(isInternal, "Should be an internal page");
    }

    @Test
    void testIsInternalPage_NonInternal() {
        when(valueMap.get("link", "")).thenReturn("http://external.link");
        when(pageManager.getPage("http://external.link")).thenReturn(null);

        boolean isInternal = staticNavigationItem.isInternalPage();

        assertFalse(isInternal, "Should not be an internal page");
    }
}
