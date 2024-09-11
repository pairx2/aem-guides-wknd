package com.abbott.aem.platform.common.components.models.impl.v1;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;

import java.security.AccessControlException;
import java.util.Locale;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.platform.commons.util.StringUtils;
import org.mockito.Mockito;

import com.abbott.aem.platform.common.components.models.Chip;
import com.day.cq.tagging.InvalidTagFormatException;
import com.day.cq.tagging.Tag;
import com.day.cq.tagging.TagManager;
import com.day.cq.wcm.api.Page;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

/**
 * The Class ChipImplTest.
 */
@ExtendWith(AemContextExtension.class)
class ChipImplTest {
	Page currentPage;
	Locale locale;
	Tag currentTag;

	ChipImpl tabsearchService = Mockito.spy(new ChipImpl());

	/**
	 * The Constant PATH.
	 */
	private static final String PATH = "/content/chip";
	/**
	 * The ctx.
	 */
	private final AemContext ctx = new AemContext();
	private final AemContext ctx2 = new AemContext();
	private final AemContext ctx3 = new AemContext();

	/**
	 * Sets the up.
	 *
	 * @throws Exception the exception
	 */
	@BeforeEach
	void setUp() throws Exception {
		ctx.addModelsForClasses(ChipImpl.class);
		ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/ChipImplTest.json", "/content");
		
		ctx2.addModelsForClasses(ChipImpl.class);
		ctx2.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/ChipImplTest2.json", "/content");
			
		currentPage = Mockito.mock(Page.class);
		currentTag=Mockito.mock(Tag.class);
	}

	/**
	 * Test get chip title.
	 */
	@Test
	void testGetChipTitle() {
		ctx.currentResource(ChipImplTest.PATH);
		Chip chip = ctx.request().adaptTo(Chip.class);
		assertEquals("Test Chip Title", chip.getTagTitle());
		
		ctx2.currentResource("/content/chipEmpty");
		Chip chip2 = ctx2.request().adaptTo(Chip.class);
		assertEquals("", chip2.getTagTitle());
	}

	/**
	 * Test get field name.
	 */
	@Test
	void testGetFieldName() {
		ctx.currentResource(ChipImplTest.PATH);
		Chip chip = ctx.request().adaptTo(Chip.class);
		assertEquals("categorytagfacets", chip.getFieldName());
		
		ctx2.currentResource("/content/chipEmpty");
		Chip chip2 = ctx2.request().adaptTo(Chip.class);
		assertEquals("", chip2.getFieldName());
	}

	/**
	 * Test get resolved tag title.
	 */
	@Test
	void testGetResolvedTagTitle() throws AccessControlException, InvalidTagFormatException {
		ctx.currentResource(ChipImplTest.PATH);
		Chip chip = ctx.request().adaptTo(Chip.class);
				
		TagManager tmgr = ctx.resourceResolver().adaptTo(TagManager.class);
		Tag tempTag = tmgr.createTag("bts:global-reference/faq-categories/freestyle-libre/bevilling", "Testing",
				"unit testing");
		locale = currentPage.getLanguage(false);
		if (tempTag.getLocalizedTitle(locale) != null) {
			String localeTagTitle = tempTag.getLocalizedTitle(locale);
			assertEquals(localeTagTitle, chip.getResolvedTagTitle());

		} else {
			assertEquals(tempTag.getTitle(),chip.getResolvedTagTitle());
			assertNotNull(chip.getResolvedTagTitle());
		}

	}
	
	@Test
	void testGetResolvedTagTitlePageandTagNull() throws AccessControlException, InvalidTagFormatException {
		ctx.currentResource(ChipImplTest.PATH);
		Chip chip = ctx.request().adaptTo(Chip.class);
		currentPage=null;
		currentTag=null;
		assertNull(currentPage);
		assertNull(currentTag);
		
		assertEquals("",chip.getResolvedTagTitle());

	}

	@Test
	void testNullTag() {
		ctx.currentResource("/content");
		Chip chip = ctx.request().adaptTo(Chip.class);
		Assertions.assertNotNull(chip);
	}

	/**
	 * Test get resolved tag parent title.
	 */
	@Test
	void testGetResolvedTagParentTitle() {
		ctx.currentResource(ChipImplTest.PATH);
		Chip chip = ctx.request().adaptTo(Chip.class);
		assertNotNull(chip.getResolvedTagParentTitle());
	}

	@Test
	void testParentTagNotnull() throws Exception {
		TagManager tmgr = ctx.resourceResolver().adaptTo(TagManager.class);
		Tag tempTag = tmgr.createTag("bts:global-reference/faq-categories/freestyle-libre/bevilling", "Testing",
				"unit testing");
		ctx.currentResource(ChipImplTest.PATH);
		Chip chip = ctx.request().adaptTo(Chip.class);
		assertNotNull(chip.getResolvedTagParentTitle());
	}

	@Test
	void testTagNotnull() throws Exception {
		TagManager tmgr = ctx.resourceResolver().adaptTo(TagManager.class);
		Tag tempTag = tmgr.createTag("bts:global-reference/faq-categories/freestyle-libre/bevilling", "GermanyTitle",
				"unit testing");
		ctx.currentResource(ChipImplTest.PATH);
		Chip chip = ctx.request().adaptTo(Chip.class);
		locale = currentPage.getLanguage(false);
		if (tempTag.getLocalizedTitle(locale) != null) {
			String localeTagTitle = tempTag.getLocalizedTitle(locale);
			assertEquals(localeTagTitle, chip.getResolvedTagTitle());
		}
		assert StringUtils.isNotBlank(chip.toString());
		
	}
	
	/**
	 * Test get resolved tag title without locale.
	 */
	
	@Test
	void testGetResolvedTagTitleWithoutLocale() throws Exception{
		ctx.currentResource(ChipImplTest.PATH);
		Chip chip = ctx.request().adaptTo(Chip.class);
				
		TagManager tmgr = ctx.resourceResolver().adaptTo(TagManager.class);
		Tag tempTag = tmgr.createTag("bts:global-reference/faq-categories/freestyle-libre/bevilling", "Testing",
				"unit testing");
		assertEquals(tempTag.getTitle(),chip.getResolvedTagTitleWithoutLocale());
		assertNotNull(chip.getResolvedTagTitleWithoutLocale());
		
		
		ctx2.currentResource("/content/chipEmpty");
		Chip chip2 = ctx2.request().adaptTo(Chip.class);
		assertEquals("",chip2.getResolvedTagTitleWithoutLocale());
	}
	
	/**
	 * Test get resolved tag name.
	 */

	@Test
	void testGetResolvedTagName() throws Exception{
		ctx.currentResource(ChipImplTest.PATH);
		Chip chip = ctx.request().adaptTo(Chip.class);
				
		TagManager tmgr = ctx.resourceResolver().adaptTo(TagManager.class);
		Tag tempTag = tmgr.createTag("bts:global-reference/faq-categories/freestyle-libre/bevilling", "Testing",
				"unit testing");
		assertEquals(tempTag.getName(),chip.getResolvedTagName());
		assertNotNull(chip.getResolvedTagName());
		
		
		ctx2.currentResource("/content/chipEmpty");
		Chip chip2 = ctx2.request().adaptTo(Chip.class);
		assertEquals("",chip2.getResolvedTagName());
	}
	
}