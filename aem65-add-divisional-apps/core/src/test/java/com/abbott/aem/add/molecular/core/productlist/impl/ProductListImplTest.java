package com.abbott.aem.add.molecular.core.productlist.impl;

import org.apache.sling.testing.mock.sling.ResourceResolverType;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import com.abbott.aem.add.division.core.components.models.impl.ImageItemImpl;
import com.abbott.aem.add.molecular.core.productlist.ProductList;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith(AemContextExtension.class)
class ProductListImplTest {
	
	private static final String PATH = "/content/productlist";
	private final AemContext ctx = new AemContext(ResourceResolverType.JCR_MOCK);
	private ProductList productlist;
	
	@BeforeEach
	public void setUp() throws Exception {
		
		ctx.addModelsForClasses(ImageItemImpl.class);
		ctx.load().json("/com/abbott/aem/add/molecular/core/productlist/impl/ProductListImplTest.json", "/content");
		productlist = ctx.currentResource(PATH).adaptTo(ProductList.class);
	}
	@Test
	void testproductlist()  {		
		Assertions.assertNotNull(productlist);
	}
	
	@Test
	void testgetAlt()  {
		String jsonresponse = "{\"noProducts\":\"noProducts\",\"backToTop\":\"backToTop\",\"showMore\":\"showMore\",\"numberOfResults\":\"numberOfResults\",\"defaultHeading\":\"defaultHeading\",\"products\":[]}";
		Assertions.assertNotNull(productlist.getProductListJsonString());
		Assertions.assertEquals(jsonresponse, productlist.getProductListJsonString());
	}	

}
