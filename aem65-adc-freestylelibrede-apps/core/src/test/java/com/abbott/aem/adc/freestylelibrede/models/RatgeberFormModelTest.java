package com.abbott.aem.adc.freestylelibrede.models;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.spi.Injector;
import org.junit.Assert;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.abbott.aem.adc.freestylelibrede.models.injector.ExternalizeInjector;
import com.abbott.aem.adc.freestylelibrede.services.ExternalizerService;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith({ AemContextExtension.class, MockitoExtension.class })
class RatgeberFormModelTest extends BaseModelTest<RatgeberFormModel> {

	private final AemContext context = new AemContext();

	@InjectMocks
	ExternalizeInjector externalizeInjector = new ExternalizeInjector();
	
	@Mock
	Resource resource;

	@Mock
	ExternalizerService externalizerService;

	@InjectMocks
	RatgeberFormModel model;

	@Mock
	RatgeberFormQuestionModel mockRatgeberFormQuestionModel;

	@BeforeEach
	void setup() {
		context.registerService(Injector.class, externalizeInjector);
		model = loadModel(RatgeberFormModel.class);
		try {
			List<Resource> listResource = new ArrayList<Resource>();
			listResource.add(resource);
			String questionsField ="questions";
			Field canonicalUrlField = model.getClass().getDeclaredField(questionsField);
			canonicalUrlField.setAccessible(true);
			canonicalUrlField.set(model, listResource);
		} catch (NoSuchFieldException | IllegalAccessException e) {
			Assert.fail("Exception occurred in questionsField" + e.getMessage());
		}
		model.init();
	}

	@Test
	public void getQuestionsList() {
		List<RatgeberFormQuestionModel> list = new ArrayList<RatgeberFormQuestionModel>();
		list.add(mockRatgeberFormQuestionModel);
		Assert.assertNotNull(model.getQuestionsList());

	}
	@Test
	public void getPrevButtonLabel() {
		Assert.assertEquals("Previous", model.getPrevButtonLabel());
	}
	@Test
	public void getNextButtonLabel() {
		Assert.assertEquals("Next", model.getNextButtonLabel());
	}
	@Test
	public void getSubmitButtonLabel() {
		Assert.assertEquals("Submit", model.getSubmitButtonLabel());
	}
	@Test
	public void getResultText() {
		Assert.assertEquals("Result Text", model.getResultText());
	}
	@Test
	public void setQuestionsList() {
		List<RatgeberFormQuestionModel> list = new ArrayList<RatgeberFormQuestionModel>();
		list.add(mockRatgeberFormQuestionModel);
		model.setQuestionsList(list);
		Assert.assertNotNull(model.getQuestionsList());

	}

}