package com.abbott.aem.cloud.platform.core.workflow;

import com.abbott.aem.cloud.platform.core.constants.CommonConstants;
import com.adobe.granite.workflow.WorkflowException;
import com.adobe.granite.workflow.WorkflowSession;
import com.adobe.granite.workflow.exec.WorkItem;
import com.adobe.granite.workflow.exec.Workflow;
import com.adobe.granite.workflow.exec.WorkflowData;
import com.adobe.granite.workflow.metadata.MetaDataMap;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class PublishWorkFlowSecondApproverStepTest {
    @InjectMocks
    private PublishWorkFlowSecondApproverStep step;

    @Mock
    WorkItem workItem;
    @Mock
    WorkflowSession workflowSession;
    @Mock
    MetaDataMap metaDataMap;

    @Mock
    WorkflowData workflowData;

    @BeforeEach
    void setUp(){
        Workflow workflow = mock(Workflow.class);
        when(workItem.getWorkflow()).thenReturn(workflow);
        when(workflow.getWorkflowData()).thenReturn(workflowData);
        when(workflowData.getMetaDataMap()).thenReturn(metaDataMap);
    }

    @Test
    void getParticipant() throws WorkflowException {
        when(metaDataMap.containsKey(CommonConstants.SECOND_APPROVER)).thenReturn(true);
        when(metaDataMap.get(CommonConstants.SECOND_APPROVER)).thenReturn("SecondApprover");

        String participant = step.getParticipant(workItem, workflowSession, metaDataMap);
        assertEquals("SecondApprover", participant);
    }

    @Test
    void getParticipant_whenException() {
        when(workflowData.getMetaDataMap()).thenReturn(null);
        assertThrows(NullPointerException.class, () -> step.getParticipant(workItem, workflowSession, metaDataMap));
    }
}
