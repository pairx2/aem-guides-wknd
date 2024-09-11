package com.abbott.aem.platform.common.components.models.impl.v1;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.platform.commons.util.StringUtils;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

import com.abbott.aem.platform.common.components.models.SearchFacet;
import com.adobe.cq.wcm.core.components.models.Component;

import org.mockito.InjectMocks;

/**
 * The Class SearchFacetImplTest.
 */
@ExtendWith(AemContextExtension.class)
class SearchFacetImplTest {

	/**
	 * The ctx.
	 */
	private final AemContext ctx = new AemContext();

	/**
	 * The component.
	 */
	@InjectMocks
	private Component component;

	/**
	 * Sets the up.
	 *
	 * @throws Exception the exception
	 */
	@BeforeEach
	public void setUp() throws Exception {
		ctx.addModelsForClasses(SearchFacetImpl.class);
		ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/SearchFacetImplTest.json",
				"/content");
	}

	/**
	 * Test get filters.
	 */
	@Test
	void testGetFilters() {
		ctx.currentResource("/content/searchfacet");
		SearchFacet searchFacet = ctx.request().adaptTo(SearchFacet.class);
		assertNotNull(searchFacet.getSearchFacetProperties());
		assertEquals(1, searchFacet.getSearchFacetProperties().size());
		assertEquals("title", searchFacet.getSearchFacetProperties().get(0).getTitle());
		assertEquals("fieldName", searchFacet.getSearchFacetProperties().get(0).getFieldName());
		assertEquals("true", searchFacet.getSearchFacetProperties().get(0).getIsMultiple());
		assertEquals("show", searchFacet.getSearchFacetProperties().get(0).getShowText());
		assertEquals("hide", searchFacet.getSearchFacetProperties().get(0).getHideText());
		assertEquals(3, searchFacet.getSearchFacetProperties().get(0).getNumberOfItemsVisible());
		assert searchFacet.getSearchFacetProperties().size() > 0;
		SearchFacet obj1 = new SearchFacetImpl();
		SearchFacet obj2 = new SearchFacetImpl();
		assert obj1.equals(obj2);
		assert StringUtils.isNotBlank(obj1.toString());
	}

	@Test
	void testGetDisableSearchCategoryFacet() {
		final String expected = "true";
		ctx.currentResource("/content/searchfacet");
		SearchFacet searchFacet = ctx.request().adaptTo(SearchFacet.class);
		String actual = searchFacet.getDisableSearchCategoryFacet();
		assertEquals(expected, actual);
	}

	@Test
	void testSetFieldName() {
		ctx.currentResource("/content/searchfacet");
		SearchFacet searchFacet = ctx.request().adaptTo(SearchFacet.class);
		assertNotNull(searchFacet.getSearchFacetProperties());
		searchFacet.getSearchFacetProperties().get(0).setFieldName("fieldName");
		assertEquals("fieldName", searchFacet.getSearchFacetProperties().get(0).getFieldName());
	}

	@Test
	void testSetShowText() {
		ctx.currentResource("/content/searchfacet");
		SearchFacet searchFacet = ctx.request().adaptTo(SearchFacet.class);
		assertNotNull(searchFacet.getSearchFacetProperties());
		searchFacet.getSearchFacetProperties().get(0).setShowText("show");
		assertEquals("show", searchFacet.getSearchFacetProperties().get(0).getShowText());
	}

	@Test
	void testSetNumberOfItemsVisible() {
		ctx.currentResource("/content/searchfacet");
		SearchFacet searchFacet = ctx.request().adaptTo(SearchFacet.class);
		assertNotNull(searchFacet.getSearchFacetProperties());
		searchFacet.getSearchFacetProperties().get(0).setNumberOfItemsVisible(3);
		assertEquals(3, searchFacet.getSearchFacetProperties().get(0).getNumberOfItemsVisible());
	}

	@Test
	void testSetTitle() {
		ctx.currentResource("/content/searchfacet");
		SearchFacet searchFacet = ctx.request().adaptTo(SearchFacet.class);
		assertNotNull(searchFacet.getSearchFacetProperties());
		searchFacet.getSearchFacetProperties().get(0).setTitle("title");
		assertEquals("title", searchFacet.getSearchFacetProperties().get(0).getTitle());
	}

	@Test
	void testSetHideText() {
		ctx.currentResource("/content/searchfacet");
		SearchFacet searchFacet = ctx.request().adaptTo(SearchFacet.class);
		assertNotNull(searchFacet.getSearchFacetProperties());
		searchFacet.getSearchFacetProperties().get(0).setHideText("hide");
		assertEquals("hide", searchFacet.getSearchFacetProperties().get(0).getHideText());
	}

	@Test
	void testSetIsMultiple() {
		ctx.currentResource("/content/searchfacet");
		SearchFacet searchFacet = ctx.request().adaptTo(SearchFacet.class);
		assertNotNull(searchFacet.getSearchFacetProperties());
		searchFacet.getSearchFacetProperties().get(0).setIsMultiple("true");
		assertEquals("true", searchFacet.getSearchFacetProperties().get(0).getIsMultiple());
	}
	
	@Test
	void testSetIsTruncationEnable() {
		ctx.currentResource("/content/searchfacet");
		SearchFacet searchFacet = ctx.request().adaptTo(SearchFacet.class);
		assertNotNull(searchFacet.getSearchFacetProperties());
		searchFacet.getSearchFacetProperties().get(0).setIsTruncationEnable("true");
		assertEquals("true", searchFacet.getSearchFacetProperties().get(0).getIsTruncationEnable());
	}

}
