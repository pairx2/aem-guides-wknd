package com.abbott.aem.an.abbottstore.servlets;

import com.abbott.aem.an.abbottstore.services.UrlConfigService;
import com.day.cq.search.PredicateGroup;
import com.day.cq.search.Query;
import com.day.cq.search.QueryBuilder;
import com.day.cq.search.result.Hit;
import com.day.cq.search.result.SearchResult;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.jcr.resource.api.JcrResourceConstants;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import javax.jcr.Session;
import javax.net.ssl.HttpsURLConnection;
import java.io.DataOutputStream;
import java.util.HashMap;
import java.util.Map;

import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class RecaptchaServletTest {

    private static final String PAGE_JCR_CONTENT = "/currentPage/jcr:content";
    @Mock
    SlingHttpServletRequest req;

    @Mock
    SlingHttpServletResponse response;

    @InjectMocks
    RecaptchaServlet recaptchaServlet;

    @Mock
    ResourceResolver resourceResolver;

    @Mock
    Resource resource;

    @Mock
    QueryBuilder queryBuilder;

    @Mock
    Query query;

    @Mock
    SearchResult searchResult;

    @Mock
    Hit hit;

    @Mock
    ValueMap valueMap;

    @Mock
    UrlConfigService urlConfigService;

    @Mock
    DataOutputStream dataOutputStream;

    @Mock
    HttpsURLConnection httpsURLConnection;

    @BeforeEach
    void setUp() {

        when(req.getParameter("currentPage")).thenReturn("/currentPage");
        when(req.getParameter("g-recaptcha-response")).thenReturn("recaptchaResponse");
        when(req.getParameter("msgSource")).thenReturn("hello");
        when(req.getParameter("frhForm")).thenReturn("form");
        when(req.getParameter("storeName")).thenReturn("abbott");
        when(req.getParameter("email")).thenReturn("test@abbott.com");
        when(req.getParameter("veryfyEmail")).thenReturn("test@abbott.com");
        when(req.getParameter("firstName")).thenReturn("first name");
        when(req.getParameter("lastName")).thenReturn("last name");
        when(req.getParameter("streetAddress")).thenReturn("street 1");
        when(req.getParameter("addressLineTwo")).thenReturn("street 2");
        when(req.getParameter("city")).thenReturn("no city");
        when(req.getParameter("state")).thenReturn("no state");
        when(req.getParameter("country")).thenReturn("IN");
        when(req.getParameter("zipCode")).thenReturn("111111");
        when(req.getParameter("phone")).thenReturn("9999999999");
        when(req.getParameter("subject")).thenReturn("junit");
        when(req.getParameter("orderRef")).thenReturn("order number");
        when(req.getParameter("query")).thenReturn("query");

        when(req.getResourceResolver()).thenReturn(resourceResolver);
        when(resourceResolver.getResource(PAGE_JCR_CONTENT)).thenReturn(resource);
        when(resource.getPath()).thenReturn(PAGE_JCR_CONTENT);

        Map<String, String> map = new HashMap<>();
        map.put("path", PAGE_JCR_CONTENT);
        map.put("type", "nt;unstructured");
        map.put("property", JcrResourceConstants.SLING_RESOURCE_TYPE_PROPERTY);
        map.put("property.value", "abbott/components/content/contact-us");

        when(queryBuilder.createQuery(PredicateGroup.create(map), resourceResolver.adaptTo(Session.class))).thenReturn(query);
        when(query.getResult()).thenReturn(searchResult);
    }

    @Test
    void doPost() {
        recaptchaServlet.doPost(req, response);
    }

    @Test
    void doPostNullGrecaptcha() {
        when(req.getParameter("g-recaptcha-response")).thenReturn(null);
        recaptchaServlet.doPost(req, response);
    }
}