package com.abbott.aem.adc.freestylelibrede.models;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import junit.framework.Assert;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(AemContextExtension.class)
class AccountOverviewModelTest extends BaseModelTest<AccountOverviewModel> {

    private final AemContext context = new AemContext();

    AccountOverviewModel model;
    @BeforeEach
    void setup(){
        model = loadModel(AccountOverviewModel.class);
    }

    @Test
    void getTitle() {
        Assert.assertEquals("Panel Title",model.getTitle());
    }

    @Test
    void getIconClass() {
        Assert.assertEquals("icon-class",model.getIconClass());
    }

    @Test
    void getCreatedId() {
        Assert.assertEquals("panel_title",model.getCreatedId());
    }
}