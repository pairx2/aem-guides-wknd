package com.abbott.aem.an.similac.core.models;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.apache.sling.api.resource.Resource;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;

import com.day.cq.wcm.api.Page;
import com.google.common.collect.ImmutableMap;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith(AemContextExtension.class)
class ProductDescriptonModelTest {
	
	@InjectMocks
	private ProductDescriptionModel productDescriptionModel;
	
	@Mock
    private Page currentPage;
	
	String testData;
	
	@BeforeEach
	void setUp(AemContext context) {
		
	   
		 testData="<p>Similac Pro-Advance is the first infant formula with 2’-FL Human Milk Oligosaccharide* (HMO), designed to be closer than ever to breast milk.</p>\r\n" + 
				"<p>• Similac with 2'-FL HMO helps support baby’s developing immune system by closing multiple gaps in immune function<sup>†</sup> between formula-fed and breastfed infants</p>\r\n" + 
				"<p>• Unlike other formulas, Similac has 2’-FL HMO, a prebiotic that circulates throughout the body</p>\r\n" + 
				"<p>• All ingredients are carefully selected to meet our high standards and are NON-GMO<sup>‡</sup></p>\r\n" + 
				"<p>• From Birth – 12 months; complete nutrition for your baby’s first year</p>\r\n" + 
				"<p>• Features OptiGRO™, an exclusive blend of DHA, Lutein, and Vitamin E - important ingredients found in breast milk</p>\r\n" + 
				"<p>*Not from human milk</p>\r\n" + 
				"<p>†As measured in blood samples in a clinical study</p>\r\n" + 
				"<p>‡Ingredients not genetically engineered</p>";
	
	   context.create().page("/contetn/an/similac/product/test-product", "", ImmutableMap.<String, Object>builder()
               .put("description", testData)
               .build());
	   
	   	Resource  productResource = context.resourceResolver().getResource("/contetn/an/similac/product/test-product");
		Page productPage = productResource.adaptTo(Page.class);
		context.currentPage(productPage);
	    context.addModelsForClasses(ProductDescriptionModel.class);
		productDescriptionModel = context.request().adaptTo(ProductDescriptionModel.class);
       
	   	
	}

	@Test
	void testDescription() {
		String description = productDescriptionModel.getDescription();
		assertNotNull(description);
		assertEquals(testData,description);
	}

}
