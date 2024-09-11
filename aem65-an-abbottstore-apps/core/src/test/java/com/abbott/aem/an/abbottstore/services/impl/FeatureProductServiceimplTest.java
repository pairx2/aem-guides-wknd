package com.abbott.aem.an.abbottstore.services.impl;

import com.abbott.aem.an.abbottstore.beans.FeatureProductBean;
import com.abbott.aem.an.abbottstore.models.ProductPathModel;
import com.day.cq.wcm.api.Page;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.sling.api.resource.Resource;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

@ExtendWith({ AemContextExtension.class, MockitoExtension.class })
public class FeatureProductServiceimplTest {
    private final AemContext context = new AemContext();
    FeatureProductServiceimpl featureProductServiceimpl;

    @BeforeEach
    public void setUp() {
        featureProductServiceimpl = context.registerInjectActivateService(new FeatureProductServiceimpl());
    }

    @Test
    public void testGetFlavour() {
        context.load().json("/abbott-flavors.json","/content/cq:tags/abbott/abbott-flavors");
        assertEquals("chacolate", featureProductServiceimpl.getFlavourValue("5621", context.resourceResolver()));
    }

    @Test
    public void testGetFlavourNull() {
        context.build().resource("/content/cq:tags/abbott/abbott-flavors");
        assertNull(featureProductServiceimpl.getFlavourValue("flavour", context.resourceResolver()));
    }

    @Test
    public void testSetAndGetFeatureProduct() {
        String PRODUCT_PATH = "/content/abbott/products/ensure";
        context.load().json("/abbott-product.json",PRODUCT_PATH);
        Resource resource = context.resourceResolver().getResource(PRODUCT_PATH);
        assert resource != null;
        Page page = resource.adaptTo(Page.class);
        List<FeatureProductBean> productList = new ArrayList<>();
        List<FeatureProductBean> resultList = featureProductServiceimpl.setAndGetFeatureProductList(productList, new ProductPathModel(), page, context.resourceResolver());
        assertEquals("5675", resultList.get(0).getSku());
    }
}
