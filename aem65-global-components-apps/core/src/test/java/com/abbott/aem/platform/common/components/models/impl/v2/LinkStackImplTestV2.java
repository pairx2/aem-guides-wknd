package com.abbott.aem.platform.common.components.models.impl.v2;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.platform.commons.util.StringUtils;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

import com.abbott.aem.platform.common.components.models.LinkStack;
import com.abbott.aem.platform.common.components.models.utils.PlatformUtil;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;

import com.day.cq.wcm.api.components.Component;
import org.mockito.Mockito;

import com.abbott.aem.platform.common.components.services.ProxyComponentService;
import com.abbott.aem.platform.common.components.services.ProxyPaths;

@ExtendWith(AemContextExtension.class)
public class LinkStackImplTestV2 {

	private final AemContext ctx = new AemContext();

	private final AemContext ctx2 = new AemContext();

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
		ctx.addModelsForClasses(LinkStackImpl.class);
		ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v2/LinkStackImplTest.json", "/content");
		ctx.currentResource("/content/linkStack");
	}
	@Test
	void testGetStackTitle() {
		final String expected = "test";
		LinkStack link = ctx.request().adaptTo(LinkStack.class);
		String actual = link.getStackTitle();
		assertEquals("linkStackType", link.getLinkStackType());
		assertEquals("siteListDefault", link.getSiteListDefault());
		assertEquals("siteListTitle", link.getSiteListTitle());
		assertEquals("/content/bts", link.getStackLink());
		assertEquals("test", link.getAriaDescribedBy());
		assert link.getLinks().size() > 0;
		assert link.getSites().size() > 0;
		assertEquals(true, link.isStackExternal());

		assert StringUtils.isNotBlank(link.getId());
		//assert StringUtils.isNotBlank(link.toString());
		LinkStack obj1 = new LinkStackImpl();
		LinkStack obj2 = new LinkStackImpl();
		//assert obj1.equals(obj2);
	}

	@Test
	void testGetStackLink() {
		final String expected = "/content/bts";
		LinkStack link = ctx.request().adaptTo(LinkStack.class);
		String actual = link.getStackLink();
		assertEquals(expected, actual);
	}

	@Test
	void testGetIsStackExternal() {
		final boolean expected = true;
		LinkStack link = ctx.request().adaptTo(LinkStack.class);
		boolean actual = link.isStackExternal();
		assertEquals(expected, actual);
	}

	@Test
	void testGetStackLink2() {

		final String expected = null;
		LinkStack link = ctx.request().adaptTo(LinkStack.class);
		String actual = link.getStackLink();
		assertEquals(expected, actual);
	}

	@Test
	void testGetStackSticky() {
		final String expected = "true";
		LinkStack link = ctx.request().adaptTo(LinkStack.class);
		String actual = link.getEnableStickyList();
		assertEquals(expected, actual);
	}

	@Test
	void testGetStackButton() {
		final String expected = "true";
		LinkStack link = ctx.request().adaptTo(LinkStack.class);
		String actual = link.getEnableButton();
		assertEquals(expected, actual);
	}
	
	@Test
	void testGetStackStickyDefault() {
		ctx2.registerService(ProxyComponentService.class, proxyComponentService);
		ctx2.addModelsForClasses(LinkStackImpl.class);
		ctx2.load().json("/com/abbott/aem/platform/common/components/models/impl/v2/LinkStackImplTest2.json", "/content");
		ctx2.currentResource("/content/linkStack");

		page = Mockito.mock(Page.class);
		pageManager = Mockito.mock(PageManager.class);
		Mockito.lenient().when(pageManager.getPage(null)).thenReturn(page);
		Mockito.lenient().when(PlatformUtil.getURL(ctx.request(), page)).thenReturn("test");
		
		final String expected = "false";
		LinkStack link = ctx2.request().adaptTo(LinkStack.class);
		String actual = link.getEnableStickyList();
		assertEquals(expected, actual);
	}

	@Test
	void testGetStackButtonDefault() {
		
		ctx2.registerService(ProxyComponentService.class, proxyComponentService);
		ctx2.addModelsForClasses(LinkStackImpl.class);
		ctx2.load().json("/com/abbott/aem/platform/common/components/models/impl/v2/LinkStackImplTest2.json", "/content");
		ctx2.currentResource("/content/linkStack");

		page = Mockito.mock(Page.class);
		pageManager = Mockito.mock(PageManager.class);
		Mockito.lenient().when(pageManager.getPage(null)).thenReturn(page);
		Mockito.lenient().when(PlatformUtil.getURL(ctx.request(), page)).thenReturn("test");

		final String expected = "false";
		LinkStack link = ctx2.request().adaptTo(LinkStack.class);
		String actual = link.getEnableButton();
		assertEquals(expected, actual);
	}
}
