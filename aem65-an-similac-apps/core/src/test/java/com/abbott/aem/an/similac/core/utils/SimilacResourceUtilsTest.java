package com.abbott.aem.an.similac.core.utils;

import static com.abbott.aem.an.similac.core.utils.TestConstants.EMPTY_PAGE_RESOURCE;
import static com.abbott.aem.an.similac.core.utils.TestConstants.HOMEPAGE_PATH;
import static com.abbott.aem.an.similac.core.utils.TestConstants.NEOSURE_CONTENT_PATH;
import static com.abbott.aem.an.similac.core.utils.TestConstants.NEOSURE_PATH;
import static com.abbott.aem.an.similac.core.utils.TestConstants.PAGE_RESOURCE_TYPE;
import static com.abbott.aem.an.similac.core.utils.TestConstants.SLASH_CONTENT;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.Resource;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import com.abbott.aem.an.similac.core.models.FaqContainerModel;
import com.abbott.aem.an.similac.core.models.GlobalVariableModel;
import com.day.cq.tagging.Tag;
import com.day.cq.tagging.TagManager;
import com.day.cq.wcm.api.Page;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

/**
 * Test cases for SimilacResourceUtils
 * 
 * @author Cognizant
 */
@ExtendWith(AemContextExtension.class)
@ExtendWith(MockitoExtension.class)
class SimilacResourceUtilsTest {

	private AemContext context;
	
	@Mock
	TagManager tagManager;
	
	@Mock
	Tag dummyTag;

	@BeforeEach
	public void setup() {
		context.load().json(EMPTY_PAGE_RESOURCE, SLASH_CONTENT);
	}

	@Test
	void testIsHomePage() {
		context.currentPage("/content/empty-page");
		assertFalse(SimilacResourceUtils.isHomePage(context.currentPage()));

		context.currentPage(HOMEPAGE_PATH);
		assertTrue(SimilacResourceUtils.isHomePage(context.currentPage()));
	}

	@Test
	void testIsTemplate() {
		context.currentPage(HOMEPAGE_PATH);
		assertFalse(SimilacResourceUtils.isTemplate(context.currentPage()));
	}

	@Test
	void testGetHomePageForPage() {
		context.currentPage(NEOSURE_PATH);
		Page expected = context.pageManager().getPage(HOMEPAGE_PATH);

		assertEquals(expected, SimilacResourceUtils.getHomePageForPage(context.currentPage()));

		context.currentPage("/content/standard-page");
		assertNull(SimilacResourceUtils.getHomePageForPage(context.currentPage()));

		assertNull(SimilacResourceUtils.getHomePageForPage(null));
	}

	@Test
	void testGetFirstChildWithResourceType() {
		context.currentPage(HOMEPAGE_PATH);
		Resource expected = context.resourceResolver().getResource(NEOSURE_CONTENT_PATH);
		Resource currentPageResource = context.currentResource().getParent();
		Resource actual = SimilacResourceUtils.getFirstChildWithResourceType(currentPageResource,
				PAGE_RESOURCE_TYPE);
		assertEquals(expected.getPath(), actual.getPath());

		context.currentPage(NEOSURE_PATH);
		assertNull(SimilacResourceUtils.getFirstChildWithResourceType(context.currentResource(),
				PAGE_RESOURCE_TYPE));
	}

	@Test
	void testGetProperty() {
		context.currentResource(NEOSURE_CONTENT_PATH);
		assertEquals(PAGE_RESOURCE_TYPE,
				SimilacResourceUtils.getProperty(context.currentResource(), "sling:resourceType", String.class));

		assertNull(SimilacResourceUtils.getProperty(context.currentResource(), "testPropertyNegative", String.class));
		assertNull(SimilacResourceUtils.getProperty(context.currentResource(), "testProperty", String.class));
	}

	@Test
	void testGetMultivalueProperty() {
		context.currentResource(NEOSURE_CONTENT_PATH);

		assertEquals(StringUtils.EMPTY, SimilacResourceUtils.getMultiValueProperty(context.currentResource()));
	}

	@Test
	void testIfPropExists() {
		context.currentResource(NEOSURE_CONTENT_PATH);
		assertEquals(true, SimilacResourceUtils.ifPropExists(context.currentResource(), "sling:resourceType"));
		assertEquals(false, SimilacResourceUtils.ifPropExists(context.currentResource(), "testPropertyNegative"));
	}
	
	@Test
	void testGetListFromResource() {
		context.currentPage("/content/standard-page");
		context.addModelsForClasses(GlobalVariableModel.class);
		List<FaqContainerModel> result = SimilacResourceUtils.getListFromResource(context.currentResource(), FaqContainerModel.class);
		for(FaqContainerModel model : result) {
			assertNotNull(model);
			assertNotNull(model.getTopicLabelJson());
		}
		
		result = SimilacResourceUtils.getListFromResource(null, FaqContainerModel.class);
		assertTrue(result.isEmpty());
	}
	
	@Test
	void testGetTagName() {
		Mockito.lenient().when(dummyTag.getName()).thenReturn("TAG-TITLE");
		context.registerService(TagManager.class, tagManager);
		Mockito.lenient().when(tagManager.resolve("tagStr")).thenReturn(dummyTag);
		
		assertEquals("TAG-TITLE",SimilacResourceUtils.getTagName("tagStr", tagManager));
		
		Mockito.lenient().when(tagManager.resolve(Mockito.anyString())).thenReturn(null);
		assertEquals(StringUtils.EMPTY,SimilacResourceUtils.getTagName("test", tagManager));
	}
}
