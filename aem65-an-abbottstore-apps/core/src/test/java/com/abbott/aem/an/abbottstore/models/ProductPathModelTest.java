package com.abbott.aem.an.abbottstore.models;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.sling.api.resource.Resource;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import java.util.HashMap;

import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith(AemContextExtension.class)
class ProductPathModelTest {

    public static final String PRODUCT_DETAIL_PATH = "productDetailPath";
    public static final String PRODUCT_IMAGE_PATH = "productImagePath";
    ProductPathModel productPathModel;
    AemContext context = new AemContext();
    HashMap<String, String> properties = new HashMap<>();

    @BeforeEach
    void setUp() {
        properties.put(PRODUCT_DETAIL_PATH, PRODUCT_DETAIL_PATH);
        properties.put(PRODUCT_IMAGE_PATH, PRODUCT_IMAGE_PATH);

        Resource resource = context.create().resource("/content/abbott/en", properties);
        productPathModel = resource.adaptTo(ProductPathModel.class);
    }

    @Test
    void getProductDetailPath() {
        assertEquals(PRODUCT_DETAIL_PATH, productPathModel.getProductDetailPath());
    }

    @Test
    void getProductImagePath() {
        assertEquals(PRODUCT_IMAGE_PATH, productPathModel.getProductImagePath());
    }
}