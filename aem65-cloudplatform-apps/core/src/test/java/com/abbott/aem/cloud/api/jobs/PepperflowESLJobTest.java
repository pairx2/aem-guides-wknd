package com.abbott.aem.cloud.api.jobs;

import com.abbott.aem.cloud.api.configuration.ApiRunJobConfiguration;
import com.abbott.aem.cloud.api.configuration.ESLDomainURLService;
import com.day.cq.replication.ReplicationException;
import com.day.cq.replication.ReplicationStatus;
import com.day.cq.replication.Replicator;
import com.day.cq.search.PredicateGroup;
import com.day.cq.search.Query;
import com.day.cq.search.QueryBuilder;
import com.day.cq.search.result.Hit;
import com.day.cq.search.result.SearchResult;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
import com.day.cq.wcm.api.Revision;
import com.day.cq.wcm.api.WCMException;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.http.HttpEntity;
import org.apache.http.HttpStatus;
import org.apache.http.StatusLine;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.apache.sling.event.jobs.Job;
import org.apache.sling.event.jobs.consumer.JobConsumer;
import org.apache.sling.event.jobs.consumer.JobExecutionContext;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockedStatic;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.junit.jupiter.MockitoSettings;
import org.mockito.quality.Strictness;

import javax.jcr.Node;
import javax.jcr.RepositoryException;
import javax.jcr.Session;
import java.io.IOException;
import java.util.Collections;

import static junitx.framework.Assert.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.mockStatic;
import static org.mockito.Mockito.when;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
@MockitoSettings(strictness = Strictness.LENIENT)
class PepperflowESLJobTest {
    @Mock
    private Job job;

    @Mock
    private JobExecutionContext context;

    @InjectMocks
    private PepperflowESLJob pepperflowESLJob;

    private final AemContext aemContext = new AemContext();

    @Mock
    private ResourceResolverFactory factory;

    @Mock
    private ResourceResolver resourceResolver;

    @Mock
    private QueryBuilder builder;

    @Mock
    private Replicator replicator;

    @Mock
    private ApiRunJobConfiguration keyConfig;

    @Mock
    private ESLDomainURLService domainConfig;

    @Mock
    private PageManager pageManager;

    @Mock
    private Hit hit;

    @BeforeEach
    void setUp() throws LoginException, RepositoryException {
        Session session = Mockito.mock(Session.class);
        Query query = Mockito.mock(Query.class);
        SearchResult result = Mockito.mock(SearchResult.class);

        when(factory.getServiceResourceResolver(any())).thenReturn(resourceResolver);
        when(resourceResolver.adaptTo(Session.class)).thenReturn(session);
        when(builder.createQuery(any(PredicateGroup.class), eq(session))).thenReturn(query);
        when(query.getResult()).thenReturn(result);
        when(result.getHits()).thenReturn(Collections.singletonList(hit));
        when(hit.getPath()).thenReturn("/content/dam/abbott");

        //for unlockCreateVersion method
        Node node= mock(Node.class);
        when(resourceResolver.adaptTo(PageManager.class)).thenReturn(pageManager);
        when(session.getNode("/content/dam/abbott/jcr:content")).thenReturn(node);

        // Initialize the AemContext
        aemContext.registerService(ResourceResolverFactory.class, factory);
        aemContext.registerService(Replicator.class, replicator);
        aemContext.registerService(QueryBuilder.class, builder);
        aemContext.registerService(ApiRunJobConfiguration.class, keyConfig);
        aemContext.registerService(ESLDomainURLService.class, domainConfig);
    }

    @Test
    void testProcessJob_whenPagePublished() throws Exception {
        String json = "{\"data\": {\"aemWebCollection\": {\"skip\": 1, \"limit\": 1, \"total\": 2, \"nodes\": [{\"sys\": {\"documentId\": \"documentId\"}, \"fields\": {}, \"data\": {}, \"audit\": [{\"id\": \"id\", \"series\": \"series\", \"timestamp\": \"2023-09-20T16:42:53.123Z\", \"version\": {}, \"auditAction\": \"modified\", \"data\": {\"oldState\": \"old\", \"newState\": \"LIVE\"}}]},{\"sys\": {\"documentId\": \"documentId\"}, \"fields\": {}, \"data\": {}, \"audit\": [{\"id\": \"id\", \"series\": \"series\", \"timestamp\": \"2023-09-24T16:42:53.123Z\", \"version\": {}, \"auditAction\": \"modified\", \"data\": {\"oldState\": \"old\", \"newState\": \"DELETE\"}}]}]}}}";
        // Mock the job properties
        Page page = mock(Page.class);
        Revision revision = mock(Revision.class);
        when(job.getProperty(PepperflowESLJob.PAYLOADJSON)).thenReturn(json);
        when(resourceResolver.adaptTo(PageManager.class)).thenReturn(pageManager);
        when(pageManager.getPage(anyString())).thenReturn(page);
        when(page.isLocked()).thenReturn(true);

        when(pageManager.createRevision(page, "PepperFlow API Version", "documentId")).thenReturn(revision);

        // Test the process method
        JobConsumer.JobResult jobResult = pepperflowESLJob.process(job);
        assertEquals("OK", jobResult.name());

    }

    @Test
    void testProcessJob_whenPagePublished_repositoryExceptionInSearchUUID() throws Exception {
        String json = "{\"data\": {\"aemWebCollection\": {\"skip\": 1, \"limit\": 1, \"total\": 2, \"nodes\": [{\"sys\": {\"documentId\": \"documentId\"}, \"fields\": {}, \"data\": {}, \"audit\": [{\"id\": \"id\", \"series\": \"series\", \"version\": {}, \"auditAction\": \"modified\", \"data\": {\"oldState\": \"old\", \"newState\": \"LIVE\"}}]}]}}}";
        // Mock the job properties
        Page page = mock(Page.class);
        ReplicationStatus status = mock(ReplicationStatus.class);
        when(job.getProperty(PepperflowESLJob.PAYLOADJSON)).thenReturn(json);

        when(hit.getPath()).thenThrow(new RepositoryException("RE"));

        when(resourceResolver.adaptTo(PageManager.class)).thenReturn(pageManager);
        when(pageManager.getPage(null)).thenReturn(page);
        when(page.isLocked()).thenReturn(false);

        when(replicator.getReplicationStatus(any(), any())).thenReturn(status);
        when(status.toString()).thenReturn("PUBLISHED");
        // Test the process method
        JobConsumer.JobResult jobResult = pepperflowESLJob.process(job);
        assertEquals("OK", jobResult.name());
    }

    @Test
    void testProcessJob_whenPagePublished_WCMException() throws Exception {
        String json = "{\"data\": {\"aemWebCollection\": {\"skip\": 1, \"limit\": 1, \"total\": 2, \"nodes\": [{\"sys\": {}, \"fields\": {}, \"data\": {}, \"audit\": [{\"id\": \"id\", \"series\": \"series\", \"version\": {}, \"auditAction\": \"modified\", \"data\": {\"oldState\": \"old\", \"newState\": \"LIVE\"}}]}]}}}";
        // Mock the job properties
        Page page = mock(Page.class);
        when(job.getProperty(PepperflowESLJob.PAYLOADJSON)).thenReturn(json);
        when(resourceResolver.adaptTo(PageManager.class)).thenReturn(pageManager);
        when(pageManager.getPage(anyString())).thenReturn(page);
        when(page.isLocked()).thenReturn(false);

        when(pageManager.createRevision(page, "PepperFlow API Version", null)).thenThrow(new WCMException("WCME"));

        // Test the process method
        JobConsumer.JobResult jobResult = pepperflowESLJob.process(job);
        assertEquals("OK", jobResult.name());
    }

    @Test
    void testProcessJob_whenPagePublished_RepositoryException() throws Exception {
        String json = "{\"data\": {\"aemWebCollection\": {\"skip\": 1, \"limit\": 1, \"total\": 2, \"nodes\": [{\"sys\": {}, \"fields\": {}, \"data\": {}, \"audit\": [{\"id\": \"id\", \"series\": \"series\", \"version\": {}, \"auditAction\": \"modified\", \"data\": {\"oldState\": \"old\", \"newState\": \"LIVE\"}}]}]}}}";
        // Mock the job properties
        Page page = mock(Page.class);
        when(job.getProperty(PepperflowESLJob.PAYLOADJSON)).thenReturn(json);
        when(resourceResolver.adaptTo(PageManager.class)).thenReturn(pageManager);
        when(pageManager.getPage(anyString())).thenReturn(page);
        when(page.isLocked()).thenReturn(false);

        when(pageManager.createRevision(page, "PepperFlow API Version", null)).thenThrow(new WCMException("WCME"));
        doThrow(new ReplicationException("RE")).when(replicator).replicate(any(), any(), anyString());

        // Test the process method
        JobConsumer.JobResult jobResult = pepperflowESLJob.process(job);
        assertEquals("OK", jobResult.name());
    }

    @Test
    void testProcessJob_whenPageNotPublished() {
        String json = "{\"data\": {\"aemWebCollection\": {\"skip\": 1, \"limit\": 1, \"total\": 2, \"nodes\": [\n" +
                "\t\t{\"sys\": {\"documentId\": \"documentId\"}, \"fields\": {}, \"data\": {}, \"audit\": [{\"id\": \"id\", \"series\": \"series\", \"timestamp\": \"2023-09-20T16:42:53.123Z\", \"version\": {}, \"auditAction\": \"modified\", \"data\": {\"oldState\": \"old\", \"newState\": \"DEACTIVATE\"}}]},\n" +
                "\t\t{\"sys\": {\"documentId\": \"documentId\"}, \"fields\": {}, \"data\": {}, \"audit\": [{\"id\": \"id\", \"series\": \"series\", \"timestamp\": \"2023-09-24T16:42:53.123Z\", \"version\": {}, \"auditAction\": \"modified\", \"data\": {\"oldState\": \"old\", \"newState\": \"DELETE\"}}]},\n" +
                "\t\t{\"sys\": {\"documentId\": \"documentId\"}, \"fields\": {}, \"data\": {}, \"audit\": [{\"id\": \"id\", \"series\": \"series\", \"timestamp\": \"2023-09-24T16:42:53.123Z\", \"version\": {}, \"auditAction\": \"modified\", \"data\": {\"oldState\": \"old\", \"newState\": \"EXPIRED\"}}]}\n" +
                "\t]\n" +
                "  }\n" +
                " }\n" +
                "}";
        // Mock the job properties
        ReplicationStatus status = mock(ReplicationStatus.class);
        when(job.getProperty(PepperflowESLJob.PAYLOADJSON)).thenReturn(json);
        when(resourceResolver.adaptTo(PageManager.class)).thenReturn(pageManager);

        when(replicator.getReplicationStatus(any(), any())).thenReturn(status);
        when(status.toString()).thenReturn("DEACTIVATED");

        // Test the process method
        JobConsumer.JobResult jobResult = pepperflowESLJob.process(job);
        assertEquals("OK", jobResult.name());
    }

    @Test
    void testProcessJobFailure_whenLoginException() throws Exception {
        String json = "{\"data\": {\"aemWebCollection\": {\"skip\": 1, \"limit\": 1, \"total\": 2, \"nodes\": [{\"sys\": {}, \"fields\": {}, \"data\": {}, \"audit\": [{\"id\": \"id\", \"series\": \"series\", \"version\": {}, \"auditAction\": \"modified\", \"data\": {\"oldState\": \"old\", \"newState\": \"new\"}}]}]}}}";
        // Mock the job properties
        MockedStatic<HttpClients> mockedStaticClient = mockStatic(HttpClients.class);
        CloseableHttpClient httpClient = mock(CloseableHttpClient.class);

        when(factory.getServiceResourceResolver(any())).thenThrow(new LoginException("LE"));
        when(job.getProperty(PepperflowESLJob.PAYLOADJSON)).thenReturn(json);
        when(HttpClients.createDefault()).thenReturn(httpClient);
        when(httpClient.execute(any(HttpPost.class))).thenThrow(new IOException("IOE"));

        // Test the process method
        JobConsumer.JobResult jobResult = pepperflowESLJob.process(job);
        assertEquals("FAILED", jobResult.name());
        mockedStaticClient.close();
    }

    @Test
    void testProcessJobFailure_whenInvalidPayload() throws Exception {
        // Mock the job properties
        MockedStatic<HttpClients> mockedStaticClient = mockStatic(HttpClients.class);
        MockedStatic<EntityUtils> mockedStaticEntity = mockStatic(EntityUtils.class);

        when(job.getProperty(PepperflowESLJob.PAYLOADJSON)).thenReturn("invalid_json");

        CloseableHttpClient httpClient = mock(CloseableHttpClient.class);
        CloseableHttpResponse response  = mock(CloseableHttpResponse.class);
        StatusLine statusLine  = mock(StatusLine.class);
        HttpEntity entity  = mock(HttpEntity.class);

        when(domainConfig.getHostName()).thenReturn("abbott");
        when(domainConfig.getAccessKey()).thenReturn("access");
        when(domainConfig.getOriginSecret()).thenReturn("secret");
        when(HttpClients.createDefault()).thenReturn(httpClient);
        when(httpClient.execute(any(HttpPost.class))).thenReturn(response);
        when(response.getStatusLine()).thenReturn(statusLine);
        when(statusLine.getStatusCode()).thenReturn(HttpStatus.SC_BAD_REQUEST);
        when(response.getEntity()).thenReturn(entity);

        when(EntityUtils.toString(entity)).thenReturn("response");

        // Test the process method
        JobConsumer.JobResult jobResult = pepperflowESLJob.process(job);
        assertEquals("FAILED", jobResult.name());
        mockedStaticClient.close();
        mockedStaticEntity.close();
    }

    @Test
    void testGetTopic(){
        assertEquals("pepperflow/esl/job", pepperflowESLJob.getTopic());
    }
}

