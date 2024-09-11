package com.abbott.aem.add.division.core.components.models;

import static org.junit.jupiter.api.Assertions.assertEquals;


import org.apache.sling.testing.mock.sling.ResourceResolverType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;




import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith(AemContextExtension.class)
class ProductMarketingTest  {

	private static final String PATH = "/content/productTable";
	private final AemContext ctx = new AemContext(ResourceResolverType.JCR_MOCK);
	
	ProductMarketing product;
	/**
	 * Sets the up.
	 *
	 * @throws Exception the exception
	 */
	@BeforeEach
	void setUp() throws Exception {

		ctx.addModelsForClasses(ProductMarketing.class);
		ctx.load().json("/com/abbott/aem/add/division/core/components/models/ProductMarketingTest.json", "/content");
		ctx.currentResource(PATH);
		product = ctx.currentResource(PATH).adaptTo(ProductMarketing.class);
	}
	
	@Test
	void testGetSource() {
		assertEquals("source", product.source);
	}


}
