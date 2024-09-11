package com.abbott.aem.an.similac.core.models;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import com.abbott.aem.an.similac.core.services.NutritionDataService;
import com.abbott.aem.an.similac.integration.nutrition.NutritionFacts;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith({ AemContextExtension.class, MockitoExtension.class })
class NutritionalInfoModelTest {

	private AemContext ctx = new AemContext();

	@Mock
	NutritionDataService nutritionDataService;

	@BeforeEach
	void setUp() {
		// Testing the NutritionalInfoModel Sling Model
		ctx.addModelsForClasses(NutritionalInfoModel.class);

		// Load the mock resources into the JCR
		ctx.load().json("/com/abbott/aem/an/similac/core/models/NutritionalInfoModel.json", "/content");

		// Register the Nutrition Data Service
		ctx.registerService(NutritionDataService.class, nutritionDataService,
				org.osgi.framework.Constants.SERVICE_RANKING, Integer.MAX_VALUE);
	}

	@Test
	void testGetNutritionalInfoEmpty() {
		// Set the resource which we want to mock
		ctx.currentResource("/content/withoutInfo/jcr:content/nutritionalInfo");

		// Set mock beaviour for the Nutrition Data Service
		Mockito.lenient().when(nutritionDataService.getNutritionFactsData(null)).thenReturn(null);

		NutritionalInfoModel nInfo = ctx.request().adaptTo(NutritionalInfoModel.class);
		NutritionFacts nFacts = null;
		nFacts = nInfo.getNutritionalInfo();

		assertNull(nFacts);
	}

	@Test
	void getNutritionalInfo() {
		ctx.currentResource("/content/withInfo/jcr:content/nutritionalInfo");

		Mockito.lenient().when(nutritionDataService.getNutritionFactsData(Mockito.anyString())).thenReturn(null);

		NutritionalInfoModel nInfo = ctx.request().adaptTo(NutritionalInfoModel.class);
		NutritionFacts nFacts = null;
		nFacts = nInfo.getNutritionalInfo();
		assertNull(nFacts);
	}

	@Test
	void testHasNutritionalInfoData() {
		ctx.currentResource("/content/withInfo/jcr:content/nutritionalInfo");

		Mockito.lenient().when(nutritionDataService.hasNutritionalFacts(Mockito.anyString())).thenReturn(true);

		NutritionalInfoModel nInfo = ctx.request().adaptTo(NutritionalInfoModel.class);
		Boolean actual = nInfo.hasNutrionalInfoData();
		Boolean expected = true;
		assertEquals(expected, actual);
	}
	
	@Test
	void testHasNutritionalInfoDataNegative() {
		ctx.currentResource("/content/withoutInfo/jcr:content/nutritionalInfo");

		Mockito.lenient().when(nutritionDataService.hasNutritionalFacts(Mockito.anyString())).thenReturn(true);

		NutritionalInfoModel nInfo = ctx.request().adaptTo(NutritionalInfoModel.class);
		Boolean actual = nInfo.hasNutrionalInfoData();
		Boolean expected = false;
		assertEquals(expected, actual);
	}
}
