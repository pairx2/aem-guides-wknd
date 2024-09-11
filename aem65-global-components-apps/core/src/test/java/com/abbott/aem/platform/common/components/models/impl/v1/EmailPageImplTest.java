package com.abbott.aem.platform.common.components.models.impl.v1;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import com.abbott.aem.platform.common.components.models.EmailPage;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith(AemContextExtension.class)
class EmailPageImplTest {
	private static final String RESOURCE = "/content/emailpage";
	private final AemContext ctx = new AemContext();
	private EmailPage page;

	@BeforeEach
	public void setUp() throws Exception {
		ctx.addModelsForClasses(EmailPageImpl.class);
		ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/EmailPageImplTest.json", RESOURCE);
		ctx.currentPage(RESOURCE);
		page = ctx.request().adaptTo(EmailPage.class);

		assertTrue(page instanceof PlatformPageImpl);
		((PlatformPageImpl) page).init();
	}

	@Test
	void testAlign() {
		assertEquals("test", page.getAlign());
	}
	
	@Test
	void testAssetPrefixDomain() {
		assertEquals("localhost:4502", page.getAssetPrefixDomain());
	}

}
