package com.abbott.aem.an.similac.core.models;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.io.InputStream;
import java.util.List;

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

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith(AemContextExtension.class)
public class ProductComparisionModelTest {

	private static final String PRODUCT_CONTENT_JSON = "/com/abbott/aem/an/similac/core/models/product-comparision.json";

	private static final String CONTENT_PATH = "/content";

	private ProductComparisionModel productComparisionModel;

	private AemContext context;

	private Resource pageResource;

	private Page page;

	@BeforeEach
	void setUp() throws PathNotFoundException, RepositoryException {
		context.load().json(PRODUCT_CONTENT_JSON, CONTENT_PATH);
		pageResource = context.resourceResolver().getResource("/content/products");
		page = pageResource.adaptTo(Page.class);
		context.currentPage(page);
		context.addModelsForClasses(ProductComparisionModel.class);
		createMockForStaticMethod();
	}

	@Test
	final void testGetProductCardList() {
		productComparisionModel = context.request().adaptTo(ProductComparisionModel.class);
		List<ProductBean> productList = productComparisionModel.getProductCardList();
		assertNotNull(productList);
		assertEquals(4, productList.size());
	}

	@Test
	final void testWithOutImageSource() {
		pageResource = context.resourceResolver().getResource("/content/withOutSourceImage");
		page = pageResource.adaptTo(Page.class);
		context.currentPage(page);
		productComparisionModel = context.request().adaptTo(ProductComparisionModel.class);
		List<ProductBean> productList = productComparisionModel.getProductCardList();
		assertNotNull(productList);
		assertEquals(4, productList.size());
	}
	
	@Test
	final void testGetProductCardListWhenResourceNull() {
		pageResource = context.resourceResolver().getResource("/content/withNoProducts");
		page = pageResource.adaptTo(Page.class);
		context.currentPage(page);
		productComparisionModel = context.request().adaptTo(ProductComparisionModel.class);
		List<ProductBean> productList = productComparisionModel.getProductCardList();
		assertNotNull(productList);
		assertEquals(0, productList.size());
	}
	
	private void createMockForStaticMethod() throws PathNotFoundException, RepositoryException {

		// Mocks for static method SimilacResourceUtils.getBase64Image(..)
		Session mockSession = mock(Session.class);
		context.registerAdapter(ResourceResolver.class, Session.class, mockSession);
		Node node = mock(Node.class);
		Property prty = mock(Property.class);
		Binary binary = mock(Binary.class);
		InputStream ip = IOUtils.toInputStream("/content/product/baby-formula.png");

		when(mockSession.getNode(any())).thenReturn(node);
		when(node.getProperty("jcr:data")).thenReturn(prty);
		when(prty.getBinary()).thenReturn(binary);
		when(binary.getStream()).thenReturn(ip);
	}

}
