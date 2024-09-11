package com.abbott.aem.av.division.core.components.models.impl;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import com.abbott.aem.av.division.core.components.models.ProductCategory;
import com.abbott.aem.platform.common.components.services.APILookupService;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;


@ExtendWith(AemContextExtension.class)
class ProductCategoryImplTest {

	private static final String PATH = "/content/productcategory";
	private final AemContext ctx = new AemContext();
	private APILookupService apiLookupService;

	@BeforeEach
	void setUp() throws Exception {
		apiLookupService = Mockito.mock(APILookupService.class);
		ctx.registerService(APILookupService.class, apiLookupService);
		ctx.addModelsForClasses(ProductCategoryImpl.class);
		ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/ProductCategoryImplTest.json", "/content");
	}

	@Test
	void testGetShowMoreDesktop() {
		ctx.currentResource(ProductCategoryImplTest.PATH);
		ProductCategory productCategory = ctx.request().adaptTo(ProductCategory.class);
		assertEquals("showMoreDesktop", productCategory.getShowMoreDesktop());
	}

	@Test
	void testGetShowMoreTablet() {
		ctx.currentResource(ProductCategoryImplTest.PATH);
		ProductCategory productCategory = ctx.request().adaptTo(ProductCategory.class);
		assertEquals("showMoreTablet", productCategory.getShowMoreTablet());
	}

	@Test
	void testGetShowMoreMobile() {
		ctx.currentResource(ProductCategoryImplTest.PATH);
		ProductCategory productCategory = ctx.request().adaptTo(ProductCategory.class);
		assertEquals("showMoreMobile", productCategory.getShowMoreMobile());
	}
	
	@Test
	void testgetShowMoreDesktopSubCategory() {
		ctx.currentResource(ProductCategoryImplTest.PATH);
		ProductCategory ProductCategory = ctx.request().adaptTo(ProductCategory.class);
		assertEquals("showMoreDesktopSubCategory", ProductCategory.getShowMoreDesktopSubCategory());
	}

	@Test
	void testGetShowMoreTabletSubCategory() {
		ctx.currentResource(ProductCategoryImplTest.PATH);
		ProductCategory productCategory = ctx.request().adaptTo(ProductCategory.class);
		assertEquals("showMoreTabletSubCategory", productCategory.getShowMoreTabletSubCategory());
	}

	@Test
	void testGetShowMoreMobileSubCategory() {
		ctx.currentResource(ProductCategoryImplTest.PATH);
		ProductCategory productCategory = ctx.request().adaptTo(ProductCategory.class);
		assertEquals("showMoreMobileSubCategory", productCategory.getShowMoreMobileSubCategory());
	}

	
}
