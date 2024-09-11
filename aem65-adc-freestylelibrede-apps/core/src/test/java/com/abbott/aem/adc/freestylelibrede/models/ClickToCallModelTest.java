package com.abbott.aem.adc.freestylelibrede.models;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.Assert;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

@ExtendWith({AemContextExtension.class})
class ClickToCallModelTest extends BaseModelTest<ClickToCallModel> {

    private final AemContext context = new AemContext();

    ClickToCallModel model;

    @BeforeEach
    void setUp() {
        model = loadModel(ClickToCallModel.class);
    }

    @Test
    void isClickToCallHeader() {
        Assert.assertTrue(model.isClickToCallHeader());
    }

    @Test
    void getCtaStyling() {
        Assert.assertEquals("cta-styling", model.getCtaStyling());
    }

    @Test
    void getHelpText() {
        Assert.assertEquals("help text", model.getHelpText());
    }

    @Test
    void getCtaText() {
        Assert.assertEquals("cta text", model.getCtaText());
    }

    @Test
    void getCtaEmail() {
        Assert.assertEquals("cta email", model.getCtaEmail());
    }

    @Test
    void getOnlineIcon() {
        Assert.assertEquals("c2C-online-icon", model.getOnlineIcon());
    }

    @Test
    void getOfflineIcon() {
        Assert.assertEquals("c2C-offline-icon", model.getOfflineIcon());
    }

    @Test
    void getServiceNumber() {
        Assert.assertEquals("+32 XXX YYY ZZZ", model.getServiceNumber());
    }

    @Test
    void getIcon() {
        Assert.assertEquals("c2c-icon", model.getIcon());
    }

    @Test
    void getLabel() {
        Assert.assertEquals("c2c label", model.getLabel());
    }

    @Test
    void getOpeningHour() {
        Assert.assertEquals(8, model.getOpeningHour().getHours());
        Assert.assertEquals(0, model.getOpeningHour().getMinutes());
    }

    @Test
    void getClosingHour() {

        Assert.assertEquals(18, model.getClosingHour().getHours());
        Assert.assertEquals(30, model.getClosingHour().getMinutes());
    }
}