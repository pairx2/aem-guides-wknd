package com.abbott.aem.an.similac.core.models;

import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.apache.sling.api.resource.Resource;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith(AemContextExtension.class) 
public class FaqModelTest {

	@InjectMocks
	private FaqModel faqModel;
	
	@Test
	final void testLinks(AemContext context) {
		Resource resource = context.create().resource("/content/an/similac/global/en/products/questions",
    			"questions", "/content/an/similac/test-product-page.html");
		
		context.addModelsForClasses(FaqModel.class);
		context.currentResource(resource);
		faqModel = resource.adaptTo(FaqModel.class);
		assertNotNull(faqModel.questions);
		
	}

}
