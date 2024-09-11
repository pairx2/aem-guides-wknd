package com.abbott.aem.an.similac.core.utils;

import static com.abbott.aem.an.similac.core.utils.TestConstants.CONTENT_TEST;
import static com.abbott.aem.an.similac.core.utils.TestConstants.EMPTY_PAGE_RESOURCE;
import static com.abbott.aem.an.similac.core.utils.TestConstants.SLASH_CONTENT;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.PersistenceException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith(AemContextExtension.class)
@ExtendWith(MockitoExtension.class)
public class SimilacUtilsTest {

	private static final String PAGE_PATH = "/content/an/similac/global/en/product/infant";
	private static final String EXPECTED_PAGE_PATH = "/content/an/similac/global/en/product/infant.html";
	private static final String DAM_IMAGE_PATH = "/content/dam/an/similac/product/baby-formula.png";
	private static final String DAM_IMAGE_NO_EXT = "/content/dam/an/similac/product/baby-formula";
	private static final String NEGATIVE = "/x";
	private static final String EXTERNAL_LINK = "www.similac.com";
	private static final String EXPECTED_EXTERNAL_LINK = "http://www.similac.com";
	private static final String BLANK = "";

	@Mock
	ResourceResolver resolver;

	@Mock
	SlingHttpServletRequest mockRequest;

	@Mock
	PageManager mockPageManager;

	@Mock
	Page page;

	private AemContext context;

	@Test
	final void testLinkChecker() {
		assertNull(SimilacUtils.linkChecker(null));
		assertEquals(BLANK, SimilacUtils.linkChecker(BLANK));
		assertEquals(EXPECTED_PAGE_PATH, SimilacUtils.linkChecker(PAGE_PATH));
		assertEquals(DAM_IMAGE_PATH, SimilacUtils.linkChecker(DAM_IMAGE_PATH));
		assertEquals(DAM_IMAGE_NO_EXT, SimilacUtils.linkChecker(DAM_IMAGE_NO_EXT));
		assertEquals(NEGATIVE, SimilacUtils.linkChecker(NEGATIVE));
		assertEquals(EXPECTED_EXTERNAL_LINK, SimilacUtils.linkChecker(EXTERNAL_LINK));
	}

	@Test
	final void testResolve() {
		Resource resource = context.create().resource(PAGE_PATH);
		Mockito.lenient().when(resolver.resolve(anyString())).thenReturn(resource);
		String actualResult = SimilacUtils.resolve(resolver, DAM_IMAGE_PATH);
		assertNotNull(actualResult);
		assertEquals(PAGE_PATH + ".html", actualResult);
		assertNull(SimilacUtils.resolve(null, null));
		assertNull(SimilacUtils.resolve(resolver, null));
		
		context.load().json(EMPTY_PAGE_RESOURCE, "/conf");		
		context.currentResource("/conf/dummy-resource");
		resource = context.currentResource();
		Mockito.lenient().when(resolver.resolve(anyString())).thenReturn(resource);
		actualResult = SimilacUtils.resolve(resolver, DAM_IMAGE_PATH);
		assertNull(actualResult);
	}

	@Test
	final void testCloseResolver() throws PersistenceException {
		when(resolver.isLive()).thenReturn(true);
		when(resolver.hasChanges()).thenReturn(true);
		doNothing().when(resolver).commit();
		SimilacUtils.closeResolver(resolver);
		verify(resolver).close();
		verify(resolver).commit();
	}
	
	@Test
	final void testSaveResourceChanges() throws PersistenceException {
		when(resolver.isLive()).thenReturn(true);
		Mockito.lenient().when(resolver.hasChanges()).thenReturn(false);
		SimilacUtils.closeResolver(resolver);
		verify(resolver, Mockito.never()).commit();
		
		Mockito.lenient().when(resolver.hasChanges()).thenReturn(true);
		doThrow(new PersistenceException()).when(resolver).commit();
		SimilacUtils.closeResolver(resolver);
		verify(resolver).commit();
	}
	
	@Test
	final void testCloseResolverNegative() {
		SimilacUtils.closeResolver(resolver);
		verify(resolver, Mockito.never()).close();
		
		SimilacUtils.closeResolver(null);
		verify(resolver, Mockito.never()).close();
	}
	
	@Test
	final void testGetChildJsonNegative() {
		context.load().json(EMPTY_PAGE_RESOURCE, SLASH_CONTENT);
		context.currentPage("/content/empty-page");
		Logger log = LoggerFactory.getLogger(this.getClass());
		assertNull(SimilacUtils.getChildJson("testName", context.currentPage(), log));
	}

	@Test
	final void testGetUrl() {
		String expected = CONTENT_TEST;
		context.registerService(Page.class, page);
		context.registerService(SlingHttpServletRequest.class, mockRequest);

		Mockito.lenient().when(page.getVanityUrl()).thenReturn("/test");
		Mockito.lenient().when(mockRequest.getContextPath()).thenReturn(SLASH_CONTENT);

		assertEquals(expected, SimilacUtils.getURL(mockRequest, page));

		Mockito.lenient().when(page.getVanityUrl()).thenReturn(null);
		Mockito.lenient().when(page.getPath()).thenReturn("/test");
		expected = CONTENT_TEST+".html";
		assertEquals(expected, SimilacUtils.getURL(mockRequest, page));
	}

	@Test
	final void testGetUrlPath() {
		String expected = CONTENT_TEST;
		context.registerService(Page.class, page);
		context.registerService(SlingHttpServletRequest.class, mockRequest);
		context.registerService(PageManager.class, mockPageManager);

		Mockito.lenient().when(page.getVanityUrl()).thenReturn("/test");
		Mockito.lenient().when(mockRequest.getContextPath()).thenReturn(SLASH_CONTENT);
		Mockito.lenient().when(mockRequest.getContextPath()).thenReturn(SLASH_CONTENT);
		Mockito.lenient().when(mockPageManager.getPage(Mockito.anyString())).thenReturn(page);

		assertEquals(expected, SimilacUtils.getURL(mockRequest, mockPageManager, CONTENT_TEST));
		
		Mockito.lenient().when(mockPageManager.getPage(Mockito.anyString())).thenReturn(null);
		assertEquals(expected, SimilacUtils.getURL(mockRequest, mockPageManager, CONTENT_TEST));
	}
}
