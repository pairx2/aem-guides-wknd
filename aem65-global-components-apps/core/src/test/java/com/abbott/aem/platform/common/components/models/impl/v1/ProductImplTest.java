package com.abbott.aem.platform.common.components.models.impl.v1;

import com.abbott.aem.platform.common.components.models.Product;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.sling.api.resource.Resource;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(AemContextExtension.class)
class ProductImplTest {

    private final AemContext context = new AemContext();
    private Product product;

    @BeforeEach
    public void setUp() {
        context.create().resource("/content/product",
                "productTitle", "TestProductTitle",
                "productId", "TestProductId",
                "productImage","TestProductImage",
                "productAltText","TestProductAltText",
                "badgeChecked",true,
                "badgePosition","TestBadgePosition");
        Resource resource = context.resourceResolver().getResource("/content/product");
        assertNotNull(resource, "Resource should not be null");
        product = resource.adaptTo(Product.class);
    }

    @Test
    void testProductTitle() {
        assertEquals("TestProductTitle", product.getProductTitle());
    }

    @Test
    void testProductId() {
        assertEquals("TestProductId", product.getProductId());
    }

    @Test
    void testProductImage() {
        assertEquals("TestProductImage", product.getProductImage());
    }

    @Test
    void testProductAltText() {
        assertEquals("TestProductAltText", product.getProductAltText());
    }

    @Test
    void testBadgeChecked() {
        assertTrue(product.isBadgeChecked());
    }

    @Test
    void testBadgePosition() {
        assertEquals("TestBadgePosition", product.getBadgePosition());
    }

}
