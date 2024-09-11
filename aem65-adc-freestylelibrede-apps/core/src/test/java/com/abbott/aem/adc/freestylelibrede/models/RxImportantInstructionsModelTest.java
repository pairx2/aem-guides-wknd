package com.abbott.aem.adc.freestylelibrede.models;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import junit.framework.Assert;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

@ExtendWith(AemContextExtension.class)
class RxImportantInstructionsModelTest extends BaseModelTest<RxImportantInstructionsModel> {

    public final AemContext context = new AemContext();
    private RxImportantInstructionsModel model;

    @BeforeEach
    void setup() {
        model = (RxImportantInstructionsModel) loadModel(RxImportantInstructionsModel.class);
    }

    @Test
    void getHeading() {
        Assert.assertEquals("Important Instructions", model.getHeading());
    }

    @Test
    void getMessage() {
        Assert.assertEquals("This instructions are important", model.getMessage());
    }

    @Test
    void getIcon() {
        Assert.assertEquals("icon-name", model.getIcon());
    }
}