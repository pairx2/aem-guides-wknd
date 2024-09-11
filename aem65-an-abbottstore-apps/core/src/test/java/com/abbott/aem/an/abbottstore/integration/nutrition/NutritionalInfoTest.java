package com.abbott.aem.an.abbottstore.integration.nutrition;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;

@ExtendWith(MockitoExtension.class)
class NutritionalInfoTest {

    @InjectMocks
    NutritionalInfo nutritionalInfo;

    @BeforeEach
    void setUp() {
        nutritionalInfo.setNutritionName("protein");
        nutritionalInfo.setNutritionCategory("category");
        nutritionalInfo.setNutritionValue("val");
        nutritionalInfo.setLineNumber("1");
        nutritionalInfo.setPercentDV("10");
        nutritionalInfo.setPercentRDI("20");
    }

    @Test
    void getNutritionValue() {
        assertEquals("val", nutritionalInfo.getNutritionValue());
    }

    @Test
    void getNutritionCategory() {
        assertEquals("category", nutritionalInfo.getNutritionCategory());
    }

    @Test
    void getNutritionName() {
        assertEquals("protein", nutritionalInfo.getNutritionName());
    }

    @Test
    void getPercentDV() {
        assertEquals("10", nutritionalInfo.getPercentDV());
    }

    @Test
    void getPercentRDI() {
        assertEquals("20", nutritionalInfo.getPercentRDI());
    }

    @Test
    void getLineNumber() {
        assertEquals("1", nutritionalInfo.getLineNumber());
    }

    @Test
    void testToString() {
        assertFalse(nutritionalInfo.toString().isEmpty());
    }
}