package com.abbott.aem.ardx.division.core.components.models.impl;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;

import com.abbott.aem.ardx.division.core.components.models.ArticleDetail;
import com.abbott.aem.platform.common.components.services.ProxyComponentService;
import com.abbott.aem.platform.common.components.services.ProxyPaths;
import com.day.cq.wcm.api.components.Component;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith(AemContextExtension.class)
public class ArticleDetailImplTest {

	private final AemContext ctx = new AemContext();
	private ProxyComponentService proxyComponentService;
	private Component component;

	@BeforeEach
	void setUp() throws Exception {
		proxyComponentService = Mockito.mock(ProxyComponentService.class);
		component = Mockito.mock(Component.class);
		ProxyPaths path = null;
		Mockito.lenient().when(proxyComponentService.getProxyPath(component, path)).thenReturn("hello");
		ctx.registerService(ProxyComponentService.class, proxyComponentService);

		ctx.addModelsForClasses(ArticleDetailImpl.class);
		ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/ArticleDetailImplTest.json",
				"/content");
		ctx.currentResource("/content/articledetail");
		ctx.request().setAttribute("locale","en");
	}

	@Test
	void testPrimaryAuthorBasicInfo() {
		final String expected = "Norman Moore";
		ctx.currentResource("/content/articledetail");
		ArticleDetail article = ctx.request().adaptTo(ArticleDetail.class);
		String actual = article.getPrimaryAuthorBasicInfo();
		assertEquals(expected, actual);
	}

	@Test
	void testPrimaryAuthorSubInfo() {
		final String expected = "Director of Scientific Affairs, Infectious Diseases";
		ctx.currentResource("/content/articledetail");
		ArticleDetail article = ctx.request().adaptTo(ArticleDetail.class);
		String actual = article.getPrimaryAuthorSubInfo();
		assertEquals(expected, actual);
	}

	@Test
	void testSecondaryAuthorBasicInfo() {
		final String expected = "Jane M. Caldwell";
		ctx.currentResource("/content/articledetail");
		ArticleDetail article = ctx.request().adaptTo(ArticleDetail.class);
		String actual = article.getSecondaryAuthorBasicInfo();
		assertEquals(expected, actual);
	}

	@Test
	void testSecondaryAuthorSubInfo() {
		final String expected = "PhD for Medavera, Inc.";
		ctx.currentResource("/content/articledetail");
		ArticleDetail article = ctx.request().adaptTo(ArticleDetail.class);
		String actual = article.getSecondaryAuthorSubInfo();
		assertEquals(expected, actual);
	}

	@Test
	void testGetArticleDate() {
		final String expected = "July 08, 2022";
		ctx.currentResource("/content/articledetail");
		ArticleDetail article = ctx.request().adaptTo(ArticleDetail.class);
		String actual = article.getArticleDate();
		assertEquals(expected, actual);
	}

}