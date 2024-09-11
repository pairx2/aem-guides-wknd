package com.abbott.aem.adc.freestylelibrede.models;

import java.util.ArrayList;
import java.util.List;

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
class RatgeberFormAnswerModelTest extends BaseModelTest <RatgeberFormAnswerModel>{

    private final AemContext context = new AemContext();

    @InjectMocks
    ExternalizeInjector externalizeInjector = new ExternalizeInjector();

    @Mock
    ExternalizerService externalizerService;

    @InjectMocks
    RatgeberFormAnswerModel model;

    @BeforeEach
    void setup(){
        context.registerService(Injector.class,externalizeInjector);
        model = loadModel(RatgeberFormAnswerModel.class);
    }
    
    @Test
    public void getAnswer() {
    	Assert.assertEquals("Answer", model.getAnswer());
	}

    @Test
	public void getValue() {
		Assert.assertEquals("Value", model.getValue());
	}
   
}