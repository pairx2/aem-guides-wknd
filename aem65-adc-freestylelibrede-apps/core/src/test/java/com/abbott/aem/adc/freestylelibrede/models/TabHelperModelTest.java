package com.abbott.aem.adc.freestylelibrede.models;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import junit.framework.Assert;
import org.apache.sling.testing.mock.sling.servlet.MockSlingHttpServletRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(AemContextExtension.class)
class TabHelperModelTest {

    private final AemContext context = new AemContext();


    private  TabHelperModel model;


    @Test
    void getValuesForExistingPath() {

        context.load().json("/com.abbott.aem.adc.freestylelibrede.models.AccountOverviewModel.json","/content/page/component");
        context.request().setAttribute("path","/content/page/component");


        model= context.request().adaptTo(TabHelperModel.class);
        Assert.assertNotNull(model);

        Assert.assertEquals("icon-class",model.getIconClass());
        Assert.assertEquals("panel_title",model.getCreatedId());
    }

    @Test
    void getEmptyValuesIfNoPathProvided() {

        model= context.request().adaptTo(TabHelperModel.class);
        Assert.assertNotNull(model);

        Assert.assertEquals("",model.getIconClass());
        Assert.assertEquals("",model.getCreatedId());
    }

    @Test
    void getEmptyValuesIfResourceNotExisting() {

        context.request().setAttribute("path","/content/page/component");


        model= context.request().adaptTo(TabHelperModel.class);
        Assert.assertNotNull(model);

        Assert.assertEquals("",model.getIconClass());
        Assert.assertEquals("",model.getCreatedId());
    }
}