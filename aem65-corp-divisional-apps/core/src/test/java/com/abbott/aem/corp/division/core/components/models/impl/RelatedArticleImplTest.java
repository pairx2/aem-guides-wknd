package com.abbott.aem.corp.division.core.components.models.impl;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import com.abbott.aem.corp.division.core.components.models.RelatedArticle;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith(AemContextExtension.class)
public class RelatedArticleImplTest {
	private final AemContext ctx = new AemContext();

	@BeforeEach
	public void setUp() {
		ctx.addModelsForClasses(RelatedArticleImpl.class);
		ctx.load().json("/com/abbott/aem/corp/division/core/components/models/impl/RelatedArticlePageTest.json",
				"/content");
	}

	@Test
	void testAltText() {
		ctx.currentResource("/content/relatedcontent");
		RelatedArticle tb = ctx.request().adaptTo(RelatedArticle.class);
		assertEquals("Alt Image Text", tb.getAltText());
	}

	@Test
	void testAltTextAuto() {
		ctx.currentResource("/content/relatedcontent1");
		ctx.load().json("/com/abbott/aem/corp/division/core/components/models/impl/RelatedArticleImagePage.json",
				"/content/corp/abbott/in/en/corpnewsroom/diabetes-care/can-stress-affect-your-blood-sugar-levels-");
		RelatedArticle tb = ctx.request().adaptTo(RelatedArticle.class);
		assertEquals("Alt Sun", tb.getAltText());
	}

	@Test
	void testImagepath() {
		ctx.currentResource("/content/relatedcontent");
		RelatedArticle tb = ctx.request().adaptTo(RelatedArticle.class);
		assertEquals("/content/dam/projects/Sunflower_sky_backdrop.jpg", tb.getArticleImagePath());
	}

	@Test
	void testImagepathAuto() {
		ctx.currentResource("/content/relatedcontent1");
		ctx.load().json("/com/abbott/aem/corp/division/core/components/models/impl/RelatedArticleImagePage.json",
				"/content/corp/abbott/in/en/corpnewsroom/diabetes-care/can-stress-affect-your-blood-sugar-levels-");
		RelatedArticle tb = ctx.request().adaptTo(RelatedArticle.class);
		assertEquals("/content/dam/projects/Sunflower_sky_backdrop.jpg", tb.getArticleImagePath());
	}

	@Test
	void testOpenNewTab() {
		ctx.currentResource("/content/relatedcontent");
		RelatedArticle tb = ctx.request().adaptTo(RelatedArticle.class);
		assertEquals("_self", tb.openInNewTab());
	}

	@Test
	void testRelatedLabel() {
		ctx.currentResource("/content/relatedcontent");
		RelatedArticle tb = ctx.request().adaptTo(RelatedArticle.class);
		assertEquals("Related Label", tb.getRelatedLabel());
	}

	@Test
	void testArticleType() {
		ctx.currentResource("/content/relatedcontent");
		RelatedArticle tb = ctx.request().adaptTo(RelatedArticle.class);
		assertEquals("brightCove", tb.getArticleType());
	}

	@Test
	void testArticlePath() {
		ctx.currentResource("/content/relatedcontent");
		RelatedArticle tb = ctx.request().adaptTo(RelatedArticle.class);
		assertEquals("/content/corp/abbott/in/en/corpnewsroom/diabetes-care/can-stress-affect-your-blood-sugar-levels-",
				tb.getArticlePath());
	}

	@Test
	void testArticleMethodFalse() {
		ctx.currentResource("/content/relatedcontent1");
		RelatedArticle tb = ctx.request().adaptTo(RelatedArticle.class);
		assertEquals(false, tb.getEnableManualArticleMethod());
	}

	@Test
	void testArticleMethod() {
		ctx.currentResource("/content/relatedcontent");
		RelatedArticle tb = ctx.request().adaptTo(RelatedArticle.class);
		assertEquals(true, tb.getEnableManualArticleMethod());
	}

	@Test
	void testArticleDescription() {
		ctx.load().json("/com/abbott/aem/corp/division/core/components/models/impl/CorpTitleParentPageHeadline.json",
				"/content/corp/abbott/in/en/corpnewsroom/diabetes-care/can-stress-affect-your-blood-sugar-levels-");
		ctx.currentResource("/content/relatedcontent");
		RelatedArticle tb = ctx.request().adaptTo(RelatedArticle.class);
		assertEquals("Products and Innovation", tb.getArticleDescription());
	}
	
	@Test
	void testnullArticleDescription() {
		ctx.currentResource("/content/relatedcontentimage");
		RelatedArticle tb = ctx.request().adaptTo(RelatedArticle.class);
        assertEquals(true, tb.getEnableManualArticleMethod());
        assertEquals("article", tb.getArticleType());
        assertEquals("nul", tb.getArticleDescription());
	}
	
	@Test
	void testnotnullArticleDescription() {
		ctx.currentResource("/content/relatedcontentimage");
		RelatedArticle tb = ctx.request().adaptTo(RelatedArticle.class);
        assertNotEquals(false, tb.getEnableManualArticleMethod());
        assertNotEquals("notarticle", tb.getArticleType());
        assertNotEquals("notnul", tb.getArticleDescription());
	}
	@Test
	void testsemiArticleDescription() {
		ctx.currentResource("/content/relatedcontentimage");
		RelatedArticle tb = ctx.request().adaptTo(RelatedArticle.class);
        assertEquals(true, tb.getEnableManualArticleMethod());
        assertEquals("article", tb.getArticleType());
        assertNotEquals("notnul", tb.getArticleDescription());
	}
	
}
