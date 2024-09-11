package com.abbott.aem.an.abbottstore.utils;

import com.abbott.aem.an.abbottstore.constants.CommonConstants;
import com.abbott.aem.an.abbottstore.services.NutritionDataService;
import com.abbott.magento.exception.CommerceException;
import com.google.gson.JsonObject;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.sling.api.resource.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import javax.jcr.Node;
import javax.jcr.Property;
import javax.jcr.RepositoryException;
import java.text.DateFormat;
import java.text.ParseException;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.lenient;
import static org.mockito.Mockito.when;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
public class AbbottUtilsTest {
    private final AemContext context = new AemContext();
    String uri;

    @Mock
    ResourceResolverFactory resolverFactory;

    @Mock
    ResourceResolver resourceResolver;

    @Mock
    Resource resource;

    @Mock
    NutritionDataService nutritionDataService;

    @Mock
    Node node;

    @Mock
    Property property;

    JsonObject productJsonObj = new JsonObject();

    Map<String, Object> params = new HashMap<>();

    public static final String PUBLISH_DATE = "2022-01-10T13:09:38.087";
    String skuID = "648060";
    @BeforeEach
    void setUp() {
        productJsonObj.addProperty(CommonConstants.PUBLISHED_AT, PUBLISH_DATE);
        lenient().when(nutritionDataService.getNutritionWebServiceUrl()).thenReturn("https://an-api-tridion.abbottnutrition.com/api/ProductBySku/");
    }

    @Test
    public void testLinkChecker() {
        uri = "www.abbottstore.com";
        assertEquals("http://"+uri, AbbottUtils.linkChecker(uri));
    }

    @Test
    public void testLinkCheckerWithDamURL() {
        uri = "/content/dam/abbott/test";
        assertEquals(uri, AbbottUtils.linkChecker(uri));
    }

    @Test
    public void testLinkCheckerWithContentURL() {
        uri = "/content/abbott/test";
        assertEquals(uri+".html", AbbottUtils.linkChecker(uri));
    }

    @Test
    public void testGetHtmlLink() {
        uri = "/content/abbott/test.html";
        context.build().resource(uri);
        assertEquals(uri, AbbottUtils.getHtmlLink(context.resourceResolver(), uri));
    }

    @Test
    public void testGetResolvedPath() {
        List<String> baseUrls = new ArrayList<>();
        baseUrls.add("/content/en");
        assertEquals("/", AbbottUtils.getResolvedPath(context.resourceResolver(),"/content/en", baseUrls, "http://abbottstore.com"));
        assertEquals("http://abbottstore.com/content/en/products.html", AbbottUtils.getResolvedPath(context.resourceResolver(),"/content/en/products", baseUrls, "http://abbottstore.com"));
    }

    @Test
    public void testGetWriteResourceResolver() throws CommerceException {
        assertNull(AbbottUtils.getWriteResourceResolver(resolverFactory));
    }

    @Test
    public void testGetReadResourceResolver() throws CommerceException {
        assertNull(AbbottUtils.getReadResourceResolver(resolverFactory));
    }

    @Test
    public void testCloseResourceResolverLive() {

        when(resourceResolver.isLive()).thenReturn(true);
        when(resourceResolver.hasChanges()).thenReturn(true);
        AbbottUtils.closeResolver(resourceResolver);
    }

    @Test
    public void testCloseResourceResolver() {
        AbbottUtils.closeResolver(resourceResolver);
    }

    @Test
    public void testSetPageProperties() {
        when(resource.adaptTo(Node.class)).thenReturn(node); 
        AbbottUtils.setPageProperties(resourceResolver, resource, skuID, nutritionDataService, true);
    }
    @Test
    public void testSetPagePropertiesIOExc() {
    	when(nutritionDataService.getNutritionWebServiceUrl()).thenReturn("https://an-api-tridion.abbottnutrition.com/api/test/");
    	AbbottUtils.setPageProperties(resourceResolver, resource, skuID, nutritionDataService, true);
    }
    
    @Test
    public void testSetPagePropertiesRepoExc() throws RepositoryException{
    	
    	lenient().when(resource.adaptTo(Node.class)).thenReturn(node);
    	lenient().when(node.setProperty( CommonConstants.GENERATE_NUTRITION_FACTS, false )).thenThrow(RepositoryException.class);
       	AbbottUtils.setPageProperties(resourceResolver, resource, skuID, nutritionDataService, true);
    }
    

   @Test
    public void testCheckUpdates() {
        assertTrue(AbbottUtils.checkUpdates(productJsonObj, node));
    }

    @Test
    public void testCheckUpdatesWithNode() throws RepositoryException {
        when(node.hasProperty(CommonConstants.PUBLISHED_AT)).thenReturn(true);
        when(node.getProperty(CommonConstants.PUBLISHED_AT)).thenReturn(property);
        when(node.getProperty(CommonConstants.PUBLISHED_AT).getString()).thenReturn(PUBLISH_DATE);
        assertFalse(AbbottUtils.checkUpdates(productJsonObj, node));
    }

    @Test
    public void testCheckUpdatesWithNodeTime() throws RepositoryException {
        when(node.getProperty(CommonConstants.PUBLISHED_AT)).thenReturn(property);
        when(node.getProperty(CommonConstants.PUBLISHED_AT).getString()).thenReturn("2021-01-10T13:09:38.087");
        when(node.hasProperty(CommonConstants.PUBLISHED_AT)).thenReturn(true);
        assertTrue(AbbottUtils.checkUpdates(productJsonObj, node));
    }

    @Test
    public void testCheckUpdatesThrowRepoException() throws RepositoryException {
        lenient().when(node.hasProperty(CommonConstants.PUBLISHED_AT)).thenThrow(RepositoryException.class);
        assertFalse(AbbottUtils.checkUpdates(productJsonObj,node));
    }
    @Test
    public void testCheckUpdatesThrowParseException() throws RepositoryException {
     	 JsonObject wrongDateObj = new JsonObject();
    	 wrongDateObj.addProperty(CommonConstants.PUBLISHED_AT, "");
    	 when(node.getProperty(CommonConstants.PUBLISHED_AT)).thenReturn(property);
         when(node.getProperty(CommonConstants.PUBLISHED_AT).getString()).thenReturn("2021-01-10T13:09:38.087");
         when(node.hasProperty(CommonConstants.PUBLISHED_AT)).thenReturn(true);
         assertFalse(AbbottUtils.checkUpdates(wrongDateObj,node));
    }

    @Test
    public void testGetWriteResourceResolverException() throws LoginException, CommerceException {
        params.put(ResourceResolverFactory.SUBSERVICE, "writeUser");
        lenient().when(resolverFactory.getServiceResourceResolver(params)).thenThrow(LoginException.class);
        AbbottUtils.getWriteResourceResolver(resolverFactory);
    }

    @Test
    public void testGetReadResourceResolverException() throws LoginException, CommerceException {
        params.put(ResourceResolverFactory.SUBSERVICE, "resourceResolverUser");
        lenient().when(resolverFactory.getServiceResourceResolver(params)).thenThrow(LoginException.class);
        AbbottUtils.getReadResourceResolver(resolverFactory);
    }
}