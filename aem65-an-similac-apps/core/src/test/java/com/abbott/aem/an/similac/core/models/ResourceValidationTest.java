package com.abbott.aem.an.similac.core.models;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith({ AemContextExtension.class, MockitoExtension.class })
public class ResourceValidationTest {

	private static final String FORM_CONTENT_JSON = "/com/abbott/aem/an/similac/core/models/resource-validation.json";
	private static final String CONTENT_PATH = "/content";

	private AemContext context;

	@Mock
	SlingHttpServletRequest request;

	ResourceValidation resourceValidation;

	@BeforeEach
	void setUp()  {
		context.load().json(FORM_CONTENT_JSON, CONTENT_PATH);
		context.addModelsForClasses(ResourceValidation.class);
		Resource resource = context.create().resource("/validResource", "resourcePath",
				"/content/validResource/jcr:content/nutritionalInfo");
		context.currentResource(resource);
		resourceValidation = context.request().adaptTo(ResourceValidation.class);
	}

	@Test
	public void testGetValidResource() {
		Assertions.assertNotNull(resourceValidation.getValidResource());
	}
	
	@Test
	public void testIsEnabled() {
		Assertions.assertEquals(false, resourceValidation.isEnabled());
	}
}
