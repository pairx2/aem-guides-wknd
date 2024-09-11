package com.abbott.aem.an.abbottstore.beans;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertNotNull;

class FeatureProductBeanTest {

    FeatureProductBean featureProductBean = new FeatureProductBean();

    @BeforeEach
    void setUp() {
        featureProductBean.setSku("sku");
        featureProductBean.setProductCount("5");
        featureProductBean.setPrice("100");
        featureProductBean.setFlavourName("choco");
        featureProductBean.setImagePath("/image");
        featureProductBean.setPagePath("/abbott.html");
        featureProductBean.setRegularPrice("90");
        featureProductBean.setTitle("title");
    }

    @Test
    void getSku() {
        assertNotNull(featureProductBean.getSku());
    }

    @Test
    void getPagePath() {
        assertNotNull(featureProductBean.getPagePath());
    }

    @Test
    void getTitle() {
        assertNotNull(featureProductBean.getTitle());
    }

    @Test
    void getPrice() {
        assertNotNull(featureProductBean.getPrice());
    }

    @Test
    void getImagePath() {
        assertNotNull(featureProductBean.getImagePath());
    }

    @Test
    void getProductCount() {
        assertNotNull(featureProductBean.getProductCount());
    }

    @Test
    void getFlavourName() {
        assertNotNull(featureProductBean.getFlavourName());
    }

    @Test
    void getRegularPrice() {
        assertNotNull(featureProductBean.getRegularPrice());
    }
}