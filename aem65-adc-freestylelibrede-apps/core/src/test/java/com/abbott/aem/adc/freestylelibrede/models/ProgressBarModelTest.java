package com.abbott.aem.adc.freestylelibrede.models;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.Assert;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(AemContextExtension.class)
class ProgressBarModelTest extends BaseModelTest<ProgressBarModel> {

    private final AemContext context = new AemContext();
    ProgressBarModel model;

    @BeforeEach
    void setup(){
        model = loadModel(ProgressBarModel.class);
    }

    @Test
    void getSteps() {

        Assert.assertEquals(3,model.getSteps().size());
    }
    protected  AemContext getContext(){
        return  this.context;
    }
}