package com.abbott.aem.an.abbottstore.beans;

import org.apache.sling.api.resource.ValueMap;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import static org.junit.jupiter.api.Assertions.assertNotNull;

class ProductListBeanTest {

    ProductListBean productListBean = new ProductListBean();

    @BeforeEach
    void setUp() {
        ValueMap valueMap = Mockito.mock(ValueMap.class);
        productListBean.setCansX("canX");
        productListBean.setCansY("canY");
        productListBean.setDescription("desc");
        productListBean.setPrice(100);
        productListBean.setProperties(valueMap);
        productListBean.setImage("/image.jpg");
        productListBean.setPagePath("/abbott.html");
        productListBean.setCustomDiscount("10");
        productListBean.setName("abbott");
        productListBean.setSizeOrWeight("2");
        productListBean.setSpecialPrice("10");
        productListBean.setSkuId("12345");
    }

    @Test
    void getName() {
        assertNotNull(productListBean.getName());
    }

    @Test
    void getDescription() {
        assertNotNull(productListBean.getDescription());
    }

    @Test
    void getCansX() {
        assertNotNull(productListBean.getCansX());
    }

    @Test
    void getCansY() {
        assertNotNull(productListBean.getCansY());
    }

    @Test
    void getPrice() {
        assertNotNull(productListBean.getPrice());
    }

    @Test
    void getSpecialPrice() {
        assertNotNull(productListBean.getSpecialPrice());
    }

    @Test
    void getImage() {
        assertNotNull(productListBean.getImage());
    }

    @Test
    void getSizeOrWeight() {
        assertNotNull(productListBean.getSizeOrWeight());
    }

    @Test
    void getCustomDiscount() {
        assertNotNull(productListBean.getCustomDiscount());
    }

    @Test
    void getSkuId() {
        assertNotNull(productListBean.getSkuId());
    }

    @Test
    void getPagePath() {
        assertNotNull(productListBean.getPagePath());
    }

    @Test
    void getProperties() {
        assertNotNull(productListBean.getProperties());
    }
}