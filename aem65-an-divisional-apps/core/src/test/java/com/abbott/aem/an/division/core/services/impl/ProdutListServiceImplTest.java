package com.abbott.aem.an.division.core.services.impl;

import static org.mockito.Mockito.mockConstruction;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.when;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.jcr.Node;
import javax.jcr.PathNotFoundException;
import javax.jcr.RepositoryException;
import javax.jcr.Session;

import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockedConstruction;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import com.abbott.aem.an.division.api.jobs.EmailRunJobConfiguration;
import com.abbott.aem.an.division.core.services.PIMConfigurationService;
import com.abbott.aem.an.division.core.utils.Utils;
import com.adobe.cq.dam.cfm.ContentElement;
import com.adobe.cq.dam.cfm.ContentFragment;
import com.adobe.cq.dam.cfm.FragmentTemplate;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;

@SuppressWarnings("unlikely-arg-type")
class ProdutListServiceImplTest {

	@InjectMocks
	ProductListServiceImpl productListService;
	
	@Mock
	EmailRunJobConfiguration emailJobs;

	@Mock
	ResourceResolverFactory resourceResolverFactory;

	@Mock
	ResourceResolver resourceResolver;

	@Mock
	PageManager pageManager;

	@Mock
	Session session;

	@Mock
	Page page;
	
	@Mock
	Page page2;

	@Mock
	Resource pageResource;

	@Mock
	PIMConfigurationService pimConfigurationService;

	@Mock
	Node node;
	
	@Mock
	Node jcrNode;
	
	@Mock
	Resource nodeResource;
	
	@Mock
	Page newPDPPage;
	
	@Mock
	Resource cfParentResource, cfParentResource2, templateOrModelResource;
	
	@Mock
	ContentFragment contentFragment, newFragment;
	
	@Mock
	ContentElement contentElementTitle, contentElementTitle2, contentElementDesc;
	
	@Mock
	FragmentTemplate fragmentTemplate;

	String JSONProductResponse;

	/*
	 * @Before void setUp() throws Exception { MockitoAnnotations.initMocks(this);
	 * 
	 * }
	 */

	@BeforeEach
	void setup() {
		MockitoAnnotations.openMocks(this);
	}

	@Test
	void testGetProduct_validResponse() throws Exception {
		String file = "src/test/resources/com/abbott/aem/an/division/core/models/dynamicproduct/productServiceJSON.json";
		String productJSONResponse = readFileAsString(file);
		try (MockedConstruction<Utils> mockedUtils = mockConstruction(Utils.class, (mockObject, context) -> {
			when(mockObject.callRestAPI(Mockito.any(), Mockito.any())).thenReturn(productJSONResponse);
			when(mockObject.getLearnMore(Mockito.anyString())).thenReturn("learn more");
			when(mockObject.createValidPageName("Test Product")).thenReturn("page Name");
		})) {
			/* mock calls*/
			when(pimConfigurationService.getEnvironmentType()).thenReturn("dev");
			when(pimConfigurationService.getProductsRootPath()).thenReturn("rootpath");
			when(pimConfigurationService.getApiUrl()).thenReturn("https://localhost/getproduct/pim");
			when(pimConfigurationService.getPdpTemplate()).thenReturn("pdf template");
			when(resourceResolverFactory.getServiceResourceResolver(Mockito.any())).thenReturn(resourceResolver);
			when(resourceResolver.adaptTo(PageManager.class)).thenReturn(pageManager);
			when(resourceResolver.adaptTo(Session.class)).thenReturn(session);
			when(resourceResolver.getResource("rootpath")).thenReturn(pageResource);
			when(resourceResolver.resolve("null/test id")).thenReturn(cfParentResource);
			when(pageResource.adaptTo(Page.class)).thenReturn(page);
			when(page.listChildren()).thenReturn(getListOfPages());
			when(pageManager.create(Mockito.anyString(), Mockito.anyString(), Mockito.anyString(), 
					Mockito.anyString(), Mockito.anyBoolean())).thenReturn(newPDPPage);
			when(newPDPPage.getPath()).thenReturn("newPDPPagePath");
			when(resourceResolver.getResource("newPDPPagePath/jcr:content")).thenReturn(nodeResource);
			when(session.getNode(Mockito.anyString())).thenReturn(node);
			when(nodeResource.adaptTo(Node.class)).thenReturn(jcrNode);
			when(cfParentResource.adaptTo(ContentFragment.class)).thenReturn(contentFragment);
			when(contentFragment.getElement("pdpMetaTitle")).thenReturn(contentElementTitle);
			when(contentElementTitle.getContent()).thenReturn("content title");
			when(contentFragment.getElement("pdpMetaDescription")).thenReturn(contentElementDesc);
			when(contentElementDesc.getContent()).thenReturn("content desc");
			
			/* Service call*/
			productListService.getProducts(resourceResolverFactory, pimConfigurationService, emailJobs);
			
			/* Assertations */
			Mockito.verify(pimConfigurationService,times(1)).getEnvironmentType();
			Mockito.verify(pimConfigurationService,times(1)).getProductsRootPath();
			Mockito.verify(pimConfigurationService,times(1)).getApiUrl();
			Mockito.verify(pimConfigurationService,times(1)).getPdpTemplate();
			Mockito.verify(resourceResolverFactory,times(1)).getServiceResourceResolver(Mockito.any());
			Mockito.verify(resourceResolver,times(1)).adaptTo(PageManager.class);
			Mockito.verify(resourceResolver,times(1)).adaptTo(Session.class);
			Mockito.verify(resourceResolver,times(1)).getResource("rootpath");
			Mockito.verify(pageResource,times(1)).adaptTo(Page.class);
			Mockito.verify(page,times(21)).listChildren();
			Mockito.verify(pageManager,times(20)).create(Mockito.anyString(), Mockito.anyString(), Mockito.anyString(),Mockito.anyString(), Mockito.anyBoolean());
			Mockito.verify(newPDPPage,times(40)).getPath();
			Mockito.verify(resourceResolver,times(20)).getResource("newPDPPagePath/jcr:content");
			Mockito.verify(session,times(2)).getNode(Mockito.anyString());
			Mockito.verify(nodeResource,times(20)).adaptTo(Node.class);
		}
	}
	
	@Test
	void testGetProduct_validResponse_NullContentFragment() throws Exception {
		String file = "src/test/resources/com/abbott/aem/an/division/core/models/dynamicproduct/productServiceJSON.json";
		String productJSONResponse = readFileAsString(file);
		try (MockedConstruction<Utils> mockedUtils = mockConstruction(Utils.class, (mockObject, context) -> {
			when(mockObject.callRestAPI(Mockito.any(), Mockito.any())).thenReturn(productJSONResponse);
			when(mockObject.getLearnMore(Mockito.anyString())).thenReturn("learn more");
			when(mockObject.createValidPageName("Test Product")).thenReturn("page Name");
		})) {
			/* mock calls*/
			when(pimConfigurationService.getEnvironmentType()).thenReturn("dev");
			when(pimConfigurationService.getProductsRootPath()).thenReturn("rootpath");
			when(pimConfigurationService.getApiUrl()).thenReturn("https://localhost/getproduct/pim");
			when(pimConfigurationService.getPdpTemplate()).thenReturn("pdf template");
			when(pimConfigurationService.pdpSeoContentFragmentPath()).thenReturn("pdpseopath");
			when(pimConfigurationService.pdpSeoContentFragmentModel()).thenReturn("pdpseomodel");
			
			when(resourceResolverFactory.getServiceResourceResolver(Mockito.any())).thenReturn(resourceResolver);
			when(resourceResolver.adaptTo(PageManager.class)).thenReturn(pageManager);
			when(resourceResolver.adaptTo(Session.class)).thenReturn(session);
			when(resourceResolver.getResource("rootpath")).thenReturn(pageResource);
			when(resourceResolver.resolve("pdpseopath/test id")).thenReturn(cfParentResource);
			when(pageResource.adaptTo(Page.class)).thenReturn(page);
			when(page.listChildren()).thenReturn(getListOfPages());
			when(pageManager.create(Mockito.anyString(), Mockito.anyString(), Mockito.anyString(), 
					Mockito.anyString(), Mockito.anyBoolean())).thenReturn(newPDPPage);
			when(newPDPPage.getPath()).thenReturn("newPDPPagePath");
			when(resourceResolver.getResource("newPDPPagePath/jcr:content")).thenReturn(nodeResource);
			when(session.getNode(Mockito.anyString())).thenReturn(node);
			when(nodeResource.adaptTo(Node.class)).thenReturn(jcrNode);
			when(cfParentResource.adaptTo(ContentFragment.class)).thenReturn(null);
			when(resourceResolver.resolve("pdpseopath")).thenReturn(cfParentResource2);
			when(resourceResolver.getResource("pdpseomodel")).thenReturn(templateOrModelResource);
			when(templateOrModelResource.adaptTo(FragmentTemplate.class)).thenReturn(fragmentTemplate);
			when(fragmentTemplate.createFragment(cfParentResource2, "test id", "Test Product")).thenReturn(newFragment);
			when(newFragment.getElement("pdpMetaTitle")).thenReturn(contentElementTitle);
			when(contentElementTitle.getContent()).thenReturn("content title");
			when(newFragment.getElement("pdpMetaDescription")).thenReturn(contentElementDesc);
			when(contentElementDesc.getContent()).thenReturn("content desc");
			
			/* Service call*/
			productListService.getProducts(resourceResolverFactory, pimConfigurationService, emailJobs);
			
			/* Assertations */
			Mockito.verify(pimConfigurationService,times(1)).getEnvironmentType();
			Mockito.verify(pimConfigurationService,times(1)).getProductsRootPath();
			Mockito.verify(pimConfigurationService,times(1)).getApiUrl();
			Mockito.verify(pimConfigurationService,times(1)).getPdpTemplate();
			Mockito.verify(resourceResolverFactory,times(1)).getServiceResourceResolver(Mockito.any());
			Mockito.verify(resourceResolver,times(1)).adaptTo(PageManager.class);
			Mockito.verify(resourceResolver,times(1)).adaptTo(Session.class);
			Mockito.verify(resourceResolver,times(1)).getResource("rootpath");
			Mockito.verify(pageResource,times(1)).adaptTo(Page.class);
			Mockito.verify(page,times(21)).listChildren();
			Mockito.verify(pageManager,times(20)).create(Mockito.anyString(), Mockito.anyString(), Mockito.anyString(),Mockito.anyString(), Mockito.anyBoolean());
			Mockito.verify(newPDPPage,times(40)).getPath();
			Mockito.verify(resourceResolver,times(20)).getResource("newPDPPagePath/jcr:content");
			Mockito.verify(session,times(2)).getNode(Mockito.anyString());
			Mockito.verify(nodeResource,times(20)).adaptTo(Node.class);
		}
	}
	
	@Test
	void testGetProduct_errorResponse() throws LoginException, PathNotFoundException, RepositoryException {
		String productJSONResponse = "{\"status\":\"false\",\"errorCode\":\"2\"}";
		try (MockedConstruction<Utils> mockedUtils = mockConstruction(Utils.class, (mockObject, context) -> {
			when(mockObject.callRestAPI(Mockito.any(), Mockito.any())).thenReturn(productJSONResponse);
			when(mockObject.getLearnMore(Mockito.anyString())).thenReturn("learn more");
		})) {
			
			/* Mock calls */
			when(pimConfigurationService.getEnvironmentType()).thenReturn("dev");
			when(pimConfigurationService.getProductsRootPath()).thenReturn("rootpath");
			when(pimConfigurationService.getApiUrl()).thenReturn("https://localhost/getproduct/pim");
			
			when(resourceResolverFactory.getServiceResourceResolver(Mockito.any())).thenReturn(resourceResolver);
			
			when(resourceResolver.adaptTo(PageManager.class)).thenReturn(pageManager);
			when(resourceResolver.adaptTo(Session.class)).thenReturn(session);
			when(resourceResolver.getResource("rootpath")).thenReturn(pageResource);
			
			when(pageResource.adaptTo(Page.class)).thenReturn(page);
			
			when(page.listChildren()).thenReturn(getListOfPages());
			
			when(session.getNode(Mockito.anyString())).thenReturn(node);
			
			/* Service call */
			productListService.getProducts(resourceResolverFactory, pimConfigurationService, emailJobs);
			
			/* Assertations */
			Mockito.verify(pimConfigurationService,times(1)).getEnvironmentType();
			Mockito.verify(pimConfigurationService,times(1)).getProductsRootPath();
			Mockito.verify(pimConfigurationService,times(1)).getApiUrl();
			Mockito.verify(resourceResolverFactory,times(1)).getServiceResourceResolver(Mockito.any());
			Mockito.verify(resourceResolver,times(1)).adaptTo(PageManager.class);
			Mockito.verify(resourceResolver,times(1)).adaptTo(Session.class);
			Mockito.verify(resourceResolver,times(1)).getResource("rootpath");
			Mockito.verify(pageResource,times(1)).adaptTo(Page.class);
			Mockito.verify(page,times(1)).listChildren();
			Mockito.verify(session,times(2)).getNode(Mockito.anyString());
		}
	}
	
	@Test
	void testGetProduct_RuntimeException() throws LoginException {
		/* Mock calls */
		when(pimConfigurationService.getEnvironmentType()).thenReturn("dev");
		when(pimConfigurationService.getProductsRootPath()).thenReturn("rootpath");
		when(pimConfigurationService.getApiUrl()).thenReturn("https://localhost/getproduct/pim");
		
		when(resourceResolverFactory.getServiceResourceResolver(Mockito.any())).thenReturn(resourceResolver);
		
		when(resourceResolver.adaptTo(PageManager.class)).thenReturn(pageManager);
		when(resourceResolver.adaptTo(Session.class)).thenReturn(session);
		when(resourceResolver.getResource("rootpath")).thenThrow(new RuntimeException());
		
		/* Service call */
		productListService.getProducts(resourceResolverFactory, pimConfigurationService, emailJobs);
		
		/* Assertations */
		Mockito.verify(pimConfigurationService, times(1)).getEnvironmentType();
		Mockito.verify(pimConfigurationService, times(1)).getProductsRootPath();
		Mockito.verify(pimConfigurationService, times(1)).getApiUrl();
		Mockito.verify(resourceResolverFactory, times(1)).getServiceResourceResolver(Mockito.any());
		Mockito.verify(resourceResolver, times(1)).adaptTo(PageManager.class);
		Mockito.verify(resourceResolver, times(1)).adaptTo(Session.class);
		Mockito.verify(resourceResolver, times(2)).getResource("rootpath");
	}
	
	@Test
	void testGetProducts_RuntimeException() throws LoginException {
		when(pimConfigurationService.getApiUrl()).thenThrow(new RuntimeException());
		productListService.getProducts(resourceResolverFactory, pimConfigurationService, emailJobs);
	}

	private Iterator<Page> getListOfPages() {
		List<Page> pages = new ArrayList<Page>();
		pages.add(page);
		pages.add(page2);
		return pages.iterator();
	}

	private String readFileAsString(String file) throws IOException {
		if (JSONProductResponse == null)
			JSONProductResponse = new String(Files.readAllBytes(Paths.get(file)));
		return JSONProductResponse;
	}
}
