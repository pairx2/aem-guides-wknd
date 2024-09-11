package com.abbott.aem.an.abbottstore.models;

import com.abbott.aem.an.abbottstore.services.impl.UrlConfigServiceImpl;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.sling.api.resource.Resource;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.HashMap;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
class AlertBannerModelTest {

    public static final String ICON = "test";
    public static final String AEM_SERVER = "https://dev.abbottstore.com";
    public static final String DISPLAY_TEXT = "test display";
    public static final String ALERT_MSG = "alert message";
    public static final String BUTTON_TEXT = "button";
    public static final String COLLAPSE_TEXT = "collapse";
    public static final String EXPAND_TEXT = "expand";
    Map<String, Object> properties;
    private AlertBannerModel alertBannerModel;

    @BeforeEach
    void setUp(AemContext context) {
        context.registerInjectActivateService(new UrlConfigServiceImpl());
        properties = new HashMap<>();
        properties.put("icon", ICON);
        properties.put("alertMessage", ALERT_MSG);
        properties.put("displayText", DISPLAY_TEXT);
        properties.put("buttonText", BUTTON_TEXT);
        properties.put("collapseText", COLLAPSE_TEXT);
        properties.put("expandText", EXPAND_TEXT);
        Resource resource = context.create().resource("/content/abbott/en", properties);

        alertBannerModel = resource.adaptTo(AlertBannerModel.class);

    }

    @Test
    void getIcon() {
        alertBannerModel.setIcon(ICON);
        assertEquals(ICON, alertBannerModel.getIcon());
    }

    @Test
    void getAlertMessage() {
        alertBannerModel.setAlertMessage(ALERT_MSG);
        assertEquals(ALERT_MSG, alertBannerModel.getAlertMessage());
    }

    @Test
    void getDisplayText() {
        alertBannerModel.setDisplayText(DISPLAY_TEXT);
        assertEquals(DISPLAY_TEXT, alertBannerModel.getDisplayText());
    }

    @Test
    void getButtonText() {
        alertBannerModel.setButtonText(BUTTON_TEXT);
        assertEquals(BUTTON_TEXT, alertBannerModel.getButtonText());
    }

    @Test
    void getCollapseText() {
        alertBannerModel.setCollapseText(COLLAPSE_TEXT);
        assertEquals(COLLAPSE_TEXT, alertBannerModel.getCollapseText());
    }

    @Test
    void getExpandText() {
        alertBannerModel.setExpandText(EXPAND_TEXT);
        assertEquals(EXPAND_TEXT, alertBannerModel.getExpandText());
    }
}