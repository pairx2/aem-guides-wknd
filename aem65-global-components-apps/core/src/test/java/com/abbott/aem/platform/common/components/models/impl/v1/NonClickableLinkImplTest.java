package com.abbott.aem.platform.common.components.models.impl.v1;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

import com.abbott.aem.platform.common.components.models.NonClickableLink;
@ExtendWith(AemContextExtension.class)
class NonClickableLinkImplTest {

	private final AemContext ctx = new AemContext();

	@BeforeEach
	public void setUp() throws Exception {
		ctx.addModelsForClasses(NonClickableLinkImpl.class);
		ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/NonClickableLinkImplTest.json", "/content");

	}

	@Test
	void testGetText() {
		ctx.currentResource("/content/nonclickablelink");
		NonClickableLink link = ctx.request().adaptTo(NonClickableLink.class);
		Assertions.assertEquals("text", link.getText());
	}

}
