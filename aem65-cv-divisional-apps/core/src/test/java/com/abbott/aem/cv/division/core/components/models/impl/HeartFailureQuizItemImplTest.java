package com.abbott.aem.cv.division.core.components.models.impl;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.HashMap;
import java.util.Map;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import com.abbott.aem.cv.division.core.components.models.HeartFailureQuizItem;

import com.day.cq.wcm.api.Page;
import org.apache.sling.api.resource.Resource;

@ExtendWith(AemContextExtension.class)
class HeartFailureQuizItemImplTest {

	private final AemContext ctx = new AemContext();
	private HeartFailureQuizItem heartFailureQuizItem;

	@BeforeEach
	public void setUp()  {
		Page page = ctx.create().page("/content/abbott");
		Map<String, Object> properties = new HashMap<>();
		properties.put("sling:resourceType", "nt:unstructured");
		properties.put("questionImagePath", "/content/dam/cv");
		properties.put("questionText", "Question Text");
		properties.put("imageAltText", "Alt Text");
		Resource resource = ctx.create().resource(page, "item", properties);
		heartFailureQuizItem = resource.adaptTo(HeartFailureQuizItem.class);
	}

	@Test
	void testGetLink() {
		assertEquals("/content/dam/cv", heartFailureQuizItem.getQuestionImagePath());
		assertEquals("Question Text", heartFailureQuizItem.getQuestionText());
		assertEquals("Alt Text", heartFailureQuizItem.getImageAltText());
	}
}
