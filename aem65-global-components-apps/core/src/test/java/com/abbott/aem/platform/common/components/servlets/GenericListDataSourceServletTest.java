package com.abbott.aem.platform.common.components.servlets;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import lombok.NonNull;

import com.adobe.granite.ui.components.ds.ResourceDataSource;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class GenericListDataSourceServletTest {

    @InjectMocks
    GenericListDataSourceServlet genericListDataSourceServlet;

    @NonNull
    @Mock
    SlingHttpServletRequest request;

    @NonNull
    @Mock
    SlingHttpServletResponse response;

    @Mock
    Resource resource;

    @Mock
    ResourceResolver resourceResolver;

    @Mock
    ValueMap valueMap;

    @Mock
    ResourceDataSource dataSource;

    @BeforeEach
    public void setUp() throws Exception {
        resourceResolver = mock(ResourceResolver.class);
        resource = mock(Resource.class);
        request = mock(SlingHttpServletRequest.class);
        response = mock(SlingHttpServletResponse.class);
        valueMap = mock(ValueMap.class);
        when(resource.getResourceResolver()).thenReturn(resourceResolver);
        when(request.getResource()).thenReturn(resource);
        when(resource.getChild("datasource")).thenReturn(resource);
        when(resource.getValueMap()).thenReturn(valueMap);
        lenient().when(valueMap.get("path", String.class)).thenReturn(null);
        genericListDataSourceServlet = spy(new GenericListDataSourceServlet());
    }

    @Test
    void testDoGet() {
        genericListDataSourceServlet.doGet(request, response);
    }



}