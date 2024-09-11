package com.abbott.aem.cloud.platform.core.util;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;

import com.day.cq.commons.Externalizer;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;

public class PageUtilTest {

	@Mock
	ResourceResolver resolver;

	@Mock
	Externalizer externalizer;

	@Mock
	PageManager pageManager;

	@Mock
	Resource resource;

	@Mock
	Page page;

	@Test
	void test() {
		resolver = mock(ResourceResolver.class);
		pageManager = mock(PageManager.class);
		page = mock(Page.class);
		String path = "/content/bts";
		when(resolver.adaptTo(PageManager.class)).thenReturn(pageManager);
		when(pageManager.getPage(path)).thenReturn(page);
		when(resolver.getResource(path)).thenReturn(resource);
		when(page.isValid()).thenReturn(true);
		when(page.getVanityUrl()).thenReturn("content/bts");
		when(resolver.map("/content/bts")).thenReturn(path);
		String results = PageUtil.getUrl(path, resolver, externalizer, false, false);
		assertNotNull(results);
	}

	@Test
	void test1() {
		resolver = mock(ResourceResolver.class);
		pageManager = mock(PageManager.class);
		page = mock(Page.class);
		String path = "/content/bts";
		when(resolver.adaptTo(PageManager.class)).thenReturn(pageManager);
		when(pageManager.getPage(path)).thenReturn(page);
		when(resolver.getResource(path)).thenReturn(resource);
		when(page.isValid()).thenReturn(true);
		when(resolver.map(String.format("%s.html", page.getPath()))).thenReturn(path);
		String results = PageUtil.getUrl(path, resolver, externalizer, false, false);
		assertNotNull(results);
	}

	@Test
	void test2() {
		resolver = mock(ResourceResolver.class);
		pageManager = mock(PageManager.class);
		page = mock(Page.class);
		String path = "/content/bts";
		String urlFormat = "%s/";
		when(resolver.adaptTo(PageManager.class)).thenReturn(pageManager);
		when(pageManager.getPage(path)).thenReturn(page);
		when(resolver.getResource(path)).thenReturn(resource);
		when(page.isValid()).thenReturn(true);
		when(resolver.map(String.format(urlFormat, page.getPath()))).thenReturn(path);
		String results = PageUtil.getUrl(path, resolver, externalizer, true, false);
		assertNotNull(results);
	}

	@Test
	void test3() {
		resolver = mock(ResourceResolver.class);
		pageManager = mock(PageManager.class);
		page = mock(Page.class);
		String path = "/content/bts";
		String urlFormat = "%s/";
		when(resolver.adaptTo(PageManager.class)).thenReturn(pageManager);
		when(pageManager.getPage(path)).thenReturn(page);
		when(resolver.getResource(path)).thenReturn(resource);
		when(page.isValid()).thenReturn(true);
		when(resolver.map(String.format(urlFormat, page.getPath()))).thenReturn(path);
		String results = PageUtil.getUrl(path, resolver);
		assertNull(results);
	}

	@Test
	void test4() {
		pageManager = mock(PageManager.class);
		page = mock(Page.class);
		String path = "/content/bts";
		String results = PageUtil.getUrl(path, resolver, externalizer, true, false);
		assertNotNull(results);
	}

	@Test
	void test5() {
		resolver = mock(ResourceResolver.class);
		pageManager = mock(PageManager.class);
		page = mock(Page.class);
		String path = "/content/bts";
		when(resolver.adaptTo(PageManager.class)).thenReturn(pageManager);
		when(pageManager.getPage(path)).thenReturn(page);
		when(resolver.getResource(path)).thenReturn(resource);
		String results = PageUtil.getUrl("", resolver, externalizer, true, false);
		assertNotNull(results);
	}

}
