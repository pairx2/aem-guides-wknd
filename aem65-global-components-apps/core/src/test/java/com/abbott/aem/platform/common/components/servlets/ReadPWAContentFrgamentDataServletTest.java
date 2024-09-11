package com.abbott.aem.platform.common.components.servlets;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import java.io.BufferedReader;
import java.io.PrintWriter;
import java.io.StringReader;
import java.io.StringWriter;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.adobe.cq.dam.cfm.ContentElement;
import com.adobe.cq.dam.cfm.ContentFragment;
import com.google.gson.JsonObject;

class ReadPWAContentFrgamentDataServletTest {

    private ReadPWAContentFrgamentDataServlet servlet;
    private SlingHttpServletRequest request;
    private SlingHttpServletResponse response;
    private ResourceResolver resourceResolver;
    private Resource resource;
    private ContentFragment contentFragment;
    private ContentElement contentElement;

    @BeforeEach
    void setUp() {
        servlet = new ReadPWAContentFrgamentDataServlet();
        request = mock(SlingHttpServletRequest.class);
        response = mock(SlingHttpServletResponse.class);
        resourceResolver = mock(ResourceResolver.class);
        resource = mock(Resource.class);
        contentFragment = mock(ContentFragment.class);
        contentElement = mock(ContentElement.class);
    }

    @Test
    void testDoPost() throws Exception {
        // Mock request JSON body
        JsonObject json = new JsonObject();
        json.addProperty("pwaContentFragmentPath", "/content/path");
        StringReader jsonReader = new StringReader(json.toString());
        BufferedReader bufferedReader = new BufferedReader(jsonReader);

        when(request.getReader()).thenReturn(bufferedReader);
        when(request.getResourceResolver()).thenReturn(resourceResolver);
        when(resourceResolver.resolve("/content/path")).thenReturn(resource);
        when(resource.adaptTo(ContentFragment.class)).thenReturn(contentFragment);
        when(contentFragment.getElement(anyString())).thenReturn(contentElement);
        when(contentElement.getContent()).thenReturn("test-content\nanother-content");

        StringWriter stringWriter = new StringWriter();
        PrintWriter printWriter = new PrintWriter(stringWriter);
        when(response.getWriter()).thenReturn(printWriter);

        servlet.doPost(request, response);

        verify(response).setContentType("application/json");
        verify(response).setCharacterEncoding("UTF-8");

        String responseOutput = stringWriter.toString();
        assertTrue(responseOutput.contains("test-content"));
        assertTrue(responseOutput.contains("another-content"));
    }
}