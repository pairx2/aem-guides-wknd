package com.abbott.aem.cloud.platform.core.workflow;

import org.osgi.service.component.annotations.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.adobe.granite.workflow.WorkflowException;
import com.adobe.granite.workflow.WorkflowSession;
import com.adobe.granite.workflow.exec.WorkItem;
import com.adobe.granite.workflow.exec.WorkflowProcess;
import com.adobe.granite.workflow.metadata.MetaDataMap;

@Component(property = { "service.description=Chhange the current step in final approver dialog",
		"process.label" + "=Change Current Step in the Final Approval" })

public class ChangeCurrentStepInFinalApproval implements WorkflowProcess {

	private static final Logger LOGGER = LoggerFactory.getLogger(ChangeCurrentStepInFinalApproval.class);
	
	@Override
	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap processArguments)
			throws WorkflowException {
		
		MetaDataMap workflowMetaData = workItem.getWorkflowData().getMetaDataMap();
		LOGGER.debug("workflow metdata -- {}", workflowMetaData);
		if (workflowMetaData.containsKey("currentStep")) {
			workflowMetaData.put("currentStep", "Final Approval");
		}
		
	}
}
