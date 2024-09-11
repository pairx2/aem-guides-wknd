package com.abbott.aem.an.abbottstore.workflows;

import com.abbott.aem.an.abbottstore.services.RenditionsService;
import com.adobe.granite.workflow.WorkflowException;
import com.adobe.granite.workflow.WorkflowSession;
import com.adobe.granite.workflow.exec.WorkItem;
import com.adobe.granite.workflow.exec.WorkflowData;
import com.adobe.granite.workflow.metadata.MetaDataMap;
import com.day.cq.dam.api.Asset;
import com.day.cq.dam.api.Rendition;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.mockito.Mockito.lenient;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
class ImageRenditionWorkflowTest {

    @Mock
    ResourceResolverFactory resolverFactory;

    @Mock
    RenditionsService renditionsService;

    @Mock
    WorkItem workItem;

    @Mock
    WorkflowSession workflowSession;

    @Mock
    MetaDataMap metaDataMap;

    @Mock
    WorkflowData workflowData;

    @Mock
    Asset asset;

    @Mock
    Rendition rendition;

    @InjectMocks
    ImageRenditionWorkflow imageRenditionWorkflow;

    @BeforeEach
    void setup() {
        lenient().when(renditionsService.getDamPath()).thenReturn("/content/dam/abbott/images/test.jpg");
        lenient().when(workItem.getWorkflowData()).thenReturn(workflowData);
    }

    @Test
    void execute() throws WorkflowException {
        lenient().when(workflowData.getPayload()).thenReturn("/content/dam/abbott/images/test.jpg/jcr:content");
        lenient().when(renditionsService.getAssetFromPayload(workItem, workflowSession)).thenReturn(asset);
        lenient().when(asset.getOriginal()).thenReturn(rendition);
        imageRenditionWorkflow.execute(workItem, workflowSession, metaDataMap);
    }

    @Test
    void executeWithoutDAMPath() throws WorkflowException {
        lenient().when(workflowData.getPayload()).thenReturn("");
        imageRenditionWorkflow.execute(workItem, workflowSession, metaDataMap);
    }
}