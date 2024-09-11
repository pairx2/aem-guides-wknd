package com.abbott.aem.an.division.core.models.product;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.commons.io.IOUtils;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.io.InputStream;
import java.io.StringWriter;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.assertNotNull;

class ProductTest {

    Product product;

    @BeforeEach
    void setUp() {
        try {
            InputStream inputStream = getClass().getResourceAsStream("product-full.json");

            StringWriter stringWriter = new StringWriter();

            IOUtils.copy(inputStream, stringWriter, "UTF-8");

            String json = stringWriter.toString();

            product = new ObjectMapper().readValue(json, Product.class);
        } catch(Exception ex) {
            //
        }

        assertTrue(product instanceof Product);
    }

    @Test
    void testGetAPIgeneratedAt() {
        assertNotNull(product.getAPIgeneratedAt());
    }

    @Test
    void testGetPublishedAt() {
        assertNotNull(product.getPublishedAt());
    }

    @Test
    void testGetId() {
        String expected = "product-full-id";
        String actual = product.getId();

        assertEquals(expected, actual);
    }

    @Test
    void testGetProductName() {
        String expected = "Product Full Name<sup>&reg;</sup>";
        String actual = product.getProductName();

        assertEquals(expected, actual);
    }

    @Test
    void testGetCommonName() {
        String expected = "Product Full Common Name";
        String actual = product.getCommonName();

        assertEquals(expected, actual);
    }

    @Test
    void testGetBrand() {
        String expected = "Brand<sup>&reg;</sup>";
        String actual = product.getBrand();

        assertEquals(expected, actual);
    }

    @Test
    void testGetImages() {
        Image image = product.getImages().get(0);
        assertEquals(1, product.getImages().size());
        assertEquals("http://dev2.pediatricproconnect.com/product-full.png", image.getFilename());
        assertEquals("Image", image.getFiletype());
    }

    @Test
    void testGetCategory() {
        assertEquals(0, product.getCategory().size());
    }

    @Test
    void testGetNutritionalUsage() {
        assertEquals(0, product.getNutritionalUsage().size());
    }

    @Test
    void testGetFeatures() {
        List<Claim> features = product.getFeatures();
        Claim claim = features.get(0);
        assertEquals(2, features.size());
        assertEquals(1, claim.getLineNumber());
        assertEquals("Feature 1 Claim Text", claim.getClaimText());
    }

    @Test
    void testGetFeatureReferences() {
        List<ClaimReference> featureReferences = product.getFeatureReferences();
        ClaimReference claimReference = featureReferences.get(0);
        assertEquals(2, featureReferences.size());
        assertEquals(1, claimReference.getLineNumber());
        assertEquals("Feature 1 Reference Text", claimReference.getReferenceText());
        assertEquals("<sup>*</sup>", claimReference.getReferenceSymbol());
    }

    @Test
    void testGetPrecautions() {
        assertEquals(2, product.getPrecautions().size());
    }

    @Test
    void testGetPrecautionReferences() {
        assertEquals(0, product.getPrecautionReferences().size());
    }

    @Test
    void testGetUsage() {
        assertEquals(2, product.getUsage().size());
    }

    @Test
    void testGetUsageReferences() {
        assertEquals(2, product.getUsageReferences().size());
    }

    @Test
    void testGetPreparation() {
        assertEquals(1, product.getPreparation().size());
    }

    @Test
    void testGetSafetyInformation() {
        assertEquals(0, product.getSafetyInformation().size());
    }

    @Test
    void testGetFlavors() {
        List<Flavor> flavors = product.getFlavors();
        Flavor flavor = flavors.get(0);
        ServingSize servingSize = flavor.getServingSizes().get(0);
        NutritionalInfo nutritionalInfo = servingSize.getNutritionalInfo().get(0);
        assertEquals(3, flavors.size());
        assertEquals("x1",flavor.getACode());
        assertEquals("x1 Flavor Name", flavor.getFlavorName());
        assertEquals("x1 Ingredients", flavor.getIngredients());
        assertEquals("x1 Allergen Statement", flavor.getAllergenStatement());
        assertEquals(1, flavor.getPackages().size());
        assertEquals(1, flavor.getDietaryCategories().size());
        assertEquals(2, flavor.getServingSizes().size());
        assertEquals(2, servingSize.getFootnotes().size());
        assertEquals("x1 Footnote 1 Value", servingSize.getFootnotes().get(0).getFootnoteValue());
        assertEquals("x1 Footnote 1 Symbol", servingSize.getFootnotes().get(0).getFootnoteSymbol());
        assertEquals(6, servingSize.getNutritionalInfo().size());
        assertEquals("x1 Serving Size 1", servingSize.getServingSizeName());
        assertEquals(1, nutritionalInfo.getLineNumber());
        assertEquals("x1 Category 1", nutritionalInfo.getNutritionCategory());
        assertEquals("x1 Nutrition Name 1", nutritionalInfo.getNutritionName());
        assertEquals("1", nutritionalInfo.getNutritionValue());
        assertEquals(null, nutritionalInfo.getPercentDV());
        assertEquals(null, nutritionalInfo.getPercentRDI());
        flavor.setFlavorNameOverride("x1 Flavor Name override");
        assertEquals("x1 Flavor Name override",flavor.getFlavorNameOverride());
        flavor.setFlavorNameOverride(null);
        assertEquals("x1 Flavor Name",flavor.getFlavorNameOverride());
        assertEquals(1, servingSize.getFootnotes().get(0).getLineNumber());
    }
    
    @Test
    void testAcode() {
    	 List<Flavor> flavors = product.getFlavors();
         Flavor flavor = flavors.get(0);
    	 flavor.setACode("x2");
         assertEquals("x2",flavor.getACode());
    }

    @Test
    void testGetGroupedNutritionalInfo() {
        List<Flavor> flavors = product.getFlavors();
        Flavor flavor = flavors.get(0);
        ServingSize servingSize = flavor.getServingSizes().get(0);
        Map<String,List<NutritionalInfo>> groupedNutritionalInfo = servingSize.getGroupedNutritionalInfo();
        assertEquals(2, groupedNutritionalInfo.get("x1 Category 1").size());
    }

    @Test
    void getAvailability() {
        Availability availability = product.getAvailability().get(0);
        assertEquals(3, product.getAvailability().size());
        assertEquals("1", availability.getListNumber());
        assertEquals("x1 Package", availability.getDescription());
    }
    
    @Test
    void testBrandName() {
    	product.setBrand("Similac");
        assertEquals("Similac",product.getBrand());
    }
}