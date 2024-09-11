package com.abbott.aem.an.similac.core.models;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith(AemContextExtension.class)
public class FaqContainerModelTest {

	/** The AEM context to drive the environment setup */
	private AemContext ctx;

	/** The model under test */
	private FaqContainerModel faqContainer;

	@BeforeEach
	public void setup() {
		ctx = new AemContext();
		ctx.load().json("/com/abbott/aem/an/similac/core/models/faq-container.json", "/content");
		ctx.addModelsForClasses(FaqContainerModel.class);
		ctx.currentResource("/content/faq/jcr:content/faqContainer");
		faqContainer = ctx.request().adaptTo(FaqContainerModel.class);
	}

	@Test
	public void positiveTest() {
		String actual=faqContainer.getTopicLabelJson();
		String expected="{\"label1\":\"Topic Label 1\",\"label2\":\"TopicLabel 2\"}";
		assertEquals(expected,actual);
	}
}
