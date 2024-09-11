package com.abbott.aem.an.division.core.components.models;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.Mockito.mockConstruction;
import static org.mockito.Mockito.when;

import java.io.IOException;
import java.util.List;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.request.RequestParameter;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockedConstruction;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.Spy;

import com.abbott.aem.an.division.core.models.dynamicproduct.Product;
import com.abbott.aem.an.division.core.services.PIMConfigurationService;
import com.abbott.aem.an.division.core.utils.Utils;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith(AemContextExtension.class)
class DynamicProductCompareTest {

	@InjectMocks
	DynamicProductCompare dynamicProductCompare;

	@InjectMocks
	DynamicProductCompare dynamicProductCompare2;

	@InjectMocks
	DynamicProductCompare dynamicProductCompare3;

	private final AemContext ctx = new AemContext();
	private final AemContext ctx2 = new AemContext();
	private final AemContext ctx3 = new AemContext();

	@Mock
	Product product;

	@Spy
	PIMConfigurationService pimConfig;

	@Spy
	SlingHttpServletRequest request;

	@Mock
	RequestParameter requestParam;

	@BeforeEach
	void setUp() {
		ctx.addModelsForClasses(DynamicProductCompare.class);
		ctx.load().json("/com/abbott/aem/an/division/core/components/models/dynamicProductComparison.json", "/content");
		ctx.currentResource("/content/dynamicProductCompare");
		dynamicProductCompare = ctx.request().adaptTo(DynamicProductCompare.class);

		ctx2.addModelsForClasses(DynamicProductCompare.class);
		ctx2.load().json("/com/abbott/aem/an/division/core/components/models/dynamicProductComparison2.json",
				"/content");
		ctx2.currentResource("/content/dynamicProductCompare");
		dynamicProductCompare2 = ctx2.request().adaptTo(DynamicProductCompare.class);

		ctx3.addModelsForClasses(DynamicProductCompare.class);
		ctx3.load().json("/com/abbott/aem/an/division/core/components/models/dynamicProductComparison3.json",
				"/content");
		ctx3.currentResource("/content/dynamicProductCompare");
		dynamicProductCompare3 = ctx3.request().adaptTo(DynamicProductCompare.class);

		MockitoAnnotations.openMocks(this);
	}

	@AfterEach
	void tearDown() {
		dynamicProductCompare = null;
		dynamicProductCompare2 = null;
		dynamicProductCompare3 = null;
		product = null;
		pimConfig = null;
		request = null;
		requestParam = null;

	}

	@Test
	void testGetMinComparision() {
		String expected = "2";
		String actual = dynamicProductCompare.getMinComparision();
		assertEquals(expected, actual);
	}

	@Test
	void testGetMaxComparision() {
		String expected = "4";
		String actual = dynamicProductCompare.getMaxComparision();
		assertEquals(expected, actual);
	}

	@Test
	void testGetButtonLabel() {
		String expected = "Learn More";
		String actual = dynamicProductCompare.getButtonLabel();
		assertEquals(expected, actual);
	}

	@Test
	void testGetResultsLayout() {
		String expected = "abbottnutrition-result-layout";
		String actual = dynamicProductCompare.getResultsLayout();
		assertEquals(expected, actual);
	}

	@Test
	void testGetSessionStorageLoc() {
		String expected = "abbottnutrition-product-comparison";
		String actual = dynamicProductCompare.getSessionStorageLoc();
		assertEquals(expected, actual);
	}

	@Test
	void testGetDataSource() {
		String expected = "pimapi";
		String actual = dynamicProductCompare.getDataSource();
		assertEquals(expected, actual);
	}

	@Test
	void testGetProductId() throws IOException {
		List<Product> actual = dynamicProductCompare.getMultiproduct();
		assertNull(actual);
	}

	@Test
	void testGetMultiproduct() throws IOException {
		try (MockedConstruction<Utils> mockedUtils = mockConstruction(Utils.class, (mockObject, context) -> {
			when(mockObject.isAuthorMode(Mockito.any())).thenReturn(true);
		})) {
			List<Product> productsList = dynamicProductCompare.getMultiproduct();
			assertNotNull(productsList);
		}
	}

	@Test
	void testGetMultipleProduct_MultipleProductId() throws IOException {
		try (MockedConstruction<Utils> mockedUtils = mockConstruction(Utils.class, (mockObject, context) -> {
			when(mockObject.isAuthorMode(Mockito.any())).thenReturn(false);
		})) {
			when(request.getRequestParameter("productids")).thenReturn(requestParam);
			dynamicProductCompare.setProductId("30,40,50,60,70");
			List<Product> productsList = dynamicProductCompare.getMultiproduct();
			assertNull(productsList);
		}
	}

	@Test
	void testGetMultipleProduct_MultipleProductId2() throws IOException {
		try (MockedConstruction<Utils> mockedUtils = mockConstruction(Utils.class, (mockObject, context) -> {
			when(mockObject.isAuthorMode(Mockito.any())).thenReturn(false);
		})) {
			when(request.getRequestParameter("productids")).thenReturn(requestParam);
			dynamicProductCompare.setProductId("30,40,50");
			List<Product> productsList = dynamicProductCompare.getMultiproduct();
			assertNotNull(productsList);
		}
	}

	@Test
	void testGetMultipleProduct_EmptyProductId() throws IOException {
		try (MockedConstruction<Utils> mockedUtils = mockConstruction(Utils.class, (mockObject, context) -> {
			when(mockObject.isAuthorMode(Mockito.any())).thenReturn(false);
		})) {
			when(request.getRequestParameter("productids")).thenReturn(requestParam);
			dynamicProductCompare.setProductId("");
			List<Product> productsList = dynamicProductCompare.getMultiproduct();
			assertNull(productsList);
		}
	}

	@Test
	void testGetMultipleProduct_NullProductId() throws IOException {
		try (MockedConstruction<Utils> mockedUtils = mockConstruction(Utils.class, (mockObject, context) -> {
			when(mockObject.isAuthorMode(Mockito.any())).thenReturn(true);
		})) {
			when(request.getRequestParameter("productids")).thenReturn(requestParam);
			dynamicProductCompare.setProductId("");
			List<Product> productsList = dynamicProductCompare.getMultiproduct();
			assertNotNull(productsList);
		}
	}

	@Test
	void testGetMultipleProduct_EmptyMinComparision() throws IOException {
		try (MockedConstruction<Utils> mockedUtils = mockConstruction(Utils.class, (mockObject, context) -> {
			when(mockObject.isAuthorMode(Mockito.any())).thenReturn(false);
		})) {
			when(request.getRequestParameter("productids")).thenReturn(requestParam);
			dynamicProductCompare2.setProductId("30");
			List<Product> productsList = dynamicProductCompare2.getMultiproduct();
			assertNull(productsList);
		}
	}

	@Test
	void testGetMultipleProduct_NullMinComparision() throws IOException {
		try (MockedConstruction<Utils> mockedUtils = mockConstruction(Utils.class, (mockObject, context) -> {
			when(mockObject.isAuthorMode(Mockito.any())).thenReturn(false);
		})) {
			when(request.getRequestParameter("productids")).thenReturn(requestParam);
			dynamicProductCompare3.setProductId("30");
			List<Product> productsList = dynamicProductCompare3.getMultiproduct();
			assertNull(productsList);
		}
	}
}
