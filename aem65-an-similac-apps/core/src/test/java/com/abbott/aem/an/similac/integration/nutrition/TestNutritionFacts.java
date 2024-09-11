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
class TestNutritionFacts {
	
	NutritionFacts nutritionFacts;

	@BeforeEach
	void setUp() {
		nutritionFacts = new NutritionFacts();
	}

	@Test
	void testPOJO() {
		nutritionFacts.setBrand("brand");
		nutritionFacts.setProductName("product name");
		nutritionFacts.setAPIgeneratedAt("current date");
		nutritionFacts.setPublishedAt("location");
		Flavors[] flavorsArray = { new Flavors() };
		nutritionFacts.setFlavors(flavorsArray);

		assertEquals("brand", nutritionFacts.getBrand());
		assertEquals("product name", nutritionFacts.getProductName());
		assertEquals("current date", nutritionFacts.getAPIgeneratedAt());
		assertEquals("location", nutritionFacts.getPublishedAt());
		assertNotNull(nutritionFacts.getFlavors());
		assertEquals(1, nutritionFacts.getFlavors().length);
		assertNotNull(nutritionFacts.toString());
		assertNotNull(nutritionFacts.hashCode());
		assertTrue(nutritionFacts.equals(nutritionFacts));
		
		NutritionFacts newObj = new NutritionFacts();
		assertFalse(nutritionFacts.equals(newObj));
		newObj.setAPIgeneratedAt("current date");
		assertFalse(nutritionFacts.equals(newObj));
		newObj.setBrand("brand");
		assertFalse(nutritionFacts.equals(newObj));
		newObj.setFlavors(flavorsArray);
		assertFalse(nutritionFacts.equals(newObj));
		newObj.setProductName("product name");
		assertFalse(nutritionFacts.equals(newObj));
		newObj.setPublishedAt("location");
		assertTrue(nutritionFacts.equals(newObj));
	}

}
