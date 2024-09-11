package com.abbott.aem.an.abbottstore.integration.nutrition;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class NutritionFactsTest {

    @InjectMocks
    NutritionFacts nutritionFacts;

    @BeforeEach
    void setUp() {
        Flavors[] flavors = new Flavors[]{};
        nutritionFacts.setFlavors(flavors);
        nutritionFacts.setBrand("brand");
        nutritionFacts.setAPIgeneratedAt("api");
        nutritionFacts.setProductName("abbott");
        nutritionFacts.setPublishedAt("store");
    }

    @Test
    void getBrand() {
        assertEquals("brand", nutritionFacts.getBrand());
    }

    @Test
    void getProductName() {
        assertEquals("abbott", nutritionFacts.getProductName());
    }

    @Test
    void getAPIgeneratedAt() {
        assertEquals("api", nutritionFacts.getAPIgeneratedAt());
    }

    @Test
    void getPublishedAt() {
        assertEquals("store", nutritionFacts.getPublishedAt());
    }

    @Test
    void testToString() {
        assertFalse(nutritionFacts.toString().isEmpty());
    }

    @Test
    void getFlavors() {
        assertTrue(nutritionFacts.getFlavors().length >= 0);
    }
}