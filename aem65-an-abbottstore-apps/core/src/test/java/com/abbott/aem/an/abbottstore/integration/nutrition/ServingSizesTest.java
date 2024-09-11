package com.abbott.aem.an.abbottstore.integration.nutrition;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;

@ExtendWith(MockitoExtension.class)
class ServingSizesTest {

    @InjectMocks
    ServingSizes servingSizes;

    FootNote[] footNote;

    NutritionalInfo[] nutritionalInfos;

    @InjectMocks
    NutritionalInfo nutritionalInfo;

    @BeforeEach
    void setUp() {
        servingSizes.setServingSizeName("name");
        servingSizes.setFootnotes(footNote);
        servingSizes.setNutritionalInfo(nutritionalInfos);
    }

    @Test
    void getServingSizeName() {
        assertEquals("name", servingSizes.getServingSizeName());
    }

    @Test
    void isServingNutritions() {
        assertFalse(servingSizes.isServingNutritions());
    }

    @Test
    void isServingVitaminNutritions() {
        assertFalse(servingSizes.isServingVitaminNutritions());
    }

    @Test
    void isServingMineralNutritions() {
        assertFalse(servingSizes.isServingMineralNutritions());
    }

    @Test
    void isServingNutritionsDv() {
        assertFalse(servingSizes.isServingNutritionsDv());
    }

    @Test
    void isServingVitaminNutritionsDv() {
        assertFalse(servingSizes.isServingVitaminNutritionsDv());
    }

    @Test
    void isServingMineralNutritionsDv() {
        assertFalse(servingSizes.isServingMineralNutritionsDv());
    }

    @Test
    void testToString() {
        assertFalse(servingSizes.toString().isEmpty());
    }

}