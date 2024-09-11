package com.abbott.aem.platform.common.components.models.impl.v1;

import static org.junit.jupiter.api.Assertions.assertEquals;
import java.util.List;


import com.abbott.aem.platform.common.components.models.ContentSection;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.Resource;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;


import org.mockito.Mockito;

import com.abbott.aem.platform.common.components.services.ProxyComponentService;
import com.abbott.aem.platform.common.components.services.ProxyPaths;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
import com.day.cq.wcm.api.components.Component;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith(AemContextExtension.class)
class ContentSectionTest {

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
		ctx.addModelsForClasses(ContentSectionImpl.class);
		ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/ContentSectionTest.json", "/content");

	}

	@Test
	void testContentSectionTitle() {
		ctx.currentResource("/content/contentsection");
		ContentSection contentSection = ctx.request().adaptTo(ContentSection.class);
		List<Resource> actual = ((ContentSectionImpl) contentSection).getContentText();
		assert StringUtils.isNotBlank(contentSection.getId());
		assert actual.size() > 0;
		assert (StringUtils.isNotBlank(contentSection.toString()));
		ContentSection obj1 = new ContentSectionImpl();
		ContentSection obj2 = new ContentSectionImpl();
		assertEquals(obj1, obj2);
	}
}
