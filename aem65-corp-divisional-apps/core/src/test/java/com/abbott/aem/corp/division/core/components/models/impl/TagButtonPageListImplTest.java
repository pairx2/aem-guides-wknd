package com.abbott.aem.corp.division.core.components.models.impl;

import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import com.abbott.aem.corp.division.core.components.models.TagButtonPageList;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith(AemContextExtension.class)
public class TagButtonPageListImplTest {
	private final AemContext ctx = new AemContext();

	@BeforeEach
	public void setUp() throws Exception {
		ctx.addModelsForClasses(TagButtonPageListImpl.class);
		ctx.load().json("/com/abbott/aem/corp/division/core/components/models/impl/TagButtonpageListTest.json",
				"/contenttag");
		ctx.load().json("/com/abbott/aem/corp/division/core/components/models/impl/Corpnewsroom.json",
				"/content/cq:tags/corp/abbott/corpnewsroom");
		ctx.load().json("/com/abbott/aem/corp/division/core/components/models/impl/CorpTitleParentPage.json",
				"/contenttagcorpnewsroom/tag/corpnewsroom");
	}

	@Test
	void testTagPageList() {
		ctx.currentResource("/content/cq:tags/corp/abbott/corpnewsroom");
		ctx.currentPage("/contenttag");
		TagButtonPageList tb = ctx.request().adaptTo(TagButtonPageList.class);
		assertTrue(tb.getTagUrlList().containsKey("Corpnewsroom")); 
	}
  
  @Test
	void testgetTagsWithOutPages() {
		TagButtonPageList tb = ctx.request().adaptTo(TagButtonPageList.class);		
		equals(tb.getTagsWithOutPages());
		
	}
}
