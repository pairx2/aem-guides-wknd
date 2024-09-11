package com.abbott.aem.an.abbottstore.models;

import com.abbott.aem.an.abbottstore.services.impl.UrlConfigServiceImpl;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.testing.mock.sling.servlet.MockSlingHttpServletRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
class QueryParamButtonModelTest {

    private static final String EXTERNAL_LINK_URL = "https://qa.abbottstore.com/authenticate/juven/as.html?c=";
    private final AemContext context = new AemContext();
    QueryParamButtonModel queryParamButtonModel;
    MockSlingHttpServletRequest request;

    @BeforeEach
    public void setUp() {
        request = new MockSlingHttpServletRequest(context.resourceResolver(), context.bundleContext());
        context.registerInjectActivateService(new UrlConfigServiceImpl());
        request.setAttribute("c", "123456");
        request.setQueryString("c=1234");
        Resource resource = context.load().json("/queryParamButtonModel-data.json", "/content/en/abbott/test");
        request.setResource(resource);
    }

    @Test
    void getRedirectionTarget() {
        queryParamButtonModel = request.adaptTo(QueryParamButtonModel.class);
        assertEquals("true", queryParamButtonModel.getRedirectionTarget());
    }

    @Test
    void getTitle() {
        queryParamButtonModel = request.adaptTo(QueryParamButtonModel.class);
        assertEquals("ABBOTTSTORE", queryParamButtonModel.getTitle());
    }

    @Test
    void getExternalLink() {
        queryParamButtonModel = request.adaptTo(QueryParamButtonModel.class);
        queryParamButtonModel.setExternalLink(EXTERNAL_LINK_URL + "1234");
        assertEquals(EXTERNAL_LINK_URL + "1234", queryParamButtonModel.getExternalLink());
    }

    @Test
    void getQueryParamKey() {
        queryParamButtonModel = request.adaptTo(QueryParamButtonModel.class);
        queryParamButtonModel.setQueryParamKey("c");
        assertEquals("c", queryParamButtonModel.getQueryParamKey());
    }

    @Test
    void getAppendQueryParamKey() {
        queryParamButtonModel = request.adaptTo(QueryParamButtonModel.class);
        queryParamButtonModel.setAppendQueryParamKey(true);
        assertEquals(true, queryParamButtonModel.getAppendQueryParamKey());
    }
}