package com.abbott.aem.cloud.platform.core.redirects.servlets;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.lenient;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.request.RequestParameter;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.testing.mock.sling.ResourceResolverType;
import org.apache.sling.testing.mock.sling.servlet.MockSlingHttpServletResponse;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import com.abbott.aem.cloud.platform.core.redirects.Types;
import com.abbott.aem.cloud.platform.core.redirects.models.HeaderMatch;
import com.abbott.aem.cloud.platform.core.redirects.models.Rule;
import com.abbott.aem.cloud.platform.core.redirects.models.UrlRedirect;
import com.day.cq.commons.jcr.JcrConstants;

import io.wcm.testing.mock.aem.junit5.AemContext;
import lombok.NonNull;

@ExtendWith(MockitoExtension.class)
class ExportRedirectRulesServletTest {

	public AemContext context = new AemContext(ResourceResolverType.RESOURCERESOLVER_MOCK);

	@InjectMocks
	ExportRedirectRulesServlet servlet;

	@NonNull
	@Mock
	SlingHttpServletRequest request;

	@NonNull
	@Mock
	SlingHttpServletResponse response;

	@Mock
	@NonNull
	ResourceResolver resourceResolver;

	@Mock
	@NonNull
	RequestParameter requestParams;

	@Mock
	@NonNull
	Resource resource;

	@Test
	void testImportServlet() throws IOException {
		UrlRedirect urlRedirect = new UrlRedirect();
		List<Rule> rules = new ArrayList<>();
		List<HeaderMatch> matcherList = new ArrayList<>();
		Rule rule = new Rule();
		Rule rule2 = new Rule();
		HeaderMatch headerMatcher = new HeaderMatch();
		headerMatcher.setHeaderValue("aaa");
		headerMatcher.setMatchType("contains");
		headerMatcher.setTargetUrl("/aaa");
		headerMatcher.setOrder(0);
		matcherList.add(headerMatcher);
		rule2.setForwardQueryString(false);
		rule2.setMappingType(Types.MappingType.BYHEADER.name());
		rule2.setHeaderMatchers(matcherList);
		rule.setForwardQueryString(false);
		rule.setMappingType(Types.MappingType.DIRECT.name());
		rules.add(rule);
		rules.add(rule2);
		urlRedirect.setMappings(rules);
		urlRedirect.setTitle("test");
		MockSlingHttpServletResponse response2 = context.response();
		lenient().when(request.getResourceResolver()).thenReturn(resourceResolver);
		lenient().when(resourceResolver.resolve(Mockito.anyString())).thenReturn(resource);
		lenient().when(request.getParameter("path")).thenReturn("test");
		lenient().when(resource.getChild(JcrConstants.JCR_CONTENT)).thenReturn(resource);
		lenient().when(resource.adaptTo(UrlRedirect.class)).thenReturn(urlRedirect);
		servlet.doGet(request, response2);
		assertNotNull(response2);
	}
}
