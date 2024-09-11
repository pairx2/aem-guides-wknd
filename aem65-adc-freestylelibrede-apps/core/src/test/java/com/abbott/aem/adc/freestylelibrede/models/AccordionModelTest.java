package com.abbott.aem.adc.freestylelibrede.models;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import junit.framework.Assert;
import org.apache.sling.api.resource.Resource;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import static org.junit.jupiter.api.Assertions.*;


@ExtendWith(AemContextExtension.class)
class AccordionModelTest extends  BaseModelTest{

    public final AemContext context = new AemContext();

    private AccordionModel model;

    @BeforeEach
    void setup(){
        model = (AccordionModel) loadModel(AccordionModel.class);
    }

    @Test
    void getTitle() {
        Assert.assertEquals("Accordion Title",model.getTitle());
    }

    @Test
    void getCollapsed(){
        Assert.assertEquals("Accordion Collapsed",model.getCollapsed());
    }
}