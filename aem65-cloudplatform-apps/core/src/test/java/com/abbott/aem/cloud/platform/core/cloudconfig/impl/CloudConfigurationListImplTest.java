package com.abbott.aem.cloud.platform.core.cloudconfig.impl;


import com.abbott.aem.cloud.platform.core.cloudconfig.CloudConfiguration;
import com.abbott.aem.cloud.platform.core.cloudconfig.CloudConfigurationList;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import lombok.NonNull;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.request.RequestPathInfo;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.lenient;


@ExtendWith({AemContextExtension.class, MockitoExtension.class})
class CloudConfigurationListImplTest {

	private final AemContext context = new AemContext();

	@InjectMocks
	CloudConfigurationListImpl cloudConfigurationList;

	@Mock
	@NonNull
	SlingHttpServletRequest request;

	@Mock
	@NonNull
	RequestPathInfo requestPathInfo;

	@Mock
	ResourceResolver resourceResolver;

	@Mock
	Resource resource;

	@Mock
	CloudConfiguration cloudConfiguration;


	@BeforeEach
	public void setUp() {
		context.registerService(new CloudConfigurationListImpl());
		lenient().when(request.getRequestPathInfo()).thenReturn(requestPathInfo);
		lenient().when(request.getResourceResolver()).thenReturn(resourceResolver);
		lenient().when(request.getResource()).thenReturn(resource);
		lenient().when(resource.adaptTo(CloudConfiguration.class)).thenReturn(cloudConfiguration);
		List<Resource> resources = new ArrayList<>();
		resources.add(resource);
		lenient().when(resourceResolver.findResources(Mockito.any(), Mockito.any())).thenReturn(resources.iterator());
	}


	@Test
	public void init() throws NoSuchFieldException, SecurityException, IllegalArgumentException,
			IllegalAccessException {
		CloudConfigurationList list = new CloudConfigurationListImpl();

		assertNotNull(list);
		Field field = list.getClass().getDeclaredField("cloudConfigurations");
		field.setAccessible(true);
		assertNotNull(field.get(list));
		CloudConfiguration config = new CloudConfigurationImpl();
		((List<CloudConfiguration>) field.get(list)).add(config);
		assertNotNull(list.getCloudConfigurations());
		assertEquals(1, list.getCloudConfigurations().size());
		config = list.getCloudConfigurations().get(0);
		assertNotNull(config);
		assertEquals(null, config.getItemPath());
		assertEquals(null, config.getConfigPath());

		lenient().when(requestPathInfo.getSuffix()).thenReturn("/apps/core/wcm/templates/abbottcloudconfig");
		cloudConfigurationList.init();
		assertNotNull(cloudConfigurationList.getCloudConfigurations());
	}

	@Test
	public void initNull() throws SecurityException, IllegalArgumentException {
		lenient().when(requestPathInfo.getSuffix()).thenReturn(null);
		cloudConfigurationList.init();
		assertNotNull(cloudConfigurationList.getCloudConfigurations());
	}

}
