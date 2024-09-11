package com.abbott.aem.an.similac.core.models;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.mock;

import java.util.HashMap;
import java.util.Map;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ValueMap;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

import com.day.cq.wcm.api.Page;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith(AemContextExtension.class)
@ExtendWith(MockitoExtension.class)
public class PopulateVariationsModelTest {

	private static final String PRODUCT_CONTENT_JSON = "/com/abbott/aem/an/similac/core/models/product-variation.json";
	private static final String CONTENT_PATH = "/content";
	private static final String CONTENT_SIZE_PATH = "/content/productVariationSimple/jcr:content/size";
	private static final String CONTENT_SUBSCRIPTION_PATH = "/content/productVariationSimple/similac-pro-advance-powder/jcr:content/subscription/subscription-week";
	private static final String CONTENT_DISCOUNT_PATH = "/content/productVariationSimple/similac-pro-advance-powder/jcr:content/subscription/discount";
	private static final String CONTENT_FLAVOURS_PATH = "/content/productVariationSimple/jcr:content/flavor";

	private PopulateVariationsModel populateVariationsModel;

	private AemContext context;

	@BeforeEach
	public void setUp() {

		context.load().json(PRODUCT_CONTENT_JSON, CONTENT_PATH);
		Resource childPageResource = context.resourceResolver().getResource("/content/productVariationSimple/similac-pro-advance-powder");
		Page childProductPage = childPageResource.adaptTo(Page.class);
		context.currentPage(childProductPage);
		context.addModelsForClasses(PopulateVariationsModel.class);
	}

	@Test
	public void testGetSizeValues() {
		populateVariationsModel = context.request().adaptTo(PopulateVariationsModel.class);
		Resource variantResource = context.resourceResolver().getResource(CONTENT_SIZE_PATH);
		ValueMap expectedSizeValue = variantResource.adaptTo(ValueMap.class);
		ValueMap actualSizeValues = populateVariationsModel.getSizeValues();
		assertNotNull(actualSizeValues);
		assertEquals(expectedSizeValue, actualSizeValues);
		assertNotNull(populateVariationsModel.getVariationPageList());
		assertEquals("5729", populateVariationsModel.getSelectedSizeID());
		assertEquals("size1", populateVariationsModel.getSelectedSizeName());
	}

	@Test
	public void testGetSubscriptionMap() {
		populateVariationsModel = context.request().adaptTo(PopulateVariationsModel.class);
		Resource subscriptionMapResource = context.resourceResolver().getResource(CONTENT_SUBSCRIPTION_PATH);
		ValueMap expectedSubscriptionMap = subscriptionMapResource.adaptTo(ValueMap.class);
		ValueMap actualSubscriptionMap = populateVariationsModel.getSubscriptionMap();
		assertNotNull(actualSubscriptionMap);
		assertEquals(expectedSubscriptionMap, actualSubscriptionMap);
		assertEquals("2", populateVariationsModel.getSubscriptionID());
	}

	@Test
	public void testGetDiscountMap() {
		populateVariationsModel = context.request().adaptTo(PopulateVariationsModel.class);
		Resource discountResource = context.resourceResolver().getResource(CONTENT_DISCOUNT_PATH);
		ValueMap expectedDiscount = discountResource.adaptTo(ValueMap.class);
		ValueMap actualDiscount = populateVariationsModel.getDiscountMap();
		assertNotNull(actualDiscount);
		assertEquals(expectedDiscount, actualDiscount);
		assertEquals("20 percentage", populateVariationsModel.getFirstDiscountValue());
	}

	@Test
	public void testGetFlavoursValues() {
		populateVariationsModel = context.request().adaptTo(PopulateVariationsModel.class);
		Resource flavoursResource = context.resourceResolver().getResource(CONTENT_FLAVOURS_PATH);
		ValueMap expectedFlavours = flavoursResource.adaptTo(ValueMap.class);
		ValueMap actualFlavours = populateVariationsModel.getFlavoursValues();
		assertNotNull(actualFlavours);
		assertEquals(actualFlavours, expectedFlavours);
		assertEquals("55652", populateVariationsModel.getSelectedFlavorID());
		assertEquals("flavour1", populateVariationsModel.getSelectedFlavorName());
	}

	@Test
	public void testValidateSetter() {
		populateVariationsModel = context.request().adaptTo(PopulateVariationsModel.class);
		ValueMap mockValue = mock(ValueMap.class);
		populateVariationsModel.setFlavoursValues(mockValue);
		populateVariationsModel.setSelectedFlavorID("");
		populateVariationsModel.setSelectedFlavorName("");
		populateVariationsModel.setSelectedSizeID("");
		populateVariationsModel.setSelectedSizeName("");
		populateVariationsModel.setSizeValues(mockValue);
		assertNotNull(populateVariationsModel.getSelectedFlavorID());
	}
	
	@Test
	public void testForVirtualTypeId() {
		Resource resource = context.currentResource(context.resourceResolver().getResource("/content/productVariationVirtual/similac-infant"));
		Page page = resource.adaptTo(Page.class);
		context.currentPage(page);
		populateVariationsModel = context.request().adaptTo(PopulateVariationsModel.class);
		assertNotNull(populateVariationsModel);
	}
	
	@Test
	public void testWithoutVariationPrty() {
		Resource resource = context.currentResource(context.resourceResolver().getResource("/content/withoutVariation/similac-infant"));
		Page page = resource.adaptTo(Page.class);
		context.currentPage(page);
		populateVariationsModel = context.request().adaptTo(PopulateVariationsModel.class);
		assertNotNull(populateVariationsModel);
	}
	
	@Test
	public void testGetSizeValueList() {
		populateVariationsModel = context.request().adaptTo(PopulateVariationsModel.class);
		Map<String,String> expected = new HashMap<>();
		expected.put("5729", "size1");
		assertEquals(expected,populateVariationsModel.getSizeValueList());
	}
}
