package com.abbott.aem.cloud.platform.core.workflow;

import com.adobe.granite.workflow.WorkflowException;
import com.adobe.granite.workflow.WorkflowSession;
import com.adobe.granite.workflow.exec.WorkItem;
import com.adobe.granite.workflow.exec.WorkflowData;
import com.adobe.granite.workflow.metadata.MetaDataMap;
import org.junit.jupiter.api.BeforeEach;
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
class ChangeCurrentNextStepsTest {
    @InjectMocks
    private ChangeCurrentNextSteps changeCurrentNextSteps;

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
    void testExecuteWithCurrentStepAndNextStep() throws WorkflowException {
        // Mock the behavior of the WorkItem, WorkflowSession, and MetaDataMap
        when(workItem.getWorkflowData()).thenReturn(workflowData);
        when(workflowData.getMetaDataMap()).thenReturn(metaDataMap);
        when(metaDataMap.containsKey("currentStep")).thenReturn(true);
        when(metaDataMap.containsKey("nextStep")).thenReturn(true);

        // Call the execute method
        changeCurrentNextSteps.execute(workItem, workflowSession, metaDataMap);

        // Verify that the currentStep and nextStep are updated
        verify(metaDataMap).put("currentStep", "Second Approver");
        verify(metaDataMap).put("nextStep", "Final Approval");
    }

    @Test
    void testExecuteWithoutCurrentStepAndNextStep() throws WorkflowException {
        // Mock the behavior of the WorkItem, WorkflowSession, and MetaDataMap
        when(workItem.getWorkflowData()).thenReturn(workflowData);
        when(workflowData.getMetaDataMap()).thenReturn(metaDataMap);
        when(metaDataMap.containsKey("currentStep")).thenReturn(false);
        when(metaDataMap.containsKey("nextStep")).thenReturn(false);

        // Call the execute method
        changeCurrentNextSteps.execute(workItem, workflowSession, metaDataMap);

        // Verify that the currentStep and nextStep are not modified
        verify(metaDataMap, never()).put("currentStep", "Second Approver");
        verify(metaDataMap, never()).put("nextStep", "Final Approval");
    }
}
