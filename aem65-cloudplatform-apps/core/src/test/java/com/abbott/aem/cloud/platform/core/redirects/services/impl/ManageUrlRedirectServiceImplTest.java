package com.abbott.aem.cloud.platform.core.redirects.services.impl;

import com.abbott.aem.cloud.platform.core.redirects.models.CreateApplyPromoteResponse;
import com.abbott.aem.cloud.platform.core.redirects.models.UrlRedirect;
import com.abbott.aem.cloud.platform.core.redirects.models.UrlRedirectConfig;
import com.abbott.aem.cloud.platform.core.redirects.services.ManageUrlRedirectConfig;
import com.day.cq.commons.jcr.JcrConstants;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.sling.api.resource.ModifiableValueMap;
import org.apache.sling.api.resource.PersistenceException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.caconfig.ConfigurationBuilder;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLStreamHandler;
import java.net.URLStreamHandlerFactory;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.lenient;
import static org.mockito.Mockito.mock;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class ManageUrlRedirectServiceImplTest {

    @InjectMocks
    ManageUrlRedirectServiceImpl redirectService;

    @Mock
    Resource resource;

    @Mock
    private Resource mappingResource;

    @Mock
    ResourceResolver resourceResolver;

    @Mock
    ConfigurationBuilder cb;

    @Mock
    UrlRedirectConfig urlRedirectConfig;

    @Mock
    UrlRedirect urlRedirect;

    @Mock
    ModifiableValueMap modifiableValueMap;

    @Mock
    HttpURLConnection httpURLConnection;

    @Mock
    URLStreamHandlerFactory factory;

    String testUrl = "https://host";

    ManageUrlRedirectConfig redirectConfig;

    @BeforeEach
    void setUp() throws IOException {

        redirectConfig = mock(ManageUrlRedirectConfig.class);
        lenient().when(redirectConfig.getHostName()).thenReturn("https://dev2.services.abbott");
        lenient().when(redirectConfig.getOriginSecret()).thenReturn("c5b292d1290fce1c463af73ead3897a8");
        lenient().when(redirectConfig.getEndpoint()).thenReturn("/api/system/url-redirection");
        lenient().when(redirectConfig.getAccessKey()).thenReturn("vP+Py29WHTEzTkyApjRLA6bobOaQUBcKp5ssST5FqTp/0Qo=");
        lenient().when(redirectConfig.getPipelineId()).thenReturn("pipeline1");
        redirectService.activate(redirectConfig);
        lenient().when(resource.adaptTo(ConfigurationBuilder.class)).thenReturn(cb);
        lenient().when(cb.as(UrlRedirectConfig.class)).thenReturn(urlRedirectConfig);
        URLStreamHandler stubURLStreamHandler = new URLStreamHandler() {
            @Override
            protected URLConnection openConnection(URL u ) throws IOException {
                return httpURLConnection;
            }
        };
        URL url = new URL(null,testUrl,stubURLStreamHandler);
        httpURLConnection = (HttpURLConnection) url.openConnection();
        lenient().when(urlRedirectConfig.preferredLanguage()).thenReturn("en");
        lenient().when(urlRedirectConfig.countryCode()).thenReturn("US");
        lenient().when(urlRedirectConfig.applicationId()).thenReturn("aemaacsredirect");
    }

    @Test
    void applyRedirectRule() {
        lenient().when(urlRedirectConfig.state()).thenReturn("DRAFT");
        lenient().when(urlRedirectConfig.siteId()).thenReturn("globalreference");

        assertNotNull(redirectService.applyRedirectRule(resource));
    }

    @Test
    void applyRedirectRuleConcurrencyFailure() {
        lenient().when(urlRedirectConfig.state()).thenReturn("APPLIED");

        CreateApplyPromoteResponse actual = redirectService.applyRedirectRule(resource);
        assertEquals(400, actual.getErrorCode());
    }
    
    @Test
    void promoteRedirectRule() {
        lenient().when(urlRedirectConfig.state()).thenReturn("APPLIED");
        lenient().when(urlRedirectConfig.siteId()).thenReturn("globalreference");

        assertNotNull(redirectService.promoteRedirectRule(resource));
    }

    @Test
    void promoteRedirectRuleConcurrencyFailure() {
        lenient().when(urlRedirectConfig.state()).thenReturn("PROMOTED");

        CreateApplyPromoteResponse actual = redirectService.promoteRedirectRule(resource);
        assertEquals(400, actual.getErrorCode());
    }

    @Test
    void createRedirectRule() {
        lenient().when(urlRedirectConfig.state()).thenReturn("EDITED");
        lenient().when(urlRedirectConfig.siteId()).thenReturn("globalreference");

        assertNotNull(redirectService.createRedirectRule(resource, urlRedirect));
    }

    @Test
    void createRedirectRuleConcurrencyFail() {
        lenient().when(urlRedirectConfig.state()).thenReturn("APPLIED");

        CreateApplyPromoteResponse actual = redirectService.createRedirectRule(resource, urlRedirect);
       // assertEquals(400, actual.getErrorCode());
    }

    @Test
    void updateState() throws PersistenceException {
        lenient().when(resource.adaptTo(ModifiableValueMap.class)).thenReturn(modifiableValueMap);
        lenient().when(resource.getResourceResolver()).thenReturn(resourceResolver);

        redirectService.updateState(resource, "test",null);
    }

    @Test
    void checkRedirectRuleConsistencyEdited() {
        UrlRedirect redirect = new UrlRedirect();
        redirect.setStatus("EDITED");
        lenient().when(resource.getResourceResolver()).thenReturn(resourceResolver);
        lenient().when(resource.getResourceResolver().resolve(Mockito.anyString())).thenReturn(resource);
        lenient().when(resource.getResourceResolver()).thenReturn(resourceResolver);
        lenient().when(resource.getResourceResolver().resolve(Mockito.anyString()).adaptTo(UrlRedirect.class)).thenReturn(redirect);
        lenient().when(urlRedirectConfig.siteId()).thenReturn("globalreference");

        redirectService.checkRedirectRuleConsistency(resource,"/testPath");
    }

    @Test
    void checkRedirectRuleConsistencyApplied() {
        UrlRedirect redirect = new UrlRedirect();
        redirect.setStatus("APPLIED");
        redirect.setRulesetVersion("0");
        lenient().when(resource.getResourceResolver()).thenReturn(resourceResolver);
        lenient().when(resource.getResourceResolver().resolve(Mockito.anyString())).thenReturn(resource);
        lenient().when(resource.getResourceResolver()).thenReturn(resourceResolver);
        lenient().when(resource.getResourceResolver().resolve(Mockito.anyString()).adaptTo(UrlRedirect.class)).thenReturn(redirect);
        lenient().when(urlRedirectConfig.siteId()).thenReturn("globalreference");

        assertNotNull(redirectService.checkRedirectRuleConsistency(resource,"/testPath"));
    }

    @Test
    void overwriteUrlRedirects() {
        lenient().when(resource.getResourceResolver()).thenReturn(resourceResolver);
        lenient().when(resource.getResourceResolver().resolve(Mockito.anyString())).thenReturn(resource);
        lenient().when(resource.getChild(JcrConstants.JCR_CONTENT)).thenReturn(resource);
        lenient().when(resource.getChild(JcrConstants.JCR_CONTENT).getPath()).thenReturn("path");
        lenient().when(urlRedirectConfig.siteId()).thenReturn("globalreference");
        lenient().when(urlRedirectConfig.state()).thenReturn("EDITED");
        lenient().when(resource.adaptTo(ModifiableValueMap.class)).thenReturn(modifiableValueMap);

        //assertNotNull(redirectService.overwriteUrlRedirects(resource, "/testPath"));
    }


    void overwriteUrlRedirectsPersistentException() throws PersistenceException {
        lenient().when(resource.getResourceResolver()).thenReturn(resourceResolver);
        lenient().when(resource.getResourceResolver().resolve(Mockito.anyString())).thenReturn(resource);
        lenient().when(resource.getChild(JcrConstants.JCR_CONTENT)).thenReturn(resource);
        lenient().when(resource.getChild(JcrConstants.JCR_CONTENT).getPath()).thenReturn("path");
        lenient().when(urlRedirectConfig.siteId()).thenReturn("globalreference");
        lenient().when(urlRedirectConfig.state()).thenReturn("EDITED");
        lenient().when(resource.adaptTo(ModifiableValueMap.class)).thenReturn(modifiableValueMap);

        doThrow(new PersistenceException("PE")).when(resourceResolver).commit();

        CreateApplyPromoteResponse actual = redirectService.overwriteUrlRedirects(resource, "/testPath");
        assertEquals(-1, actual.getErrorCode());
    }

    private void mockForIOException(){
        URLStreamHandler stubURLStreamHandler = new URLStreamHandler() {
            @Override
            protected URLConnection openConnection(URL u ) throws IOException {
                throw new IOException("IOE");
            }
        };
        doReturn(stubURLStreamHandler).when(factory).createURLStreamHandler(eq("https"));
    }

    @Nested @TestInstance(TestInstance.Lifecycle.PER_CLASS)
    class ManageUrlRedirectServiceImplExceptionTest {

        @BeforeAll
        void setUp(){
            URL.setURLStreamHandlerFactory(factory);
        }

        @Test @DisplayName("Apply Exception")
        void applyRedirectRuleIOException() {
            lenient().when(urlRedirectConfig.state()).thenReturn("DRAFT");
            lenient().when(urlRedirectConfig.siteId()).thenReturn("globalreference");
            mockForIOException();

            CreateApplyPromoteResponse actual = redirectService.applyRedirectRule(resource);
            assertEquals(-1, actual.getErrorCode());
        }

        @Test
        void promoteRedirectRuleIOException() {
            lenient().when(urlRedirectConfig.state()).thenReturn("APPLIED");
            lenient().when(urlRedirectConfig.siteId()).thenReturn("globalreference");
            mockForIOException();

            CreateApplyPromoteResponse actual = redirectService.promoteRedirectRule(resource);
            assertEquals(-1, actual.getErrorCode());
        }

        @Test
        void createRedirectRuleIOException() {
            lenient().when(urlRedirectConfig.state()).thenReturn("EDITED");
            mockForIOException();

            CreateApplyPromoteResponse actual = redirectService.createRedirectRule(resource, urlRedirect);
            assertEquals(-1, actual.getErrorCode());
        }
    }
}
