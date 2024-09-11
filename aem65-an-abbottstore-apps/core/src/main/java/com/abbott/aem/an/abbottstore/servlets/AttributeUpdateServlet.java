package com.abbott.aem.an.abbottstore.servlets;


import com.abbott.aem.an.abbottstore.constants.CommonConstants;
import com.abbott.aem.an.abbottstore.services.ResResolverBySysUserService;
import com.abbott.magento.catalog.connector.MagentoConnectorService;
import com.abbott.magento.services.IdentityProvider;
import com.abbott.magento.services.MagentoProductImporterService;
import com.day.cq.replication.ReplicationActionType;
import com.day.cq.replication.ReplicationException;
import com.day.cq.replication.Replicator;
import com.day.cq.tagging.InvalidTagFormatException;
import com.day.cq.tagging.JcrTagManagerFactory;
import com.day.cq.tagging.Tag;
import com.day.cq.tagging.TagManager;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.servlets.HttpConstants;
import org.apache.sling.api.servlets.SlingAllMethodsServlet;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.jcr.Node;
import javax.jcr.RepositoryException;
import javax.jcr.Session;
import javax.servlet.Servlet;
import javax.servlet.ServletException;
import java.io.IOException;

import static org.apache.sling.api.servlets.ServletResolverConstants.SLING_SERVLET_METHODS;
import static org.apache.sling.api.servlets.ServletResolverConstants.SLING_SERVLET_PATHS;

@Component(service = Servlet.class, immediate = true, property = { SLING_SERVLET_PATHS + "=/bin/magento/attributeUpdate",
        SLING_SERVLET_METHODS + "=" + HttpConstants.METHOD_POST })
public class AttributeUpdateServlet extends SlingAllMethodsServlet {

    /** The Constant serialVersionUID. */
    private static final long serialVersionUID = 1L;

    private static final Logger log = LoggerFactory.getLogger(AttributeUpdateServlet.class);
    
	@Reference 
    private transient IdentityProvider magentoIdentityProvider;

    @Reference
    private transient ResResolverBySysUserService resResolverBySysUserService;

    @Reference
    private transient MagentoProductImporterService magentoProductImporterService;

    @Reference
    private transient Replicator replicator;

    @Reference
    private transient JcrTagManagerFactory jcrTagManagerFactory;

    public final String FLAVORS = "flavors";

    @Override
    protected void doGet(SlingHttpServletRequest request, SlingHttpServletResponse response)
            throws ServletException, IOException {
        log.debug("In the attribute update WebHook Do-doGet method");
        doPost(request, response);
    }

    @Override
    protected void doPost(SlingHttpServletRequest request, SlingHttpServletResponse response)
            throws ServletException, IOException {
        String id = request.getParameter( "id" );
        if (StringUtils.isBlank( id )) {
            writeResponse( response, 400, "Invalid Request" );
            return;
        }
        String username = magentoIdentityProvider.getAdminUser();
        String password = magentoIdentityProvider.getAdminPassword();
        log.debug( "Admin user is :{} ", magentoIdentityProvider.getAdminUser() );
        String storeServer = magentoIdentityProvider.getServer();
        MagentoConnectorService magentoConnectorService = new MagentoConnectorService(storeServer);
        String token = magentoIdentityProvider.getMagentoAdminTokenKey();
        try (ResourceResolver resourceResolver = resResolverBySysUserService.getReadAndWriteResourceResolver()) {
            if (StringUtils.equals( id, CommonConstants.FLAVOR )) {
                String path = CommonConstants.FLAVOR_TAG_PATH;
                tagModification( CommonConstants.FLAVOR_NODE, path, resourceResolver );
                magentoProductImporterService.processCustomVariationsTagsMetadata( resourceResolver, FLAVORS, path, token, magentoConnectorService );
                replicate( path, resourceResolver );
                writeResponse( response, 200, "Successfully created/updated flavor Attributes" );
            } else if (StringUtils.equals( id, CommonConstants.SIZE )) {
                String path = CommonConstants.SIZE_TAG_PATH;
                tagModification( CommonConstants.SIZE_NODE, path, resourceResolver );
                magentoProductImporterService.processCustomVariationsTagsMetadata( resourceResolver, CommonConstants.SIZE, path, token, magentoConnectorService );
                replicate( path, resourceResolver );
                writeResponse( response, 200, "Successfully created/updated size Attributes" );
            } else if (StringUtils.equals( id, CommonConstants.SUBSCRIPTION )) {
                String path = CommonConstants.SUBSCRIPTION_TAG_PATH;
                tagModification( CommonConstants.SUBSCRIPTION_NODE, path, resourceResolver );
                magentoProductImporterService.processCustomVariationsTagsMetadata( resourceResolver, CommonConstants.SUBSCRIPTION, path, token, magentoConnectorService );
                replicate( path, resourceResolver );
                writeResponse( response, 200, "Successfully created/updated subscription Attributes" );
            }
        }
    }

    public void replicate(String path,ResourceResolver resourceResolver) {
        try {
            replicator.replicate(resourceResolver.adaptTo(Session.class), ReplicationActionType.ACTIVATE, path);
        } catch (ReplicationException e) {
            log.error("ReplicationException :: {}", e.getMessage());
        }
    }

    protected void tagModification(String value, String path,ResourceResolver resourceResolver) {
        Resource resource = resourceResolver.getResource(path);
        try {
            if(resource != null) {
                resourceResolver.getResource(path).adaptTo(Node.class).remove();
            }
            TagManager tagManager = resourceResolver.adaptTo(TagManager.class);
            Tag tag = tagManager.resolve(path);
            if(tag == null) {
                tagManager.createTag(path, value, "");
            }
		} catch (InvalidTagFormatException | RepositoryException e) {
			log.error("Exception :: {}", e.getMessage());
        }
    }

    protected void writeResponse(SlingHttpServletResponse response, int responseCode, String responseText) throws IOException {
        response.setStatus(responseCode);
        response.setContentType(CommonConstants.TEXT_HTML);
        response.getWriter().write(responseText);
    }
}
