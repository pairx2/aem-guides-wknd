package com.abbott.aem.cloud.platform.core.redirects.servlets;

import com.abbott.aem.cloud.platform.core.redirects.models.CreateApplyPromoteResponse;
import com.abbott.aem.cloud.platform.core.redirects.models.UrlRedirect;
import com.abbott.aem.cloud.platform.core.redirects.services.ManageUrlRedirectService;
import com.google.gson.Gson;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.sling.testing.mock.sling.servlet.MockSlingHttpServletRequest;
import org.apache.sling.testing.mock.sling.servlet.MockSlingHttpServletResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.io.IOException;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
class EnterpriseServicesRedirectRulesServletTest {

    private static final String PATH = "/conf/global/sling:configs/URLRedirect";
    private static final String RESOURCE_PATH = "/test";

    private final AemContext aemContext = new AemContext();

    @InjectMocks
    EnterpriseServicesRedirectRulesServlet servlet;

    @Mock
    CreateApplyPromoteResponse createApplyPromoteResponse;

    @Mock
    UrlRedirect redirectResource;

    @Mock
    ManageUrlRedirectService manageUrlRedirectService;

    MockSlingHttpServletRequest mockSlingHttpServletRequest;

    MockSlingHttpServletResponse mockSlingHttpServletResponse;

    CreateApplyPromoteResponse response = CreateApplyPromoteResponse.builder().status(true)
            .errorCode(200).message("SUCCESS").build();


    @BeforeEach
    void setUp() {
        aemContext.build().resource(RESOURCE_PATH);
        aemContext.currentResource(RESOURCE_PATH);
        aemContext.request().setAttribute("path",PATH);
        mockSlingHttpServletRequest = aemContext.request();
        mockSlingHttpServletResponse = aemContext.response();
    }

    @Test
    void doGetTestCreate() throws IOException {
        when(manageUrlRedirectService.createRedirectRule(any(), any())).thenReturn(response);
        performPositiveTest("save");
    }

    @Test
    void doGetTestCreate_whenError() throws IOException {
        performNegativeTest("save");
        assertNotNull(mockSlingHttpServletResponse.getOutputAsString());
    }

    @Test
    void doGetTestApply() throws IOException {
        when(manageUrlRedirectService.applyRedirectRule(any())).thenReturn(response);
        performPositiveTest("apply");
    }

    @Test
    void doGetTestApply_whenError() throws IOException {
        performNegativeTest("apply");
    }

    @Test
    void doGetTestPromote() throws IOException {
        when(manageUrlRedirectService.promoteRedirectRule(any())).thenReturn(response);
        performPositiveTest("promote");
    }

    @Test
    void doGetTestPromote_whenError() throws IOException {
        performNegativeTest("promote");
    }

    @Test
    void doGetTestFetch() throws IOException {
        when(manageUrlRedirectService.checkRedirectRuleConsistency(any(), any())).thenReturn(response);
        performPositiveTest("fetch");
    }

    @Test
    void doGetTestFetch_whenError() throws IOException {
        performNegativeTest("fetch");
    }

    @Test
    void doGetTestOverwrite() throws IOException {
        when(manageUrlRedirectService.overwriteUrlRedirects(any(), any())).thenReturn(response);
        performPositiveTest("overwrite");
    }

    @Test
    void doGetTestOverwrite_whenError() throws IOException {
        performNegativeTest("overwrite");
    }

    @Test
    void doGetTestResponseDefault() throws IOException {
        performNegativeTest("default");
    }

    void performPositiveTest(String path) throws IOException {
        aemContext.requestPathInfo().setSelectorString(path);
        servlet.doGet(mockSlingHttpServletRequest, mockSlingHttpServletResponse);

        CreateApplyPromoteResponse expected = new Gson().fromJson(mockSlingHttpServletResponse.getOutputAsString(), CreateApplyPromoteResponse.class);
        assertEquals(true, expected.getStatus());
    }

    void performNegativeTest(String path) throws IOException {

        aemContext.requestPathInfo().setSelectorString(path);
        servlet.doGet(mockSlingHttpServletRequest, mockSlingHttpServletResponse);

        CreateApplyPromoteResponse expected = new Gson().fromJson(mockSlingHttpServletResponse.getOutputAsString(), CreateApplyPromoteResponse.class);
        assertEquals(-1, expected.getErrorCode());
    }
}
