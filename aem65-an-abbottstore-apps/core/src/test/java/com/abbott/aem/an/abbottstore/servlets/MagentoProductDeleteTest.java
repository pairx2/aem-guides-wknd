package com.abbott.aem.an.abbottstore.servlets;

import com.abbott.aem.an.abbottstore.services.ResResolverBySysUserService;
import com.abbott.aem.an.abbottstore.services.UrlConfigService;
import com.abbott.magento.identity.MagentoIdentityProvider;
import com.abbott.magento.services.MagentoProductImporterService;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.ResourceResolver;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import javax.servlet.ServletException;
import java.io.IOException;
import java.io.PrintWriter;

import static org.mockito.Mockito.when;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
class MagentoProductDeleteTest {

    private static final String ABBOTT = "abbott";

    @InjectMocks
    MagentoProductDelete magentoProductDelete;

    @Mock
    SlingHttpServletRequest request;

    @Mock
    SlingHttpServletResponse response;

    @Mock
    MagentoIdentityProvider magentoIdentityProvider;

    @Mock
    UrlConfigService urlConfigService;

    @Mock
    MagentoProductImporterService magentoProductImporterService;

    @Mock
    PrintWriter printWriter;

    @Mock
    ResResolverBySysUserService resResolverBySysUserService;

    @Mock
    ResourceResolver resourceResolver;

    @BeforeEach
    void setUp() throws IOException {
        when(request.getParameter("sku")).thenReturn("111111");
        when(request.getParameter("storeName")).thenReturn(ABBOTT);
        when(magentoIdentityProvider.getAdminUser()).thenReturn("adminUser");
        when(magentoIdentityProvider.getAdminPassword()).thenReturn("adminPwd");
        when(response.getWriter()).thenReturn(printWriter);
    }

    @Test
    void doPostThrowsException() throws IOException, ServletException {
        magentoProductDelete.doGet(request, response);
    }

    @Test
    void doGet() throws IOException {
        when(urlConfigService.getMagentoStore(ABBOTT)).thenReturn("https://dev-secure.abbottstore.com");
        when(magentoProductImporterService.getProductPagesRootPath(ABBOTT)).thenReturn("/content/abbott/en/path");
        when(resResolverBySysUserService.getReadAndWriteResourceResolver()).thenReturn(resourceResolver);

        magentoProductDelete.doPost(request, response);
    }
}