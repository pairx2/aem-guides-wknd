package com.abbott.aem.an.abbottstore.models;

import com.abbott.aem.an.abbottstore.services.impl.FeatureProductServiceimpl;
import com.day.cq.wcm.api.Page;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.sling.testing.mock.sling.servlet.MockSlingHttpServletRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.HashMap;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertTrue;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
public class FeatureProductModelTest {
    private FeatureProductModel featureProductModel;
    Map<String, Object> properties;

    @BeforeEach
    public void setup(AemContext context)  {
        MockSlingHttpServletRequest request = new MockSlingHttpServletRequest(context.resourceResolver(), context.bundleContext());
        context.registerInjectActivateService(new FeatureProductServiceimpl());

        properties = new HashMap<>();
        properties.put("sling:resourceType", "abbott/components/content/containermodel");
        properties.put("productDetailPath", "/content/abbott/products/test");
        context.build().resource("/content").resource("test",properties);
        request.setResource(context.resourceResolver().getResource("/content/test"));

        Page page = context.create().page("/content/abbott/products/test");
        context.create().resource(page, "test");
        featureProductModel = request.adaptTo(FeatureProductModel.class);
    }

    @Test
    public void testGetProductDetails() {
        assert featureProductModel != null;
        assertTrue(featureProductModel.getProductDetails().toString().contains("FeatureProductBean"));
    }
}
