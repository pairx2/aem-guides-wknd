package com.abbott.aem.an.abbottstore.servlets;

import com.abbott.aem.an.abbottstore.constants.CommonConstants;
import com.abbott.aem.an.abbottstore.services.ResResolverBySysUserService;
import com.abbott.aem.an.abbottstore.services.UrlConfigService;
import com.abbott.magento.catalog.connector.MagentoConnectorService;
import com.abbott.magento.catalog.connector.models.MagentoProduct;
import com.abbott.magento.exception.CommerceException;
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
import org.osgi.service.component.annotations.ReferencePolicyOption;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.Servlet;
import javax.servlet.ServletException;
import java.io.IOException;

import static org.apache.sling.api.servlets.ServletResolverConstants.*;


@Component(service = Servlet.class, property = {
        SLING_SERVLET_METHODS + "=[" + HttpConstants.METHOD_POST + "," + HttpConstants.METHOD_GET + "]",
        SLING_SERVLET_PATHS +  "=/bin/magento/productCreation",
        SLING_SERVLET_SELECTORS +  "=create,update"
})
public class MagentoProductUpdateServlet extends SlingAllMethodsServlet {

    private static final long serialVersionUID = 1L;

    private static final Logger log = LoggerFactory.getLogger(MagentoProductUpdateServlet.class);

    @Reference
    private transient ResResolverBySysUserService resResolverBySysUserService;

    @Reference
    private transient MagentoProductImporterService magentoProductImporterService;

    @Reference
    private transient Replicator replicator;

    @Reference
    private transient UrlConfigService urlConfigService;

    /**
     * The Constant STATUS_CODE_ENABLED.
     */
    private static final String STATUS_CODE_ENABLED = "1";


    @Reference(policyOption = ReferencePolicyOption.GREEDY)
    private transient IdentityProvider magentoIdentityProvider;


    @Override
    protected void doPost(SlingHttpServletRequest request, SlingHttpServletResponse response)
            throws ServletException, IOException {


        try {
            String skus = request.getParameter("sku");
            String storeName = request.getParameter("storeName");
            if (StringUtils.isBlank(skus) || StringUtils.isBlank(storeName)) {
                writeResponse(response, 400, "Invalid Request");
                return;
            }
            String storeServer = urlConfigService.getMagentoStore(storeName);
            String password = magentoIdentityProvider.getAdminPassword();
            String username = magentoIdentityProvider.getAdminUser();
            log.debug("Admin user is :{} ", magentoIdentityProvider.getAdminUser());

            MagentoConnectorService magentoConnectorService = new MagentoConnectorService();
            String token = magentoIdentityProvider.getMagentoAdminTokenKey();
            String productsPath = magentoProductImporterService.getProductPagesRootPath(storeName);
            productsPath = StringUtils.isNotBlank(productsPath) ? StringUtils.replace(productsPath, "abbott", storeName) : productsPath;
            log.debug("username :: {}, server :: {}, productsPath :: {} ", username, storeServer,productsPath);
            log.debug("username :: {}, server :: {}, productsPath :: {} ,token::{}", username, storeServer,productsPath,token);
            try(ResourceResolver resourceResolver = resResolverBySysUserService.getReadAndWriteResourceResolver()) {

                String[] skuList = skus.split(",");
                for (int i = 0; i < skuList.length; i++) {
                    if (JcrUtil.isValidName(skuList[i])) {
                        MagentoProduct magentoProduct = magentoConnectorService.getStoreBasedProduct(token, skuList[i], storeServer);
                        log.debug("resourceResolver and productsPath and token and magentoConnectorService and storeName and storeServer and magentoIdentityProvider::{} {} {} {} {} {}", magentoIdentityProvider.getAdminUser(), productsPath, magentoConnectorService, storeName, storeServer, magentoIdentityProvider);
                        if (String.valueOf(magentoProduct.status).equals(STATUS_CODE_ENABLED)) {
                            log.debug("STATUS_CODE_ENABLED inside if true :{} {}", magentoProduct.status, magentoProduct.status);
                            magentoProductImporterService.addAndUpdateProducts(resourceResolver, productsPath, magentoProduct, token, magentoConnectorService, storeName, storeServer);
                        } else {
                            log.debug("STATUS_CODE_ENABLED inside else disabled :{}", magentoProduct.status);
                            magentoProductImporterService.deleteProductPage(resourceResolver, storeName, magentoProduct, productsPath, token, magentoConnectorService, storeServer);
                        }
                    }
                }
            }
            writeResponse(response, 200, "Successfully created/updated products");
        } catch (CommerceException e) {
            log.error("Exception during create/update product ::", e);
            writeResponse(response, 500, "Failed to create/update products  " + e.getMessage());
        } catch (Exception e) {
            log.error("Exception during create/update product :: ", e);
            writeResponse(response, 500, "Failed to create/update products  " + e);
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