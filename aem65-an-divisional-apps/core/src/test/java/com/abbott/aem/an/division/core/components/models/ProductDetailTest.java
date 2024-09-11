package com.abbott.aem.an.division.core.components.models;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.when;

import java.io.IOException;
import java.io.InputStream;
import java.io.StringWriter;
import java.util.List;

import org.apache.commons.io.IOUtils;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockedStatic;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import com.abbott.aem.an.division.core.models.product.Flavor;
import com.abbott.aem.an.division.core.models.product.Product;
import com.day.cq.commons.jcr.JcrConstants;
import com.day.cq.dam.api.Asset;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith(AemContextExtension.class)
class ProductDetailTest {

	private static final String RESOURCE_1 = "/content/pdp1";
	private static final String RESOURCE_2 = "/content/pdp2";
	private static final String RESOURCE_3 = "/content/pdp3";
	private static final String RESOURCE_XF = "/content/experience-fragments/resource/master";
	private static final String PIM_JSON_1 = "/content/dam/product-full.json";
	private static final String PIM_JSON_2 = "/content/dam/product-small.json";
	private final AemContext ctx = new AemContext();
	private final AemContext ctx2 = new AemContext();
	private final AemContext ctx3 = new AemContext();

	private ProductDetail productDetail1;
	private ProductDetail productDetail2;
	private ProductDetail productDetail3;
	
	@InjectMocks
	ProductDetail productDetail;
	
	@Mock
	Resource assetResource;
	
	@Mock
	ResourceResolver resourceResolver;
	
	@Mock
	Asset asset;

	@BeforeEach
	public void setUp() throws Exception {
		ctx.addModelsForClasses(ProductDetail.class);
		ctx.load().json("/com/abbott/aem/an/division/core/components/models/productDetail1.json", RESOURCE_1);
		ctx.load().json("/com/abbott/aem/an/division/core/components/models/productDetailXF.json", RESOURCE_XF);
		ctx.create().asset(PIM_JSON_1, "/com/abbott/aem/an/division/core/models/product/product-full.json",
				"text/plain");
		ctx.currentResource(RESOURCE_1);
		productDetail1 = ctx.request().adaptTo(ProductDetail.class);
		
		ctx2.addModelsForClasses(ProductDetail.class);
		ctx2.load().json("/com/abbott/aem/an/division/core/components/models/productDetail2.json", RESOURCE_2);
		ctx2.create().asset(PIM_JSON_1, "/com/abbott/aem/an/division/core/models/product/product-full.json",
				"text/plain");
		ctx2.currentResource(RESOURCE_2);
		productDetail2 = ctx2.request().adaptTo(ProductDetail.class);
		
		ctx3.addModelsForClasses(ProductDetail.class);
		ctx3.load().json("/com/abbott/aem/an/division/core/components/models/productDetail3.json", RESOURCE_3);
		ctx3.create().asset(PIM_JSON_2, "/com/abbott/aem/an/division/core/models/product/product-small.json",
				"text/plain");
		ctx3.currentResource(RESOURCE_3);
		productDetail3 = ctx3.request().adaptTo(ProductDetail.class);
		
		MockitoAnnotations.openMocks(this);
	}

	@Test
	void testGetFilteredFlavors() {
		List<Flavor> flavors2 = productDetail2.getFilteredFlavors();
		List<Flavor> flavors3 = productDetail3.getFilteredFlavors();
		assertEquals(3, flavors2.size());
		assertEquals(0, flavors3.size());
	}

	@Test
	void testGetFlavorNameOverride() {

		List<Flavor> flavors2 = productDetail2.getFilteredFlavors();
		assertFalse(flavors2.get(0).getFlavorNameOverride().contains("Override"));
	}

	@Test
	void testGetResourcesExperienceFragmentPath() {
		String expected = RESOURCE_XF;
		String actual = productDetail1.getResourcesExperienceFragment();
		assertNotEquals(expected, actual);
	}

	@Test
	void testGetResourcesExperienceFragment() {
		String expected = RESOURCE_XF + "/" + JcrConstants.JCR_CONTENT;
		String actual = productDetail1.getResourcesExperienceFragment();
		assertEquals(expected, actual);
	}

	@Test
	void testGetSkus() {
		Class<? extends ProductDetail> skus1 = productDetail1.getClass();
		Class<? extends ProductDetail> skus2 = productDetail2.getClass();
		assertNotEquals(2, skus1);
		assertNotEquals(null, skus2);
	}

	@Test
	void testGetProductData() {
		String expected = "/content/dam/product-full.json";
		Product actual = productDetail1.getProduct();
		assertNotEquals(expected, actual);
	}

	@Test
	void testGetProduct() {
		assertEquals("product-full-id", productDetail1.getProduct().getId());
	}
	
	@Test
	void testGetFilteredFlavours() {
		List<Flavor> flavorsList = productDetail1.getFilteredFlavors();
		assertNotNull(flavorsList);
	}
}
