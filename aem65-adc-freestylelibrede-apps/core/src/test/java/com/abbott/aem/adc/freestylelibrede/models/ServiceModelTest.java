package com.abbott.aem.adc.freestylelibrede.models;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.Assert;
import org.apache.commons.lang.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

import com.abbott.aem.adc.freestylelibrede.services.ConfigurationService;

import java.io.IOException;
import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;
import java.util.stream.Collectors;

@ExtendWith({ MockitoExtension.class, AemContextExtension.class })
class ServiceModelTest extends BaseModelTest<ServiceModel> {

	@Mock
	ConfigurationService configurationService;

	private final AemContext context = new AemContext();

	@Mock
	SlingHttpServletRequest request;

	@InjectMocks
	private ServiceModel serviceModel = new ServiceModel();

	Map<String, Object> serviceMap;

	@BeforeEach
	void setup() throws IOException {
		MockitoAnnotations.initMocks(this);
		request = context.request();
		Properties properties = new Properties();
		properties.load(this.getClass().getResourceAsStream("/configuration_service.properties"));

		Map<String, Object> map = new HashMap();

		map.putAll(properties.entrySet().stream()
				.collect(Collectors.toMap(e -> e.getKey().toString(), e -> e.getValue().toString())));

		Mockito.when(configurationService.getPropertiesMap()).thenReturn(map);

		serviceModel.init();

	}

	@Test
	void getServiceMap() {
		Assert.assertEquals("exposed", serviceModel.getServiceMap().get("any.other.property"));
	}

	@Test
	void getServiceMap_NoServicePid() {
		Assert.assertFalse(serviceModel.getServiceMap().containsKey("service.pid"));
	}

	@Test
	void getServiceMap_NoComponentName() {
		Assert.assertFalse(serviceModel.getServiceMap().containsKey("component.name"));
	}

	@Test
	void getServiceMap_NoComponentId() {
		Assert.assertFalse(serviceModel.getServiceMap().containsKey("component.id"));
	}

	@Test
	public void getTags() {

		String[] tag = { "tag1", "tag2", "tag3" };
		String tags = tag != null ? StringUtils.join(tag, ",") : "";
		try {
			Field canonicalUrlField = serviceModel.getClass().getDeclaredField("tags");
			canonicalUrlField.setAccessible(true);
			canonicalUrlField.set(serviceModel, tag);
		} catch (NoSuchFieldException | IllegalAccessException e) {
			Assert.fail("Exception occurred in getTags" + e.getMessage());
		}
		
	}

}