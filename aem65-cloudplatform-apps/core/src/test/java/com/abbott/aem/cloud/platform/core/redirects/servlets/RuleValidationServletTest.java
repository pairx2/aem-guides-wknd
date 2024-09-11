package com.abbott.aem.cloud.platform.core.redirects.servlets;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.lenient;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Enumeration;
import java.util.List;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.request.RequestParameter;
import org.apache.sling.api.resource.NonExistingResource;
import org.apache.sling.api.resource.PersistenceException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.testing.mock.sling.ResourceResolverType;
import org.apache.sling.testing.mock.sling.servlet.MockSlingHttpServletResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import com.abbott.aem.cloud.platform.core.redirects.Types;
import com.abbott.aem.cloud.platform.core.redirects.models.HeaderMatch;
import com.abbott.aem.cloud.platform.core.redirects.models.QueryParams;
import com.abbott.aem.cloud.platform.core.redirects.models.Rule;
import com.abbott.aem.cloud.platform.core.redirects.models.UrlRedirect;
import com.day.cq.commons.jcr.JcrConstants;

import io.wcm.testing.mock.aem.junit5.AemContext;
import lombok.NonNull;

@ExtendWith(MockitoExtension.class)
class RuleValidationServletTest {

	public AemContext context = new AemContext(ResourceResolverType.RESOURCERESOLVER_MOCK);

	@InjectMocks
	RuleValidationServlet servlet;

	@NonNull
	@Mock
	SlingHttpServletRequest request;

	MockSlingHttpServletResponse response;

	@Mock
	@NonNull
	ResourceResolver resourceResolver;

	@Mock
	@NonNull
	RequestParameter requestParams;

	@Mock
	@NonNull
	Resource resource;

	@BeforeEach
	void setUp() throws PersistenceException {
		UrlRedirect urlRedirect = new UrlRedirect();
		List<Rule> rules = new ArrayList<>();
		List<HeaderMatch> matcherList = new ArrayList<>();
		List<String> parameterList = new ArrayList<String>();
		parameterList.add("./queryParameters/");
		parameterList.add("key");
		parameterList.add("value");
		Enumeration<String> enums = Collections.enumeration(parameterList);
		Rule rule = new Rule();
		Rule rule2 = new Rule();
		HeaderMatch headerMatcher = new HeaderMatch();
		headerMatcher.setHeaderValue("aaa");
		headerMatcher.setMatchType("contains");
		headerMatcher.setTargetUrl("/aaa");
		headerMatcher.setOrder(0);
		matcherList.add(headerMatcher);
		
		QueryParams qp = new QueryParams();
		List<QueryParams> qpList= new ArrayList<>();
		qpList.add(qp);
		rule2.setSourceUrl("/abc");
		rule2.setQueryParams(qpList);
		rule2.setForwardQueryString(false);
		rule2.setMappingType(Types.MappingType.BYHEADER.name());
		rule2.setHeaderName("country");
		rule2.setHeaderMatchers(matcherList);
		rule.setSourceUrl("/abc");
		rule.setQueryParams(qpList);
		rule.setForwardQueryString(false);
		rule.setMappingType(Types.MappingType.DIRECT.name());
		rules.add(rule);
		rules.add(rule2);
		rules.add(rule2);
		urlRedirect.setMappings(rules);
		urlRedirect.setTitle("test");
		response = context.response();
		lenient().when(resourceResolver.resolve(Mockito.anyString())).thenReturn(resource);
		lenient().when(resource.getResourceResolver()).thenReturn(resourceResolver);
		lenient().when(request.getResource()).thenReturn(resource);
		lenient().when(request.getParameter("path")).thenReturn("test");
		lenient().when(request.getParameter("parentPath")).thenReturn("test");
		lenient().when(request.getParameter("./sourceUrl")).thenReturn("/abc");
		lenient().when(request.getParameter("./mappingType")).thenReturn(Types.MappingType.DIRECT.name());
		lenient().when(request.getParameterNames()).thenReturn(enums);
		lenient().when(request.getParameter("./headerName")).thenReturn("country");
		lenient().when(resource.getChild(JcrConstants.JCR_CONTENT)).thenReturn(resource);
		lenient().when(resource.adaptTo(UrlRedirect.class)).thenReturn(urlRedirect);
	}

	@Test
	void testValidationServlet1() throws IOException {
		servlet.doPost(request, response);
		assertNotNull(response);
	}
	
	@Test
	void testValidationServlet0() throws IOException {
		lenient().when(request.getParameter("./mappingType")).thenReturn(Types.MappingType.BYHEADER.name());
		servlet.doPost(request, response);
		assertNotNull(response);
	}

	@Test
	void testValidationServlet2() throws IOException {
		lenient().when(request.getParameter("./sourceUrl")).thenReturn("test");
		servlet.doPost(request, response);
		assertNotNull(response);
	}

	@Test
	void testValidationServlet3() throws IOException {
		NonExistingResource testResource = new NonExistingResource(null, null);
		lenient().when(resourceResolver.resolve(Mockito.anyString())).thenReturn(testResource);
		servlet.doPost(request, response);
		assertNotNull(response);
	}

	@Test
	void testValidationServlet4() throws IOException {
		UrlRedirect urlRedirect = new UrlRedirect();
		urlRedirect.setMappings(null);
		urlRedirect.setTitle("test");
		lenient().when(resource.adaptTo(UrlRedirect.class)).thenReturn(urlRedirect);
		servlet.doPost(request, response);
		assertNotNull(response);
	}
	
	@Test
	void testValidationServlet5() throws IOException {
		lenient().when(request.getParameter("./mappingType")).thenReturn(Types.MappingType.BYHEADER.name());
		lenient().when(request.getParameter("path")).thenReturn("");
		servlet.doPost(request, response);
		assertNotNull(response);
	}
	
	@Test
	void testValidationServlet6() throws IOException {
		lenient().when(request.getParameter("./mappingType")).thenReturn(Types.MappingType.BYHEADER.name());
		lenient().when(request.getParameter("path")).thenReturn("");
		lenient().when(request.getParameter("./headerName")).thenReturn("");
		servlet.doPost(request, response);
		assertNotNull(response);
	}
	
	@SuppressWarnings("unlikely-arg-type")
	@Test
	void testValidationServlet7() {
		Rule rule = new Rule();
		Rule rule2 = new Rule();
		rule2.setSourceUrl("/abc");
		rule2.setForwardQueryString(false);
		rule2.setMappingType(Types.MappingType.BYHEADER.name());
		rule2.setHeaderName("country");
		rule.setSourceUrl("/abc");
		rule.setForwardQueryString(false);
		rule.setMappingType(Types.MappingType.DIRECT.name());
		rule.setMappingType(Types.MappingType.BYHEADER.name());
		rule.setHeaderName("country");
		rule2.equals(rule);
		rule.setQueryParametersString("a=b");
		rule2.setQueryParametersString("b=a");
		rule2.equals(null);
		rule2.equals(rule2);
		rule2.equals(new UrlRedirect());
		rule2.equals(new Rule());
		rule2.equals(rule);
		assertNotNull(rule2);
	}
	

}
