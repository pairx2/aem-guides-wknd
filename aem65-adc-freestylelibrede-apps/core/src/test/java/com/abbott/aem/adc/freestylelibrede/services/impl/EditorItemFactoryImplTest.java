package com.abbott.aem.adc.freestylelibrede.services.impl;

import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.testing.mock.sling.servlet.MockSlingHttpServletRequest;
import org.junit.Assert;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

import com.abbott.aem.adc.freestylelibrede.models.EditorItem;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.sling.api.resource.Resource;

@ExtendWith({ AemContextExtension.class, MockitoExtension.class })
public class EditorItemFactoryImplTest {

	public final AemContext context = new AemContext();

	@InjectMocks
	EditorItemFactoryImpl editorItemFactory = new EditorItemFactoryImpl();

	@Mock
	MockSlingHttpServletRequest request;

	@Mock
	Resource resource;

	@Mock
	EditorItem editorItem;

	@Mock
	ValueMap vm;

	@BeforeEach
	void setUp() {

		MockitoAnnotations.initMocks(this);
		request = context.request();
		context.registerService(Resource.class, resource);
		vm.put("iconClass", "css-class");
	}

	@Test
	void testBuild() {
		Assert.assertNull(vm.get("iconClass", String.class), editorItem.getIconClass());
	}

}
