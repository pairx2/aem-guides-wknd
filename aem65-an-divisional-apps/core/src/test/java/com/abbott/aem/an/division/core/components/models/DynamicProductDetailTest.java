package com.abbott.aem.an.division.core.components.models;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mockConstruction;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.MockedConstruction;
import org.mockito.Mockito;

import com.abbott.aem.an.division.core.models.dynamicproduct.Product;
import com.abbott.aem.an.division.core.utils.Utils;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith(AemContextExtension.class)
class DynamicProductDetailTest {

	private DynamicProductDetail dynamicProductDetail;

	Product product;

	private final AemContext ctx = new AemContext();

	@BeforeEach
	void setUp() {

		ctx.addModelsForClasses(DynamicProductDetail.class);
		ctx.load().json("/com/abbott/aem/an/division/core/components/models/dynamicProductDetail.json", "/content");
		ctx.currentResource("/content/dynamicProductDetail");
		dynamicProductDetail = ctx.request().adaptTo(DynamicProductDetail.class);
	}

	@Test
	void testGetProductStaticArea() {
		String expected = "abbottNutrition";
		String actual = dynamicProductDetail.getProductStaticArea();

		assertEquals(expected, actual);
	}

	@Test
	void testGetProductLocatorLabel() {
		String expected = "WHERE TO BUY";
		String actual = dynamicProductDetail.getProductLocatorLabel();

		assertEquals(expected, actual);
	}

	@Test
	void testGetProductLocatorUrl() {
		String expected = "/content/an/abbottnutrition/us/en/store-locator";
		String actual = dynamicProductDetail.getProductLocatorUrl();

		assertEquals(expected, actual);
	}

	@Test
	void testGetContactRepLabel() {
		String expected = "CONTACT A REP";
		String actual = dynamicProductDetail.getContactRepLabel();

		assertEquals(expected, actual);
	}

	@Test
	void testGetContactRepUrl() {
		String expected = "/content/an/abbottnutrition/us/en/contact-us";
		String actual = dynamicProductDetail.getContactRepUrl();

		assertEquals(expected, actual);
	}

	@Test
	void testGetContactMessage() {
		String expected = "https://www.pathwayreimbursement.com/provider.html View insurance coverage information.Hospitals and institutions can order Abbott Nutrition products by calling 800-551-5838, Monday – Friday, 8:00 a.m. to 5:30 p.m. EST.Established Abbott accounts can https://www.e-abbott.com order online at e-Abbot.com.";
		String actual = dynamicProductDetail.getContactMessage();

		assertEquals(expected, actual);
	}

	@Test
	void testGetDisclaimerMessage() {
		String expected = "Values listed below are subject to change. Please refer to the product label or packaging for the most current ingredients, allergen and nutrient profile information.";
		String actual = dynamicProductDetail.getDisclaimerMessage();

		assertEquals(expected, actual);
	}

	@Test
	void testAddProductInformationMarkup() {
		String expected = "abbottNutrition";
		String actual = dynamicProductDetail.getAddProductInformationMarkup();

		assertEquals(expected, actual);
	}

	@Test
	void testInstitutionalMessage() {
		String expected = "Hospitals and institutions can order Abbott Nutrition products by calling 800-551-5838, Monday – Friday, 8:00 a.m. to 5:30 p.m. EST.";
		String actual = dynamicProductDetail.getInstitutionalMessage();

		assertEquals(expected, actual);
	}

	@Test
	void testDownloadGuideLabel() {
		String expected = "DOWNLOAD GUIDE";
		String actual = dynamicProductDetail.getDownloadGuideLabel();

		assertEquals(expected, actual);
	}

	@Test
	void testGetProduct() {
		try (MockedConstruction<Utils> mockedUtils = mockConstruction(Utils.class, (mockObject, context) -> {
			when(mockObject.getProductFromPIM(Mockito.anyString(), Mockito.any())).thenReturn(getProduct());
		})) {
			Product actualProduct = dynamicProductDetail.getProduct();
			assertEquals(product, actualProduct);
		}
	}

	private Product getProduct() {
		if (product != null)
			product = new Product();
		return product;
	}

}