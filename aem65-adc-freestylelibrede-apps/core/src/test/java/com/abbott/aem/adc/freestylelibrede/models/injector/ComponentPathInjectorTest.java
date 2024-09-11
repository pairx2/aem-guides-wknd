package com.abbott.aem.adc.freestylelibrede.models.injector;

import java.lang.reflect.AnnotatedElement;
import java.lang.reflect.Type;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.spi.DisposalCallbackRegistry;
import org.junit.Assert;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

import com.abbott.aem.adc.freestylelibrede.models.injector.annotation.ComponentPath;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith({ AemContextExtension.class, MockitoExtension.class })
public class ComponentPathInjectorTest {

	@InjectMocks
	private ComponentPathInjector componentPathInjector;
	private final AemContext context = new AemContext();
	@Mock
	ComponentPath annotation;
	@Mock
	AnnotatedElement annotatedElement;
	String fieldName = "mockfieldName";

	@Mock
	Type type;

	@Mock
	DisposalCallbackRegistry disposalCallbackRegistry;

	@Mock
	Resource resource;

	@Mock
	Object adaptable;

	@BeforeEach
	void setup() {
		MockitoAnnotations.initMocks(this);
	}

	@Test
	public void getName() {
		Assert.assertEquals("component-path",componentPathInjector.getName());
	}

	@Test
	public void getValue() {

		componentPathInjector.getValue(adaptable, fieldName, type, annotatedElement, disposalCallbackRegistry);
		Assert.assertNull(componentPathInjector.getValue(adaptable, fieldName, type, annotatedElement, disposalCallbackRegistry));
	}

	@Test
	public void createAnnotationProcessor() {

		componentPathInjector.createAnnotationProcessor(annotatedElement);
		Assert.assertNull(componentPathInjector.createAnnotationProcessor(annotatedElement));
	}
}
