package com.abbott.aem.cloud.api.jobs;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.lenient;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.security.AccessControlException;
import java.util.Collections;
import java.util.Map;

import javax.jcr.Node;
import javax.jcr.NodeIterator;
import javax.jcr.PathNotFoundException;
import javax.jcr.Property;
import javax.jcr.PropertyIterator;
import javax.jcr.RepositoryException;
import javax.jcr.Session;
import javax.jcr.nodetype.NodeType;
import javax.jcr.nodetype.PropertyDefinition;

import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.ModifiableValueMap;
import org.apache.sling.api.resource.PersistenceException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.apache.sling.event.jobs.Job;
import org.apache.sling.event.jobs.JobManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentMatchers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

import com.day.cq.commons.jcr.JcrConstants;
import com.day.cq.dam.api.DamConstants;
import com.day.cq.replication.Replicator;
import com.day.cq.tagging.InvalidTagFormatException;
import com.day.cq.tagging.Tag;
import com.day.cq.tagging.TagManager;
import com.day.cq.wcm.api.NameConstants;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@ExtendWith(MockitoExtension.class)
class EifuManualsAssetMetadataUpdateTest {

    @InjectMocks
    private EifuManualsAssetMetadataUpdateJob eifuManualsAssetMetadataUpdateJob;

    protected static final String EIFU_SERVICE = "eifu-system-user";

    private static final String JCR_METADATA = "jcr:content/metadata";

    private static final String PARENT_PATH = "/content/dam/av/manuals-eifu/global";

    @Mock
    ResourceResolver resolver;

    @Mock
    Replicator replicator;

    @Mock
    Tag tag;

    @Mock
    TagManager tagManager;

    @Mock
    ModifiableValueMap mvp;

    @Mock
    Session session;

    @Mock
    ResourceResolverFactory resResolverFactory;

    @Mock
    JobManager jobmanager;

    @Mock
    Resource resource;

    @Mock
    Node node;

    @Mock
    NodeType nodetype;
    
    @Mock
    PropertyIterator propItr;
    
    @Mock
    PropertyDefinition prdf;
    
    @Mock
    Property prop;
    
    @BeforeEach
    void setUp() throws PersistenceException, LoginException, PathNotFoundException, RepositoryException, AccessControlException, InvalidTagFormatException {
        MockitoAnnotations.openMocks(this);
        
        Map<String, Object> param = Collections.singletonMap(ResourceResolverFactory.SUBSERVICE, EIFU_SERVICE);
        when(resResolverFactory.getServiceResourceResolver(param)).thenReturn(resolver);
        when(resolver.adaptTo(Session.class)).thenReturn(session);
        when(resolver.hasChanges()).thenReturn(true);
        when(resource.adaptTo(Node.class)).thenReturn(node);
        when(resource.adaptTo(ModifiableValueMap.class)).thenReturn(mvp);
        when(mvp.containsKey(DamConstants.DC_TITLE)).thenReturn(true);
        lenient().when(mvp.containsKey(NameConstants.PN_TAGS)).thenReturn(true);
        when(mvp.containsKey(JcrConstants.JCR_TITLE)).thenReturn(true);
        when(mvp.containsKey(DamConstants.PN_ON_TIME)).thenReturn(true);
        when(resource.getChild(JcrConstants.JCR_CONTENT)).thenReturn(resource);
        when(resource.getChild(JCR_METADATA)).thenReturn(resource);
        when(resource.getName()).thenReturn("ARTLT600088828_B.PDF");
        when(session.getNode(ArgumentMatchers.anyString())).thenReturn(node);
        when(session.itemExists(ArgumentMatchers.anyString())).thenReturn(true);
        when(resolver.adaptTo(TagManager.class)).thenReturn(tagManager);
        when(tagManager.createTag("av:manualseifu/AT", "AT Austria", " ", true)).thenReturn(tag);
        when(tagManager.createTag("av:manualseifu/AT/en", "English", " ", true)).thenReturn(tag);
        when(tagManager.createTag("av:manualseifu/AT/en/hcp", "HCP", " ", true)).thenReturn(tag);
        when(tagManager.createTag("av:manualseifu/AT/en/hcp/heart-failure-management", "Heart Failure Management", " ",
                true)).thenReturn(tag);
        when(tagManager.createTag("av:manualseifu/AT/en/hcp/heart-failure-management/mechanical-circulatory-support",
                "Mechanical Circulatory Support", " ", true)).thenReturn(tag);
        when(tagManager.createTag(
                "av:manualseifu/AT/en/hcp/heart-failure-management/mechanical-circulatory-support/left-ventricular-assist-device-",
                "Left Ventricular Assist Device ", " ", true)).thenReturn(tag);
        when(tagManager.createTag(
                "av:manualseifu/AT/en/hcp/heart-failure-management/mechanical-circulatory-support/left-ventricular-assist-device-/heartmate-ii-lvasbr-patient-handbookbr-featuring-the-mobile-power-unit",
                "HeartMate II™ LVAS<br />Patient Handbook<br />Featuring the Mobile Power Unit", " ", true))
                        .thenReturn(tag);
        when(node.hasNode(ArgumentMatchers.anyString())).thenReturn(true);
        when(node.hasNode("metadata")).thenReturn(false);
        when(node.hasNode("ARTLT600088828_B.PDF")).thenReturn(false);
        when(node.getNode(JcrConstants.JCR_CONTENT)).thenReturn(node);
        when(node.getPrimaryNodeType()).thenReturn(nodetype);
        when(nodetype.getName()).thenReturn("metadata");
        when(node.addNode("metadata", "metadata")).thenReturn(node);
        when(node.addNode("ARTLT600088828_B.PDF", "metadata")).thenReturn(node);
        NodeType[] nodeTypes = new NodeType[1];
        nodeTypes[0] = mock(NodeType.class);
        when(node.getMixinNodeTypes()).thenReturn(nodeTypes);
        when(node.getProperties()).thenReturn(propItr);
        when(propItr.hasNext()).thenReturn(true,false);
        when(propItr.nextProperty()).thenReturn(prop);
        when(prop.getDefinition()).thenReturn(prdf);
        when(prdf.isProtected()).thenReturn(false);
        when(node.getNodes()).thenReturn(mock(NodeIterator.class));
        when(resolver.hasChanges()).thenReturn(true);
    }

    @Test
    void testProcessJo() throws Exception {

        eifuManualsAssetMetadataUpdateJob.resolverFactory = resResolverFactory;
        Job mock = Mockito.mock(Job.class);
        File initialFile = new File("src/test/resources/payload.json");
        InputStream inputStream = new FileInputStream(initialFile);
        ObjectMapper mapper = new ObjectMapper();
        JsonNode jsonNode = mapper.readValue(inputStream, JsonNode.class);
        String jsonString = mapper.writeValueAsString(jsonNode);
        when(mock.getProperty(ArgumentMatchers.any())).thenReturn(jsonString);
        when(resolver.getResource(ArgumentMatchers.any())).thenReturn(resource);
        Resource presource = mock(Resource.class);
        when(resource.getParent()).thenReturn(presource);
        when(presource.getPath()).thenReturn(PARENT_PATH);
        when(node.getNode("AT")).thenReturn(node);
        when(node.getNode("en")).thenReturn(node);
        assertEquals("eifumanualsmetadataupdate/esl/job", eifuManualsAssetMetadataUpdateJob.getTopic());
        eifuManualsAssetMetadataUpdateJob.process(mock);
    }
}