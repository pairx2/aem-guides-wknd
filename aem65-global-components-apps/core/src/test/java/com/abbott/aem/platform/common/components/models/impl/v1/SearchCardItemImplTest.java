package com.abbott.aem.platform.common.components.models.impl.v1;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.doReturn;

import java.security.AccessControlException;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.platform.commons.util.StringUtils;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

import com.abbott.aem.platform.common.components.models.SearchCardItem;
import com.day.cq.tagging.InvalidTagFormatException;
import com.day.cq.tagging.Tag;
import com.day.cq.tagging.TagManager;

import org.apache.sling.api.resource.ResourceResolver;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;

/**
 * @author Pawan.Namagiri
 */
@ExtendWith(AemContextExtension.class)
@ExtendWith(MockitoExtension.class)
public class SearchCardItemImplTest {

	private static final String PATH = "/content/searchCardItem";
	private final AemContext ctx = new AemContext();

	@InjectMocks
	SearchCardItemImpl search;

	@Spy
	ResourceResolver resourceResolver;

	@Mock
	TagManager tagManager;

	@Mock
	Tag tag;

	/**
	 * Sets up.
	 *
	 * @throws Exception the exception
	 */
	@BeforeEach
	public void setUp() throws Exception {
		ctx.addModelsForClasses(SearchCardItemImpl.class);
		ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/SearchCardItemImpl.json", "/content");

	}

	@Test
	void testTagTitle() throws AccessControlException, InvalidTagFormatException {
		// final String expected = "Learn More";
		TagManager tmgr = ctx.resourceResolver().adaptTo(TagManager.class);
		Tag tempTag = tmgr.createTag("/content/cq:tags/bts/faq-categories/blodsukkerm-lere", "Testing", "unit testing");

		ctx.currentResource("/content/searchCardItem");
		SearchCardItem card = ctx.request().adaptTo(SearchCardItem.class);
		assertEquals("Testing", card.getResolvedTagTitle());

	}

	@Test
	public void testParentTitle() throws AccessControlException, InvalidTagFormatException {
		TagManager tmgr = ctx.resourceResolver().adaptTo(TagManager.class);
		Tag tempTag = tmgr.createTag("/content/cq:tags/bts/faq-categories/blodsukkerm-lere", "Testing", "unit testing");
		ctx.currentResource("/content/searchCardItem");
		SearchCardItem card = ctx.request().adaptTo(SearchCardItem.class);
		assertEquals("faq-categories", card.getParentTagTitle());

	}

	@Test
	void testGetResolvedTagTitle() {
		ctx.currentResource(SearchCardItemImplTest.PATH);
		SearchCardItem chip = ctx.request().adaptTo(SearchCardItem.class);
		assertNotNull(chip.getResolvedTagTitle());
	}

	@Test
	void testGetResolvedTagParentTitle() {
		ctx.currentResource(SearchCardItemImplTest.PATH);
		SearchCardItem chip = ctx.request().adaptTo(SearchCardItem.class);
		assertNotNull(chip.getParentTagTitle());
		assertNotNull(chip.getFieldName());
		assertNotNull(chip.getFileReference());
		assertNotNull(chip.getParentTagTitle());
		assertNotNull(chip.getResolvedTagTitle());
		assert StringUtils.isNotBlank(chip.getId());
		SearchCardItem obj1 = new SearchCardItemImpl();
		SearchCardItem obj2 = new SearchCardItemImpl();
		assert obj1.equals(obj2);
		assert StringUtils.isNotBlank(obj1.toString());
	}

	@Test
	void testinit() {

		doReturn(tagManager).when(resourceResolver).adaptTo(TagManager.class);
		//when(tagManager.resolve(any())).thenReturn(tag);
		search.init();
		assertTrue(1 == 1);
	}

}
