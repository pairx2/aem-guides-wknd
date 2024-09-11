package com.abbott.aem.cloud.platform.core.workflow;

import com.abbott.aem.cloud.platform.core.constants.CommonConstants;
import com.abbott.aem.cloud.platform.core.services.UpdatedESLConfiguration;
import com.adobe.granite.workflow.WorkflowSession;
import com.adobe.granite.workflow.exec.WorkItem;
import com.adobe.granite.workflow.exec.WorkflowData;
import com.adobe.granite.workflow.metadata.MetaDataMap;
import com.adobe.granite.workflow.metadata.SimpleMetaDataMap;
import com.day.cq.dam.api.Asset;
import com.day.cq.dam.commons.util.AssetReferenceSearch;
import com.day.cq.replication.Replicator;
import io.wcm.testing.mock.aem.junit5.AemContext;
import org.apache.http.HttpEntity;
import org.apache.http.StatusLine;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.apache.jackrabbit.JcrConstants;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockedConstruction;
import org.mockito.MockedStatic;
import org.mockito.junit.jupiter.MockitoExtension;

import javax.jcr.Node;
import javax.jcr.RepositoryException;
import javax.jcr.Session;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import static org.mockito.Mockito.any;
import static org.mockito.Mockito.anyString;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.mockConstruction;
import static org.mockito.Mockito.mockStatic;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ReplicateReferencedAssetsTest {
    AemContext context = new AemContext();

    @InjectMocks
    private ReplicateReferencedAssets replicateReferencedAssets;

    @Mock
    private Replicator replicator;

    @Mock
    private UpdatedESLConfiguration updatedESLConfiguration;

    @Mock
    private ResourceResolver resourceResolver;

    @Mock
    WorkItem workItem;

    @Mock
    WorkflowData workflowData;

    @Mock
    WorkflowSession workflowSession;

    @Mock
    Resource resource;

    @Mock
    Node node;

    MetaDataMap metaDataMap;

    @BeforeEach
    void setUp() {
        metaDataMap = new SimpleMetaDataMap();
        metaDataMap.put("workflowtype", CommonConstants.DEACTIVATION);

        when(workItem.getWorkflowData()).thenReturn(workflowData);
        when(workflowData.getMetaDataMap()).thenReturn(metaDataMap);
        when(workflowData.getPayload()).thenReturn("/content/dam/abbott");
        when(workflowSession.adaptTo(ResourceResolver.class)).thenReturn(resourceResolver);
        when(resourceResolver.getResource("/content/dam/abbott/" + JcrConstants.JCR_CONTENT)).thenReturn(resource);

        when(resource.getName()).thenReturn("test");

        ValueMap valueMap = mock(ValueMap.class);

        when(resource.getValueMap()).thenReturn(valueMap);
        when(resource.adaptTo(Node.class)).thenReturn(node);
        when(valueMap.get("productId", String.class)).thenReturn("12345");
    }

    @Test
    void testExecute_whenAssetFound() throws RepositoryException {
        Asset asset = mock(Asset.class);
        Map<String, Asset> assetMap = new HashMap<>();
        assetMap.put("asset", asset);

        when(node.getSession()).thenReturn(mock(Session.class));
        when(asset.getPath()).thenReturn("/content/dam/abbott");
        MockedConstruction<AssetReferenceSearch> mockedConstruction = mockConstruction(AssetReferenceSearch.class, (mocked, context) -> {
            when(mocked.search()).thenReturn(assetMap);
        });

        replicateReferencedAssets.execute(workItem, workflowSession, metaDataMap);
        verify(asset, times(1)).getPath();

        mockedConstruction.close();
    }

    @Test
    void testExecute_whenAssetFound_approvalWorkflow() throws RepositoryException {
        metaDataMap.put("workflowtype", CommonConstants.ACTIVATION);

        Asset asset = mock(Asset.class);
        Map<String, Asset> assetMap = new HashMap<>();
        assetMap.put("asset", asset);

        when(node.getSession()).thenReturn(mock(Session.class));
        when(asset.getPath()).thenReturn("/content/dam/abbott");
        MockedConstruction<AssetReferenceSearch> mockedConstruction = mockConstruction(AssetReferenceSearch.class, (mocked, context) -> {
            when(mocked.search()).thenReturn(assetMap);
        });

        when(updatedESLConfiguration.getApiUrl()).thenReturn("/bin/abbott");

        replicateReferencedAssets.execute(workItem, workflowSession, metaDataMap);
        verify(resourceResolver, times(1)).getResource(anyString());
        mockedConstruction.close();
    }

    @Test
    void testExecute_whenActivationWorkflow(){
        metaDataMap.put("workflowtype", CommonConstants.ACTIVATION);

        MockedConstruction<AssetReferenceSearch> mockedConstruction = mockConstruction(AssetReferenceSearch.class, (mocked, context) -> {
            when(mocked.search()).thenReturn(new HashMap<>());
        });
        when(updatedESLConfiguration.getApiUrl()).thenReturn("/bin/abbott");

        replicateReferencedAssets.execute(workItem, workflowSession, metaDataMap);
        verify(resourceResolver, times(1)).getResource(anyString());
        mockedConstruction.close();
    }

    @Test
    void testExecute_whenActivationWorkflow_eslFail() throws IOException {

        MockedConstruction<AssetReferenceSearch> mockedConstruction = mockConstruction(AssetReferenceSearch.class, (mocked, context) -> {
            when(mocked.search()).thenReturn(new HashMap<>());
        });
        MockedStatic<HttpClients> mockedStaticClient = mockStatic(HttpClients.class);
        MockedStatic<EntityUtils> mockedStaticEntity = mockStatic(EntityUtils.class);

        CloseableHttpClient httpclient = setMockForExecuteAndEsl();
        when(HttpClients.createDefault()).thenReturn(httpclient);
        when(EntityUtils.toString(any(HttpEntity.class))).thenReturn("{\"status\": \"false\", \"response\": {\"statusReason\": \"success\"}}");

        replicateReferencedAssets.execute(workItem, workflowSession, metaDataMap);
        verify(resourceResolver, times(1)).getResource(anyString());
        verify(httpclient, times(1)).execute(any(HttpPost.class));

        mockedConstruction.close();
        mockedStaticClient.close();
        mockedStaticEntity.close();
    }

    @Test
    void testExecute_whenActivationWorkflow_eslSuccess() throws IOException {

        MockedConstruction<AssetReferenceSearch> mockedConstruction = mockConstruction(AssetReferenceSearch.class, (mocked, context) -> {
            when(mocked.search()).thenReturn(new HashMap<>());
        });
        MockedStatic<HttpClients> mockedStaticClient = mockStatic(HttpClients.class);
        MockedStatic<EntityUtils> mockedStaticEntity = mockStatic(EntityUtils.class);

        CloseableHttpClient httpclient = setMockForExecuteAndEsl();
        when(HttpClients.createDefault()).thenReturn(httpclient);
        when(EntityUtils.toString(any(HttpEntity.class))).thenReturn("{\"status\": \"true\", \"response\": {\"statusReason\": \"success\"}}");

        replicateReferencedAssets.execute(workItem, workflowSession, metaDataMap);
        verify(resourceResolver, times(1)).getResource(anyString());
        verify(httpclient, times(1)).execute(any(HttpPost.class));

        mockedConstruction.close();
        mockedStaticClient.close();
        mockedStaticEntity.close();
    }

    @Test
    void testExecute_whenActivationWorkflow_eslNoResponse() throws IOException {

        MockedConstruction<AssetReferenceSearch> mockedConstruction = mockConstruction(AssetReferenceSearch.class, (mocked, context) -> {
            when(mocked.search()).thenReturn(new HashMap<>());
        });
        MockedStatic<HttpClients> mockedStaticClient = mockStatic(HttpClients.class);
        MockedStatic<EntityUtils> mockedStaticEntity = mockStatic(EntityUtils.class);

        CloseableHttpClient httpclient = setMockForExecuteAndEsl();
        when(HttpClients.createDefault()).thenReturn(httpclient);
        when(EntityUtils.toString(any(HttpEntity.class))).thenReturn(null);

        replicateReferencedAssets.execute(workItem, workflowSession, metaDataMap);
        verify(resourceResolver, times(1)).getResource(anyString());
        verify(httpclient, times(1)).execute(any(HttpPost.class));

        mockedConstruction.close();
        mockedStaticClient.close();
        mockedStaticEntity.close();
    }

    private CloseableHttpClient setMockForExecuteAndEsl() throws IOException {
        metaDataMap.put("workflowtype", CommonConstants.ACTIVATION);
        when(updatedESLConfiguration.getApiUrl()).thenReturn("/bin/abbott");

        CloseableHttpClient httpclient = mock(CloseableHttpClient.class);
        CloseableHttpResponse httpResponse = mock(CloseableHttpResponse.class);
        StatusLine statusLine = mock(StatusLine.class);
        HttpEntity httpEntity = mock(HttpEntity.class);

        when(httpclient.execute(any(HttpPost.class))).thenReturn(httpResponse);
        when(httpResponse.getStatusLine()).thenReturn(statusLine);
        when(statusLine.getStatusCode()).thenReturn(200);
        when(httpResponse.getEntity()).thenReturn(httpEntity);

        return httpclient;
    }
}

