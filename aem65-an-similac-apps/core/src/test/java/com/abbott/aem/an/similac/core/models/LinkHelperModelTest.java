package com.abbott.aem.an.similac.core.models;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.when;

import org.apache.sling.api.resource.ResourceResolver;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import com.abbott.aem.an.similac.core.services.StoreConfigService;
import com.day.cq.commons.Externalizer;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith(AemContextExtension.class)
@ExtendWith(MockitoExtension.class)
public class LinkHelperModelTest {

	private static final String SIMILAC_HOME_PATH = "/content/an/similac/global/en/home.html";

	private static final String EXTERNAL_LINK_HTML_EXTENSION = "https://abbottstore.com/infant-and-child/similac.html";

	private static final String DOMAIN_URL = "https://staging.similac.com";

	private static final String EXTERNAL_LINK = "https://www.google.com";
	
	private static final String QUERY_PARAMS_URL = "https://www.similac.com/where-to-buy-similac.html?sku=6912";
	
	private static final String URL_QUESTION = "https://www.similac.com/where-to-buy-similac.html?";
	
	private static final String DAM_URL = "/content/dam/an/similac/test.png";
	
	private static final String URL_EQUAL = "https://www.similac.com/where-to-buy-similac.html=";

	private final AemContext ctx = new AemContext();

	private LinkHelperModel linkHelperModel;

	@Mock
	private StoreConfigService storeService;

	@Mock
	private transient Externalizer externalizer;
 
	@BeforeEach
	void setUp() {
		ctx.addModelsForClasses(LinkHelperModelTest.class);
		ctx.registerService(StoreConfigService.class, storeService);
		ctx.registerService(Externalizer.class, externalizer);
		linkHelperModel = ctx.request().adaptTo(LinkHelperModel.class);
		Mockito.lenient().when(externalizer.externalLink(Mockito.any(ResourceResolver.class), Mockito.any(String.class),
				Mockito.any(String.class))).thenReturn(DOMAIN_URL);
	}

	@Test
	void testGetHrefGeneral() {
		linkHelperModel.setLinkHref("/content/an/similac/global/en/home");
		String expected = SIMILAC_HOME_PATH;
		String actual = linkHelperModel.getLinkHref();

		assertNotNull(actual);
		assertEquals(expected, actual);
	}

	@Test
	void testGetHrefBlank() {
		linkHelperModel.setLinkHref(" ");
		String expected = "";
		String actual = linkHelperModel.getLinkHref();
		assertNotNull(actual);
		assertEquals(expected, actual);

		linkHelperModel.setLinkHref(null);
		assertNotNull(actual);
		assertEquals(expected, actual);
	}

	@Test
	void testGetHrefExtension() {
		linkHelperModel.setLinkHref(SIMILAC_HOME_PATH);
		String expected = SIMILAC_HOME_PATH;
		String actual = linkHelperModel.getLinkHref();
		assertNotNull(actual);
		assertEquals(expected, actual);
	}

	@Test
	void testGetHrefSlash() {

		linkHelperModel.setLinkHref("/content/an/similac/global/en/home/");
		String expected = SIMILAC_HOME_PATH;
		String actual = linkHelperModel.getLinkHref();
		assertNotNull(actual);
		assertEquals(expected, actual);
	}

	@Test
	void testGetHrefURL() {
		linkHelperModel.setLinkHref(EXTERNAL_LINK);
		String actual = linkHelperModel.getLinkHref();
		assertNotNull(actual);
		assertEquals(EXTERNAL_LINK, actual);
	}

	@Test
	void testGetHrefDomainURL() {
		linkHelperModel.setLinkHref(EXTERNAL_LINK);
		String actual = linkHelperModel.getLinkHrefDomain();
		assertNotNull(actual);
		assertEquals(EXTERNAL_LINK, actual);
	}

	@Test
	void testGetHrefDomain() {
		linkHelperModel.setLinkHref("/content/an/similac/global/en/home/");
		String actual = linkHelperModel.getLinkHrefDomain();
		assertNotNull(actual);
	}

	@Test
	void testGetHrefDomainExtension() {
		linkHelperModel.setLinkHref(SIMILAC_HOME_PATH);
		String actual = linkHelperModel.getLinkHrefDomain();
		assertNotNull(actual);
	}

	@Test
	void testGetHrefDomainBlank() {
		linkHelperModel.setLinkHref(" ");
		String expected = "";
		String actual = linkHelperModel.getLinkHrefDomain();
		assertNotNull(actual);
		assertEquals(expected, actual);

		linkHelperModel.setLinkHref(null);
		assertNotNull(actual);
		assertEquals(expected, actual);
	}

	@Test
	void testGetHrefDomainGeneral() {
		linkHelperModel.setLinkHref("/content/an/similac/global/en/home");
		String actual = linkHelperModel.getLinkHrefDomain();
		assertNotNull(actual);
	}

	@Test
	void getLinkDomain() {
		when(storeService.getDomainName()).thenReturn(DOMAIN_URL);
		String actual = linkHelperModel.getLinkDomain();
		assertNotNull(actual);
		assertEquals(DOMAIN_URL, actual);
	}
  
	@Test
	void testGetHrefDomainHTMLExtension() {
		linkHelperModel.setLinkHref(EXTERNAL_LINK_HTML_EXTENSION);
		String actual = linkHelperModel.getLinkHrefDomain();
		assertNotNull(actual);
		assertEquals(EXTERNAL_LINK_HTML_EXTENSION, actual);
	}
 	
	@Test
	void testGetHrefQueryParams()
	{   
		linkHelperModel.setLinkHref(QUERY_PARAMS_URL);
		String actual = linkHelperModel.getLinkHref();
		assertNotNull(actual);
		assertEquals(QUERY_PARAMS_URL, actual);
	}
	
	@Test
	void testGetHrefDomainQueryParams()
	{   		
		linkHelperModel.setLinkHref(QUERY_PARAMS_URL);
		String actual = linkHelperModel.getLinkHrefDomain();
		assertNotNull(actual);
		assertEquals(QUERY_PARAMS_URL, actual);
	}
	
	@Test
	void testGetHrefDamPath() {
		
		linkHelperModel.setLinkHref(DAM_URL);
		String actual = linkHelperModel.getLinkHrefDomain();
		assertNotNull(actual);
		assertEquals(DOMAIN_URL, actual);
		
	}
	 
	@Test
	void testGetHrefQuestion()
	{   
		linkHelperModel.setLinkHref(URL_QUESTION);
		String actual = linkHelperModel.getLinkHref();
		assertNotNull(actual);
		assertEquals(URL_QUESTION, actual);
	}
	
	@Test
	void testGetHrefDomainQuestion()
	{   
		linkHelperModel.setLinkHref(URL_QUESTION);
		String actual = linkHelperModel.getLinkHrefDomain();
		assertNotNull(actual);
		assertEquals(URL_QUESTION, actual);
	}
	
	@Test
	void testGetHrefWithEqualTo()
	{   
		linkHelperModel.setLinkHref(URL_EQUAL);
		String actual = linkHelperModel.getLinkHref();
		assertNotNull(actual);
		assertEquals(URL_EQUAL, actual);
	}
	
	@Test
	void testGetHrefDomainWithEqualTo()
	{   
		linkHelperModel.setLinkHref(URL_EQUAL);
		String actual = linkHelperModel.getLinkHrefDomain();
		assertNotNull(actual);
		assertEquals(URL_EQUAL, actual);
	}
	 
}
