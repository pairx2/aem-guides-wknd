package com.abbott.aem.an.abbottstore.servlets;

import com.abbott.aem.an.abbottstore.constants.CommonConstants;
import com.abbott.aem.an.abbottstore.services.ResResolverBySysUserService;
import com.abbott.aem.an.abbottstore.services.UrlConfigService;
import com.abbott.magento.catalog.connector.MagentoConnectorService;
import com.abbott.magento.catalog.connector.models.MagentoProduct;
import com.abbott.magento.services.IdentityProvider;
import com.abbott.magento.services.MagentoProductImporterService;
import com.day.cq.commons.jcr.JcrUtil;
import com.day.cq.replication.Replicator;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.servlets.HttpConstants;
import org.apache.sling.api.servlets.SlingAllMethodsServlet;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.Servlet;
import javax.servlet.ServletException;
import java.io.IOException;

import static org.apache.sling.api.servlets.ServletResolverConstants.*;


@Component(service = Servlet.class, property = {
        SLING_SERVLET_METHODS + "=" + HttpConstants.METHOD_POST,
        SLING_SERVLET_PATHS  + "=/bin/magento/deleteProduct",
        SLING_SERVLET_SELECTORS + "=delete"
})
public class MagentoProductDelete extends SlingAllMethodsServlet {

    private static final long serialVersionUID = 1L;

    private static final Logger log = LoggerFactory.getLogger(MagentoProductDelete.class);

    @Reference
    private transient ResResolverBySysUserService resResolverBySysUserService;

    @Reference
    private transient MagentoProductImporterService magentoProductImporterService;

    @Reference
    private transient Replicator replicator;

    @Reference
    private transient UrlConfigService urlConfigService;


    @Reference
    private transient IdentityProvider magentoIdentityProvider;


    @Override
    protected void doPost(SlingHttpServletRequest request, SlingHttpServletResponse response)
            throws IOException {

        try {
            String skus = request.getParameter("sku");
            String storeName = request.getParameter("storeName");
            if (StringUtils.isBlank(skus) || StringUtils.isBlank(storeName)) {
                writeResponse(response, 400, "Invalid Request");
                return;
            }
            String username = magentoIdentityProvider.getAdminUser();
            String password = magentoIdentityProvider.getAdminPassword();
            log.debug("Admin user is :{}", magentoIdentityProvider.getAdminUser());
            String storeServer = urlConfigService.getMagentoStore(storeName);
            String productsPath = magentoProductImporterService.getProductPagesRootPath(storeName);
            MagentoConnectorService magentoConnectorService = new MagentoConnectorService();
            String token = magentoIdentityProvider.getMagentoAdminTokenKey();
            productsPath = StringUtils.isNotBlank(productsPath) ? StringUtils.replace(productsPath, "abbott", storeName) : productsPath;
            if (StringUtils.isBlank(skus) || StringUtils.isBlank(storeName)) {
                writeResponse(response, 400, "Invalid Request");
                return;
            }
            try (ResourceResolver resourceResolver = resResolverBySysUserService.getReadAndWriteResourceResolver()) {
                String[] skuList = skus.split(",");
                for (int i = 0; i < skuList.length; i++) {
                    if (JcrUtil.isValidName(skuList[i])) {
                        MagentoProduct magentoProduct = magentoConnectorService.getStoreBasedProduct(token, skuList[i], storeServer);
                        magentoProductImporterService.deleteProductPage(resourceResolver, storeName, magentoProduct, productsPath, token, magentoConnectorService, storeServer);
                    }
                }
            }
            writeResponse(response, 200, "Successfully deleted products");
        } catch (Exception e) {
            log.error("Exception :: {}", e.getMessage());
            writeResponse(response, 500, "Failed to deleted products  " + e);
        }
    }

    @Override
    protected void doGet(SlingHttpServletRequest request, SlingHttpServletResponse response)
            throws ServletException, IOException {
        log.debug("In the WebHook Do-doGet method");
        doPost(request, response);
    }

    protected void writeResponse(SlingHttpServletResponse response, int responseCode, String responseText) throws IOException {
        response.setStatus(responseCode);
        response.setContentType(CommonConstants.TEXT_HTML);
        response.getWriter().write(responseText);
    }
}