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
class TestFlavours {

	Flavors flavors;

	@BeforeEach
	void setUp() {
		flavors = new Flavors();
	}

	@Test
	void testPOJO() {
		flavors.setACode("aCode");
		flavors.setAllergenStatement("allergen stmt");
		String[] dietCategories = { "fat", "proteins" };
		flavors.setDietaryCategories(dietCategories);
		flavors.setFlavorName("flavourName");
		flavors.setIngredients("ingredients");
		String[] packages = { "package1", "package2" };
		flavors.setPackages(packages);
		ServingSizes[] servingSizesArray = { new ServingSizes() };
		flavors.setServingSizes(servingSizesArray);

		assertEquals("aCode", flavors.getACode());
		assertEquals("allergen stmt", flavors.getAllergenStatement());
		assertEquals(dietCategories, flavors.getDietaryCategories());
		assertEquals("flavourName", flavors.getFlavorName());
		assertEquals("ingredients", flavors.getIngredients());
		assertEquals(packages, flavors.getPackages());
		assertNotNull(flavors.getServingSizes());
		assertEquals(1, flavors.getServingSizes().length);
		assertNotNull(flavors.toString());
		assertNotNull(flavors.hashCode());
		assertTrue(flavors.equals(flavors));
		
		Flavors newObj = new Flavors();
		assertFalse(flavors.equals(newObj));
		newObj.setACode("aCode");
		assertFalse(flavors.equals(newObj));
		newObj.setAllergenStatement("allergen stmt");
		assertFalse(flavors.equals(newObj));
		newObj.setDietaryCategories(dietCategories);
		assertFalse(flavors.equals(newObj));
		newObj.setFlavorName("flavourName");
		assertFalse(flavors.equals(newObj));
		newObj.setIngredients("ingredients");
		assertFalse(flavors.equals(newObj));
		newObj.setPackages(packages);
		assertFalse(flavors.equals(newObj));
		newObj.setServingSizes(servingSizesArray);
		assertTrue(flavors.equals(newObj));
	}
}
