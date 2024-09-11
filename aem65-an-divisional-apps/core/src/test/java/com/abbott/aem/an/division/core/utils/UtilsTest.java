package com.abbott.aem.an.division.core.utils;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

import javax.jcr.AccessDeniedException;
import javax.jcr.RepositoryException;
import javax.jcr.UnsupportedRepositoryOperationException;

import org.apache.jackrabbit.api.JackrabbitSession;
import org.apache.jackrabbit.api.security.user.UserManager;
import org.apache.sling.api.resource.ResourceResolver;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import com.abbott.aem.an.division.core.models.dynamicproduct.Product;
import com.abbott.aem.an.division.core.services.PIMConfigurationService;

@SuppressWarnings("unlikely-arg-type")
class UtilsTest {

	@InjectMocks
	Utils utils = new Utils();

	@Mock
	Utils utils2;

	@Mock
	PIMConfigurationService pimConfigurationService;

	@Mock
	JackrabbitSession session;
	
	String JSONProductResponse;

	@BeforeEach
	public void setUp() {
		MockitoAnnotations.openMocks(this);
	}

	@Test
	void testGetProductFromPIM() throws IOException {
		String file = "src/test/resources/com/abbott/aem/an/division/core/models/dynamicproduct/productJSON.json";
		String productJSONResponse = readFileAsString(file);
		Utils mockUtil = Mockito.spy(Utils.class);
		Mockito.doReturn(productJSONResponse).when(mockUtil).callRestAPI(Mockito.any(), Mockito.any());
		when(pimConfigurationService.getApiUrl()).thenReturn("https://localhost/getproduct/pim");
		when(pimConfigurationService.getEnvironment()).thenReturn("dev");
		Product product = mockUtil.getProductFromPIM("product1", pimConfigurationService);
		assertNotNull(product);
	}
	
	@Test
	void testGetMultipleProductFromPIM() throws IOException {
		String file = "src/test/resources/com/abbott/aem/an/division/core/models/dynamicproduct/productJSON.json";
		String productJSONResponse = readFileAsString(file);
		Utils mockUtil = Mockito.spy(Utils.class);
		Mockito.doReturn(productJSONResponse).when(mockUtil).callRestAPI(Mockito.any(), Mockito.any());
		when(pimConfigurationService.getApiUrl()).thenReturn("https://localhost/getproduct/pim");
		when(pimConfigurationService.getEnvironment()).thenReturn("dev");
		List<Product> productList = mockUtil.getMultiProductFromPIM("product1", pimConfigurationService);
		assertTrue(productList.size() > 0);
	}

	@Test
	void testCallRestAPI() throws IOException {
		Utils mockUtil = Mockito.spy(Utils.class);
		when(pimConfigurationService.getApiUrl()).thenReturn("https://localhost/getproduct/pim");
		when(pimConfigurationService.getEnvironment()).thenReturn("dev");
		Mockito.doReturn("{'name' : 'Test Product'}").when(mockUtil).callRestAPI(Mockito.any(), Mockito.any());
		String response = mockUtil.callProductApi("productId", pimConfigurationService);
		assertEquals("{'name' : 'Test Product'}", response);
	}

	@Test
	void testVerifyGroup() throws AccessDeniedException, UnsupportedRepositoryOperationException, RepositoryException {
		ResourceResolver mockResourceResolver = mock(ResourceResolver.class);
		UserManager mockUserManager = mock(UserManager.class);
		when(mockResourceResolver.adaptTo(Mockito.any())).thenReturn(session);
		when(session.getUserManager()).thenReturn(mockUserManager);
		when(mockUserManager.getAuthorizable("1234")).thenReturn(null);
		boolean groupIdExists = utils.verifyGroup(mockResourceResolver, "1234");
		assertFalse(groupIdExists);
	}

	@Test
	void testLearnMore() {
		String result = utils.getLearnMore("page");
		assertEquals("null/page.html", result);
	}

	@Test
	void testLearnMore_NullProductTitle() {
		String result = utils.getLearnMore(null);
		assertNull(result);
	}

	@Test
	void testLearnMore_EmptyProductTitle() {
		String result = utils.getLearnMore("");
		assertNull(result);
	}

	@Test
	void testAuthorMode() {
		when(pimConfigurationService.getRunMode()).thenReturn("author");
		boolean isAuthorMode = utils.isAuthorMode(pimConfigurationService);
		assertTrue(isAuthorMode);
	}

	@Test
	void testAuthorMode_NoConfig() {
		pimConfigurationService = null;
		boolean isAuthorMode = utils.isAuthorMode(pimConfigurationService);
		assertFalse(isAuthorMode);
	}

	@Test
	void testAuthorMode_NullRunMode() {
		when(pimConfigurationService.getRunMode()).thenReturn(null);
		boolean isAuthorMode = utils.isAuthorMode(pimConfigurationService);
		assertFalse(isAuthorMode);
	}

	@Test
	void testAuthorMode_OtherRunMode() {
		when(pimConfigurationService.getRunMode()).thenReturn("others");
		boolean isAuthorMode = utils.isAuthorMode(pimConfigurationService);
		assertFalse(isAuthorMode);
	}

	@Test
	void testGetImagePathURL() {
		String path = utils.getImagePathUrl("image.jpg");
		assertEquals("nullimage.jpg", path);
	}

	@Test
	void testGetImagePathURL_NullImage() {
		String path = utils.getImagePathUrl(null);
		assertNull(path);
	}

	@Test
	void testGetImagePathURL_EmptyImage() {
		String path = utils.getImagePathUrl("");
		assertNull(path);
	}

	private String readFileAsString(String file) throws IOException {
		if(JSONProductResponse == null)
			JSONProductResponse = new String(Files.readAllBytes(Paths.get(file)));
		return JSONProductResponse;
	}

	
}
