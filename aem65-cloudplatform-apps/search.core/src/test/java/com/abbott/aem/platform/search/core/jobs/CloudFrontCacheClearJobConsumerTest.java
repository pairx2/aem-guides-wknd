package com.abbott.aem.platform.search.core.jobs;

import com.abbott.aem.platform.search.coveoconnector.core.cloudfront.CloudFrontUtil;
import com.abbott.aem.platform.search.coveoconnector.core.service.CacheClearService;
import org.apache.http.HttpEntity;
import org.apache.http.StatusLine;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.apache.sling.event.jobs.Job;
import org.apache.sling.event.jobs.consumer.JobConsumer;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockedStatic;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.junit.jupiter.MockitoSettings;
import org.mockito.quality.Strictness;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.anyMap;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.ArgumentMatchers.nullable;
import static org.mockito.Mockito.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.mockStatic;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith({MockitoExtension.class})
class CloudFrontCacheClearJobConsumerTest {

    @Mock
    private ResourceResolverFactory resolverFactory;

    @Mock
    private CacheClearService configFetch;

    @Mock
    private CloseableHttpClient httpClient;

    @Mock
    private CloseableHttpResponse httpResponse;

    @InjectMocks
    private CloudFrontCacheClearJobConsumer jobConsumer;

    @Test
    void testProcessJob_whenInvalidActionType() throws LoginException {
        Job job = mock(Job.class);
        when(job.getProperty("actionType")).thenReturn("invalidActionType");
        when(job.getProperty("actionPath")).thenReturn("/content/abbott");

        JobConsumer.JobResult result = jobConsumer.process(job);
        assertEquals(JobConsumer.JobResult.OK, result);
        verify(resolverFactory, never()).getServiceResourceResolver(anyMap());
    }

    @Test
    void testProcessJob_whenBlankActionPath() throws LoginException {
        Job job = mock(Job.class);
        when(job.getProperty("actionType")).thenReturn("activate");

        JobConsumer.JobResult result = jobConsumer.process(job);
        assertEquals(JobConsumer.JobResult.OK, result);
        verify(resolverFactory, never()).getServiceResourceResolver(anyMap());
    }

    @Test
    void testProcessJob_whenDistributionConfigEmpty() throws LoginException {
        String actionPath = "/content/an/similac/us/cache delete";
        Job job = mock(Job.class);

        when(job.getProperty("actionType")).thenReturn("delete");
        when(job.getProperty("actionPath")).thenReturn(actionPath);

        //Mock necessary behaviour for resolverFactory
        //Mock for doActivate
        String domainName = "author";
        String varDomainMapping = "/var/cacheflushconfig/domainmappings";
        Map<String,String> mapping = new HashMap<>();
        mapping.put("www", "");

        MockedStatic<CloudFrontUtil> mockedCloudUtil = mockStatic(CloudFrontUtil.class);
        ResourceResolver resolver = mock(ResourceResolver.class);
        when(resolverFactory.getServiceResourceResolver(anyMap())).thenReturn(resolver);
        when(CloudFrontUtil.getDomain(actionPath, resolver)).thenReturn(domainName);
        when(CloudFrontUtil.getEnvironment(anyString())).thenReturn("www");
        when(CloudFrontUtil.getPreviewDomain(anyString(), anyString(), nullable(String.class)))
                .thenReturn("www");
        when(CloudFrontUtil.getMapping(varDomainMapping,"www",resolver)).thenReturn(mapping);

        JobConsumer.JobResult result = jobConsumer.process(job);
        assertEquals(JobConsumer.JobResult.OK,result);
        verify(httpResponse, never()).getEntity();

        //close the static mock
        mockedCloudUtil.close();
    }

    @Test
    @MockitoSettings(strictness = Strictness.LENIENT)
    void testProcessJob_whenDelete() throws LoginException, IOException {
        String actionPath = "/content/an/similac/us/cache delete";
        Job job = mock(Job.class);

        when(job.getProperty("actionType")).thenReturn("delete");
        when(job.getProperty("actionPath")).thenReturn(actionPath);

        //Mock necessary behaviour for resolverFactory
        //Mock for doActivate
        String url = "https://abbott.com/content/an/similac/us/cacheflush/publish-cache";
        String shortUrl = "https://abbott.com/content/an/similac/us/publish cache/cacheflush";
        String domainName = "author";
        String varDomainMapping = "/var/cacheflushconfig/domainmappings";
        String cloudfrontUrl = "https://cloudfront.amazonaws.com/2010-11-01/distribution";
        Map<String,String> mapping = new HashMap<>();
        mapping.put("www", "E3VN7ZWISKBD7Z");

        MockedStatic<CloudFrontUtil> mockedCloudUtil = mockStatic(CloudFrontUtil.class);
        ResourceResolver resolver = mock(ResourceResolver.class);
        when(resolverFactory.getServiceResourceResolver(anyMap())).thenReturn(resolver);
        when(CloudFrontUtil.getDomain(actionPath, resolver)).thenReturn(domainName);
        when(CloudFrontUtil.getEnvironment(anyString())).thenReturn("www");
        when(CloudFrontUtil.getPreviewDomain(anyString(), anyString(), nullable(String.class)))
                .thenReturn("www");
        when(CloudFrontUtil.getMapping(varDomainMapping,"www",resolver)).thenReturn(mapping);
        when(CloudFrontUtil.getEndPointURL("E3VN7ZWISKBD7Z", cloudfrontUrl)).thenReturn(url);
        when(CloudFrontUtil.getShortURL(actionPath+".html", "www", resolver)).thenReturn(shortUrl);

        //Mock for sendRequest
        //Mock necessary behaviour for configFetch and resolverFactory
        when(configFetch.getAccessKey()).thenReturn("yourAccessKey");
        when(configFetch.getSecretKey()).thenReturn("yourSecretKey");

        HttpClientBuilder httpClientBuilder = mock(HttpClientBuilder.class);
        HttpEntity httpEntity = mock(HttpEntity.class);
        StatusLine statusLine = mock(StatusLine.class);
        MockedStatic<HttpClientBuilder> mockedStaticHCB = mockStatic(HttpClientBuilder.class);
        MockedStatic<EntityUtils> mockedStaticEU = mockStatic(EntityUtils.class);

        when(HttpClientBuilder.create()).thenReturn(httpClientBuilder);
        when(httpClientBuilder.setDefaultRequestConfig(any())).thenReturn(httpClientBuilder);
        when(httpClientBuilder.build()).thenReturn(httpClient);
        when(httpClient.execute(any(HttpPost.class))).thenReturn(httpResponse);
        when(httpResponse.getStatusLine()).thenReturn(statusLine);
        when(httpResponse.getEntity()).thenReturn(httpEntity);
        when(EntityUtils.toString(httpEntity)).thenReturn("cache cleared");

        JobConsumer.JobResult result = jobConsumer.process(job);
        assertEquals(JobConsumer.JobResult.OK,result);
        verify(httpResponse, times(1)).getEntity();

        //close the static mock
        mockedCloudUtil.close();
        mockedStaticHCB.close();
        mockedStaticEU.close();
    }

    @Test
    @MockitoSettings(strictness = Strictness.LENIENT)
    void testProcessJob_whenClientProtocolException() throws LoginException, IOException {
        String actionPath = "/content/an/similac/us/cache delete";
        Job job = mock(Job.class);

        when(job.getProperty("actionType")).thenReturn("delete");
        when(job.getProperty("actionPath")).thenReturn(actionPath);

        //Mock necessary behaviour for resolverFactory
        //Mock for doActivate
        String url = "https://abbott.com/content/an/similac/us/cacheflush/publish-cache";
        String shortUrl = "https://abbott.com/content/an/similac/us/publish cache/cacheflush";
        String domainName = "author";
        String varDomainMapping = "/var/cacheflushconfig/domainmappings";
        String cloudfrontUrl = "https://cloudfront.amazonaws.com/2010-11-01/distribution";
        Map<String,String> mapping = new HashMap<>();
        mapping.put("www", "E3VN7ZWISKBD7Z");

        MockedStatic<CloudFrontUtil> mockedCloudUtil = mockStatic(CloudFrontUtil.class);
        ResourceResolver resolver = mock(ResourceResolver.class);
        when(resolverFactory.getServiceResourceResolver(anyMap())).thenReturn(resolver);
        when(CloudFrontUtil.getDomain(actionPath, resolver)).thenReturn(domainName);
        when(CloudFrontUtil.getEnvironment(anyString())).thenReturn("www");
        when(CloudFrontUtil.getPreviewDomain(anyString(), anyString(), nullable(String.class)))
                .thenReturn("www");
        when(CloudFrontUtil.getMapping(varDomainMapping,"www",resolver)).thenReturn(mapping);
        when(CloudFrontUtil.getEndPointURL("E3VN7ZWISKBD7Z", cloudfrontUrl)).thenReturn(url);
        when(CloudFrontUtil.getShortURL(actionPath+".html", "www", resolver)).thenReturn(shortUrl);

        //Mock for sendRequest
        //Mock necessary behaviour for configFetch and resolverFactory
        when(configFetch.getAccessKey()).thenReturn("yourAccessKey");
        when(configFetch.getSecretKey()).thenReturn("yourSecretKey");

        HttpClientBuilder httpClientBuilder = mock(HttpClientBuilder.class);
        MockedStatic<HttpClientBuilder> mockedStaticHCB = mockStatic(HttpClientBuilder.class);
        MockedStatic<EntityUtils> mockedStaticEU = mockStatic(EntityUtils.class);

        when(HttpClientBuilder.create()).thenReturn(httpClientBuilder);
        when(httpClientBuilder.setDefaultRequestConfig(any())).thenReturn(httpClientBuilder);
        when(httpClientBuilder.build()).thenReturn(httpClient);
        when(httpClient.execute(any(HttpPost.class))).thenThrow(new ClientProtocolException("CPE"));

        JobConsumer.JobResult result = jobConsumer.process(job);
        assertEquals(JobConsumer.JobResult.OK,result);
        verify(httpResponse, never()).getEntity();

        //close the static mock
        mockedCloudUtil.close();
        mockedStaticHCB.close();
        mockedStaticEU.close();
    }

    @Test
    @MockitoSettings(strictness = Strictness.LENIENT)
    void testProcessJob_whenIOException() throws LoginException, IOException {
        String actionPath = "/content/an/similac/us/cache delete";
        Job job = mock(Job.class);

        when(job.getProperty("actionType")).thenReturn("delete");
        when(job.getProperty("actionPath")).thenReturn(actionPath);

        //Mock necessary behaviour for resolverFactory
        //Mock for doActivate
        String url = "https://abbott.com/content/an/similac/us/cacheflush/publish-cache";
        String shortUrl = "https://abbott.com/content/an/similac/us/publish cache/cacheflush";
        String domainName = "author";
        String varDomainMapping = "/var/cacheflushconfig/domainmappings";
        String cloudfrontUrl = "https://cloudfront.amazonaws.com/2010-11-01/distribution";
        Map<String,String> mapping = new HashMap<>();
        mapping.put("www", "E3VN7ZWISKBD7Z");

        MockedStatic<CloudFrontUtil> mockedCloudUtil = mockStatic(CloudFrontUtil.class);
        ResourceResolver resolver = mock(ResourceResolver.class);
        when(resolverFactory.getServiceResourceResolver(anyMap())).thenReturn(resolver);
        when(CloudFrontUtil.getDomain(actionPath, resolver)).thenReturn(domainName);
        when(CloudFrontUtil.getMapping(varDomainMapping,"www",resolver)).thenReturn(mapping);
        when(CloudFrontUtil.getEnvironment(anyString())).thenReturn("www");
        when(CloudFrontUtil.getPreviewDomain(anyString(), anyString(), nullable(String.class)))
                .thenReturn("www");
        when(CloudFrontUtil.getEndPointURL("E3VN7ZWISKBD7Z", cloudfrontUrl)).thenReturn(url);
        when(CloudFrontUtil.getShortURL(actionPath+".html", "www", resolver)).thenReturn(shortUrl);

        //Mock for sendRequest
        //Mock necessary behaviour for configFetch and resolverFactory
        when(configFetch.getAccessKey()).thenReturn("yourAccessKey");
        when(configFetch.getSecretKey()).thenReturn("yourSecretKey");

        HttpClientBuilder httpClientBuilder = mock(HttpClientBuilder.class);
        MockedStatic<HttpClientBuilder> mockedStaticHCB = mockStatic(HttpClientBuilder.class);
        MockedStatic<EntityUtils> mockedStaticEU = mockStatic(EntityUtils.class);

        when(HttpClientBuilder.create()).thenReturn(httpClientBuilder);
        when(httpClientBuilder.setDefaultRequestConfig(any())).thenReturn(httpClientBuilder);
        when(httpClientBuilder.build()).thenReturn(httpClient);
        when(httpClient.execute(any(HttpPost.class))).thenThrow(new IOException("IO"));

        JobConsumer.JobResult result = jobConsumer.process(job);
        assertEquals(JobConsumer.JobResult.OK,result);
        verify(httpResponse, never()).getEntity();

        //close the static mock
        mockedCloudUtil.close();
        mockedStaticHCB.close();
        mockedStaticEU.close();
    }

    @Test
    void testProcessJob_whenLoginException() throws LoginException {
        String actionPath = "/content/an/similac/us/cache delete";
        Job job = mock(Job.class);

        when(job.getProperty("actionType")).thenReturn("delete");
        when(job.getProperty("actionPath")).thenReturn(actionPath);

        //Mock necessary behaviour for resolverFactory
        //Mock for doActivate new HashMap<>();
        when(resolverFactory.getServiceResourceResolver(anyMap())).thenThrow(new LoginException("LE"));

        JobConsumer.JobResult result = jobConsumer.process(job);
        assertEquals(JobConsumer.JobResult.OK,result);
        verify(httpResponse, never()).getEntity();
    }
}
