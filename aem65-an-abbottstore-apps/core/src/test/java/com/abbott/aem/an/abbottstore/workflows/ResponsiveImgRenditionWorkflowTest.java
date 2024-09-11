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
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.mockito.Mockito.lenient;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
class ResponsiveImgRenditionWorkflowTest {

    @Mock
    RenditionsService renditionsService;

    @Mock
    WorkflowSession workflowSession;

    @Mock
    WorkItem workItem;

    @Mock
    WorkflowData workflowData;

    @Mock
    MetaDataMap metaDataMap;

    @Mock
    Rendition rendition;

    @Mock
    Asset asset;

    @InjectMocks
    ResponsiveImgRenditionWorkflow responsiveImgRenditionWorkflow;

    @Test
    void execute() throws WorkflowException {
        lenient().when(renditionsService.getDamPath()).thenReturn("/content/dam/abbott/images/mobile/test.jpg");
        lenient().when(workItem.getWorkflowData()).thenReturn(workflowData);
        lenient().when(workflowData.getPayload()).thenReturn("/content/dam/abbott/images/mobile/test.jpg/jcr:content");
        lenient().when(renditionsService.getAssetFromPayload(workItem, workflowSession)).thenReturn(asset);
        lenient().when(asset.getOriginal()).thenReturn(rendition);
        responsiveImgRenditionWorkflow.execute(workItem,workflowSession,metaDataMap);
    }

    @Test
    void executeWithoutDAMPath() throws WorkflowException {
        lenient().when(renditionsService.getDamPath()).thenReturn("/content/dam/abbott/images/test.jpg");
        lenient().when(workItem.getWorkflowData()).thenReturn(workflowData);
        lenient().when(workflowData.getPayload()).thenReturn("");
        responsiveImgRenditionWorkflow.execute(workItem,workflowSession,metaDataMap);
    }

}