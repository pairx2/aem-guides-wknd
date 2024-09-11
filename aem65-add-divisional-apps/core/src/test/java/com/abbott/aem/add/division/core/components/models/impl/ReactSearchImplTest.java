package com.abbott.aem.add.division.core.components.models.impl;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;

import javax.annotation.Resource;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;

import com.abbott.aem.add.division.core.components.models.ReactSearch;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;


/**
 * The Class ProductGallery Impl.
 */

@ExtendWith(AemContextExtension.class)
class ReactSearchImplTest {
	
	private static final String PATH = "/content/reactsearch";
	private final AemContext ctx = new AemContext();
	private ReactSearch reactsearch;
	
	@Mock
	Resource res; 
	
	@Mock
	Iterable<Resource> resource;
	
	@BeforeEach
	public void setUp() throws Exception {

		ctx.addModelsForClasses(ReactSearchImpl.class);
		ctx.load().json("/com/abbott/aem/add/division/core/components/models/impl/ReactSearchImplTest.json", "/content");	

	}	
	
	@Test
	void testgetImagePath() {
		ctx.currentResource(PATH);
		reactsearch = ctx.request().adaptTo(ReactSearch.class);
		assertEquals("Test Title", reactsearch.getTitle());
	}
	
	@Test
	void testgetComponentType() {
		ctx.currentResource(PATH);
		reactsearch = ctx.request().adaptTo(ReactSearch.class);
		Assertions.assertNotNull(reactsearch);
	}
	
	@Test
	void testgetItems() {
		ctx.currentResource(PATH);
		reactsearch = ctx.request().adaptTo(ReactSearch.class);
		Assertions.assertNotNull(reactsearch);
		assertNotEquals(null, reactsearch.getItems());
	}

}

