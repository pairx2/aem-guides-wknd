package com.abbott.aem.platform.common.components.models.impl.v1;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

import com.abbott.aem.platform.common.components.models.SearchResultItem;

/**
 * The Class SearchResultItemImplTest.
 */
@ExtendWith(AemContextExtension.class)
class SearchResultItemImplTest {

	/**
	 * The ctx.
	 */
	private final AemContext ctx = new AemContext();

	/**
	 * Sets the up.
	 *
	 * @throws Exception the exception
	 */
	@BeforeEach
	public void setUp() throws Exception {
		ctx.addModelsForClasses(SearchResultItemV1Impl.class);
		ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/SearchResultItemImplTest.json", "/content");
	}

	/**
	 * Test get link text.
	 */
	@Test
	void testGetLinkText() {
		final String expected = "Link Text";
		ctx.currentResource("/content/searchresultitem");
		SearchResultItem searchResultItem = ctx.request().adaptTo(SearchResultItem.class);
		String actual = searchResultItem.getLinkText();
		assertEquals(expected, actual);
	}

	/**
	 * Test get title text.
	 */
	@Test
	void testGetTitleText() {
		final String expected = "Title Text";
		ctx.currentResource("/content/searchresultitem");
		SearchResultItem searchResultItem = ctx.request().adaptTo(SearchResultItem.class);
		String actual = searchResultItem.getTitleText();
		assertEquals(expected, actual);
	}

	/**
	 * Test get description text.
	 */
	@Test
	void testGetDescriptionText() {
		final String expected = "Description Text";
		ctx.currentResource("/content/searchresultitem");
		SearchResultItem searchResultItem = ctx.request().adaptTo(SearchResultItem.class);
		String actual = searchResultItem.getDescriptionText();
		assertEquals(expected, actual);
	}

}
