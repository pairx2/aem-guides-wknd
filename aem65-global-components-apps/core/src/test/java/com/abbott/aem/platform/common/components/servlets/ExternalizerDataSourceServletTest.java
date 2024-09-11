package com.abbott.aem.platform.common.components.servlets;

import com.day.cq.commons.Externalizer;
import lombok.NonNull;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.ResourceResolver;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.io.IOException;
import java.io.PrintWriter;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ExternalizerDataSourceServletTest {

    private static final String EXISTING_DOMAIN = "existing";
    private static final String NON_EXISTING_DOMAIN = "non-existing";

    @BeforeEach
    void setUp() {
        when(request.getResourceResolver()).thenReturn(resourceResolver);
        when(resourceResolver.adaptTo(Externalizer.class)).thenReturn(externalizer);
    }

    @InjectMocks
    ExternalizerDataSourceServlet servlet;

    @NonNull
    @Mock
    SlingHttpServletRequest request;

    @NonNull
    @Mock
    SlingHttpServletResponse response;

    @Mock
    ResourceResolver resourceResolver;

    @Mock
    Externalizer externalizer;

    @Mock
    PrintWriter writer;

    @Captor
    ArgumentCaptor<String> result;

    @Test
    void checkContentPageWithPropertySetOnParent_returnProperPath() throws IOException {
        when(externalizer.externalLink(any(), eq(EXISTING_DOMAIN), any())).thenReturn("www.abbott.com");
        setRequestDomainParameter(EXISTING_DOMAIN);

        servlet.doGet(request, response);

        verify(writer, times(0)).write(anyString());
    }

    @Test
    void checkContentPageWithProfpertySetOnParent_returnProperPath() throws IOException {
        when(externalizer.externalLink(any(), eq(NON_EXISTING_DOMAIN), any())).thenThrow(new IllegalArgumentException());
        when(response.getWriter()).thenReturn(writer);
        setRequestDomainParameter(NON_EXISTING_DOMAIN);

        servlet.doGet(request, response);

        verify(writer, times(1)).write(result.capture());
        assertEquals("Externalizer domain not found for this name.", result.getValue());
    }

    private void setRequestDomainParameter(String path) {
        when(request.getParameter("domain")).thenReturn(path);
    }
}