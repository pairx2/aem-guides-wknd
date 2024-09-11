package com.abbott.aem.adc.freestylelibrede.models;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.Assert;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

@ExtendWith({AemContextExtension.class})
class CQResponsiveModelTest extends BaseModelTest {
    public final AemContext context = new AemContext();

    CQResponsiveModel model;


    @BeforeEach
    void setup(){
        model = (CQResponsiveModel) loadModel(CQResponsiveModel.class);
    }

    @Test
    void getDefault() {

        Assert.assertNotNull(model.getDefault());
        Assert.assertEquals(12,model.getDefault().getWidth());
        Assert.assertEquals(1,model.getDefault().getOffset());
    }

    @Test
    void getPhone() {
        Assert.assertNotNull(model.getPhone());
        Assert.assertEquals(4,model.getPhone().getWidth());
        Assert.assertEquals(2,model.getPhone().getOffset());
    }

    @Test
    void getTablet() {
        Assert.assertNull(model.getTablet());
    }
}