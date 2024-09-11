package com.abbott.aem.an.abbottstore.servlets;

import com.abbott.aem.an.abbottstore.constants.CommonConstants;
import com.abbott.aem.an.abbottstore.services.ResResolverBySysUserService;
import com.abbott.magento.catalog.connector.MagentoConnectorService;
import com.abbott.magento.catalog.importer.MagentoProductImporter;
import com.abbott.magento.exception.CommerceException;
import com.abbott.magento.identity.MagentoIdentityProvider;
import com.abbott.magento.services.MagentoProductImporterService;
import com.day.cq.replication.ReplicationActionType;
import com.day.cq.replication.ReplicationException;
import com.day.cq.replication.Replicator;
import com.day.cq.tagging.InvalidTagFormatException;
import com.day.cq.tagging.Tag;
import com.day.cq.tagging.TagManager;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.testing.mock.sling.servlet.MockSlingHttpServletRequest;
import org.apache.sling.testing.mock.sling.servlet.MockSlingHttpServletResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import javax.jcr.Session;
import javax.servlet.ServletException;
import java.io.IOException;
import java.io.PrintWriter;
import java.security.AccessControlException;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.lenient;
import static org.mockito.Mockito.when;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
class AttributeUpdateServletTest {

    private static final String ID_PARAM = "id";

    @Mock
    Replicator replicator;

    @InjectMocks
    AttributeUpdateServlet attributeUpdateServlet;

    @Mock
    MockSlingHttpServletRequest request;

    @Mock
    MockSlingHttpServletResponse response;

    @InjectMocks
    MagentoConnectorService magentoConnectorService;

    @Mock
    MagentoIdentityProvider magentoIdentityProvider;

    @Mock
    ResResolverBySysUserService resResolverBySysUserService;

    @Mock
    ResourceResolver resourceResolver;

    @Mock
    Resource resource;

    @Mock
    TagManager tagManager;

    @Mock
    Tag tag;

    @Mock
    MagentoProductImporter magentoProductImporter;

    @Mock
    PrintWriter printWriter;
    
    @BeforeEach
    void setUp(AemContext context) {
        context.registerService(MagentoProductImporterService.class, magentoProductImporter);
        lenient().when(response.getWriter()).thenReturn(printWriter);
    }

    @Test
    void doGetFlavor() throws ServletException, IOException, InvalidTagFormatException {
        when(request.getParameter(ID_PARAM)).thenReturn(CommonConstants.FLAVOR);
        when(resResolverBySysUserService.getReadAndWriteResourceResolver()).thenReturn(resourceResolver);
        when(resourceResolver.adaptTo(TagManager.class)).thenReturn(tagManager);
        when(tagManager.resolve(CommonConstants.FLAVOR_TAG_PATH)).thenReturn(tag);
        attributeUpdateServlet.doGet(request, response);
    }

    @Test
    void doGetSize() throws ServletException, IOException {
        when(resResolverBySysUserService.getReadAndWriteResourceResolver()).thenReturn(resourceResolver);
        when(request.getParameter(ID_PARAM)).thenReturn(CommonConstants.SIZE);
        when(resourceResolver.adaptTo(TagManager.class)).thenReturn(tagManager);
        when(tagManager.resolve(CommonConstants.SIZE_TAG_PATH)).thenReturn(tag);
        attributeUpdateServlet.doGet(request, response);
    }

    @Test
    void doGetSubscription() throws ServletException, IOException {
        when(request.getParameter(ID_PARAM)).thenReturn(CommonConstants.SUBSCRIPTION);
        when(resourceResolver.adaptTo(TagManager.class)).thenReturn(tagManager);
        when(resResolverBySysUserService.getReadAndWriteResourceResolver()).thenReturn(resourceResolver);
        when(tagManager.resolve(CommonConstants.SUBSCRIPTION_TAG_PATH)).thenReturn(tag);
        attributeUpdateServlet.doGet(request, response);
    }
    @Test
    void doGetSubscriptionException() throws ServletException, IOException, InvalidTagFormatException {
        when(request.getParameter(ID_PARAM)).thenReturn(CommonConstants.SUBSCRIPTION);
        when(resourceResolver.adaptTo(TagManager.class)).thenReturn(tagManager);
        when(resResolverBySysUserService.getReadAndWriteResourceResolver()).thenReturn(resourceResolver);
        doThrow(new InvalidTagFormatException("invalidTagFormatException")).when(tagManager).createTag(CommonConstants.SUBSCRIPTION_TAG_PATH, "abbott-subscription", "");
        attributeUpdateServlet.doGet(request, response);
    }

    @Test
    void doGetIdNull() throws ServletException, IOException {
        when(request.getParameter(ID_PARAM)).thenReturn(null);
        attributeUpdateServlet.doGet(request, response);
    }
    
    @Test
    void testReplicateException() throws ReplicationException {
     	doThrow(new ReplicationException("replicationException")).when(replicator).replicate(null,ReplicationActionType.ACTIVATE,"/content/abbott/subscribe");
    	attributeUpdateServlet.replicate("/content/abbott/subscribe", resourceResolver);
		 
    }
}