package com.abbott.aem.cloud.platform.core.cloudconfig.impl;


import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import lombok.NonNull;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.caconfig.resource.ConfigurationResourceResolver;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import javax.jcr.Session;
import java.io.IOException;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.lenient;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
class CreateCloudConfigServletTest {

	@InjectMocks
	CreateCloudConfigServlet servlet;

	@NonNull
	@Mock
	SlingHttpServletRequest request;

	@Mock
	Session session;

	@Mock
	Resource resource;

	@Mock
	ResourceResolver resourceResolver;

	@Mock
	Page page;

	@Mock
	PageManager pageManager;


	private final AemContext context = new AemContext();

	@BeforeEach
	  public void setUp() {

		Map<String, Object> parameterMap = new HashMap<>();
		parameterMap.put("configPath", "/conf/test2");
		parameterMap.put("title", "Test");
		parameterMap.put("name", "test");
		parameterMap.put("template", "/apps/abbott/templates/abbottcloudconfig");
		parameterMap.put("state", "test");
		context.request().setParameterMap(parameterMap);

		lenient().when(request.getResourceResolver()).thenReturn(resourceResolver);
		lenient().when(request.getResource()).thenReturn(resource);
		lenient().when(resourceResolver.adaptTo(Session.class)).thenReturn(session);

		lenient().when(pageManager.getPage("name")).thenReturn(page);
		ConfigurationResourceResolver configurationResourceResolver = Mockito.mock(ConfigurationResourceResolver.class);
		lenient().when(configurationResourceResolver.getResourceCollection(Mockito.any(), Mockito.any(), Mockito.any()))
				.thenReturn(Collections.singletonList(context.resourceResolver().getResource("/conf/test")));
		context.registerService(ConfigurationResourceResolver.class, configurationResourceResolver);
		servlet = new CreateCloudConfigServlet();

	  }

	@Test
	public void testDoPost() throws IOException {
		lenient().when(resourceResolver.adaptTo(PageManager.class)).thenReturn(pageManager);
		servlet.doPost(context.request(), context.response());
		assertNotNull(context.response().getOutputAsString());
	}

}
