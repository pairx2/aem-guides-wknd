package com.abbott.aem.add.division.core.components.models.impl;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import com.abbott.aem.add.division.core.components.models.ProductGallery;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;


/**
 * The Class ProductGallery Impl.
 */

@ExtendWith(AemContextExtension.class)
class ProductGalleryImplTest {
	
	private static final String PATH = "/content/productGallery";
	private final AemContext ctx = new AemContext();
	private ProductGallery product;
	
	
	@BeforeEach
	public void setUp() throws Exception {

		ctx.addModelsForClasses(ProductGalleryImpl.class);
		ctx.load().json("/com/abbott/aem/add/division/core/components/models/impl/ProductGalleryImplTest.json", "/content");	

	}	
	
	@Test
	void testgetComponentType() {
		ctx.currentResource(PATH);
		product = ctx.request().adaptTo(ProductGallery.class);
		assertEquals("ProbeInfo", product.getComponentType());
	}
	
	@Test
	void testgetImagePath() {
		ctx.currentResource(PATH);
		product = ctx.request().adaptTo(ProductGallery.class);
		assertEquals("imagePath", product.getImagePath());
	}
	
	@Test
	void testgetProductLists() {
		ctx.currentResource(PATH);
		product = ctx.request().adaptTo(ProductGallery.class);
		assertNotEquals(null, product.getProductLists());
	}
	
	@Test
	void testgetImageLists() {
		ctx.currentResource(PATH);
		product = ctx.request().adaptTo(ProductGallery.class);
		assertNotEquals(null, product.getImageLists());
	}
	
	@Test
	void testgetID() {
		
		ctx.currentResource(PATH);
		product = ctx.request().adaptTo(ProductGallery.class);
		assertEquals("probeId", product.getId());
	}

	
}

