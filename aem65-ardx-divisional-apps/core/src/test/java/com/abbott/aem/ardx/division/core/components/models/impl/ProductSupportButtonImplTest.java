package com.abbott.aem.ardx.division.core.components.models.impl;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;

import com.abbott.aem.ardx.division.core.components.models.ProductSupportButton;
import com.abbott.aem.platform.common.components.services.ProxyComponentService;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith(AemContextExtension.class)
public class ProductSupportButtonImplTest {

    private final AemContext ctx = new AemContext();
    ProductSupportButton button;
    private ProxyComponentService proxyComponentService;

    @BeforeEach
    void setUp() {
        proxyComponentService = Mockito.mock(ProxyComponentService.class);
        ctx.registerService(ProxyComponentService.class, proxyComponentService);
        ctx.addModelsForClasses(ProductSupportButtonImpl.class);
        ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/ProductSupportButtonImplTest.json",
                "/content");
    }

    @Test
    void testProduct() {
        final String expected = "Product Name STK";
        ctx.currentResource("/content/currentpage");
        button = ctx.request().adaptTo(ProductSupportButton.class);
        String actual = button.getProduct();
        assertEquals(expected, actual);
    }

}