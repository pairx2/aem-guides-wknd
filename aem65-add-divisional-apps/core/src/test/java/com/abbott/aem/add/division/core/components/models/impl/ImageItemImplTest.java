package com.abbott.aem.add.division.core.components.models.impl;

import org.apache.sling.testing.mock.sling.ResourceResolverType;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import com.abbott.aem.add.division.core.components.models.ImageItem;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith(AemContextExtension.class)
class ImageItemImplTest {
	
	private static final String PATH = "/content/imageItem";
	private final AemContext ctx = new AemContext(ResourceResolverType.JCR_MOCK);
	private ImageItem imitFilled;
	
	
	@BeforeEach
	public void setUp() throws Exception {
		
		ctx.addModelsForClasses(ImageItemImpl.class);
		ctx.load().json("/com/abbott/aem/add/division/core/components/models/impl/ImageItemImplTest.json", "/content");
		imitFilled = ctx.currentResource(PATH).adaptTo(ImageItem.class);
		
	}
	@Test
	void testImageImpl()  {		
		Assertions.assertNotNull(imitFilled);
	}
	
	@Test
	void testgetAlt()  {
		Assertions.assertNotNull(imitFilled.getAlt());
		Assertions.assertEquals("image-alt-text", imitFilled.getAlt());
	}
	
	@Test
	void testgetFileReference() {
		Assertions.assertNotNull(imitFilled.getFileReference());
		Assertions.assertEquals("imagepath", imitFilled.getFileReference());

	}
	
	@Test
	void testgetLookupService() {
		Assertions.assertNotNull(imitFilled.getLookupService());
		Assertions.assertEquals("add/datasource/dropdown", imitFilled.getLookupService());

	}
	
	
}
