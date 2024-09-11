package com.abbott.aem.an.similac.integration.nutrition;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class TestServingSizes {

	ServingSizes servingSizes;	

	@BeforeEach
	void setUp() {
		servingSizes = new ServingSizes();
		servingSizes.setServingSizeName("serving size name");
	}

	void setFootNotes(ServingSizes servingSizeObj) {
		FootNote[] footNotes = new FootNote[4];
		footNotes[0] = new FootNote();
		servingSizeObj.setFootnotes(footNotes);
	}

	void setNutritionalInfo(ServingSizes servingSizeObj) {
		NutritionalInfo[] nutritionalInfosParam = new NutritionalInfo[7];
		
		NutritionalInfo nutritionalInfo = new NutritionalInfo();
		nutritionalInfo.setNutritionCategory("Nutrient Data");
		nutritionalInfo.setNutritionValue("nutrition value");
		nutritionalInfo.setPercentDV("20");

		NutritionalInfo nutritionalInfo1 = new NutritionalInfo();
		nutritionalInfo1.setNutritionCategory("Vitamins");
		nutritionalInfo1.setNutritionValue("nutrition value");
		nutritionalInfo1.setPercentDV("20");
		nutritionalInfo1.setLineNumber("1");

		NutritionalInfo nutritionalInfo2 = new NutritionalInfo();
		nutritionalInfo2.setNutritionCategory("Minerals");
		nutritionalInfo2.setNutritionValue("nutrition value");
		nutritionalInfo2.setPercentDV("20");
		nutritionalInfo2.setLineNumber("2");

		NutritionalInfo nutritionalInfo3 = new NutritionalInfo();
		nutritionalInfo3.setNutritionCategory("");

		NutritionalInfo nutritionalInfo4 = new NutritionalInfo();
		nutritionalInfo4.setNutritionCategory("Nutrient Data");

		NutritionalInfo nutritionalInfo5 = new NutritionalInfo();
		nutritionalInfo5.setNutritionCategory("Vitamins");
		nutritionalInfo5.setLineNumber("3");

		NutritionalInfo nutritionalInfo6 = new NutritionalInfo();
		nutritionalInfo6.setNutritionCategory("Minerals");
		nutritionalInfo6.setLineNumber("4");

		nutritionalInfosParam[0] = nutritionalInfo;
		nutritionalInfosParam[1] = nutritionalInfo1;
		nutritionalInfosParam[2] = nutritionalInfo2;
		nutritionalInfosParam[3] = nutritionalInfo3;
		nutritionalInfosParam[4] = nutritionalInfo4;
		nutritionalInfosParam[5] = nutritionalInfo5;
		nutritionalInfosParam[6] = nutritionalInfo6;

		servingSizes.setNutritionalInfo(nutritionalInfosParam);
	}

	@Test
	void testHandleNutrition_withArrayValues() {
		setNutritionalInfo(servingSizes);
		setFootNotes(servingSizes);
		servingSizes.handleNutrintionaInfo(servingSizes.getNutritionalInfo());
		List<NutritionalInfo> nutritionDataList = servingSizes.getNutrientDataList();
		assertNotNull(nutritionDataList);
		assertTrue(nutritionDataList.size() > 0);
		List<NutritionalInfo> vitaminDataList = servingSizes.getVitaminsDataList();
		assertNotNull(vitaminDataList);
		assertTrue(vitaminDataList.size() > 0);
		List<NutritionalInfo> mineralDataList = servingSizes.getMineralsDataList();
		assertNotNull(mineralDataList);
		assertTrue(mineralDataList.size() > 0);
		assertNotNull(servingSizes.getNutritionalInfo());
		assertNotNull(servingSizes.getFootnotes());
	}

	@Test
	void testHandleNutrition_NullArray() {
		servingSizes.handleNutrintionaInfo(null);
	}

	@Test
	void testHandleNutrition_EmptyArray() {
		NutritionalInfo[] nutritionalInfos = {};
		servingSizes.handleNutrintionaInfo(nutritionalInfos);
	}

	@Test
	void testPOJO() {
		assertNotNull(servingSizes.toString());
		assertNotNull(servingSizes.hashCode());
		assertEquals("serving size name", servingSizes.getServingSizeName());
		assertFalse(servingSizes.isServingMineralNutritions());
		assertFalse(servingSizes.isServingMineralNutritionsDv());
		assertFalse(servingSizes.isServingVitaminNutritionsDv());
		assertFalse(servingSizes.isServingNutritionsDv());
		assertFalse(servingSizes.isServingVitaminNutritions());
		assertFalse(servingSizes.isServingNutritions());
	}

	@Test
	void testEquality() {
		assertTrue(servingSizes.equals(servingSizes));
		ServingSizes newObj2 = new ServingSizes();
		assertFalse(servingSizes.equals(newObj2));
		setFootNotes(newObj2);
		assertFalse(servingSizes.equals(newObj2));
		setNutritionalInfo(newObj2);
		assertFalse(servingSizes.equals(newObj2));
	}
}
