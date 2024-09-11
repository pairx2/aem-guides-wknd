package com.abbott.aem.cloud.platform.core.workflow;

import org.osgi.service.component.annotations.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.adobe.granite.workflow.WorkflowException;
import com.adobe.granite.workflow.WorkflowSession;
import com.adobe.granite.workflow.exec.WorkItem;
import com.adobe.granite.workflow.exec.WorkflowProcess;
import com.adobe.granite.workflow.metadata.MetaDataMap;

@Component(property = { "service.description=Change the current and next step in second approver dialog",
		"process.label" + "=Change Current and Next Steps in the Dialog" })

public class ChangeCurrentNextSteps implements WorkflowProcess {

	private static final Logger LOGGER = LoggerFactory.getLogger(ChangeCurrentNextSteps.class);
	
	@Override
	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap processArguments)
			throws WorkflowException {
		
		MetaDataMap workflowMetaData = workItem.getWorkflowData().getMetaDataMap();
		LOGGER.debug("workflow metdata -- {}" , workflowMetaData);
		if (workflowMetaData.containsKey("currentStep")) {
			workflowMetaData.put("currentStep", "Second Approver");
		}
		if (workflowMetaData.containsKey("nextStep")) {
			workflowMetaData.put("nextStep", "Final Approval");
		}
		
	}
}
