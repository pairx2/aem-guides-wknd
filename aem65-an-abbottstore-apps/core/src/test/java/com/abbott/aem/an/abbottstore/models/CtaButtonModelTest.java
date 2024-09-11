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
public class CtaButtonModelTest {

    Map<String, Object> properties;
    private CtaButtonModel ctaButtonModel;

    private static final String LOGGED_OUT_TEXT = "loggedOutText";
    @BeforeEach
    public void setup(AemContext context) {
        context.registerInjectActivateService(new UrlConfigServiceImpl());
        properties = new HashMap<>();
        properties.put("ctaLabel", "ctaLabelText");
        properties.put("ctaLink", "/test.html");
        properties.put("newWindow", "true");
        properties.put(LOGGED_OUT_TEXT, LOGGED_OUT_TEXT);

        Resource resource = context.create().resource("/content/abbott/en", properties);
        ctaButtonModel = resource.adaptTo(CtaButtonModel.class);
    }

    @Test
    void getCtaLabel() {
        assertEquals("ctaLabelText", ctaButtonModel.getCtaLabel());
    }

    @Test
    void getCtaLink() {
        assertEquals("/test.html", ctaButtonModel.getCtaLink());
    }

    @Test
    void getNewWindow() {
        assertEquals(true, ctaButtonModel.getNewWindow());
    }

    @Test
    void getLoggedOutText() {
        assertEquals(LOGGED_OUT_TEXT, ctaButtonModel.getLoggedOutText());
    }
}