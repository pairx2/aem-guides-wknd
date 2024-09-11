package com.abbott.aem.cloud.platform.core.servlets;

import com.abbott.aem.cloud.platform.core.services.TagExporterService;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.testing.mock.sling.servlet.MockRequestPathInfo;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.io.IOException;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith({MockitoExtension.class, AemContextExtension.class})
class TagExporterServletTest {
    @InjectMocks
    private TagExporterServlet servlet;

    @Mock
    private TagExporterService tagExporterService;

    private final AemContext context = new AemContext();

    @Test
    void testDoGet() {
        String tagPath = "/content/cq:tags/i18n/global";
        JsonArray jsonArray = new JsonArray();
        JsonObject jsonObject = new JsonObject();
        jsonObject.addProperty("path", tagPath);
        jsonObject.addProperty("value", "global-tag");
        jsonArray.add(jsonObject);

        //Set up the request parameters, selectors, and extension as needed
        MockRequestPathInfo pathInfo = context.requestPathInfo();
        pathInfo.setExtension("json");
        pathInfo.setResourcePath("/content/cq:tags/i18n/global");
        pathInfo.setSelectorString("tagdata");

        when(tagExporterService.getTagPath(anyString(), anyString())).thenReturn(tagPath);
        when(tagExporterService.getAllTags(eq(tagPath), any(String[].class), any(ResourceResolver.class))).thenReturn(jsonArray);

        // Call the servlet's doGet method
        servlet.doGet(context.request(), context.response());

        // Perform assertions on the response, e.g., response status code, content, etc.
        String expected = "[{\"path\":\"/content/cq:tags/i18n/global\",\"value\":\"global-tag\"}]";
        assertEquals(expected, context.response().getOutputAsString());
    }

    @Test
    void doGetError() throws IOException {
        SlingHttpServletResponse response = mock(SlingHttpServletResponse.class);
        doThrow(new IOException("IOE")).when(response).getWriter();

        servlet.doGet(context.request(), response);
        verify(response, times(1)).getWriter();
    }
}
