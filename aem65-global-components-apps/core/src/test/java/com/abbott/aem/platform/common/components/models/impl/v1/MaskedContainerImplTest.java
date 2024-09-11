package com.abbott.aem.platform.common.components.models.impl.v1;

import com.abbott.aem.platform.common.components.models.MaskedContainer;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.scripting.WCMBindingsConstants;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.scripting.SlingBindings;
import org.apache.sling.testing.mock.sling.servlet.MockSlingHttpServletRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@ExtendWith(AemContextExtension.class)
class MaskedContainerImplTest {
	
	private static final String RESOURCE = "/content/platformpage";
	private final AemContext ctx = new AemContext();
	private Page currentPage;
	private Resource contentResource;
	private MaskedContainer maskedContainer;

	@BeforeEach
	public void setUp() throws Exception {
		ctx.addModelsForClasses(MaskedContainerImpl.class);
		ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/MaskedContainerImplTest.json", RESOURCE);
		currentPage = ctx.currentPage(RESOURCE);
		contentResource = ctx.currentPage().getContentResource();

		MockSlingHttpServletRequest request = ctx.request();
		SlingBindings slingBindings = (SlingBindings) request.getAttribute(SlingBindings.class.getName());
		slingBindings.put(WCMBindingsConstants.NAME_CURRENT_PAGE, currentPage);
		request.setAttribute(SlingBindings.class.getName(), slingBindings);

		Resource maskedContainerResource = contentResource.getChild("root/responsivegrid/maskedcontainer");
		request.setResource(maskedContainerResource);

		maskedContainer = request.adaptTo(MaskedContainer.class);

		assertTrue(maskedContainer instanceof MaskedContainerImpl);
	}

	@Test
	void testGetLoginFormFragmentPath() {
		String expected = "/content/experience-fragments/bts/global-reference/master/en/alert/login-global/master";
		String actual = maskedContainer.getLoginFormFragmentPath();

		assertEquals(expected, actual);
	}

	@Test
	void testDisableMaskingInAuthor() {
		final boolean expected = false;
		boolean actual = maskedContainer.isDisableMaskingInAuthor();
		assertEquals(expected, actual);		
	}	
}

