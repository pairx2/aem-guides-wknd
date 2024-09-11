package com.abbott.aem.platform.common.components.services.impl;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.any;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.when;

import java.io.IOException;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

import com.abbott.aem.platform.common.components.services.ApiResponse;
import com.abbott.aem.platform.common.components.services.HttpMethod;
import com.abbott.aem.platform.common.components.services.HttpService;
import com.day.cq.commons.inherit.HierarchyNodeInheritanceValueMap;
import com.day.cq.commons.inherit.InheritanceValueMap;
import com.day.cq.wcm.api.Page;

import org.apache.http.HttpException;
import org.apache.sling.api.resource.Resource;
import org.mockito.Mockito;

@ExtendWith(AemContextExtension.class)
public class APILookupServiceImplTest {

	AemContext ctx = new AemContext();

	APILookupServiceImpl apiLookupService = Mockito.spy(new APILookupServiceImpl());

	Map<String, Object> parameters = new HashMap<>();

	Page currentPage;

	Resource resource;

	InheritanceValueMap inheritedProperties;

	HierarchyNodeInheritanceValueMap map;

	Locale locale;

	HttpService httpService;

	ApiResponse apiResponse;

	private final static String LINK = "https://www.google.com";

	@BeforeEach
	void setup() {
		// ctx.registerInjectActivateService(apiLookupService,parameters);
		parameters.put("Abbott Enterprise Service API", "https://dev2.services.abbott");
		parameters.put("API Secret Key", "key");
		parameters.put("API Endpoints",
				"{ \"siteSearch::/api/public/search/sitesearch\" , \"querySuggest::/api/public/search/querySuggest\" };");
		ctx.registerInjectActivateService(apiLookupService, parameters);
		currentPage = Mockito.mock(Page.class);
		resource = Mockito.mock(Resource.class);
		inheritedProperties = Mockito.mock(InheritanceValueMap.class);
		map = Mockito.mock(HierarchyNodeInheritanceValueMap.class);
		httpService = Mockito.mock(HttpService.class);
		apiResponse = Mockito.mock(ApiResponse.class);
	}

	@Test
	void testGetAPIEndpointForKey() {
		Exception exception = assertThrows(IllegalArgumentException.class, () -> {
			apiLookupService.getAPIEndpointForKey("randomKey");
		});
		
		String expectedMessage = "API endpoint for the provided key randomKey doesn't exist";
	    String actualMessage = exception.getMessage();
	    assertEquals(expectedMessage, actualMessage);
		
		String expected = "https://dev2.services.abbott/api/public/search/querySuggest";
		String actual = apiLookupService.getAPIEndpointForKey("querySuggest");
		assertEquals(expected, actual);
	}

	@Test
	void testGetRelativeAPIEndpointForKey() {
		Exception exception = assertThrows(IllegalArgumentException.class, () -> {
			apiLookupService.getRelativeAPIEndpointForKey("randomKey");
		});
		
		String expectedMessage = "API endpoint for the provided key randomKey doesn't exist";
	    String actualMessage = exception.getMessage();
	    assertEquals(expectedMessage, actualMessage);
	    
		String expected = "/api/public/search/querySuggest";
		String actual = apiLookupService.getRelativeAPIEndpointForKey("querySuggest");
		assertEquals(expected, actual);
	}

	@Test
	void testProcessRequest() throws IOException, HttpException {
		String expected = "responseString";
		when(currentPage.getContentResource()).thenReturn(resource);
		doReturn(map).when(apiLookupService).getInheritanceValueMap(Mockito.any());
		locale = new Locale("en", "US");
		when(currentPage.getLanguage()).thenReturn(locale);
		doReturn(httpService).when(apiLookupService).getHTTPService(any(), any(), any(), any());
		when(httpService.executeHTTPRequest()).thenReturn(apiResponse);
		when(apiResponse.getResponseString()).thenReturn(expected);
		when(apiResponse.getResponseCode()).thenReturn(200);
		String actual = apiLookupService.processRequest(currentPage, LINK, HttpMethod.POST, null);
		assertEquals(expected, actual);
	}

	@Test
	void testGetRequestEndpoint() {
		String expected = "https://dev2.services.abbottquerySuggest";
		String actual = apiLookupService.getRequestEndpoint("querySuggest");
		assertEquals(expected, actual);
	}
}
