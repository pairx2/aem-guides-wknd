package com.abbott.aem.an.similac.core.models;

import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.apache.sling.api.resource.Resource;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith(AemContextExtension.class) 
public class MultiFieldReaderModelTest {

	@InjectMocks
	private MultiFieldReaderModel multiFieldReaderModel;
	
	@Test
	final void testLinks(AemContext context) {
		Resource linkResource = context.create().resource("/content/an/similac/global/en/page/links",
    			"links", "/content/an/similac/page3.html");
		
		context.addModelsForClasses(MultiFieldReaderModel.class);
		context.currentResource(linkResource);
		multiFieldReaderModel = linkResource.adaptTo(MultiFieldReaderModel.class);
		assertNotNull(multiFieldReaderModel.links);
	}

}
