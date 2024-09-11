package com.abbott.aem.an.abbottstore.utils;

import com.day.cq.wcm.api.Page;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.Mockito.lenient;
import static org.mockito.Mockito.when;



@ExtendWith({ AemContextExtension.class, MockitoExtension.class})
class AbbottResourceUtilsTest {

    private final AemContext ctx = new AemContext();

    public static final String RESOURCE_TYPE = "abbott/components/content/footer";
    public static final String CONTENT_TYPE = "/content/abbott/en";

    @Mock
    Page page;


     @Test
    void testIsHomePage() {
         Resource resource1 = Mockito.mock(Resource.class);
         when(page.getContentResource()).thenReturn(resource1);
         when(resource1.getResourceType()).thenReturn("abbott/components/structure/home-page");
         assertEquals(true, AbbottResourceUtils.isHomePage(page));
     }

     @Test
     void testGetChildrenWithResourceType() {
         Resource resource = ctx.create().resource(CONTENT_TYPE);
         assertEquals(0,AbbottResourceUtils.getChildrenWithResourceType(resource,RESOURCE_TYPE).size());

     }

    @Test
    void testIsTemplate() {
        when(page.getPath()).thenReturn("/conf/abbott");
        assertEquals(true, AbbottResourceUtils.isTemplate(page));
    }

    @Test
    void testGetHomePage() {
        Resource resource1 = Mockito.mock(Resource.class);
        List<Page> parentPages = new ArrayList<>();
        parentPages.add(page);
        when(page.getContentResource()).thenReturn(resource1);
        when(resource1.getResourceType()).thenReturn("abbott/components/structure/home-page");
        assertEquals(page, AbbottResourceUtils.getHomePage(parentPages));
    }

    @Test
    public void testFirstChildWithResourceType() {
        Resource resource = ctx.create().resource(CONTENT_TYPE);
        assertEquals(null,AbbottResourceUtils.getFirstChildWithResourceType(resource, RESOURCE_TYPE));
    }

    @Test
    public void testParentPagesForPage() {
        ctx.load().json("/prodListModel-data.json",CONTENT_TYPE);
        Page currentPage = ctx.currentPage(CONTENT_TYPE+"/page1");
        assertEquals(2, AbbottResourceUtils.getParentPagesForPage(currentPage).size());
    }

    @Test
    public void testGetHomePageForPage() {
        Page currentPage = ctx.create().page(CONTENT_TYPE);
        assertEquals(null, AbbottResourceUtils.getHomePageForPage(currentPage));
    }

    @Test
    public void testGetHomePageForPageNull() {
        assertNull(AbbottResourceUtils.getHomePageForPage(null));
    }
}