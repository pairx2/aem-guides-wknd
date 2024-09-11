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

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
class RatgeberFormQuestionModelTest extends BaseModelTest <RatgeberFormQuestionModel>{

    private final AemContext context = new AemContext();

    @InjectMocks
    ExternalizeInjector externalizeInjector = new ExternalizeInjector();

    @Mock
    ExternalizerService externalizerService;

    @InjectMocks
    RatgeberFormQuestionModel model;
    
    @Mock
	Resource resource;
    
    @Mock
	RatgeberFormAnswerModel mockRatgeberFormAnswerModel;

    @BeforeEach
    void setup(){
        context.registerService(Injector.class,externalizeInjector);
        model = loadModel(RatgeberFormQuestionModel.class);
        try {
			List<Resource> listResource = new ArrayList<Resource>();
			listResource.add(resource);
			String questionsField ="answers";
			Field canonicalUrlField = model.getClass().getDeclaredField(questionsField);
			canonicalUrlField.setAccessible(true);
			canonicalUrlField.set(model, listResource);
		} catch (NoSuchFieldException | IllegalAccessException e) {
			Assert.fail("Exception occurred in questionsField" + e.getMessage());
		}
        model.init();
    }

    @Test
    public void getAnswersList() {
		List<RatgeberFormAnswerModel> list = new ArrayList<RatgeberFormAnswerModel>();
		list.add(mockRatgeberFormAnswerModel);
		Assert.assertNotNull(model.getAnsList());
	}
    @Test
    public void getQuestion() {
    	Assert.assertEquals("Question", model.getQuestion());
	}
    @Test
	public void getYes() {
		Assert.assertEquals("Yes", model.getYesAnswerText());
	}
    @Test
	public void getNo() {
		Assert.assertEquals("No", model.getNoAnswerText());
	}
    @Test
	public void getYesvalue() {
		Assert.assertEquals("0", model.getYesAnswerValue());
	}
    @Test
	public void getNovalue() {
		Assert.assertEquals("1", model.getNoAnswerValue());
	}
    @Test
   	public void setQuestionsList() {
       	List<RatgeberFormAnswerModel> list = new ArrayList<RatgeberFormAnswerModel>();
   		list.add(mockRatgeberFormAnswerModel);
   		model.setAnsList(list);
   		Assert.assertNotNull(model.getAnsList());

   	}
    
}