package com.abbott.aem.adc.freestylelibrede.models;

import junit.framework.Assert;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.factory.ModelFactory;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.io.IOException;

import static org.junit.jupiter.api.Assertions.*;


@ExtendWith(MockitoExtension.class)
class ComponentModelTest {

    @Mock
    SlingHttpServletRequest request;

    @Mock
    Resource resource;

    @Mock
    ModelFactory modelFactory;

    @InjectMocks
    ComponentModel model = new ComponentModel();

    //@Test
    void getModelForRequest() throws IOException {

        Mockito.when(modelFactory.isModelAvailableForRequest(request)).thenReturn(true);
        Mockito.when(modelFactory.getModelFromRequest(request)).thenReturn(new SampleModel());
        model.init();
        Assert.assertEquals(SampleModel.class,model.getModel().getClass());
        Assert.assertEquals("{\"field\":\"sample value\"}",model.getModelJsonString());

    }

    //@Test
    void getModelForResource() throws IOException {

        Mockito.when(modelFactory.isModelAvailableForResource(resource)).thenReturn(true);
        Mockito.when(modelFactory.getModelFromResource(resource)).thenReturn(new SampleModel());
        model.init();
        Assert.assertEquals(SampleModel.class,model.getModel().getClass());
        Assert.assertEquals("{\"field\":\"sample value\"}",model.getModelJsonString());

    }


    private class SampleModel{
        private String field = "sample value";

        public String getField(){
            return this.field;
        }

    }
}