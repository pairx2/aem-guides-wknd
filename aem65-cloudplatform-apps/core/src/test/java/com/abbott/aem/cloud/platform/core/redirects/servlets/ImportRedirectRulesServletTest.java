package com.abbott.aem.cloud.platform.core.redirects.servlets;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.lenient;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.request.RequestParameter;
import org.apache.sling.api.resource.ModifiableValueMap;
import org.apache.sling.api.resource.PersistenceException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.testing.mock.sling.ResourceResolverType;
import org.apache.sling.testing.mock.sling.servlet.MockSlingHttpServletResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import com.abbott.aem.cloud.platform.core.redirects.services.impl.ManageUrlRedirectServiceImpl;
import com.day.cq.commons.jcr.JcrConstants;

import io.wcm.testing.mock.aem.junit5.AemContext;
import lombok.NonNull;

@ExtendWith(MockitoExtension.class)
class ImportRedirectRulesServletTest {
	
	 public AemContext context = new AemContext(
	            ResourceResolverType.RESOURCERESOLVER_MOCK);

	@InjectMocks
	ImportRedirectRulesServlet servlet;
	
	@NonNull
	@Mock
	ManageUrlRedirectServiceImpl manageUrlRedirectService;

	@NonNull
	@Mock
	SlingHttpServletRequest request;

	MockSlingHttpServletResponse response;

	@Mock
	@NonNull
	ResourceResolver resourceResolver;

	@Mock
	@NonNull
	RequestParameter requestParams;
	
	@Mock
	@NonNull
	ModifiableValueMap properties;

	@Mock
	@NonNull
	Resource resource;
	
	@BeforeEach
	void setUp() throws PersistenceException {
		List<RequestParameter> requestParameterList = new ArrayList<>();
		response = context.response();
		requestParameterList.add(requestParams);
		manageUrlRedirectService = new ManageUrlRedirectServiceImpl();
		lenient().when(requestParams.isFormField()).thenReturn(false);		
		lenient().when(requestParams.getContentType()).thenReturn("binary/data");
		lenient().when(requestParams.getFileName()).thenReturn("redirects.redirectmap.csv");
		lenient().when(requestParams.getName()).thenReturn("file");
		lenient().when(requestParams.getSize()).thenReturn((long) 26);
		lenient().when(properties.put(Mockito.any(), Mockito.any())).thenReturn(null);
		lenient().when(request.getResourceResolver()).thenReturn(resourceResolver);
		lenient().when(resourceResolver.resolve(Mockito.anyString())).thenReturn(resource);
		lenient().when(resourceResolver.create(Mockito.any(Resource.class), Mockito.anyString(), Mockito.anyMap())).thenReturn(resource);
		lenient().when(request.getParameter("path")).thenReturn("test");
		lenient().when(resource.getChild(Mockito.anyString())).thenReturn(resource);
		lenient().when(resource.adaptTo(ModifiableValueMap.class)).thenReturn(properties);
		lenient().when(request.getResourceResolver().resolve(request.getParameter("path"))
				.getChild(JcrConstants.JCR_CONTENT).getPath()).thenReturn("test");
		lenient().when(request.getRequestParameterList()).thenReturn(requestParameterList);
	}
	
	

	@Test
	void testImportServlet1() throws IOException {
	    File initialFile = new File("src/test/resources/noerror.csv");
		InputStream inputStream = new FileInputStream(initialFile);		
		lenient().when(requestParams.getInputStream()).thenReturn(inputStream);
		servlet.doPost(request, response);
		assertNotNull(response);
	}
	
	@Test
	void testImportServlet2() throws IOException {
	    File initialFile = new File("src/test/resources/emptyfile.csv");
		InputStream inputStream = new FileInputStream(initialFile);
		lenient().when(requestParams.getInputStream()).thenReturn(inputStream);	
		servlet.doPost(request, response);
		assertNotNull(response);
	}
	
	@Test
	void testImportServlet3() throws IOException {
	    File initialFile = new File("src/test/resources/error1.csv");
		InputStream inputStream = new FileInputStream(initialFile);
		lenient().when(requestParams.getInputStream()).thenReturn(inputStream);	
		servlet.doPost(request, response);
		assertNotNull(response);
	}
	
	@Test
	void testImportServlet4() throws IOException {
	    File initialFile = new File("src/test/resources/error1.csv");
	    lenient().when(resourceResolver.create(Mockito.any(Resource.class), Mockito.anyString(), Mockito.anyMap())).thenThrow(PersistenceException.class);
		InputStream inputStream = new FileInputStream(initialFile);
		lenient().when(requestParams.getInputStream()).thenReturn(inputStream);	
		servlet.doPost(request, response);
		assertNotNull(response);
	}
	
	@Test
	void testImportServlet5() throws IOException {
	    File initialFile = new File("src/test/resources/error1.csv");
	    //doThrow(PersistenceException.class).when(resourceResolver).delete(Mockito.any(Resource.class));
		InputStream inputStream = new FileInputStream(initialFile);
		lenient().when(requestParams.getInputStream()).thenReturn(inputStream);	
		servlet.doPost(request, response);
		assertNotNull(response);
	}
	
	@Test
	void testImportServlet9() throws IOException {
	    File initialFile = new File("src/test/resources/Test.csv");
		InputStream inputStream = new FileInputStream(initialFile);		
		lenient().when(requestParams.getInputStream()).thenReturn(inputStream);
		servlet.doPost(request, response);
		assertNotNull(response);
	}
}