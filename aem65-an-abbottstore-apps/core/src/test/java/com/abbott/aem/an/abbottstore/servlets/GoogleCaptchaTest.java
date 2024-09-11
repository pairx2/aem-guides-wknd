package com.abbott.aem.an.abbottstore.servlets;

import com.abbott.aem.an.abbottstore.services.impl.UrlConfigServiceImpl;
import com.abbott.magento.identity.MagentoIdentityProvider;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.sling.testing.mock.sling.servlet.MockSlingHttpServletRequest;
import org.apache.sling.testing.mock.sling.servlet.MockSlingHttpServletResponse;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.osgi.service.cm.Configuration;
import org.osgi.service.cm.ConfigurationAdmin;

import javax.servlet.ServletException;
import java.io.IOException;
import java.util.Dictionary;
import java.util.Hashtable;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@ExtendWith(AemContextExtension.class)
public class GoogleCaptchaTest {

    @Test
    void doGet(AemContext context) throws IOException {
        context.registerInjectActivateService(new UrlConfigServiceImpl());
        GoogleCaptcha googleCaptcha = context.registerInjectActivateService(new GoogleCaptcha());
        MockSlingHttpServletRequest request = context.request();
        MockSlingHttpServletResponse response = context.response();
        googleCaptcha.doGet(request, response);
        assertTrue(response.getOutputAsString().contains("siteKey"));
    }
}
