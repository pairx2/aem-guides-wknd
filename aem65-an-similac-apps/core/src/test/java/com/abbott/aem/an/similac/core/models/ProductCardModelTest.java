package com.abbott.aem.an.similac.core.models;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.io.InputStream;

import javax.jcr.Binary;
import javax.jcr.Node;
import javax.jcr.PathNotFoundException;
import javax.jcr.Property;
import javax.jcr.RepositoryException;
import javax.jcr.Session;

import org.apache.commons.io.IOUtils;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import com.abbott.aem.an.similac.core.beans.ProductBean;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith(AemContextExtension.class)
public class ProductCardModelTest {

	private static final String PRODUCT_CONTENT_JSON = "/com/abbott/aem/an/similac/core/models/product-content.json";
	private static final String PRODUCT_CONTENT_PATH = "/content";
	private AemContext context;
	private PageManager pageManager;
	
	@BeforeEach
	public void setUp() throws PathNotFoundException, RepositoryException {

		context.load().json(PRODUCT_CONTENT_JSON, PRODUCT_CONTENT_PATH);
		context.addModelsForClasses(ProductCardModel.class);
		Session mockSession = mock(Session.class);
		pageManager = mock(PageManager.class);
		context.registerAdapter(ResourceResolver.class, Session.class, mockSession);
		

		// Mocks for static method SimilacResourceUtils.getBase64Image(..)
		Node node = mock(Node.class);
		Property prty = mock(Property.class);
		Binary binary = mock(Binary.class);
		InputStream ip = IOUtils.toInputStream("/content/product/baby-formula.png");

		when(mockSession.getNode(any())).thenReturn(node);
		when(node.getProperty("jcr:data")).thenReturn(prty);
		when(prty.getBinary()).thenReturn(binary);
		when(binary.getStream()).thenReturn(ip);

	}

	@Test
	public void testGetProductBean() {
		Resource productResource = context.resourceResolver().getResource("/content/product");
		Page productPage = productResource.adaptTo(Page.class);
		context.currentResource(productResource);
		when(pageManager.getContainingPage(any(String.class))).thenReturn(productPage);
		
		ProductCardModel productCardModel = context.request().adaptTo(ProductCardModel.class);
		ProductBean product = productCardModel.getProductBean();
		assertNotNull(product);
		validateProductBean(product);
		assertEquals("Similac Pro-Advance Infant Formula Powder", product.getName());
		assertEquals("16.4g packets", product.getSizeOrWeight());
		assertEquals(
				"/content/dam/an/similac/product/baby-formula.png/jcr:content/renditions/cq5dam.thumbnail.48.48.png",
				product.getImage());
	}
	
	@Test
	public void testProductMissingDetails() {
		Resource productResource = context.resourceResolver().getResource("/content/productMissingDetails");
		Page productPage = productResource.adaptTo(Page.class);
		context.currentResource(productResource);
		when(pageManager.getContainingPage(any(String.class))).thenReturn(productPage);
		
		ProductCardModel productCardModel = context.request().adaptTo(ProductCardModel.class);
		ProductBean product = productCardModel.getProductBean();
		assertNotNull(product);
	}

	@Test
	public void testEmptyContent() {
		Resource productResource = context.resourceResolver().getResource("/content/emptyContent");
		Page productPage = productResource.adaptTo(Page.class);
		context.currentResource(productResource);
		when(pageManager.getContainingPage(any(String.class))).thenReturn(productPage);
		
		ProductCardModel productCardModel = context.request().adaptTo(ProductCardModel.class);
		ProductBean product = productCardModel.getProductBean();
		assertNull(product);
	}
	
	private void validateProductBean(ProductBean product) {
		assertNotNull(product);
		assertNotNull(product.getName());
		assertNotNull(product.getPrice());
		assertNotNull(product.getSpecialPrice());
		assertNotNull(product.getSizeOrWeight());
		assertNotNull(product.getSku());
		assertNotNull(product.getImage());
		assertNotNull(product.getDesktopImage());
		assertNotNull(product.getTabletImage());
		assertNotNull(product.getMobileImage());
		assertNotNull(product.getLink());
	}
}
