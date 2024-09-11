package com.abbott.aem.cloud.api.jobs;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.lenient;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoMoreInteractions;
import static org.mockito.Mockito.when;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.io.StringReader;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.security.AccessControlException;
import java.util.Collections;
import java.util.Map;

import javax.jcr.Node;
import javax.jcr.Property;
import javax.jcr.PropertyIterator;
import javax.jcr.RepositoryException;
import javax.jcr.Session;
import javax.jcr.nodetype.NodeType;
import javax.jcr.nodetype.PropertyDefinition;

import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.ModifiableValueMap;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.apache.sling.event.jobs.Job;
import org.apache.sling.event.jobs.JobManager;
import org.apache.sling.event.jobs.consumer.JobConsumer;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentMatchers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import com.day.cq.wcm.api.WCMException;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
import com.day.cq.wcm.api.PageManagerFactory;

import javax.json.Json;
import javax.json.JsonReader;

import javax.json.JsonException;
import javax.json.JsonObject;

import org.apache.sling.testing.mock.jcr.MockJcr;

import com.day.cq.tagging.TagManager;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;


@ExtendWith(MockitoExtension.class)
class BTSCyberSecurityProductCreationJobTest {
    public static final String PARENT_PATH  = "/content/bts/cybersecurity/us/en/secure/products";

    public static final String CONF_BTS_TEMPLATE = "/conf/bts/cybersecurity/settings/wcm/templates/cybersecurity-product-page-template";
    @InjectMocks
    private BTSCyberSecurityProductCreationJob btsCyberSecurityProductCreationJob;

    protected static final String BTS_SERVICE = "bts-cybersecurity-system-user";
   
    @Mock
    ResourceResolver resolver;


    @Mock
    TagManager tagManager;

    @Mock
    ModifiableValueMap mvp;

    @Mock
    Session session;

    @Mock
    ResourceResolverFactory resolverResolverFactory;

    @Mock
    JobManager jobmanager;

    @Mock
    Resource resource;

    @Mock
    Node node;

    @Mock 
    Job job;

    @Mock
    NodeType nodetype;

    @Mock
    PageManager pageManager;

    @Mock
    PageManagerFactory pageManagerFactory;

    @Mock
    Page page;

    
    @BeforeEach
    void setUp() throws WCMException, LoginException, JsonException, RepositoryException, AccessControlException  {
        MockitoAnnotations.openMocks(this);
        lenient().when(resolverResolverFactory.getServiceResourceResolver(any(Map.class))).thenReturn(resolver);
        lenient(). when(resolver.adaptTo(PageManager.class)).thenReturn(pageManager);
        lenient().when(page.getContentResource()).thenReturn(resource);
        lenient().when(resource.adaptTo(Node.class)).thenReturn(node);
        lenient().when(resolver.adaptTo(Session.class)).thenReturn(session);
    }

    /**
     * @throws Exception
     */
    @Test
    void testProcess() throws Exception {
        btsCyberSecurityProductCreationJob.resolverFactory = resolverResolverFactory;
        BTSCyberSecurityProductCreationJob mock = Mockito.mock(BTSCyberSecurityProductCreationJob.class);
        System.out.println("mockvalue "+ mock.toString());
        File initialFile = new File("src/test/resources/btsPayload.json");
        System.out.println("jsonfile path"+ initialFile);
        ObjectMapper mapper = new ObjectMapper();
        BTSCyberSecurityProductCreationJob jsonNode = mapper.readValue(initialFile, BTSCyberSecurityProductCreationJob.class);
        String payload = jsonNode.toString();
        System.out.println("payload value" + payload);
        System.out.println("jsonNode value "+jsonNode);
        Assertions.assertEquals("716763",jsonNode.getProductId().toString());
        Assertions.assertEquals("AbbottLinkEnterprise",jsonNode.getProductName().toString());
        Assertions.assertEquals("/content/bts/cybersecurity/us/en/secure/products/AbbottLinkEnterprise",jsonNode.getProductPath().toString());
        Assertions.assertEquals("Hosted Solutions",jsonNode.getTitle().toString());
        Assertions.assertEquals("AbbottLink Enterprise",jsonNode.getNavigationTitle().toString());
        Assertions.assertEquals("admincybersecurity/createproductpage/esl/job",btsCyberSecurityProductCreationJob.getTopic());
        lenient().when(job.getProperty("data")).thenReturn(payload);
        try(JsonReader jsonReader = Json.createReader(new StringReader(payload))){
        JsonObject object = jsonReader.readObject();
        lenient().when (resolver.getResource(payload)).thenReturn(resource);
        lenient().when(pageManager.create(PARENT_PATH,jsonNode.getProductName(),CONF_BTS_TEMPLATE,jsonNode.getTitle())).thenReturn(page);
        JobConsumer.JobResult result = btsCyberSecurityProductCreationJob.process(job);
        assertEquals(JobConsumer.JobResult.OK, result);
        String prodId = object.getString("productId");
        verify(node).setProperty("productId",prodId);
        verify(node).setProperty("navTitle", object.getString("navigationTitle"));
        verify(node).setProperty("pageTitle", object.getString("pageTitle"));
        verify(session).save();
         }catch(JsonException e){
           e.printStackTrace();
         } 
    } 
    @Test
    void testProcessWithExisitingResource() throws Exception{
        BTSCyberSecurityProductCreationJob mock = Mockito.mock(BTSCyberSecurityProductCreationJob.class);
        System.out.println("mockvalue "+ mock.toString());
        File initialFile = new File("src/test/resources/btsPayload.json");
        System.out.println("jsonfile path"+ initialFile);
        ObjectMapper mapper = new ObjectMapper();
        BTSCyberSecurityProductCreationJob jsonNode = mapper.readValue(initialFile, BTSCyberSecurityProductCreationJob.class);
        String payload = jsonNode.toString();
        when(job.getProperty("data")).thenReturn(payload);
        lenient().when (resolver.getResource(payload)).thenReturn(resource);
        JobConsumer.JobResult result = btsCyberSecurityProductCreationJob.process(job);
        assertEquals(JobConsumer.JobResult.OK,result);
    }
    @Test
    void testProcessExceptionHandling() throws Exception{
         BTSCyberSecurityProductCreationJob mock = Mockito.mock(BTSCyberSecurityProductCreationJob.class);
        System.out.println("mockvalue "+ mock.toString());
        File initialFile = new File("src/test/resources/btsPayload.json");
        System.out.println("jsonfile path"+ initialFile);
        ObjectMapper mapper = new ObjectMapper();
        BTSCyberSecurityProductCreationJob jsonNode = mapper.readValue(initialFile, BTSCyberSecurityProductCreationJob.class);
        String payload = jsonNode.toString();
        when(job.getProperty("data")).thenReturn(payload);
        when (resolverResolverFactory.getServiceResourceResolver(any(Map.class))).thenThrow(new LoginException());
        JobConsumer.JobResult result = btsCyberSecurityProductCreationJob.process(job);
        assertEquals(JobConsumer.JobResult.OK, result);
    }
    }

