package com.abbott.aem.platform.common.components.models.impl.v1;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

import com.abbott.aem.platform.common.components.models.FAQResultItem;

/**
 * The Class FAQResultItemImplTest.
 */
@ExtendWith(AemContextExtension.class)
class FAQResultItemImplTest {

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
		ctx.addModelsForClasses(FAQResultItemImpl.class);
		ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/FAQResultItemImplTest.json", "/content");
	}

	/**
	 * Test get link text.
	 */
	@Test
	void testGetQuestionText() {
		final String expected = "Question";
		ctx.currentResource("/content/faqresultitem");
		FAQResultItem faqResultItem = ctx.request().adaptTo(FAQResultItem.class);
		String actual = faqResultItem.getQuestionText();
		assertEquals(expected, actual);
	}

	/**
	 * Test get title text.
	 */
	@Test
	void testGetAnswerText() {
		final String expected = "Answer";
		ctx.currentResource("/content/faqresultitem");
		FAQResultItem faqResultItem = ctx.request().adaptTo(FAQResultItem.class);
		String actual = faqResultItem.getAnswerText();
		assertEquals(expected, actual);
	}
}
