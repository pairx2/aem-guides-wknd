package com.abbott.aem.an.similac.core.services.impl;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import com.abbott.aem.an.similac.core.services.NutritionDataService;
import com.abbott.aem.an.similac.core.services.impl.NutritionDataServiceImpl.Config;
import com.abbott.aem.an.similac.integration.nutrition.Flavors;
import com.abbott.aem.an.similac.integration.nutrition.FootNote;
import com.abbott.aem.an.similac.integration.nutrition.NutritionFacts;
import com.abbott.aem.an.similac.integration.nutrition.NutritionalInfo;
import com.abbott.aem.an.similac.integration.nutrition.ServingSizes;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith({ AemContextExtension.class })
public class NutritionDataServiceImplTest {
	private AemContext ctx = new AemContext();

	private NutritionDataService nDataService;

	private static final String NUTRITIONAL_INFO_JSON = "{'APIgeneratedAt':'2020-03-08T09:50:51.2754072-05:00','PublishedAt':'2019-09-24T11:47:22.167','ProductName':'Similac Pro-Advance&reg; 20','Brand':'Similac&reg;',"
			+ "'Flavors':[{'ACode':'X547','FlavorName':'Unflavored','Ingredients':'Nonfat Milk, Lactose, High Oleic Safflower Oil','AllergenStatement':'Contains milk and soy ingredients.',"
			+ "'Packages':['Similac Pro-Advance Powder / 23.2 oz (658 g) SimplePac / 4 ct','Similac Pro-Advance Powder / 30.8 oz (873 g) Can / 4 ct','Similac Pro-Advance Powder / 34 oz (964 g) SimplePac / 6 ct','Similac Pro-Advance Powder / 0.58 oz (16.4 g) Packet / 4 x 16 ct'],"
			+ "'DietaryCategories':['Contains Milk Ingredients|Contains Soy Ingredients'],'ServingSizes':[{'ServingSizeName':'100 Cal (5 fl oz, prepared as directed)','Footnotes':[],"
			+ "'NutritionalInfo':[{'LineNumber':1,'NutritionCategory':'Nutrient Data','NutritionName':'Calories','NutritionValue':'100','PercentDV':null,'PercentRDI':null},"
			+ "{'LineNumber':2,'NutritionCategory':'Vitamins','NutritionName':'Vitamin A, IU','NutritionValue':'300','PercentDV':null,'PercentRDI':null},"
			+ "{'LineNumber':3,'NutritionCategory':'Minerals','NutritionName':'Calcium, mg','NutritionValue':'78','PercentDV':null,'PercentRDI':null}]}]}]}";

	@BeforeEach
	void setup() {
		nDataService = new NutritionDataServiceImpl();
		ctx.registerInjectActivateService(nDataService);
		nDataService = ctx.getService(NutritionDataService.class);
	}

	@Test
	void getTimeOut() {
		assertEquals(60000, nDataService.getTimeOut());
	}

	@Test
	void getNutritionWebServiceUrl() {
		assertEquals("https://an-api-tridion.abbottnutrition.com/api/ProductBySku/",
				nDataService.getNutritionWebServiceUrl());
	}

	@Test
	void getEmptyNutritionFacts() {
		assertNull(nDataService.getNutritionFactsData(null));
	}

	@Test
	void getResourcePropertiesDefault() {
		Map<String, List<String>> resourceProps = new HashMap<>();

		List<String> value1 = new ArrayList<>();
		value1.add("description");
		resourceProps.put("abbott/components/content/product-description", value1);

		List<String> value2 = new ArrayList<>();
		value2.add("product_flavor");
		value2.add("case_of_product");
		value2.add("product_form");
		value2.add("case_x");
		value2.add("case_y");
		resourceProps.put("abbott/components/content/more-information", value2);

		List<String> value3 = new ArrayList<>();
		value3.add("nutritional-info");
		resourceProps.put("abbott/components/content/nutritionalinfo", value3);

		List<String> value4 = new ArrayList<>();
		value4.add("subscription_info");
		resourceProps.put("abbott/components/content/subscription-description", value4);

		assertEquals(resourceProps, nDataService.getResourceProperties());
	}

	@Test
	void getResourcePropertiesCustom() {
		NutritionDataServiceImpl service = new NutritionDataServiceImpl();
		Config config = mock(Config.class);
		String[] testArray = { "Test String without delimiter" };

		when(config.resourcepropertymap()).thenReturn(testArray);
		service.activate(config);

		Map<String, List<String>> resourceProps = new HashMap<>();

		assertEquals(resourceProps, service.getResourceProperties());
	}

	@Test
	void getNutritionFactsData() {
		NutritionDataServiceImpl service = new NutritionDataServiceImpl();
		NutritionalInfo[] nutritionalInfo = new NutritionalInfo[3];
		nutritionalInfo[0] = new NutritionalInfo();
		nutritionalInfo[1] = new NutritionalInfo();
		nutritionalInfo[2] = new NutritionalInfo();
		setNutritionalInfo(nutritionalInfo[0], "1", "Nutrient Data", "Calories", "100");
		setNutritionalInfo(nutritionalInfo[1], "2", "Vitamins", "Vitamin A, IU", "300");
		setNutritionalInfo(nutritionalInfo[2], "3", "Minerals", "Calcium, mg", "78");

		FootNote[] footnotes = new FootNote[0];

		ServingSizes[] servingSizes = new ServingSizes[1];
		servingSizes[0] = new ServingSizes();
		servingSizes[0].setServingSizeName("100 Cal (5 fl oz, prepared as directed)");
		servingSizes[0].setFootnotes(footnotes);
		servingSizes[0].setNutritionalInfo(nutritionalInfo);
		servingSizes[0].handleNutrintionaInfo(nutritionalInfo);

		String[] packages = new String[4];
		packages[0] = "Similac Pro-Advance Powder / 23.2 oz (658 g) SimplePac / 4 ct";
		packages[1] = "Similac Pro-Advance Powder / 30.8 oz (873 g) Can / 4 ct";
		packages[2] = "Similac Pro-Advance Powder / 34 oz (964 g) SimplePac / 6 ct";
		packages[3] = "Similac Pro-Advance Powder / 0.58 oz (16.4 g) Packet / 4 x 16 ct";

		String[] dietaryCategories = { "Contains Milk Ingredients|Contains Soy Ingredients" };

		Flavors[] flavors = new Flavors[1];
		flavors[0] = new Flavors();
		flavors[0].setACode("X547");
		flavors[0].setFlavorName("Unflavored");
		flavors[0].setIngredients("Nonfat Milk, Lactose, High Oleic Safflower Oil");
		flavors[0].setAllergenStatement("Contains milk and soy ingredients.");
		flavors[0].setPackages(packages);
		flavors[0].setDietaryCategories(dietaryCategories);
		flavors[0].setServingSizes(servingSizes);

		NutritionFacts nFacts = new NutritionFacts();
		nFacts.setAPIgeneratedAt("2020-03-08T09:50:51.2754072-05:00");
		nFacts.setPublishedAt("2019-09-24T11:47:22.167");
		nFacts.setProductName("Similac Pro-Advance&reg; 20");
		nFacts.setBrand("Similac&reg;");
		nFacts.setFlavors(flavors);

		assertEquals(nFacts, service.getNutritionFactsData(NUTRITIONAL_INFO_JSON));
	}

	@Test
	void testHasNutritionalFacts() {
		NutritionDataServiceImpl service = new NutritionDataServiceImpl();
		Boolean expected = true;
		assertEquals(expected, service.hasNutritionalFacts(NUTRITIONAL_INFO_JSON));
		expected = false;
		assertEquals(expected, service.hasNutritionalFacts(null));
	}

	private void setNutritionalInfo(NutritionalInfo nInfo, String number, String category, String name, String value) {
		nInfo.setLineNumber(number);
		nInfo.setNutritionCategory(category);
		nInfo.setNutritionName(name);
		nInfo.setNutritionValue(value);
		nInfo.setPercentDV(null);
		nInfo.setPercentRDI(null);
	}
}
