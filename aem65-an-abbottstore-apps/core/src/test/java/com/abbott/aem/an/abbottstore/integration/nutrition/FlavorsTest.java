package com.abbott.aem.an.abbottstore.integration.nutrition;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class FlavorsTest {

    @InjectMocks
    Flavors flavors;

    @BeforeEach
    void setUp() {
        String[] testData = new String[]{"test"};
        ServingSizes[] servingSizes = new ServingSizes[]{};
        flavors.setFlavorName("choco");
        flavors.setACode("abbott");
        flavors.setPackages(testData);
        flavors.setDietaryCategories(testData);
        flavors.setAllergenStatement("allergen stat");
        flavors.setIngredients("ingredients");
        flavors.setServingSizes(servingSizes);
    }

    @Test
    void getFlavorName() {
        assertEquals("choco", flavors.getFlavorName());
    }

    @Test
    void getIngredients() {
        assertEquals("ingredients", flavors.getIngredients());
    }

    @Test
    void getACode() {
        assertEquals("abbott", flavors.getACode());
    }

    @Test
    void getAllergenStatement() {
        assertEquals("allergen stat", flavors.getAllergenStatement());
    }

    @Test
    void testToString() {
        assertFalse(flavors.toString().isEmpty());
    }

    @Test
    void getDietaryCategories() {
        assertTrue(flavors.getDietaryCategories().length > 0);
    }

    @Test
    void getPackages() {
        assertTrue(flavors.getPackages().length > 0);
    }

    @Test
    void getServingSizes() {
        assertTrue(flavors.getServingSizes().length == 0);
    }
}