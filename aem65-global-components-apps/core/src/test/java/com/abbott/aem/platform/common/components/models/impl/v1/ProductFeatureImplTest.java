package com.abbott.aem.platform.common.components.models.impl.v1;

import com.abbott.aem.platform.common.components.models.ProductFeature;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.sling.api.resource.Resource;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@ExtendWith(AemContextExtension.class)
class ProductFeatureImplTest {

    private final AemContext context = new AemContext();
    private ProductFeature productFeature;

    @BeforeEach
    public void setUp() {
        context.create().resource("/content/productFeature",
                "featureName", "testFeatureName",
                "featureId", "testFeatureId");
        Resource resource = context.resourceResolver().getResource("/content/productFeature");
        assertNotNull(resource, "Resource should not be null");
        productFeature = resource.adaptTo(ProductFeature.class);
        assertNotNull(productFeature, "productFeature adaptation should not be null");
    }

    @Test
    void testFeatureName() {
        assertEquals("testFeatureName", productFeature.getFeatureName());
    }

    @Test
    void testFeatureId() {
        assertEquals("testFeatureId", productFeature.getFeatureId());
    }
}
