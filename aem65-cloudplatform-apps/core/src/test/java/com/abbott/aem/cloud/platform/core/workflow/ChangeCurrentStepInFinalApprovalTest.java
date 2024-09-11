package com.abbott.aem.cloud.platform.core.workflow;

import com.adobe.granite.workflow.WorkflowException;
import com.adobe.granite.workflow.WorkflowSession;
import com.adobe.granite.workflow.exec.WorkItem;
import com.adobe.granite.workflow.exec.WorkflowData;
import com.adobe.granite.workflow.metadata.MetaDataMap;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.slf4j.Logger;

import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ChangeCurrentStepInFinalApprovalTest {

    @InjectMocks
    private ChangeCurrentStepInFinalApproval changeCurrentStepInFinalApproval;

    @Mock
    private WorkItem workItem;

    @Mock
    private WorkflowSession workflowSession;

    @Mock
    private MetaDataMap metaDataMap;

    @Mock
    private WorkflowData workflowData;

    @Mock
    private Logger logger;

    @Test
    void testExecuteWithCurrentStep() throws WorkflowException {
        // Mock the behavior of the WorkItem and MetaDataMap
        when(workItem.getWorkflowData()).thenReturn(workflowData);
        when(workflowData.getMetaDataMap()).thenReturn(metaDataMap);
        when(metaDataMap.containsKey("currentStep")).thenReturn(true);

        // Call the execute method
        changeCurrentStepInFinalApproval.execute(workItem, workflowSession, metaDataMap);

        // Verify that the currentStep is updated
        verify(metaDataMap).put("currentStep", "Final Approval");
    }

    @Test
    void testExecuteWithoutCurrentStep() throws WorkflowException {
        // Mock the behavior of the WorkItem and MetaDataMap
        when(workItem.getWorkflowData()).thenReturn(workflowData);
        when(workflowData.getMetaDataMap()).thenReturn(metaDataMap);
        when(metaDataMap.containsKey("currentStep")).thenReturn(false);

        // Call the execute method
        changeCurrentStepInFinalApproval.execute(workItem, workflowSession, metaDataMap);

        // Verify that the currentStep is not modified
        verify(metaDataMap, never()).put("currentStep", "Final Approval");
    }
}
