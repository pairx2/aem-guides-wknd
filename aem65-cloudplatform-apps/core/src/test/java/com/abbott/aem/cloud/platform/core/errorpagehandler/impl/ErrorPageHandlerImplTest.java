package com.abbott.aem.cloud.platform.core.errorpagehandler.impl;

import com.abbott.aem.cloud.platform.core.util.ResourceDataUtil;
import com.abbott.aem.cloud.platform.core.wcm.ComponentHelper;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.sling.api.SlingConstants;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.request.RequestPathInfo;
import org.apache.sling.api.request.RequestProgressTracker;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.commons.auth.Authenticator;
import org.apache.sling.testing.mock.sling.servlet.MockRequestDispatcherFactory;
import org.apache.sling.testing.mock.sling.servlet.MockRequestPathInfo;
import org.apache.sling.testing.mock.sling.servlet.MockSlingHttpServletRequest;
import org.apache.sling.testing.mock.sling.servlet.MockSlingHttpServletResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockedStatic;
import org.mockito.junit.jupiter.MockitoExtension;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import java.io.IOException;
import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.Map;

import static junit.framework.Assert.assertEquals;
import static junit.framework.Assert.assertFalse;
import static junit.framework.Assert.assertNull;
import static junit.framework.Assert.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.mockStatic;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
class ErrorPageHandlerImplTest {

    @InjectMocks
    private ErrorPageHandlerImpl errorPageHandler;

    private final AemContext context = new AemContext();

    @Mock
    private Authenticator authenticator;

    @Mock
    private ResourceResolverFactory resourceResolverFactory;

    @Mock
    private ComponentHelper componentHelper;

    @Mock
    private ResourceResolver resourceResolver;

    Map<String, Object> keyValue = new HashMap<>();

    @BeforeEach
    void setUp() {
        keyValue.put("paths", new String []{"", "us:", "us:/ca", "/us:/en", "/us:en/errors", "us:."});
        keyValue.put("notfound.exclusionpathpatterns", new String []{"/us/en/restricted"});
        keyValue.put("errorimages.path", "");
        keyValue.put("errorimages.enabled", true);

        context.registerService(ResourceResolverFactory.class, resourceResolverFactory);
        context.registerService(ComponentHelper.class, componentHelper);
        context.registerService(Authenticator.class, authenticator);
        context.registerInjectActivateService(errorPageHandler, keyValue);

    }

    @Test
    void testFindErrorPage_whenSystemErrorPath() {
        context.registerInjectActivateService(errorPageHandler, keyValue);
        // Test when the handler is enabled.
        SlingHttpServletRequest request = mock(SlingHttpServletRequest.class);
        Resource errorResource = mock(Resource.class);
        ValueMap valueMap = mock(ValueMap.class);

        when(errorResource.getPath()).thenReturn("/us/en/errors");
        when(errorResource.getResourceResolver()).thenReturn(resourceResolver);
        when(errorResource.getValueMap()).thenReturn(valueMap);
        when(errorResource.getName()).thenReturn("en");
        when(errorResource.getChild("jcr:content")).thenReturn(errorResource);
        when(valueMap.get("errorPages", String.class)).thenReturn("/us/en/errors");
        setInternalState("systemErrorPagePath", "/content/abbott/system");

        String errorPage = errorPageHandler.findErrorPage(request, errorResource);
        assertEquals("/content/abbott/system.html", errorPage);

    }

    @Test
    void testFindErrorPage_whenAggregateErrorPath() {
        context.registerInjectActivateService(errorPageHandler, keyValue);
        // Test when the handler is enabled.
        SlingHttpServletRequest request = mock(SlingHttpServletRequest.class);
        Resource errorResource = mock(Resource.class);
        ValueMap valueMap = mock(ValueMap.class);

        when(errorResource.getPath()).thenReturn("");
        when(errorResource.getResourceResolver()).thenReturn(resourceResolver);
        when(errorResource.getValueMap()).thenReturn(valueMap);
        when(errorResource.getName()).thenReturn("en");
        when(errorResource.getChild("jcr:content")).thenReturn(errorResource);
        when(valueMap.get("errorPages", String.class)).thenReturn("/us/en/errors");

        String errorPage = errorPageHandler.findErrorPage(request, errorResource);
        assertNull(errorPage);
    }

    @Test
    void testFindErrorPage_whenImageWithSelector() {
        keyValue.put("errorimages.path", ".img.png");
        context.registerInjectActivateService(errorPageHandler, keyValue);
        // Test when the handler is enabled.
        SlingHttpServletRequest request = mock(SlingHttpServletRequest.class);
        RequestPathInfo pathInfo = mock(RequestPathInfo.class);
        Resource errorResource = mock(Resource.class);
        ValueMap valueMap = mock(ValueMap.class);

        when(errorResource.getPath()).thenReturn("/us/en/errors");
        when(errorResource.getResourceResolver()).thenReturn(resourceResolver);
        when(resourceResolver.resolve("/us/en/errors")).thenReturn(errorResource);
        when(errorResource.getValueMap()).thenReturn(valueMap);
        when(valueMap.get("errorPages", String.class)).thenReturn(null);
        when(request.getRequestPathInfo()).thenReturn(pathInfo);
        when(pathInfo.getExtension()).thenReturn("png");

        String errorPage = errorPageHandler.findErrorPage(request, errorResource);
        assertEquals("/us/en/errors.img.png", errorPage);
    }

    @Test
    void testFindErrorPage_whenImageWithPath() {
        keyValue.put("errorimages.path", "img.png");
        context.registerInjectActivateService(errorPageHandler, keyValue);
        // Test when the handler is enabled.
        SlingHttpServletRequest request = mock(SlingHttpServletRequest.class);
        RequestPathInfo pathInfo = mock(RequestPathInfo.class);
        Resource errorResource = mock(Resource.class);
        ValueMap valueMap = mock(ValueMap.class);

        when(errorResource.getPath()).thenReturn("/us/en/errors");
        when(errorResource.getResourceResolver()).thenReturn(resourceResolver);
        when(resourceResolver.resolve("/us/en/errors")).thenReturn(errorResource);
        when(errorResource.getValueMap()).thenReturn(valueMap);
        when(valueMap.get("errorPages", String.class)).thenReturn(null);
        when(request.getRequestPathInfo()).thenReturn(pathInfo);
        when(pathInfo.getExtension()).thenReturn("png");

        String errorPage = errorPageHandler.findErrorPage(request, errorResource);
        assertEquals("/us/en/errors/img.png", errorPage);
    }

    @Test
    void testFindErrorPage_whenAbsoluteImagePath() {
        keyValue.put("errorimages.path", "/us/en/errors");
        context.registerInjectActivateService(errorPageHandler, keyValue);
        // Test when the handler is enabled.
        SlingHttpServletRequest request = mock(SlingHttpServletRequest.class);
        RequestPathInfo pathInfo = mock(RequestPathInfo.class);
        Resource errorResource = mock(Resource.class);
        ValueMap valueMap = mock(ValueMap.class);

        when(errorResource.getPath()).thenReturn("/us/en/errors");
        when(errorResource.getResourceResolver()).thenReturn(resourceResolver);
        when(resourceResolver.resolve( "/us/en/errors")).thenReturn(errorResource);
        when(errorResource.getValueMap()).thenReturn(valueMap);
        when(valueMap.get("errorPages", String.class)).thenReturn(null);
        when(request.getRequestPathInfo()).thenReturn(pathInfo);
        when(pathInfo.getExtension()).thenReturn("png");

        String errorPage = errorPageHandler.findErrorPage(request, errorResource);
        assertEquals("/us/en/errors", errorPage);
    }
    @Test
    void testFindErrorPage_whenPathIsDifferent() {
        keyValue.put("errorimages.path", "/us/en/errors");
        context.registerInjectActivateService(errorPageHandler, keyValue);
        // Test when the handler is enabled.
        SlingHttpServletRequest request = mock(SlingHttpServletRequest.class);
        RequestPathInfo pathInfo = mock(RequestPathInfo.class);
        Resource errorResource = mock(Resource.class);
        ValueMap valueMap = mock(ValueMap.class);

        when(errorResource.getPath()).thenReturn("/us/en/errors/jcr:content");
        when(resourceResolver.map(request, "/us/en/errors/")).thenReturn("map");

        when(resourceResolver.resolve(request, "map")).thenReturn(errorResource);
        when(errorResource.getResourceType()).thenReturn("sling:nonexisting", "cq:Page");
        when(errorResource.getParent()).thenReturn(errorResource);

        when(errorResource.getResourceResolver()).thenReturn(resourceResolver);
        when(errorResource.getValueMap()).thenReturn(valueMap);
        when(valueMap.get("errorPages", String.class)).thenReturn("/us/errors");
        when(request.getRequestPathInfo()).thenReturn(pathInfo);
        when(pathInfo.getExtension()).thenReturn("png");

        String errorPage = errorPageHandler.findErrorPage(request, errorResource);
        assertEquals("/us/en/errors", errorPage);
    }

    @Test
    void testFindErrorPage_whenFirstAncestorErrorPath() {
        keyValue.put("errorimages.path", "/us/en/errors");
        context.registerInjectActivateService(errorPageHandler, keyValue);
        // Test when the handler is enabled.
        SlingHttpServletRequest request = mock(SlingHttpServletRequest.class);
        RequestPathInfo pathInfo = mock(RequestPathInfo.class);
        Resource errorResource = mock(Resource.class);
        ValueMap valueMap = mock(ValueMap.class);

        when(errorResource.getPath()).thenReturn("/us/en/errors/");

        when(resourceResolver.getResource("/us/en")).thenReturn(errorResource);
        when(errorResource.getResourceType()).thenReturn("sling:nonexisting", "cq:Page");

        when(errorResource.getResourceResolver()).thenReturn(resourceResolver);
        when(errorResource.getValueMap()).thenReturn(valueMap);
        when(valueMap.get("errorPages", String.class)).thenReturn("/us/errors");
        when(request.getRequestPathInfo()).thenReturn(pathInfo);
        when(pathInfo.getExtension()).thenReturn("png");

        String errorPage = errorPageHandler.findErrorPage(request, errorResource);
        assertEquals("/us/en/errors", errorPage);
    }


    @Test
    void testFindErrorPage_whenLastAncestorErrorPath() {
        keyValue.put("errorimages.path", "/us/en/errors");
        context.registerInjectActivateService(errorPageHandler, keyValue);
        // Test when the handler is enabled.
        SlingHttpServletRequest request = mock(SlingHttpServletRequest.class);
        RequestPathInfo pathInfo = mock(RequestPathInfo.class);
        Resource errorResource = mock(Resource.class);
        ValueMap valueMap = mock(ValueMap.class);

        when(errorResource.getPath()).thenReturn("/us/en/errors/");

        when(resourceResolver.resolve(request, "/us/en")).thenReturn(errorResource);
        when(errorResource.getResourceType()).thenReturn("sling:nonexisting", "cq:Page");

        when(errorResource.getResourceResolver()).thenReturn(resourceResolver);
        when(errorResource.getValueMap()).thenReturn(valueMap);
        when(valueMap.get("errorPages", String.class)).thenReturn("/us/errors");
        when(request.getRequestPathInfo()).thenReturn(pathInfo);
        when(pathInfo.getExtension()).thenReturn("png");

        String errorPage = errorPageHandler.findErrorPage(request, errorResource);
        assertEquals("/us/en/errors", errorPage);
    }

    @Test
    void testFindErrorPage_whenNoErrorPath() {
        keyValue.put("errorimages.path", "/us/en/errors");
        context.registerInjectActivateService(errorPageHandler, keyValue);
        // Test when the handler is enabled.
        SlingHttpServletRequest request = mock(SlingHttpServletRequest.class);
        RequestPathInfo pathInfo = mock(RequestPathInfo.class);
        Resource errorResource = mock(Resource.class);

        when(errorResource.getPath()).thenReturn("/us/en/errors/");

        when(resourceResolver.resolve(any(SlingHttpServletRequest.class), anyString())).thenReturn(errorResource);
        when(errorResource.getResourceType()).thenReturn("sling:nonexisting");

        when(errorResource.getResourceResolver()).thenReturn(resourceResolver);
        when(request.getRequestPathInfo()).thenReturn(pathInfo);
        when(pathInfo.getExtension()).thenReturn("png");

        String errorPage = errorPageHandler.findErrorPage(request, errorResource);
        assertEquals("/us/en/errors", errorPage);
    }

    @Test
    void testGetErrorPagesPath() {
        // Test the getErrorPagesPath method
        Map<String, String> errorPagesMap = new HashMap<>();
        errorPagesMap.put("/content/site/en", "/content/site/en/error");
        errorPagesMap.put("/content/site/de", "/content/site/de/error");

        String rootPath = "/content/site/en";
        String result = errorPageHandler.getErrorPagesPath(rootPath, errorPagesMap);
        assertEquals("/content/site/en/error", result);

        rootPath = "/content/site/fr";
        result = errorPageHandler.getErrorPagesPath(rootPath, errorPagesMap);
        assertNull(result); // Expecting null as the rootPath doesn't exist in the map

        rootPath = null; // Testing with a null rootPath
        result = errorPageHandler.getErrorPagesPath(rootPath, errorPagesMap);
        assertNull(result); // Expecting null for a null rootPath
    }

    @Test
    void testDoHandle404_whenRedirectToLogin(){
        MockSlingHttpServletRequest request = context.request();
        MockSlingHttpServletResponse response = context.response();
        Resource resource = mock(Resource.class);

        request.setResource(resource);
        request.setPathInfo("/us/en/restricted");
        request.setAttribute(SlingConstants.ERROR_STATUS, 404);
        request.setHeader("User-Agent", "Mozilla");

        boolean actual = errorPageHandler.doHandle404(request, response);
        assertFalse(actual);
    }

    @Test
    void testDoHandle404_whenPathMatchedForRedirectToLogin(){
        keyValue.put("notfound.behavior", "redirect-to-login");
        context.registerInjectActivateService(errorPageHandler, keyValue);

        MockSlingHttpServletRequest request = context.request();
        MockSlingHttpServletResponse response = context.response();
        Resource resource = mock(Resource.class);

        request.setResource(resource);
        request.setPathInfo("/us/en/restricted");
        request.setAttribute(SlingConstants.ERROR_STATUS, 404);
        request.setHeader("User-Agent", "Mozilla");

        boolean actual = errorPageHandler.doHandle404(request, response);
        assertTrue(actual);
    }

    @Test
    void testDoHandle404_whenPathNotMatchedForRedirectToLogin(){
        keyValue.put("notfound.behavior", "redirect-to-login");
        context.registerInjectActivateService(errorPageHandler, keyValue);

        MockSlingHttpServletRequest request = context.request();
        MockSlingHttpServletResponse response = context.response();
        Resource resource = mock(Resource.class);

        request.setResource(resource);
        request.setPathInfo("/us/en/");
        request.setAttribute(SlingConstants.ERROR_STATUS, 404);
        request.setHeader("User-Agent", "Mozilla");

        boolean actual = errorPageHandler.doHandle404(request, response);
        assertFalse(actual);
    }

    @Test
    void testDoHandle404_whenNonAuthenticated(){
        keyValue.put("notfound.behavior", "redirect-to-login");
        context.registerInjectActivateService(errorPageHandler, keyValue);
        setInternalState("authenticator", null);

        MockSlingHttpServletRequest request = context.request();
        MockSlingHttpServletResponse response = context.response();
        Resource resource = mock(Resource.class);

        request.setResource(resource);
        request.setPathInfo("/us/en/");
        request.setAttribute(SlingConstants.ERROR_STATUS, 404);
        request.setHeader("User-Agent", "Mozilla");

        boolean actual = errorPageHandler.doHandle404(request, response);
        assertTrue(actual);
    }

    @Test
    void testDoHandle404_whenDefaultTo404(){
        MockSlingHttpServletRequest request = context.request();
        MockSlingHttpServletResponse response = context.response();
        Resource resource = mock(Resource.class);

        request.setResource(resource);
        request.setPathInfo("/us/en/");
        request.setAttribute(SlingConstants.ERROR_STATUS, 404);
        request.setHeader("User-Agent", "Mozilla");

        boolean actual = errorPageHandler.doHandle404(request, response);
        assertTrue(actual);
    }

    @Test
    void testGetException_whenRootCauseIsServletException(){
        Throwable throwable = new ServletException("SE", new ServletException("Servlet Root cause"));

        MockSlingHttpServletRequest request = context.request();
        request.setAttribute(SlingConstants.ERROR_EXCEPTION, throwable);

        String actual = errorPageHandler.getException(request);
        assertEquals("", actual);
    }

    @Test
    void testGetException_whenRootCauseIsIOException(){
        Throwable throwable = new ServletException("SE", new IOException("Servlet Root cause"));

        MockSlingHttpServletRequest request = context.request();
        request.setAttribute(SlingConstants.ERROR_EXCEPTION, throwable);

        String actual = errorPageHandler.getException(request);
        assertEquals("", actual);
    }

    @Test
    void testGetRequestProgress(){
        SlingHttpServletRequest request = mock(SlingHttpServletRequest.class);
        RequestProgressTracker tracker = mock(RequestProgressTracker.class);
        when(request.getRequestProgressTracker()).thenReturn(tracker);

        String actual = errorPageHandler.getRequestProgress(request);
        assertEquals("", actual);
    }

    @Test
    void testResetRequestAndResponse(){
        MockSlingHttpServletRequest request = context.request();
        MockSlingHttpServletResponse response = context.response();

        errorPageHandler.resetRequestAndResponse(request, response, 400);
        assertEquals(400, response.getStatus());
    }

    @Test
    void testIncludeUsingGET(){
        MockedStatic<ResourceDataUtil> mockedStatic = mockStatic(ResourceDataUtil.class);
        MockSlingHttpServletRequest request = context.request();
        MockSlingHttpServletResponse response = context.response();
        request.setAuthType("auth");
        request.setRemoteUser("RU");

        when(ResourceDataUtil.getIncludeAsString(anyString(), any(), any())).thenReturn("GET-RESPONSE");
        errorPageHandler.includeUsingGET(request, response, "/us/en");

        assertEquals("GET-RESPONSE", response.getOutputAsString());
        mockedStatic.close();
    }

    @Test
    void testIncludeUsingGET_whenIOException() throws IOException {
        MockedStatic<ResourceDataUtil> mockedStatic = mockStatic(ResourceDataUtil.class);
        MockSlingHttpServletRequest request = context.request();
        SlingHttpServletResponse response = mock(SlingHttpServletResponse.class);

        request.setAuthType("auth");
        request.setRemoteUser("RU");

        when(ResourceDataUtil.getIncludeAsString(anyString(), any(), any())).thenReturn("GET-RESPONSE");
        when(response.getWriter()).thenThrow(new IOException("IO Exception"));

        errorPageHandler.includeUsingGET(request, response, "/us/en");
        verify(response, times(1)).getWriter();
        mockedStatic.close();
    }

    @Test
    void testIncludeUsingGET_whenImageRequest() throws ServletException, IOException {
        keyValue.put("errorimages.path", ".img.png");
        context.registerInjectActivateService(errorPageHandler, keyValue);

        MockSlingHttpServletRequest request = context.request();
        MockSlingHttpServletResponse response = context.response();
        MockRequestPathInfo requestPathInfo = context.requestPathInfo();

        RequestDispatcher requestDispatcher = mock(RequestDispatcher.class);
        MockRequestDispatcherFactory dispatcherFactory = mock(MockRequestDispatcherFactory.class);
        when(dispatcherFactory.getRequestDispatcher("/us/en", null)).thenReturn(requestDispatcher);

        request.setRequestDispatcherFactory(dispatcherFactory);
        requestPathInfo.setExtension("png");

        errorPageHandler.includeUsingGET(request, response, "/us/en");
        verify(requestDispatcher, times(1)).include(any(), any());
    }


    @Test
    void testIncludeUsingGET_whenImageRequest_IOException() throws ServletException, IOException {
        keyValue.put("errorimages.path", ".img.png");
        context.registerInjectActivateService(errorPageHandler, keyValue);

        MockSlingHttpServletRequest request = context.request();
        MockSlingHttpServletResponse response = context.response();
        MockRequestPathInfo requestPathInfo = context.requestPathInfo();

        RequestDispatcher requestDispatcher = mock(RequestDispatcher.class);
        MockRequestDispatcherFactory dispatcherFactory = mock(MockRequestDispatcherFactory.class);
        when(dispatcherFactory.getRequestDispatcher("/us/en", null)).thenReturn(requestDispatcher);
        doThrow(new IOException("IO")).when(requestDispatcher).include(any(), any());

        request.setRequestDispatcherFactory(dispatcherFactory);
        requestPathInfo.setExtension("png");

        errorPageHandler.includeUsingGET(request, response, "/us/en");
        verify(requestDispatcher, times(1)).include(any(), any());
    }

    public void setInternalState(String field, Object value) {
        Class<?> c = errorPageHandler.getClass();
        try {
            Field f = c.getDeclaredField(field);  // Checks superclasses.
            f.setAccessible(true);
            f.set(errorPageHandler, value);
        } catch (Exception e) {
            throw new RuntimeException(
                    "Unable to set internal state on a private field. [...]", e);
        }
    }
}
