package com.abbott.aem.an.abbottstore.models;

import com.abbott.aem.an.abbottstore.constants.CommonConstants;
import com.abbott.aem.an.abbottstore.services.impl.UrlConfigServiceImpl;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.sling.api.resource.Resource;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import java.util.HashMap;

import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith(AemContextExtension.class)
class LogoModelTest {

    LogoModel logoModel;
    AemContext context = new AemContext();
    HashMap<String, String> properties;
    private static final String TITLE = "title";
    private static final String REDIRECTION_TARGET = "redirectionTarget";
    private static final String ALT_TEXT = "altText";


    @BeforeEach
    void setUp() {
        properties = new HashMap<>();
        context.registerInjectActivateService(new UrlConfigServiceImpl());
        context.build().resource("/content/dam/logo.png");
        properties.put("logoImage", "/content/dam/logo.png");
        properties.put(ALT_TEXT, ALT_TEXT);
        properties.put(REDIRECTION_TARGET, REDIRECTION_TARGET);
        properties.put(TITLE, TITLE);
        Resource resource = context.create().resource("/content/abbott/en", properties);
        logoModel = resource.adaptTo(LogoModel.class);
    }

    @Test
    void getLogoImage() {
        assertEquals("https://dev.abbottstore.com/content/dam/logo.png", logoModel.getLogoImage());
    }

    @Test
    void getAltText() {
        assertEquals(ALT_TEXT, logoModel.getAltText());
    }

    @Test
    void getAbbottRedirectionLink() {
        properties.put("redirectionLink", CommonConstants.ABBOTTSTORE_HOME_PAGE_PATH + "/home");
        Resource resource1 = context.create().resource("/content/abbott/en/abbott", properties);
        logoModel = resource1.adaptTo(LogoModel.class);
        assertEquals("/content/abbott/en/home.html", logoModel.getRedirectionLink());
    }

    @Test
    void getRedirectionLink() {
        properties.put("redirectionLink", CommonConstants.ABBOTTSTORE_HOME_PAGE_PATH);
        Resource resource1 = context.create().resource("/content/abbott/en/abbott", properties);
        logoModel = resource1.adaptTo(LogoModel.class);
        assertEquals("/", logoModel.getRedirectionLink());
    }

    @Test
    void getRedirectionTarget() {
        assertEquals(REDIRECTION_TARGET, logoModel.getRedirectionTarget());
    }

    @Test
    void getTitle() {
        assertEquals(TITLE, logoModel.getTitle());
    }
}