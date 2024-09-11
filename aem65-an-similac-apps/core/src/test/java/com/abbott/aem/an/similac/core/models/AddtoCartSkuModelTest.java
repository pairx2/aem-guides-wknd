package com.abbott.aem.an.similac.core.models;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import javax.jcr.PathNotFoundException;
import javax.jcr.RepositoryException;
import javax.jcr.Session;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith(AemContextExtension.class)
public class AddtoCartSkuModelTest {

	private static final String PRODUCT_CONTENT_JSON = "/com/abbott/aem/an/similac/core/models/product-sku-content.json";
	private static final String PRODUCT_CONTENT_PATH = "/content";
	private AemContext context;
	private PageManager pageManager;

	@BeforeEach
	public void setUp() throws PathNotFoundException, RepositoryException {
		context.load().json(PRODUCT_CONTENT_JSON, PRODUCT_CONTENT_PATH);
		context.addModelsForClasses(AddtoCartSkuModel.class);
		Session mockSession = mock(Session.class);
		pageManager = mock(PageManager.class);
		context.registerAdapter(ResourceResolver.class, Session.class, mockSession);
	}

	@Test
	public void testGetSku() {
		Resource productResource = context.resourceResolver().getResource("/content/product");
		Page productPage = productResource.adaptTo(Page.class);
		context.currentResource(productResource);
		when(pageManager.getContainingPage(any(String.class))).thenReturn(productPage);
		AddtoCartSkuModel addtoCartSkuModel = context.request().adaptTo(AddtoCartSkuModel.class);
		String sku = addtoCartSkuModel.getSku();
		assertNotNull(sku);
		assertEquals("12345", sku);
	}
}
