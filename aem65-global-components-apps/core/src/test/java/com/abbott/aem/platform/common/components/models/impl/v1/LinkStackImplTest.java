package com.abbott.aem.platform.common.components.models.impl.v1;

import static org.junit.jupiter.api.Assertions.*;;
import static org.mockito.Mockito.mock;

import com.abbott.aem.platform.common.components.models.LinkStackItem;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

import com.abbott.aem.platform.common.components.models.LinkStack;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;

import com.day.cq.wcm.api.components.Component;
import org.mockito.Mock;
import org.mockito.Mockito;

import com.abbott.aem.platform.common.components.services.ProxyComponentService;
import com.abbott.aem.platform.common.components.services.ProxyPaths;

import java.util.List;

@ExtendWith(AemContextExtension.class)
class LinkStackImplTest {

	private final AemContext ctx = new AemContext();

	private final AemContext ctx2 = new AemContext();

	@Mock
	PageManager pageManager;

	@Mock
	Page page;

	private ProxyComponentService proxyComponentService;

	private Component component;


	@BeforeEach
	public void setUp() throws Exception {
		pageManager = mock(PageManager.class);
		page = mock(Page.class);
		ctx.registerService(PageManager.class, pageManager);
		proxyComponentService = mock(ProxyComponentService.class);
		component = mock(Component.class);
		ProxyPaths path = null;
		Mockito.lenient().when(proxyComponentService.getProxyPath(component, path)).thenReturn("hello");
		ctx.registerService(ProxyComponentService.class, proxyComponentService);
		ctx.addModelsForClasses(LinkStackV1Impl.class);
		ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/LinkStackImplTest.json", "/content");
		ctx.currentResource("/content/linkStack");

	}



	@Test
	void testGetStackTitle() {
		ctx.currentResource("/content/linkStack");
		LinkStack link = ctx.request().adaptTo(LinkStack.class);
		assertNotNull(link);
		assertEquals("test", link.getStackTitle());
	}

	@Test
	void testGetStackLink() {
		final String expected = "/content/bts";
		LinkStack link = ctx.request().adaptTo(LinkStack.class);
		String actual = link.getStackLink();
		assertEquals(expected, actual);
	}


	@Test
	void testGetLinkStackType() {
		ctx.currentResource("/content/linkStack");
		LinkStack link = ctx.request().adaptTo(LinkStack.class);
		assertNotNull(link);
		assertEquals("linkStackType", link.getLinkStackType());
	}

	@Test
	void testGetSiteListDefault() {
		ctx.currentResource("/content/linkStack");
		LinkStack link = ctx.request().adaptTo(LinkStack.class);
		assertNotNull(link);
		assertEquals("siteListDefault", link.getSiteListDefault());
	}

	@Test
	void testGetAction() {
		ctx.currentResource("/content/linkStack");
		LinkStack link = ctx.request().adaptTo(LinkStack.class);
		assertNotNull(link);
		assertEquals("_blank", link.getAction());
	}

	@Test
	void testGetSiteListTitle() {
		ctx.currentResource("/content/linkStack");
		LinkStack link = ctx.request().adaptTo(LinkStack.class);
		assertNotNull(link);
		assertEquals("siteListTitle", link.getSiteListTitle());
	}

	@Test
	void testGetAriaDescribedBy() {
		ctx.currentResource("/content/linkStack");
		LinkStack link = ctx.request().adaptTo(LinkStack.class);
		assertNotNull(link);
		assertEquals("test", link.getAriaDescribedBy());
	}

	@Test
	void testGetLinks() {
		ctx.currentResource("/content/linkStack");
		LinkStack link = ctx.request().adaptTo(LinkStack.class);
		assertNotNull(link);
		List<LinkStackItem> links = link.getLinks();
		assertNotNull(links);
		assertFalse(links.isEmpty());
	}

	@Test
	void testGetSites() {
		ctx.currentResource("/content/linkStack");
		LinkStack link = ctx.request().adaptTo(LinkStack.class);
		assertNotNull(link);
		List<LinkStackItem> sites = link.getSites();
		assertNotNull(sites);
		assertFalse(sites.isEmpty());
	}

	@Test
	void testIsStackExternal() {
		ctx.currentResource("/content/linkStack");
		LinkStack link = ctx.request().adaptTo(LinkStack.class);
		assertNotNull(link);
		assertTrue(link.isStackExternal());
	}

	@Test
	void testRedirectConfirm() {
		ctx.currentResource("/content/linkStack");
		LinkStack link = ctx.request().adaptTo(LinkStack.class);
		assertNotNull(link);
		assertTrue(link.isRedirectConfirm());
	}
}
