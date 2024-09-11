package com.abbott.aem.an.division.core.models.dynamicproduct;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.commons.io.IOUtils;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.io.InputStream;
import java.io.StringWriter;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

class ProductTest {

	Product product;

  @BeforeEach
    void setUp() {
        try {
            InputStream inputStream = getClass().getResourceAsStream("dynamic-product.json");
            StringWriter stringWriter = new StringWriter();
            IOUtils.copy(inputStream, stringWriter, "UTF-8");
            String json = stringWriter.toString();
            product = new ObjectMapper().readValue(json, Product.class);
        } catch(Exception ex) {
            
        }
       assertTrue(product instanceof Product);
    }

    @Test
    void testGetId() {
        String expected = "282";
        String actual = product.getId();

        assertEquals(expected, actual);
    }

    @Test
    void testGetProductName() {
        String expected1 = "Product Full Name<sup>&reg;</sup>";
        String expected = expected1.replace("&reg;", "<sup>&reg;</sup>");
        String actual = product.getProductName();

        assertEquals(expected, actual);
    }

    @Test
    void testGetCommonName() {
        String expected = "Infant formula with iron";
        String actual = product.getCommonName();

        assertEquals(expected, actual);
    }

    @Test
    void testGetBrand() {
        String expected = "Similac&lt;sup>&amp;reg;&lt;/sup>";
        String actual = product.getBrand();

        assertEquals(expected, actual);
    }

    @Test
    void testGetImages() {
        Image image = product.getImages().get(0);
        assertEquals("png", image.getFiletype());
        assertEquals("nullsimilac.png", image.getFilename());
    }

    @Test
    void testGetCategory() {
        assertEquals(0, product.getCategory().size());
    }

    @Test
    void testGetPrecautions() {
        assertEquals(2, product.getPrecautions().size());
    }

    @Test
    void testGetPrecautionReferences() {
        assertEquals(1, product.getPrecautionReferences().size());
    }

    @Test
    void testGetUsage() {
        assertEquals(2, product.getUsage().size());
    }

    @Test
    void testGetUsageReferences() {
        assertEquals(0, product.getUsageReferences().size());
    }


    @Test
    void getAvailability() {
        Availability availability = product.getAvailability().get(0);
        assertEquals("63075", availability.getDisplayListNumber());
        assertEquals(63075, availability.getListNumber());
        assertEquals("Similac With Iron 24 Cal / 2 fl oz 59 mL) Bottle / 48 ct", availability.getDescription());
        assertEquals("Institutional", availability.getMarketSegment());
        assertEquals("X398", availability.getAcode());
        assertEquals("61022",availability.getId());
        
        
        availability.setMarketSegment("Institutional");
        availability.equals(null);
        availability.equals(63075);
        
        availability.equals(availability);
    	
    	assertEquals(63075,availability.getListNumber());
    	availability.compareTo(availability);
    	availability.hashCode();
    	availability.setListNumber(null);
    	availability.hashCode();
    	
    }
 
    @Test
    void testGetInstructions() {
        
        String instruction = product.getPublishedDateTime();
        assertEquals("02/15/2022",instruction);
        Instructions instructions = product.getInstructions().get(0);
        String expectedProductInstructions = "&lt;p>&lt;strong>Instructions for Use:&lt;/strong>&lt;/p>\r\n"
        		+ "&lt;ul>\r\n"
        		+ "&lt;li>Avoid prolonged exposure of bottles to light.&lt;/li>\r\n"
        		+ "&lt;li>Store unopened bottles at room temperature; avoid extreme temperatures.&lt;/li>\r\n"
        		+ "&lt;li>Do not reuse bottle.&lt;/li>\r\n"
        		+ "&lt;/ul>\r\n"
        		+ "&lt;p> &lt;/p>";
        String productInstructions = instructions.getProductInstructions();
        assertEquals(expectedProductInstructions,productInstructions);
        assertEquals("02/15/2022",instructions.getPublishedDateTime());
        assertEquals("Storage &amp; Handling",instructions.getCategory());
        
    }
    
    @Test
    void testIngredients() {
        
        Ingredients ingredient = product.getIngredients().get(0);

        assertEquals("X398",ingredient.getACode());
        assertEquals("Unflavored",ingredient.getFlavorName());
        assertEquals("Liquid",ingredient.getFormulationType());
        assertEquals("Contains milk and soy ingredients.",ingredient.getAllergenStatement());
        assertEquals("Unflavored",ingredient.getFlavorNameOverride());
        assertEquals("null/content/dam/an/abbottnutrition/products/Original/10001/X398SWI24rtf1121.png", ingredient.getImage());
        assertEquals("Water, Lactose, Nonfat Milk, High Oleic Safflower Oil, Soy Oil, Coconut Oil, Whey Protein Concentrate. Less than 0.5% of: C. Cohnii Oil, M. Alpina Oil, Beta-Carotene, Lutein, Ascorbic Acid, Calcium Carbonate, Potassium Citrate, Monoglycerides, Soy Lecithin, Sodium Citrate, Potassium Chloride, Magnesium Chloride, Calcium Phosphate, Potassium Phosphate, Carrageenan, Choline Chloride, Choline Bitartrate, Ferrous Sulfate, Taurine, Inositol, L-Tryptophan, d-Alpha-Tocopheryl Acetate, Zinc Sulfate, Niacinamide, Calcium Pantothenate, L-Carnitine, Vitamin A Palmitate, Thiamine Hydrochloride, Riboflavin, Pyridoxine Hydrochloride, Copper Sulfate, Manganese Sulfate, Folic Acid, Phylloquinone, Biotin, Sodium Selenite, Vitamin D3, Vitamin B12, Magnesium Sulfate, Salt, Potassium Iodide, Potassium Hydroxide, and Nucleotides (Adenosine 5&#39;-Monophosphate, Cytidine 5&#39;-Monophosphate, Disodium Guanosine 5&#39;-Monophosphate, Disodium Uridine 5&#39;-Monophosphate).",ingredient.getIngredients());
        ingredient.setFlavorNameOverride(null);
        assertEquals("Unflavored",ingredient.getFlavorNameOverride());
    }
    
    @Test
    void testProductInformationClaim() {
    	ProductInformationClaim claim = product.getPrecautions().get(0);
    	
    	assertEquals("Not for infants or children with galactosemia.", claim.getClaimText());
    	assertEquals(8, claim.getLineNumber());
    	claim.equals(null);
    	claim.equals("");
    	claim.equals(claim);
    	
    	assertEquals(8,claim.getLineNumber());
    	claim.hashCode();
    	claim.compareTo(claim);
    	
    	claim.setLineNumber(null);
    	claim.hashCode();
    }
    
    @Test
    void testNutritionalInfo() {
    	ServingSize groupNutrition = product.getServingSize().get(0);
    	NutritionalInfo nutritionInfo = groupNutrition.getNutritionalInfo().get(0);
    	
    	assertEquals("Calories", nutritionInfo.getNutritionName());
    	assertEquals(1, nutritionInfo.getLineNumber());
    	assertEquals("Nutrient Data", nutritionInfo.getNutritionCategory());
    	assertEquals("100", nutritionInfo.getNutritionValue());
    	assertEquals("", nutritionInfo.getPercentDV());
    	assertNull(nutritionInfo.getPercentRDI());
    	nutritionInfo.setPercentRDI("10");
    	assertEquals("10", nutritionInfo.getPercentRDI());
    	nutritionInfo.equals(null);
    	nutritionInfo.equals("");
    	nutritionInfo.equals(nutritionInfo);
    	
    	assertEquals(1,nutritionInfo.getLineNumber());
    	nutritionInfo.hashCode();
    	nutritionInfo.compareTo(nutritionInfo);
    	
    	nutritionInfo.setLineNumber(null);
    	nutritionInfo.hashCode();
    }
    
    @Test
    void testProductReference() {
    	ProductInformationReference productReference = product.getPrecautionReferences().get(0);
    	assertEquals(8,productReference.getLineNumber());
    	assertEquals("symbol",productReference.getReferenceSymbol());
    	assertEquals("Test",productReference.getReferenceText());
    	
    	productReference.equals(null);
    	productReference.equals("");
    	productReference.equals(productReference);
    	
    	assertEquals(8,productReference.getLineNumber());
    	productReference.hashCode();
    	productReference.compareTo(productReference);
    	
    	productReference.setLineNumber(null);
    	productReference.hashCode();
    }
    
    
    @Test
    void testServingSize() {
    	ServingSize size = product.getServingSize().get(0);
    	assertEquals("1462", size.getId());
    	assertEquals(1,size.getLineNumber());
    	assertEquals("X398",size.getAcode());
    	assertEquals("100 Cal (4.2 fl oz)",size.getServingSizeName());
    	assertEquals("",size.getPercentDVSymbol());
    	assertEquals("",size.getPercentRDISymbol());
    	
    	size.equals(null);
    	size.equals("");
    	size.equals(size);
    	
    	assertEquals(1,size.getLineNumber());
    	size.hashCode();
    	size.compareTo(size);
    	
    	size.setLineNumber(null);
    	size.hashCode();
    	
    	List<NutritionalInfo> nutritionMineral = size.getNutritionalInfoMinerals();
    	List<NutritionalInfo> nutritionInfo = size.getNutritionalInfoVitamins();
    	List<NutritionalInfo> nutritionalInfoData = size.getNutritionalInfoData();
    	
    	
    }
    
    @Test
    void testFootnotes() {
    	ServingSize size = product.getServingSize().get(0);
    	List<Footnote> footnotes = size.getFootnotes();
    	Footnote footnotes1 = footnotes.get(0);
    	assertEquals(1,footnotes1.getLineNumber());
    	assertEquals("",footnotes1.getFootnoteSymbol());
    	assertEquals("",footnotes1.getFootnoteValue());
    	
    	footnotes1.equals(null);
    	footnotes1.equals("");
    	footnotes1.equals(footnotes1);
    	
    	assertEquals(1,footnotes1.getLineNumber());
    	footnotes1.hashCode();
    	footnotes1.compareTo(footnotes1);
    	
    	footnotes1.setLineNumber(null);
    	footnotes1.hashCode();
    }
    
    @Test
    void testProductDetails() {
    	assertEquals("02/15/2022",product.getApprovalDateTime());
    	assertEquals("A 24 Cal/fl oz, milk-based, iron-fortified formula for term infants needing an increased caloric-density feeding.Use under medical supervision.", product.getDescription());
    	assertEquals("X398",product.getDefaultFormulationCode());
    	assertEquals("/content/an/abbottnutrition/us/en/our-products/similac-with-iron-24.html",product.getLearnmore());
    	List<ProductInformationClaim> features = product.getFeatures();
    	List<ProductInformationReference> featureReferences = product.getFeatureReferences();
    }
}