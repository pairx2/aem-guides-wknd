package com.abbott.aem.platform.common.components.models.impl.v1;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.platform.commons.util.StringUtils;
import org.mockito.Mockito;

import com.abbott.aem.platform.common.components.models.SectionPanelWithNavigation;
import com.abbott.aem.platform.common.components.services.ProxyComponentService;
import com.abbott.aem.platform.common.components.services.ProxyPaths;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
import com.day.cq.wcm.api.components.Component;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith(AemContextExtension.class)
public class SectionPanelWithNavigationTest {

	private final AemContext ctx = new AemContext();

	PageManager pageManager;

	Page page;

	private ProxyComponentService proxyComponentService;
	private Component component;

	@BeforeEach
	public void setUp() throws Exception {

		proxyComponentService = Mockito.mock(ProxyComponentService.class);
		component = Mockito.mock(Component.class);
		ProxyPaths path = null;
		Mockito.lenient().when(proxyComponentService.getProxyPath(component, path)).thenReturn("hello");
		ctx.registerService(ProxyComponentService.class, proxyComponentService);
		ctx.addModelsForClasses(SectionPanelWithNavigationImpl.class);
		ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/SectionPanelWithNavigationTest.json", "/content");

	}

	@Test
	void testContentSectionTitle() {
		ctx.currentResource("/content/sectionPanelWithNavigation");
		SectionPanelWithNavigation section = ctx.request().adaptTo(SectionPanelWithNavigation.class);
		assertEquals("altText", section.getAltText());
		assertEquals("backgroundColor", section.getBackgroundColor());
		assertEquals("backgroundImage", section.getBackgroundImage());
		assertEquals("leftImage", section.getLeftImage());
		assertEquals(true, section.isCtaLinkRequired());
		assertEquals(true, section.isSectionTitleRequired());
		assertEquals(true, section.isTileListRequired());
		assertEquals(true, section.isTitleRequired());
		assertEquals(true, section.isTextRequired());
		SectionPanelWithNavigation obj1 = new SectionPanelWithNavigationImpl();
		SectionPanelWithNavigation obj2 = new SectionPanelWithNavigationImpl();
		assert obj1.equals(obj2);
		assert StringUtils.isNotBlank(obj1.toString());
	}

}
