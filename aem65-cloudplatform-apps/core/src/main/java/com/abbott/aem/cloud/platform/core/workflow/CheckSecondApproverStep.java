package com.abbott.aem.cloud.platform.core.workflow;

import java.util.Date;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.osgi.service.component.annotations.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.abbott.aem.cloud.platform.core.constants.CommonConstants;
import com.adobe.granite.workflow.WorkflowException;
import com.adobe.granite.workflow.WorkflowSession;
import com.adobe.granite.workflow.exec.WorkItem;
import com.adobe.granite.workflow.exec.Workflow;
import com.adobe.granite.workflow.exec.WorkflowProcess;
import com.adobe.granite.workflow.metadata.MetaDataMap;
import com.day.cq.commons.jcr.JcrConstants;

@Component(property = { "service.description=Check for the second approver details",
		"process.label" + "=Check for Second Approver Step" })

public class CheckSecondApproverStep implements WorkflowProcess {

	private static final Logger LOGGER = LoggerFactory.getLogger(CheckSecondApproverStep.class);
	private static final String WORKFLOWTYPE = "workflowtype";
	private static final String ABSOLUTETIME = "absoluteTime";
	

	@Override
	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap processArguments)
			throws WorkflowException {

		Workflow workflow = workItem.getWorkflow();

		MetaDataMap workflowMetaData = workItem.getWorkflowData().getMetaDataMap();
		String workflowType = "";
		String firstAssignment = "";
		String secondAssignment = "";
		Date workflowTime;

		String workflowPayload = workflow.getWorkflowData().getPayload().toString();
		Resource payloadRes = workflowSession.adaptTo(ResourceResolver.class)
				.getResource(workflowPayload + "/" + JcrConstants.JCR_CONTENT);
		ValueMap payloadVM = payloadRes.getValueMap();
		if (payloadVM.containsKey(CommonConstants.FIRST_APPROVER)) {
			firstAssignment = payloadVM.get(CommonConstants.FIRST_APPROVER).toString();
			workflowMetaData.put(CommonConstants.FIRST_APPROVER, firstAssignment);
		}
		if (payloadVM.containsKey(CommonConstants.SECOND_APPROVER)) {
			secondAssignment = payloadVM.get(CommonConstants.SECOND_APPROVER).toString();
			workflowMetaData.put(CommonConstants.SECOND_APPROVER, secondAssignment);
		}
		if (payloadVM.containsKey(WORKFLOWTYPE)) {
			workflowType = payloadVM.get(WORKFLOWTYPE).toString();
			workflowMetaData.put(WORKFLOWTYPE, workflowType);
		}
		if (payloadVM.containsKey(ABSOLUTETIME)) {
			workflowTime = payloadVM.get(ABSOLUTETIME, Date.class);
			workflowMetaData.put(ABSOLUTETIME, workflowTime.getTime());
		}

		workItem.getWorkflowData().getMetaDataMap().put("currentStep", "First Approver");
		if (workItem.getWorkflowData().getMetaDataMap().containsKey(CommonConstants.SECOND_APPROVER)) {

			workItem.getWorkflowData().getMetaDataMap().put("nextStep", "Second Approver");
		} else {
			workItem.getWorkflowData().getMetaDataMap().put("nextStep", "Final Approval");
		}

		LOGGER.debug("In Check second approver step {}", secondAssignment);
	}
}
