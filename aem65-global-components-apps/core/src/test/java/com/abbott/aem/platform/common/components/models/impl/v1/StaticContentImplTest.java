package com.abbott.aem.platform.common.components.models.impl.v1;

import com.abbott.aem.platform.common.components.models.StaticContent;
import com.abbott.aem.platform.common.components.services.ProxyComponentService;
import com.abbott.aem.platform.common.components.services.ProxyPaths;
import com.day.cq.tagging.InvalidTagFormatException;
import com.day.cq.tagging.TagManager;
import com.day.cq.wcm.api.components.Component;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith(MockitoExtension.class)
@ExtendWith(AemContextExtension.class)
public class StaticContentImplTest {

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
        ctx.addModelsForClasses(StaticContentImpl.class);
        ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/StaticContentImplTest.json", "/content");
    }


    @Test
    void testGetTagName() {
        final String expected = "products";
        ctx.currentResource("/content/staticContent");
        StaticContent staticContent = ctx.request().adaptTo(StaticContent.class);
        String actual = staticContent.getTagName();
        assertEquals(expected, actual);


    }

    @Test
    void testSeemoreLink() {
        final String expected = "/content/test";
        ctx.currentResource("/content/staticContent");
        StaticContent staticContent = ctx.request().adaptTo(StaticContent.class);
        String actual = staticContent.getSeeMoreLink();
        assertEquals(expected, actual);
    }

    @Test
    void testTagHeadingColor() {
        final String expected = "red";
        ctx.currentResource("/content/staticContent");
        StaticContent staticContent = ctx.request().adaptTo(StaticContent.class);
        String actual = staticContent.getTagHeadingColor();
        assertEquals(expected, actual);
        assert staticContent.getLinks().size() > 0;

    }

    @Test
    void testDefaultStaticContentType() {
        final String expected = "article";
        ctx.currentResource("/content/staticContent");
        StaticContent staticContent = ctx.request().adaptTo(StaticContent.class);
        String actual = staticContent.getContentType();
        assertEquals(expected, actual);
    }
		
    @Test
    void testImageTextColumnSize() {
        final int expectedImageColSize = 7;
		final int expectedTextColSize = 5;
        ctx.currentResource("/content/static-content-product/jcr:content/pagepath");
        StaticContent staticContent = ctx.request().adaptTo(StaticContent.class);
        String actual = staticContent.getContentType();
        assertEquals(expectedTextColSize, staticContent.getTextColumnSize());
		assertEquals(expectedImageColSize, staticContent.getImageColumnSize());
    }	

    @Test
    void testProductContentDefaultColumnLayout() {
        final int defaultValue = 3;
        ctx.currentResource("/content/static-content-product/jcr:content/pagepath");
        StaticContent staticContent = ctx.request().adaptTo(StaticContent.class);
        int actual = staticContent.getColumnLayout();
        assertEquals(defaultValue, actual);
    }

    @Test
    void testGetProductPageDataPageType() {
        ctx.currentResource("/content/static-content-product/jcr:content/pagepath");
        StaticContent staticContent = ctx.request().adaptTo(StaticContent.class);
        assert staticContent.getProductDetails().size() > 0;
    }

    @Test
    void testGetProductPageDataChildPage() {
        ctx.currentResource("/content/static-content-product/jcr:content/childpages");
        StaticContent staticContent = ctx.request().adaptTo(StaticContent.class);
        assert staticContent.getProductDetails().size() > 0;
    }

    @Test
    void testGetProductPageDataTags() throws InvalidTagFormatException{
        final int columnLayout = 1;
        ctx.currentResource("/content/static-content-product/jcr:content/tags");
        StaticContent staticContent = ctx.request().adaptTo(StaticContent.class);
		TagManager tagManager = ctx.resourceResolver().adaptTo(TagManager.class);
        tagManager.createTag("/ardx:toxicology/screening-device-categories/alcohol", "Tag1 Title", "Tag1 Description");
    }
}
