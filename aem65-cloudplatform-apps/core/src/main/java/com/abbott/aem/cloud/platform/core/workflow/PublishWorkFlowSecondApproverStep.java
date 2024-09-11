package com.abbott.aem.cloud.platform.core.workflow;

import org.osgi.service.component.annotations.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.abbott.aem.cloud.platform.core.constants.CommonConstants;
import com.adobe.granite.workflow.WorkflowException;
import com.adobe.granite.workflow.WorkflowSession;
import com.adobe.granite.workflow.exec.ParticipantStepChooser;
import com.adobe.granite.workflow.exec.WorkItem;
import com.adobe.granite.workflow.exec.Workflow;
import com.adobe.granite.workflow.metadata.MetaDataMap;

@Component(service = ParticipantStepChooser.class, immediate = true, 
	property = {ParticipantStepChooser.SERVICE_PROPERTY_LABEL+" = Dynamic PDP Workflow Second Participant Chooser" })
public class PublishWorkFlowSecondApproverStep implements ParticipantStepChooser {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(PublishWorkFlowSecondApproverStep.class);

	public String getParticipant(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap metaDataMap)
			throws WorkflowException {
		LOGGER.debug(" Inside the PDP dynamic participant Workflow step  GetParticipant {}", workflowSession.getClass());
		LOGGER.debug(" Metadatamap {}", metaDataMap);
		String participant = null;
		Workflow workflow = workItem.getWorkflow();
		
		MetaDataMap workflowMetaData = workflow.getWorkflowData().getMetaDataMap();
		
		if (workflowMetaData.containsKey(CommonConstants.SECOND_APPROVER)) {
			participant = workflowMetaData.get(CommonConstants.SECOND_APPROVER).toString();
		}
		
		LOGGER.debug("####### Participant : {}", participant);
		return participant;
	}
}