package com.abbott.aem.adc.freestylelibrede.models;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.sling.models.factory.ModelFactory;
import org.junit.Assert;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
class TabModelProviderTest extends BaseModelTest<TabModelProvider> {

    private final AemContext context = new AemContext();
    protected  AemContext getContext(){
        return  this.context;
    }
    @Mock
    ModelFactory modelFactory;

    TabModelProvider model;

    @Mock
    Object innerModel;


    @Test
    void getTabModel() {
        when(modelFactory.isModelAvailableForResource(any())).thenReturn(true);
        when(modelFactory.getModelFromResource(any())).thenReturn(innerModel);
        context.registerService(ModelFactory.class, modelFactory,
                org.osgi.framework.Constants.SERVICE_RANKING, Integer.MAX_VALUE);

        loadResource("/com.abbott.aem.adc.freestylelibrede.models.AccordionModel.json","/content/page/component");
        context.request().setAttribute("path","/content/page/component");
        model = context.request().adaptTo(TabModelProvider.class);
        Assert.assertEquals(innerModel.getClass(),model.getTabModel().getClass());
    }

    @Test
    void getTabModelNotAdaptableFromResource() {
        when(modelFactory.isModelAvailableForResource(any())).thenReturn(false);

        context.registerService(ModelFactory.class, modelFactory,
                org.osgi.framework.Constants.SERVICE_RANKING, Integer.MAX_VALUE);

        loadResource("/com.abbott.aem.adc.freestylelibrede.models.AccordionModel.json","/content/page/component");
        context.request().setAttribute("path","/content/page/component");
        model = context.request().adaptTo(TabModelProvider.class);
        Assert.assertNull(model.getTabModel());
    }
}