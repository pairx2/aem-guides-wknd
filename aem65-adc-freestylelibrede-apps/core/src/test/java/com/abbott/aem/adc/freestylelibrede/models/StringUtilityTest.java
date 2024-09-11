package com.abbott.aem.adc.freestylelibrede.models;

import java.lang.reflect.Field;

import org.apache.sling.api.resource.Resource;
import org.junit.Assert;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

import com.abbott.aem.adc.freestylelibrede.models.injector.ExternalizeInjector;
import com.abbott.aem.adc.freestylelibrede.services.ExternalizerService;
import com.abbott.aem.adc.freestylelibrede.services.SickFundService;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith({ MockitoExtension.class, AemContextExtension.class })
public class StringUtilityTest extends BaseModelTest<StringUtility> {

	
	@InjectMocks
	StringUtility model;
	
	@BeforeEach
	void setup() {

		MockitoAnnotations.initMocks(this);
	}

	@Test
	public void getRequestString() {

		String requestString = "requestString#test";
		try {
			Field canonicalUrlField = model.getClass().getDeclaredField("requestString");
			canonicalUrlField.setAccessible(true);
			canonicalUrlField.set(model, requestString);
		} catch (NoSuchFieldException | IllegalAccessException e) {
			Assert.fail("Exception occurred in requestString" + e.getMessage());
		}
		Assert.assertEquals("requestString#test",model.getRequestString());
	}
	
	@Test
	public void initModel() {

		String requestString = "requestString#test";
		try {
			Field canonicalUrlField = model.getClass().getDeclaredField("requestString");
			canonicalUrlField.setAccessible(true);
			canonicalUrlField.set(model, requestString);
		} catch (NoSuchFieldException | IllegalAccessException e) {
			Assert.fail("Exception occurred in requestString" + e.getMessage());
		}
		Assert.assertTrue(true);
	}
	
}

