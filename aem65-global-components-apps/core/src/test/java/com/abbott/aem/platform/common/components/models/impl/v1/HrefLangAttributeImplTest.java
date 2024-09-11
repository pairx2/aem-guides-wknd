package com.abbott.aem.platform.common.components.models.impl.v1;

import static org.junit.jupiter.api.Assertions.*;

import java.util.Map;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.factory.ModelFactory;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import com.abbott.aem.platform.common.components.models.HrefLangAttribute;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith(AemContextExtension.class)
class HrefLangAttributeImplTest {

	private final AemContext ctx = new AemContext();
    private static final String RESOURCE = "/content/cv/cardiovascular/us/en/jcr:content";
    private static final String HrefLangUrls_RESOURCE = "/content/bts/global-reference/en/jcr:content/hrefLangUrls";
    private HrefLangAttribute hrefLangAttributePage;
    private HrefLangAttributeImpl hrefLangAttributeImpl;
    
    @BeforeEach
    public void setUp() throws Exception{
        
    	ctx.addModelsForClasses(HrefLangAttribute.class );
        ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/HrefLangAttributeImplTest.json", "/content/cv/cardiovascular/us/en");
        Resource myResource = ctx.resourceResolver().getResource(RESOURCE);
        hrefLangAttributePage = ctx.getService(ModelFactory.class).createModel(myResource, HrefLangAttribute.class);
        System.out.println(hrefLangAttributePage);
        assertTrue(hrefLangAttributePage instanceof HrefLangAttributeImpl);
        hrefLangAttributeImpl = (HrefLangAttributeImpl) hrefLangAttributePage;
        hrefLangAttributeImpl.setCurrentPageResource(myResource);
      //load and keep hreflangUrls resource for later usage
        ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/HrefLangUrlsTest.json", HrefLangUrls_RESOURCE);
        hrefLangAttributeImpl.init();
    }

    @Test
    void testGetSitemapRootSitePath() {
    	assertEquals("/content/bts/global-reference/en", hrefLangAttributePage.getSitemapRootSitePath());
    }
    
    @Test
    void testWithLocaleSpecificPageResources() {
    	ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/HrefLangUrlsTest.json", "/content/cv/cardiovascular/jp/ja");
    	ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/HrefLangUrlsTest.json", "/content/cv/cardiovascular/de/de");
    	ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/HrefLangUrlsTest.json", "/content/cv/cardiovascular/fr/fr");
    	hrefLangAttributeImpl.init();
    	Map<String, String> urlsMap = hrefLangAttributeImpl.getMetaHrefLangUrlsMap();
   	 	assertNotNull(urlsMap);
    }
    
    @Test
    void testForNullSitemapRootPath() {
    	ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/HrefLangAttributeImplNoResourceTest.json", "/content/cv/cardiovascular/us/en1");
    	Resource myResource = ctx.resourceResolver().getResource("/content/cv/cardiovascular/us/en1/jcr:content");
        hrefLangAttributePage = ctx.getService(ModelFactory.class).createModel(myResource, HrefLangAttribute.class);
        hrefLangAttributeImpl = (HrefLangAttributeImpl) hrefLangAttributePage;
        hrefLangAttributeImpl.setCurrentPageResource(myResource);
    	hrefLangAttributeImpl.init();
   	 	assertNull(hrefLangAttributePage.getSitemapRootSitePath());
    }
    
}
