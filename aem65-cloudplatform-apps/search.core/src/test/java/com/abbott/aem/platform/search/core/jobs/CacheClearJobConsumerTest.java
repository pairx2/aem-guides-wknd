package com.abbott.aem.platform.search.core.jobs;

import com.abbott.aem.platform.search.coveoconnector.core.cloudfront.CloudFrontUtil;
import com.abbott.aem.platform.search.coveoconnector.core.constants.CommonConstants;
import com.abbott.aem.platform.search.coveoconnector.core.service.CacheClearService;
import com.day.cq.commons.Externalizer;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
import org.apache.http.HttpEntity;
import org.apache.http.HttpHost;
import org.apache.http.ParseException;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.message.BasicHttpRequest;
import org.apache.http.util.EntityUtils;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.api.wrappers.ValueMapDecorator;
import org.apache.sling.event.jobs.Job;
import org.apache.sling.event.jobs.consumer.JobConsumer;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockedStatic;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.junit.jupiter.MockitoSettings;
import org.mockito.quality.Strictness;

import javax.jcr.RepositoryException;
import java.io.IOException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyBoolean;
import static org.mockito.ArgumentMatchers.anyMap;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.nullable;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.lenient;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.mockStatic;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith({MockitoExtension.class})
class CacheClearJobConsumerTest {
    @InjectMocks
    private CacheClearJobConsumer cacheClearJobConsumer;

    @Mock
    private ResourceResolverFactory resolverFactory;
    @Mock
    private CacheClearService configFetch;
    @Mock
    private Job job;
    @Mock
    private CloseableHttpClient httpClient;
    @Mock
    private CloseableHttpResponse httpResponse;

    Iterator<Page> pageIterator;
    MockedStatic<CloudFrontUtil> mockedStaticCF;
    MockedStatic<HttpClientBuilder> mockedStaticHCB;
    MockedStatic<EntityUtils> mockedStaticEU;

    @BeforeEach
    void setUp() throws LoginException, RepositoryException, IOException {
        // Stub data
        String contentPath = "/content/abbott";
        Map<String, Object> resourcePropmap = new HashMap<>();
        resourcePropmap.put("contentFragment", true);

        // Mock the necessary objects and methods
        ValueMap valueMap = new ValueMapDecorator(resourcePropmap);
        ResourceResolver resolver = mock(ResourceResolver.class);
        Resource resource = mock(Resource.class);
        PageManager pageManager = mock(PageManager.class);
        Page page = mock(Page.class);
        Externalizer externalizer = mock(Externalizer.class);
        pageIterator = mock(Iterator.class);
        HttpClientBuilder httpClientBuilder = mock(HttpClientBuilder.class);
        HttpEntity httpEntity = mock(HttpEntity.class);

        // Mock for clearFullCDNCache
        when(resolverFactory.getServiceResourceResolver(anyMap())).thenReturn(resolver);

        when(resolver.adaptTo(PageManager.class)).thenReturn(pageManager);
        when(pageManager.getPage(contentPath)).thenReturn(page);
        lenient().when(pageManager.getPage("/content/an/similac/us/cache")).thenReturn(page);
        when(page.listChildren()).thenReturn(pageIterator);
        when(pageIterator.hasNext()).thenReturn(true, true, false);
        when(pageIterator.next()).thenReturn(page);
        when(page.getPath()).thenReturn("/content/an/similac/us/cache");

        // Mock for clearCDNCache
        mockedStaticCF = mockStatic(CloudFrontUtil.class);
        mockedStaticHCB = mockStatic(HttpClientBuilder.class);
        mockedStaticEU = mockStatic(EntityUtils.class);

        when(resolver.getResource("/content/an/similac/us/cache")).thenReturn(resource);
        when(resolver.adaptTo(Externalizer.class)).thenReturn(externalizer);
        when(resource.adaptTo(ValueMap.class)).thenReturn(valueMap);
        when(CloudFrontUtil.getExternalizeDomainName(resource, resolver, true)).thenReturn("author");
        when(resolver.map("/content")).thenReturn(contentPath);
        when(externalizer.externalLink(resolver, "author", contentPath))
                .thenReturn("https://abbott.com/content/publish-cache-clear");
        lenient().when(externalizer.externalLink(resolver, "dev2preview.pro.freestyle.abbott", contentPath))
                .thenReturn("https://dev2preview.abbott.com/content/publish-cache-clear");

        when(CloudFrontUtil.getShortURL("/content/an/similac/us/cache.html",
                "abbott.com/publish-cache-clear", resolver))
                .thenReturn("/content/an/similac/us/publish/cache clear");
       lenient().when(CloudFrontUtil.getShortURL("/content/an/similac/us/cache.html",
                "dev2preview.abbott.com/publish-cache-clear", resolver))
                .thenReturn("/content/an/similac/us/publish/cache clear");

        when(configFetch.getPublishHost()).thenReturn("abbott.com");
        when(HttpClientBuilder.create()).thenReturn(httpClientBuilder);
        when(httpClientBuilder.setDefaultRequestConfig(any())).thenReturn(httpClientBuilder);
        when(httpClientBuilder.build()).thenReturn(httpClient);
        when(httpClient.execute(any(HttpHost.class), any(BasicHttpRequest.class))).thenReturn(httpResponse);
        when(httpResponse.getEntity()).thenReturn(httpEntity);
        when(EntityUtils.toString(httpEntity)).thenReturn("cache cleared");
    }

    @Test
    void testProcessJob() {
        when(job.getProperty(CacheClearJobConsumer.ACTION_PATH)).thenReturn("/content/abbott/cacheflush");
        when(job.getProperty(CacheClearJobConsumer.ACTION_TYPE)).thenReturn("cacheflush");
        when(job.getProperty(CommonConstants.AGENT_ID)).thenReturn("author");
        when(CloudFrontUtil.getPreviewDomain(anyString(), nullable(String.class), anyString())).thenReturn("author");

        JobConsumer.JobResult actual = cacheClearJobConsumer.process(job);
        assertEquals(JobConsumer.JobResult.OK, actual);
    }


    @Test
    void testProcessJob_whenNoChildPages() {
        when(job.getProperty(CacheClearJobConsumer.ACTION_PATH)).thenReturn("/content/abbott/cacheflush");
        when(job.getProperty(CacheClearJobConsumer.ACTION_TYPE)).thenReturn("cacheflush");
        when(job.getProperty(CommonConstants.AGENT_ID)).thenReturn("author");
        when(CloudFrontUtil.getPreviewDomain(anyString(), nullable(String.class), anyString())).thenReturn("author");


        when(pageIterator.hasNext()).thenReturn(true, false);

        JobConsumer.JobResult actual = cacheClearJobConsumer.process(job);
        assertEquals(JobConsumer.JobResult.OK, actual);
    }

    @Test
    @MockitoSettings(strictness = Strictness.LENIENT)
    void testProcessJob_whenPublishDomain() throws RepositoryException {
        when(CloudFrontUtil.getDomain(any(String.class), any(ResourceResolver.class)))
                .thenReturn("publish");
        when(CloudFrontUtil.getPreviewDomain(anyString(), nullable(String.class), anyString())).thenReturn("publish");

        when(job.getProperty(CacheClearJobConsumer.ACTION_PATH)).thenReturn("/content/abbott/cacheflush");
        when(job.getProperty(CacheClearJobConsumer.ACTION_TYPE)).thenReturn("cacheflush");
        when(job.getProperty(CommonConstants.AGENT_ID)).thenReturn("publish");

        JobConsumer.JobResult actual = cacheClearJobConsumer.process(job);
        assertEquals(JobConsumer.JobResult.OK, actual);
    }

    @Test
    @MockitoSettings(strictness = Strictness.LENIENT)
    void testProcessJob_whenEmptyPath() throws LoginException {
        when(job.getProperty(CacheClearJobConsumer.ACTION_PATH)).thenReturn("");
        when(job.getProperty(CacheClearJobConsumer.ACTION_TYPE)).thenReturn("cacheflush");
        when(job.getProperty(CommonConstants.AGENT_ID)).thenReturn("publish");

        JobConsumer.JobResult actual = cacheClearJobConsumer.process(job);
        assertEquals(JobConsumer.JobResult.OK, actual);
        // though job result will always be ok for empty path but still
        // need to validate methods that is expected to be called/not
        verify(resolverFactory, never()).getServiceResourceResolver(anyMap());
    }

    @Test
    @MockitoSettings(strictness = Strictness.LENIENT)
    void testProcessJob_whenLoginException_clearFullCDNCache() throws LoginException {
        when(job.getProperty(CacheClearJobConsumer.ACTION_PATH)).thenReturn("/content/cacheflush");
        when(job.getProperty(CacheClearJobConsumer.ACTION_TYPE)).thenReturn("cdnflush");

        doThrow(new LoginException("LE")).when(resolverFactory).getServiceResourceResolver(anyMap());

        JobConsumer.JobResult actual = cacheClearJobConsumer.process(job);
        assertEquals(JobConsumer.JobResult.OK, actual);
        // though job result will always be ok in case of exception as it is handled gracefully but
        // need to validate methods that is not expected to be called
        verify(configFetch, never()).getPublishHost();
    }

    @Test
    @MockitoSettings(strictness = Strictness.LENIENT)
    void testProcessJob_whenLoginException_clearCDNCache() throws LoginException {
        when(job.getProperty(CacheClearJobConsumer.ACTION_PATH)).thenReturn("/content/cdnflush");
        when(job.getProperty(CacheClearJobConsumer.ACTION_TYPE)).thenReturn("cdnflush");

        doThrow(new LoginException("LE")).when(resolverFactory).getServiceResourceResolver(anyMap());

        JobConsumer.JobResult actual = cacheClearJobConsumer.process(job);
        assertEquals(JobConsumer.JobResult.OK, actual);
        // though job result will always be ok in case of exception as it is handled gracefully but
        // need to validate methods that is not expected to be called
        verify(configFetch, never()).getPublishHost();
    }

    @Test
    void testProcessJob_whenParseException() throws IOException {
        when(job.getProperty(CacheClearJobConsumer.ACTION_PATH)).thenReturn("/content/abbott/cacheflush");
        when(job.getProperty(CacheClearJobConsumer.ACTION_TYPE)).thenReturn("cacheflush");
        when(job.getProperty(CommonConstants.AGENT_ID)).thenReturn("author");
        when(CloudFrontUtil.getPreviewDomain(anyString(), nullable(String.class), anyString())).thenReturn("author");
        when(EntityUtils.toString(any(HttpEntity.class))).thenThrow(new ParseException("PE"));

        JobConsumer.JobResult actual = cacheClearJobConsumer.process(job);
        assertEquals(JobConsumer.JobResult.OK, actual);
        // though job result will always be ok in case of exception as it is handled gracefully but
        // need to validate methods that is not expected to be called
        verify(httpResponse, never()).getStatusLine();
    }

    @Test
    void testProcessJob_whenIOException() throws IOException {
        when(job.getProperty(CacheClearJobConsumer.ACTION_PATH)).thenReturn("/content/abbott/cacheflush");
        when(job.getProperty(CacheClearJobConsumer.ACTION_TYPE)).thenReturn("cacheflush");
        when(job.getProperty(CommonConstants.AGENT_ID)).thenReturn("author");
        when(CloudFrontUtil.getPreviewDomain(anyString(), nullable(String.class), anyString())).thenReturn("author");

        when(EntityUtils.toString(any(HttpEntity.class))).thenThrow(new IOException("IOE"));

        JobConsumer.JobResult actual = cacheClearJobConsumer.process(job);
        assertEquals(JobConsumer.JobResult.OK, actual);
        // though job result will always be ok in case of exception as it is handled gracefully but
        // need to validate methods that is not expected to be called
        verify(httpResponse, never()).getStatusLine();
    }

    @Test
    @MockitoSettings(strictness = Strictness.LENIENT)
    void testProcessJob_whenRepositoryException() throws RepositoryException {
        when(job.getProperty(CacheClearJobConsumer.ACTION_PATH)).thenReturn("/content/abbott/cacheflush");
        when(job.getProperty(CacheClearJobConsumer.ACTION_TYPE)).thenReturn("cacheflush");
        when(CloudFrontUtil.getExternalizeDomainName(any(Resource.class), any(ResourceResolver.class), anyBoolean()))
                .thenThrow(new RepositoryException("RE"));

        JobConsumer.JobResult actual = cacheClearJobConsumer.process(job);
        assertEquals(JobConsumer.JobResult.OK, actual);
        // though job result will always be ok in case of exception as it is handled gracefully but
        // need to validate methods that is not expected to be called
        verify(httpResponse, never()).getStatusLine();
    }

    @Test
    @MockitoSettings(strictness = Strictness.LENIENT)
    void testProcessJob_whenPreviewDomain() {
        when(job.getProperty(CacheClearJobConsumer.ACTION_PATH)).thenReturn("/content/abbott/cacheflush");
        when(job.getProperty(CacheClearJobConsumer.ACTION_TYPE)).thenReturn("cacheflush");
        when(job.getProperty(CommonConstants.AGENT_ID)).thenReturn("preview");

        when(CloudFrontUtil.getDomain(any(String.class), any(ResourceResolver.class)))
                .thenReturn("adc_pro_freestyle_abbott");
        when(CloudFrontUtil.isPreview(anyString())).thenReturn(true);
        when(CloudFrontUtil.getPreviewDomain(anyString(), nullable(String.class), anyString()))
                .thenReturn("dev2preview.pro.freestyle.abbott");
        when(configFetch.getPreviewHost()).thenReturn("preview-p33328-e114754.adobeaemcloud.com");
        when(configFetch.getPreviewEdgeKey()).thenReturn("edge*****key");
        when(configFetch.getPreviewPurgeKey()).thenReturn("purge*****key");
        when(CloudFrontUtil.getEnvironment(anyString())).thenReturn("dev2preview");



        JobConsumer.JobResult actual = cacheClearJobConsumer.process(job);
        assertEquals(JobConsumer.JobResult.OK, actual);
    }

    @AfterEach
    void tearDown(){
        mockedStaticCF.close();
        mockedStaticHCB.close();
        mockedStaticEU.close();
    }
}
