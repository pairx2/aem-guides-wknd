package com.abbott.aem.an.similac.integration.nutrition;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class TestNutritionalInfo {
	
	NutritionalInfo nutritionalInfo;

	@BeforeEach
	void setUp() {
		nutritionalInfo = new NutritionalInfo();
	}

	@Test
	void testPOJO() {
		nutritionalInfo.setNutritionValue("value");
		nutritionalInfo.setNutritionCategory("category");
		nutritionalInfo.setNutritionName("nutrition name");
		nutritionalInfo.setPercentDV("30");
		nutritionalInfo.setPercentRDI("rdi");
		nutritionalInfo.setLineNumber("1");

		assertEquals("value", nutritionalInfo.getNutritionValue());
		assertEquals("category", nutritionalInfo.getNutritionCategory());
		assertEquals("nutrition name", nutritionalInfo.getNutritionName());
		assertEquals("30", nutritionalInfo.getPercentDV());
		assertEquals("rdi", nutritionalInfo.getPercentRDI());
		assertEquals("1", nutritionalInfo.getLineNumber());
		assertNotNull(nutritionalInfo.toString());
		assertNotNull(nutritionalInfo.hashCode());
		assertTrue(nutritionalInfo.equals(nutritionalInfo));
		
		NutritionalInfo newObj = new NutritionalInfo();
		assertFalse(nutritionalInfo.equals(newObj));
		newObj.setLineNumber("1");
		assertFalse(nutritionalInfo.equals(newObj));
		newObj.setNutritionCategory("category");
		assertFalse(nutritionalInfo.equals(newObj));
		newObj.setNutritionName("nutrition name");
		assertFalse(nutritionalInfo.equals(newObj));
		newObj.setNutritionValue("value");
		assertFalse(nutritionalInfo.equals(newObj));
		newObj.setPercentDV("30");
		assertFalse(nutritionalInfo.equals(newObj));
		newObj.setPercentRDI("rdi");		
		assertTrue(nutritionalInfo.equals(newObj));
	}

}
