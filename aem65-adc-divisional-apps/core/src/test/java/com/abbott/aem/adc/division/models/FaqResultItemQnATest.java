package com.abbott.aem.adc.division.models;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.ResourceResolver;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith(AemContextExtension.class)
class FaqResultItemQnATest {

	@Mock
	SlingHttpServletRequest request;
	
	@Mock
	ResourceResolver resourceResolver;

	private final AemContext ctx = new AemContext();

	@BeforeEach
	public void setUp() throws Exception {

		ctx.addModelsForClasses(FaqResultItemQnA.class);
		ctx.load().json("/com/abbott/aem/adc/division/models/FaqResultItemQnATest.json", "/content");
	}

	@Test
	void testGetContent() {
		ctx.currentResource("/content/dam/content-fragment");
		FaqResultItemQnA faqResultOne = ctx.request().adaptTo(FaqResultItemQnA.class);
		FaqResultItemQnA faqResultTwo = ctx.request().adaptTo(FaqResultItemQnA.class);
		Assertions.assertNotNull(faqResultOne);      
		faqResultOne.equals(faqResultTwo);
		faqResultOne.hashCode();
		faqResultOne.toString();     
	}
}
