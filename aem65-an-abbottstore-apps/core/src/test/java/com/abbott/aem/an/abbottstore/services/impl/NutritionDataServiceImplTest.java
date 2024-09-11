package com.abbott.aem.an.abbottstore.services.impl;

import com.abbott.aem.an.abbottstore.constants.CommonConstants;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

/**
 * The Class NutritionDataServiceImplTest.
 */
@ExtendWith({ AemContextExtension.class, MockitoExtension.class })
public class NutritionDataServiceImplTest {

	/** The ctx. */
	private final AemContext ctx = new AemContext();

	/** The nutrition data service impl. */
	private NutritionDataServiceImpl nutritionDataServiceImpl;

	/** The Constant NUTRITION_WEB_SERVICE_URL. */
	private static final String NUTRITION_WEB_SERVICE_URL = "https://an-api-tridion.abbottnutrition.com/api/ProductBySku/";

	/** The time out. */
	private static final int TIMEOUT = 60000;

	String[] resourcePropertyArray = { "abbott/components/content/product-description=description",
			"abbott/components/content/more-information=product_flavor,case_of_product,product_form,case_x,case_y",
			"abbott/components/content/nutritionalinfo=nutritional-info",
			"abbott/components/content/subscription-description=subscription_info" };

	/** The properties map. */
	private Map<String, List<String>> propertiesMap;

	/**
	 * Setup.
	 */
	@BeforeEach
	public void setUp() {
		nutritionDataServiceImpl = ctx.registerInjectActivateService(new NutritionDataServiceImpl());
		propertiesMap = new HashMap<>();
		for (String properties : resourcePropertyArray) {
			if (properties.indexOf(CommonConstants.DELIMITTER_EQUALS) > -1) {
				propertiesMap.put(properties.split(CommonConstants.DELIMITTER_EQUALS)[0],
						Arrays.asList(properties.split(CommonConstants.DELIMITTER_EQUALS)[1]
								.split(CommonConstants.DELIMITTER_COMMA)));
			}
		}
	}

	/**
	 * Test get time out.
	 */
	@Test
	public void testGetTimeOut() {
		assertEquals(TIMEOUT, nutritionDataServiceImpl.getTimeOut());
	}

	/**
	 * Test get nutrition web service url.
	 */
	@Test
	public void testGetNutritionWebServiceUrl() {
		assertEquals(NUTRITION_WEB_SERVICE_URL, nutritionDataServiceImpl.getNutritionWebServiceUrl());
	}

	/**
	 * Test get nutrition facts data.
	 */
	@Test
	public void testGetNutritionFactsData() throws IOException {
		String file = "src/test/resources/nutritionalFact-data.json";
		String json = new String(Files.readAllBytes(Paths.get(file)));
		assertEquals("2023-01-11T10:32:20.1812468-06:00",
				nutritionDataServiceImpl.getNutritionFactsData(json).getAPIgeneratedAt());
	}

	/**
	 * Test get resource properties.
	 */
	@Test
	public void testGetResourceProperties() {
		assertEquals(propertiesMap, nutritionDataServiceImpl.getResourceProperties());
	}

	/**
	 * Test has Nutritional Facts data.
	 */
	@Test
	void testHasNutritionalFacts() throws IOException {
		String file = "src/test/resources/nutritionalFact-data.json";
		String json = new String(Files.readAllBytes(Paths.get(file)));
		assertTrue(nutritionDataServiceImpl.hasNutritionalFacts(json));
	}

	@Test
	void testNoNutritionalFacts() throws IOException {
		assertFalse(nutritionDataServiceImpl.hasNutritionalFacts(""));
	}
}
