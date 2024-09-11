package com.abbott.aem.an.abbottstore.models;

import com.abbott.aem.an.abbottstore.services.impl.UrlConfigServiceImpl;
import com.day.cq.wcm.api.Page;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.testing.mock.sling.servlet.MockSlingHttpServletRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.osgi.service.cm.Configuration;
import org.osgi.service.cm.ConfigurationAdmin;

import java.io.IOException;
import java.util.Dictionary;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith({ AemContextExtension.class, MockitoExtension.class})
public class UrlServiceModelTest {
    private final AemContext context = new AemContext();
    UrlServiceModel urlServiceModel;
    Map<String, Object> properties;
    private static final String ABBOTT_SERVER_URL = "https://dev-secure.abbottstore.com/customer/account";
    private static final String ABBOTT_STORE_URL = "https://dev-secure.abbottstore.com";

    @BeforeEach
    void setUp() throws IOException {
        ConfigurationAdmin configurationAdmin = context.getService(ConfigurationAdmin.class);
        assert configurationAdmin != null;
        MockSlingHttpServletRequest request = new MockSlingHttpServletRequest(context.resourceResolver(), context.bundleContext());
        urlServiceModel = request.adaptTo(UrlServiceModel.class);
        context.registerInjectActivateService(new UrlConfigServiceImpl());
        Page page = context.create().page("/content/abbott/en/test");
        properties = new HashMap<>();
        String themeType = "abbott.abbottstore";
        properties.put("themeType", themeType);
        Resource resource = context.create().resource(page, "test", properties);
        urlServiceModel = resource.adaptTo(UrlServiceModel.class);
    }

    @Test
    public void testGetLoginUrl() {
        assertEquals(ABBOTT_SERVER_URL+"/login", urlServiceModel.getLoginUrl());
    }

    @Test
    public void testGetLogoutUrl() {
        assertEquals(ABBOTT_SERVER_URL+"/logout", urlServiceModel.getLogoutUrl());
    }

    @Test
    public void testGetAccountUrl() {
        assertEquals(ABBOTT_SERVER_URL, urlServiceModel.getAccountUrl());
    }

    @Test
    public void testGetStoreUrl() {
        assertEquals(ABBOTT_STORE_URL, urlServiceModel.getStoreUrl());
    }

    @Test
    public void testGetRegistrationUrls() {
        assertEquals(ABBOTT_SERVER_URL+"/create", urlServiceModel.getRegistrationUrl());
    }

    @Test
    public void testGetCheckoutUrl() {
        assertEquals(ABBOTT_STORE_URL+"/checkout", urlServiceModel.getCheckoutUrl());
    }

    @Test
    public void testGetForgotPasswordUrl() {
        assertEquals(ABBOTT_SERVER_URL+"/forgotpassword", urlServiceModel.getForgotPasswordUrl());
    }

    @Test
    public void testGetSecretKey() {
        assertNotNull(urlServiceModel.getSecretKey());
    }

    @Test
    public void testGetSiteKey() {
        assertNotNull(urlServiceModel.getSiteKey());
    }

    @Test
    public void testGetAemServer() {
        assertEquals("https://dev.abbottstore.com", urlServiceModel.getAemServer());
    }

    @Test
    public void testGetUnavailableImagePath() {
        assertEquals("/content/dam/abbott/mandatory/Unavailable-Product-1300x1300.jpg", urlServiceModel.getUnavialableImagePath());
    }

    @Test
    public void testGetMagentoStoreCode() {
        assertEquals("abbott", urlServiceModel.getMagentoStoreCode("/content/abbott/en.html"));
    }

    @Test
    public void testGetMagentoStoreBasePaths() {
        assertTrue(urlServiceModel.getStoreBasePaths().toString().contains("/content/abbott"));
    }

    @Test
    void getLoginSiteKey() {
        assertNull(urlServiceModel.getLoginSiteKey());
    }

    @Test
    void getLoginSecretKey() {
        assertNull(urlServiceModel.getLoginSecretKey());
    }

    @Test
    void getLoginAemMagentoSecretKey() {
        assertNull(urlServiceModel.getLoginAemMagentoSecretKey());
    }
}
