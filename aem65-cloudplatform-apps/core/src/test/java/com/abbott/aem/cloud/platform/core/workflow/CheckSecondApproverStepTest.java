package com.abbott.aem.cloud.platform.core.workflow;


import com.abbott.aem.cloud.platform.core.constants.CommonConstants;
import com.adobe.granite.workflow.WorkflowException;
import com.adobe.granite.workflow.WorkflowSession;
import com.adobe.granite.workflow.exec.WorkItem;
import com.adobe.granite.workflow.exec.Workflow;
import com.adobe.granite.workflow.exec.WorkflowData;
import com.adobe.granite.workflow.metadata.MetaDataMap;
import com.adobe.granite.workflow.metadata.SimpleMetaDataMap;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.api.wrappers.ValueMapDecorator;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Date;
import java.util.HashMap;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class CheckSecondApproverStepTest {
    private static final String WORKFLOWTYPE = "workflowtype";
    private static final String ABSOLUTETIME = "absoluteTime";

    private CheckSecondApproverStep step;

    @Mock
    WorkItem workItem;

    @Mock
    WorkflowSession workflowSession;

    MetaDataMap metaDataMap = new SimpleMetaDataMap();

    ValueMap valueMap = new ValueMapDecorator(new HashMap<>());


    @BeforeEach
    public void setUp() {
        step = new CheckSecondApproverStep();

        valueMap.put(CommonConstants.FIRST_APPROVER, "FirstApprover");
        valueMap.put(WORKFLOWTYPE, "Approver");
        valueMap.put(ABSOLUTETIME, new Date());

        Workflow workflow = mock(Workflow.class);
        WorkflowData workflowData = mock(WorkflowData.class);
        ResourceResolver resourceResolver = mock(ResourceResolver.class);
        Resource resource = mock(Resource.class);

        when(workItem.getWorkflow()).thenReturn(workflow);
        when(workflow.getWorkflowData()).thenReturn(workflowData);
        when(workItem.getWorkflowData()).thenReturn(workflowData);
        when(workflowData.getMetaDataMap()).thenReturn(metaDataMap);
        when(workflowData.getPayload()).thenReturn("/content/abbott/en");

        when(workflowSession.adaptTo(ResourceResolver.class)).thenReturn(resourceResolver);
        when(resourceResolver.getResource("/content/abbott/en/jcr:content")).thenReturn(resource);
        when(resource.getValueMap()).thenReturn(valueMap);
    }

    @Test
    void testExecuteWithFirstApprover() throws WorkflowException {
        // Mock the workflow metadata` map and payload
        valueMap.put(CommonConstants.FIRST_APPROVER, "FirstApprover");

        // Execute the step
        step.execute(workItem, workflowSession, null);

        // Verify that the next step is set to "Second Approver"
        assertEquals("First Approver", metaDataMap.get("currentStep"));
        assertEquals("Final Approval", metaDataMap.get("nextStep"));
    }

    @Test
    void testExecuteWithSecondApprover() throws WorkflowException {
        // Mock the workflow metadata` map and payload
        valueMap.put(CommonConstants.SECOND_APPROVER, "SecondApprover");

        // Execute the step
        step.execute(workItem, workflowSession, null);

        // Verify that the next step is set to "Second Approver"
        assertEquals("First Approver", metaDataMap.get("currentStep"));
        assertEquals("Second Approver", metaDataMap.get("nextStep"));
    }

}
