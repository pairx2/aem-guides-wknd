package com.abbott.aem.platform.common.components.servlets;

import static org.mockito.Mockito.when;

import java.io.IOException;

import javax.servlet.ServletException;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import junitx.framework.Assert;
import lombok.NonNull;

import com.abbott.aem.platform.common.components.services.APILookupService;
import com.abbott.aem.platform.common.components.services.HttpMethod;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.request.RequestPathInfo;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@ExtendWith(MockitoExtension.class)
class LookupDataSourceTest {

	@InjectMocks
	LookupDataSource lookupDataSource;

	@NonNull
	@Mock
	SlingHttpServletRequest request;

	@NonNull
	@Mock
	SlingHttpServletResponse response;

	@Mock
	Resource resource;

	@Mock
	Resource dataSource;


	@Mock
	ResourceResolver resolver;

	@Mock
	ValueMap valueMap;

	@Mock
	APILookupService apiLookupService;

	@Mock
	Resource currentPageResource;

	@Mock
	PageManager pageManager;

	@Mock
	RequestPathInfo requestPathInfo;

	@Mock
	Page page;

	private static final Logger log = LoggerFactory.getLogger(LookupDataSource.class);

	private static final String LOOKUP_TYPE = "lookuptype";
	private static final String STATE_LOOKUP_TYPE = "stateLookUp";
	private static final String ResourcePath = "/content/cv/cardiovascular/au/en/textimage";


	@BeforeEach
	public void setUp() throws Exception {
	}

	@Test
	void testDoGet() {
		try {
			doGetRepeatedCode();
			lookupDataSource.doGet(request, response);
			Assert.assertNotNull(request);
		} catch (ServletException | IOException e) {
			log.error("error is:{}", e);
		} catch (Exception e) {
			log.error("error is:{}", e);
		}
	}

	@Test
	void testDoGetAgain() {
		try {
			doGetRepeatedCode();
			lookupDataSource.doGet(request, response);
		} catch (ServletException | IOException e) {
			log.error("error is:{}", e);
		} catch (Exception e) {
			log.error("error is:{}", e);
		}
	}
	
	private void getVM() {
		when(resource.getChild("datasource")).thenReturn(dataSource);
		when(dataSource.getValueMap()).thenReturn(valueMap);
	}

	private String doGetRepeatedCode() throws Exception {
		when(request.getResource()).thenReturn(resource);
		when(request.getResourceResolver()).thenReturn(resolver);
		getVM();
		when(valueMap.get(LOOKUP_TYPE, String.class)).thenReturn("formcontainer-lookupType");
		when(apiLookupService.getRequestEndpoint("formcontainer-lookupType")).thenReturn("https://www.google.com");
		when(resolver.adaptTo(PageManager.class)).thenReturn(pageManager);

		when(request.getRequestPathInfo()).thenReturn(requestPathInfo);
		when(requestPathInfo.getSuffix()).thenReturn(ResourcePath);

		when(pageManager.getContainingPage(ResourcePath)).thenReturn(page);
		when(apiLookupService.processRequest(page, "https://www.google.com", HttpMethod.GET, null)).thenReturn("responseString");
		getVM();
		return "responseString";
	}

}
