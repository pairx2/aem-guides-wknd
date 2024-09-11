package com.abbott.aem.corp.division.core.components.models.impl;

import static org.junit.jupiter.api.Assertions.assertEquals;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import com.abbott.aem.corp.division.core.components.models.CorpPage;
import com.day.cq.wcm.api.Page;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith({ AemContextExtension.class, MockitoExtension.class })
class CorpPageImplTest {
	private final AemContext ctx = new AemContext();

	@Mock
	Page currentPage, tempCurrentPage;

	@Mock
	ResourceResolver resourceResolver;

	@Mock
	Resource imageResource, pageResource;

	@Mock
	ValueMap valueMap;

	@InjectMocks
	CorpPageImpl corppage;
	
	@BeforeEach
	public void setUp() {

		MockitoAnnotations.openMocks(this);
		ctx.addModelsForClasses(CorpPageImpl.class);
		ctx.load().json("/com/abbott/aem/corp/division/core/components/models/impl/CorpPageImplTest.json",
				"/content/corppage");

	}

	@Test
	void testGetStructuredDataNone() {
		CorpPage corpPage;
		ctx.currentPage("/content/corppage");
		corpPage = ctx.request().adaptTo(CorpPage.class);
		assertEquals("none", corpPage.getStructuredData());
		assertEquals("2022-10-28", corpPage.getLastPublished());
		assertEquals("2022-10-28", corpPage.getLastModified());
	}

	@Test
	void testGetStructuredDataArticle() {
		CorpPage articlePage;
		ctx.currentPage("/content/corppage/article");
		articlePage = ctx.request().adaptTo(CorpPage.class);
		assertEquals("Article", articlePage.getStructuredData());
		assertEquals("Sample Page", articlePage.getParentTitle());
		assertEquals("Article page description", articlePage.getPageDescription());
	}

	@Test
	void testGetStructuredDataFAQ() {
		CorpPage faqPage;
		ctx.currentPage("/content/corppage/FAQ");
		faqPage = ctx.request().adaptTo(CorpPage.class);
		assertEquals("FAQ", faqPage.getStructuredData());
	}

	@Test
	void testGetnullImageUrl() {
		Mockito.when(resourceResolver.getResource("null/jcr:content")).thenReturn(pageResource);
		String imageurl = corppage.getImageUrl();
		assertEquals(null, imageurl);
	}

	@Test
	void testGetnullpageresource() {

		Mockito.when(resourceResolver.getResource("null/jcr:content")).thenReturn(pageResource);
		Mockito.when(resourceResolver.getResource("null/jcr:content")).thenReturn(null);
		String imageurl = corppage.getImageUrl();
		assertEquals(null, imageurl);
	}

	@Test
	void testGetpageresource() {
		Mockito.when(resourceResolver.getResource("null/jcr:content")).thenReturn(pageResource);
		Mockito.when(pageResource.getValueMap()).thenReturn(null);
		String imageurl = corppage.getImageUrl();
		assertEquals(null, imageurl);
	}
	
	@Test
	void testGetImageUrl() {
		String imageurl ;	
		Mockito.when(resourceResolver.getResource("null/jcr:content")).thenReturn(pageResource);
		Mockito.when(pageResource.getValueMap()).thenReturn(valueMap);
		Mockito.when(valueMap.get("articleimage", null)).thenReturn(null);
		imageurl=corppage.getImageUrl();
		assertEquals(null, imageurl);
		}
			
}