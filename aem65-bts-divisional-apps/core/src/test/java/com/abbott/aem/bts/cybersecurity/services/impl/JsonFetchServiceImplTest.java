package com.abbott.aem.bts.cybersecurity.services.impl;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.when;

import com.abbott.aem.bts.cybersecurity.constants.SchedulerConstants;
import com.abbott.aem.platform.common.components.services.ApiResponse;
import com.abbott.aem.platform.common.components.services.HttpService;
import com.abbott.aem.platform.common.constants.CommonConstants;
import com.day.cq.commons.inherit.HierarchyNodeInheritanceValueMap;
import com.day.cq.commons.inherit.InheritanceValueMap;
import com.day.cq.wcm.api.Page;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.http.HttpException;
import org.apache.http.HttpStatus;
import org.apache.sling.api.resource.Resource;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;

import java.io.IOException;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

@ExtendWith(AemContextExtension.class)
class JsonFetchServiceImplTest {

    AemContext ctx = new AemContext();

    JsonFetchServiceImpl apiLookupService = Mockito.spy(new JsonFetchServiceImpl());

    Map<String, Object> parameters = new HashMap<>();

    Page currentPage;

    Resource resource;

    InheritanceValueMap inheritedProperties;

    HierarchyNodeInheritanceValueMap map;

    Locale locale;

    HttpService httpService;

    ApiResponse apiResponse;

    private final static String LINK = "https://www.google.com";

    @BeforeEach
    void setup() {

        parameters.put("domainName", "https://dev2.services.abbott");
        parameters.put("endPoint", "https://dev2.services.abbott");
        parameters.put("applicationAccessKey", "1234");
        parameters.put("appilicationId", "cybersecurity");
        parameters.put("secretKey", "secret key");

        currentPage = Mockito.mock(Page.class);
        resource = Mockito.mock(Resource.class);
        inheritedProperties = Mockito.mock(InheritanceValueMap.class);
        httpService = Mockito.mock(HttpService.class);
        apiResponse = Mockito.mock(ApiResponse.class);
        ctx.registerInjectActivateService(apiLookupService, parameters);

    }

    @Test
    void testProcessRequest() throws IOException {

        String expected = "responseString";
        when(currentPage.getContentResource()).thenReturn(resource);
        locale = new Locale("en", "US");
        when(currentPage.getLanguage()).thenReturn(locale);
        doReturn(httpService).when(apiLookupService).getHTTPService(any(), any(), any(), any());
        when(httpService.executeHTTPRequest()).thenReturn(apiResponse);
        when(apiResponse.getResponseString()).thenReturn(expected);
        when(apiResponse.getResponseCode()).thenReturn(200);
    }

    @Test
    void testGetJson() throws Exception {
        String jsonResponse = "{\"response\":{\"vsiUrl\":\"escreen-intranet-1008029-vsi.html\",\"infoUrl\":\"escreen-intranet-1008029-info.html\",\"enrolledInCyberSecurity\":\"Yes\",\"category\":\"Toxicology\",\"productName\":\"eScreenIntranet\",\"productType\":\"HostedSolution\",\"othersUrl\":\"escreen-intranet-1008029-others.html\",\"fieldId\":\"1008029\",\"publishToPortal\":\"Yes\"}}";
        when(apiLookupService.getJson()).thenReturn(jsonResponse);
        assertEquals(jsonResponse, apiLookupService.getJson());
    }

    @Test
    void testSendResponseString() throws HttpException {
        when(apiResponse.getResponseCode()).thenReturn(HttpStatus.SC_OK);
        apiLookupService.sendResponseString(apiResponse);
        when(apiResponse.getResponseCode()).thenReturn(HttpStatus.SC_BAD_REQUEST);
        assertThrows(HttpException.class, ()->{apiLookupService.sendResponseString(apiResponse);
        });
    }
}