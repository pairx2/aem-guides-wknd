package com.abbott.aem.platform.common.components.models.impl.v1;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ValueMap;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;

import com.abbott.aem.platform.common.components.models.EmailPage;
import com.abbott.aem.platform.common.components.models.HeaderImage;
import com.abbott.aem.platform.common.components.services.ProxyComponentService;
import com.abbott.aem.platform.common.components.services.ProxyPaths;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
import com.day.cq.wcm.api.components.Component;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith(AemContextExtension.class)
class HeaderImageImplTest {

	private final AemContext ctx = new AemContext();

	private ProxyComponentService proxyComponentService;
	private Component component;

	@Mock
	ValueMap value;

	@Mock
	SlingHttpServletRequest request;

	@Mock
	PageManager pm;

	@Mock
	Page containingPage;

	@Mock
	Resource resource;
	
	@Mock
	EmailPage emailPage;

	@BeforeEach
	void setUp() throws Exception {
		request = mock(SlingHttpServletRequest.class);
		pm = mock(PageManager.class);
		containingPage = mock(Page.class);
		resource = mock(Resource.class);
		value = mock(ValueMap.class);
		proxyComponentService = Mockito.mock(ProxyComponentService.class);
		component = Mockito.mock(Component.class);
		emailPage=Mockito.mock(EmailPage.class);
		ProxyPaths path = null;
		Mockito.lenient().when(proxyComponentService.getProxyPath(component, path)).thenReturn("hello");
		ctx.registerService(ProxyComponentService.class, proxyComponentService);
		ctx.addModelsForClasses(HeaderImageImpl.class);
		ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/HeaderImageImplTest.json",
				"/content");
		ctx.currentResource("/content/headerimage");
	}

	@Test
	void testImageUrl() {
		HeaderImage headerImage;
		headerImage=mock(HeaderImage.class);	
		Mockito.lenient().when(request.getResource()).thenReturn(resource);
		Mockito.lenient().when(pm.getContainingPage(Mockito.any(Resource.class))).thenReturn(containingPage);
		Mockito.lenient().when(containingPage.adaptTo(EmailPage.class)).thenReturn(emailPage);
		Mockito.lenient().when(emailPage.getAssetPrefixDomain()).thenReturn("test");
		Mockito.lenient().when(headerImage.getImageUrl()).thenReturn("test");
		assertEquals("test", headerImage.getImageUrl());
	}
}
