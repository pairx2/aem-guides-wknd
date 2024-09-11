package com.abbott.aem.an.similac.core.models;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.wrappers.ValueMapDecorator;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;

import com.google.common.collect.ImmutableMap;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith(AemContextExtension.class)
class HeaderModelTest {

	@InjectMocks
	private HeaderModel headerModel;
	
	@BeforeEach
	void setUp(AemContext context) {
		
		Resource headeRresource = context.create().resource("/content/an/similac/global/en/utility-pages/header/jcr:content/root/header", 
	   			 new ValueMapDecorator(ImmutableMap.<String, Object> of(
	   					 "headerResourcePath", "/content/an/similac/global/en/utility-pages/header"
	   					 )));
	   	
	   	context.addModelsForClasses(HeaderModel.class);
	   	headerModel = headeRresource.adaptTo(HeaderModel.class);
	   	
	}

	@Test
	void testGetRelativeHeaderPath() {
		String relativeHeaderPath = headerModel.getRelativeHeaderPath();
		assertNotNull(relativeHeaderPath);
		assertEquals("/content/an/similac/global/en/utility-pages/header/jcr:content/root/header", relativeHeaderPath);
	}

}
