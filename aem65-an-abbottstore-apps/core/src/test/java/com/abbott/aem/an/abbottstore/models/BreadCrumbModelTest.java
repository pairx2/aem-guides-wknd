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
class BreadCrumbModelTest {

    Map<String, Object> properties;
    String AEM_SERVER = "https://dev.abbottstore.com";
    private BreadCrumbModel breadCrumbModel;

    @BeforeEach
    void setUp(AemContext context) {
        context.registerInjectActivateService(new UrlConfigServiceImpl());
        properties = new HashMap<>();
        properties.put("navItemUrl", "/content/test");
        Resource resource = context.create().resource("/content/abbott/en", properties);
        breadCrumbModel = resource.adaptTo(BreadCrumbModel.class);

    }

    @Test
    void urlLink() {
        assertEquals(AEM_SERVER + "/content/test" + ".html", breadCrumbModel.urlLink());
    }
}