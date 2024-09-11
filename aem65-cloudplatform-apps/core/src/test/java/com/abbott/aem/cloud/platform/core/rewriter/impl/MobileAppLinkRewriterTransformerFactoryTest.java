package com.abbott.aem.cloud.platform.core.rewriter.impl;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.osgi.service.component.ComponentContext;

import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertNotNull;

@ExtendWith(MockitoExtension.class)
class MobileAppLinkRewriterTransformerFactoryTest {

	@InjectMocks
	MobileAppLinkRewriterTransformerFactory mobileAppLinkRewriterTransformerFactory;

	@Mock
	ComponentContext componentContext;

	@Mock
	Map<String, Object> properties;

	@Test
	void testCreateTransformer() {
		mobileAppLinkRewriterTransformerFactory.activate(properties);
		assertNotNull(mobileAppLinkRewriterTransformerFactory.createTransformer());
		mobileAppLinkRewriterTransformerFactory.deactivate(componentContext);
	}
}
