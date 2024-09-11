package com.abbott.aem.platform.common.components.models.impl.v1;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import com.abbott.aem.platform.common.components.models.NonRichText;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith(AemContextExtension.class)
class NonRichTextImplTest {

	private final AemContext ctx = new AemContext();

	@BeforeEach
	void setUp() throws Exception {
		ctx.addModelsForClasses(NonRichTextImpl.class);
		ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/NonRichTextImplTest.json", "/content");
		ctx.currentResource("/content/nonrichtext");
	}

	@Test
	final void testGetText() {
		NonRichText nonRichText = ctx.request().adaptTo(NonRichText.class);
		assertEquals("test", nonRichText.getHtmlText());
	}
}
