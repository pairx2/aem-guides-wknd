
package com.abbott.aem.add.division.core.components.util;

import static org.mockito.Mockito.when;

import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.testing.mock.sling.ResourceResolverType;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.junit.jupiter.MockitoSettings;
import org.mockito.quality.Strictness;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.abbott.aem.cloud.api.configuration.ApiRunJobConfiguration;
import com.abbott.aem.cloud.api.configuration.ESLDomainURLService;
import com.abbott.aem.platform.common.components.services.APILookupService;
import com.abbott.aem.platform.common.components.services.ApiResponse;
import com.abbott.aem.platform.common.components.services.HttpService;
import com.day.cq.commons.inherit.HierarchyNodeInheritanceValueMap;
import com.day.cq.commons.inherit.InheritanceValueMap;
import com.day.cq.wcm.api.Page;

import junitx.framework.Assert;
import lombok.NonNull;

@ExtendWith(MockitoExtension.class)
@MockitoSettings(strictness = Strictness.LENIENT)
class ESLPostMethodUtilTest {
	
	@InjectMocks
	ESLPostMethodUtil eslPostMethodUtil;

//	APILookupServiceImpl apiLookupService = Mockito.spy(new APILookupServiceImpl());
	
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
	private APILookupService apiLookupService;

	@Mock
	private ApiRunJobConfiguration keyConfig;

	@Mock
	private ESLDomainURLService domainConfig;

	InheritanceValueMap inheritedProperties;
	
	HierarchyNodeInheritanceValueMap map;

	Locale locale;

	HttpService httpService;

	ApiResponse apiResponse;
	private static final Logger log = LoggerFactory.getLogger(ESLPostMethodUtil.class);
	@Mock
	Page page;
	
	Map<String, Object> parameters = new HashMap<>();

	private static final String PATH = "/content/eslpostmethod";

	@BeforeEach
	void setup() throws Exception {
	
	}
	
	@Test
	void testgetProductResult_Failure() {
		
		try {
			when(keyConfig.getApiKey()).thenReturn("APIKEY");
			when(keyConfig.getESLOriginSecretKey()).thenReturn("SECRETKEY");
			when(apiLookupService.getRequestEndpoint("https://dev2.services.abbott")).thenReturn("https://dev2.services.abbott");
			String response=eslPostMethodUtil.getProductResult("https://dev2.services.abbott", "transfusion", "{\"type\":\"product\"}");
			Assertions.assertNotNull(response);
			
		}
		catch(Exception e)
		{
			log.error("error is:{}", e);
		}
	}

}