package com.abbott.aem.an.division.core.services.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.osgi.service.component.annotations.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.abbott.aem.an.division.core.services.PublishPageService;
import com.abbott.aem.an.division.core.utils.Utils;
import com.abbott.aem.cloud.platform.core.constants.CommonConstants;
import com.adobe.granite.workflow.WorkflowException;
import com.adobe.granite.workflow.WorkflowSession;
import com.adobe.granite.workflow.exec.Route;
import com.adobe.granite.workflow.exec.WorkItem;
import com.adobe.granite.workflow.exec.Workflow;
import com.adobe.granite.workflow.exec.WorkflowData;
import com.adobe.granite.workflow.model.WorkflowModel;
import com.day.cq.commons.jcr.JcrConstants;

@Component(service = PublishPageService.class, immediate = true)
public class PublishPageServiceImpl implements PublishPageService {
	private final Logger logger = LoggerFactory.getLogger(PublishPageServiceImpl.class);
	String emailContent = "";
	private StringBuilder params = new StringBuilder();

	@Override
	public void publishPages(String pdpWorkflowModel, String path, Map<String, String> activeProds,
			ResourceResolver resourceResolver, String environmentType) {

		try {
			logger.debug("in publish workflow service environmentType value {}", environmentType);

			// Get the workflow session from the resource resolver
			final WorkflowSession workflowSession = resourceResolver.adaptTo(WorkflowSession.class);
			String groupName = "APP-Adobe-AEM-DM-" + environmentType + "-an-pim-approvers";
			Utils objutils = new Utils();
			boolean validGroup = objutils.verifyGroup(resourceResolver, groupName);
			if (!validGroup)
				throw new WorkflowException("PIM approver group in Abbott Global Workflow is not a valid");

			// Get the workflow model object
			final WorkflowModel workflowModel = workflowSession.getModel(pdpWorkflowModel);
			final Map<String, Object> workflowMetaData = new HashMap<>();
			workflowMetaData.put("workflowtype", CommonConstants.ACTIVATION);
			workflowMetaData.put(CommonConstants.FIRST_APPROVER, groupName);
			params.append("<table width='100%' border='1'><tr>");
			params.append("<td style='font-weight:bold; text-align:center'>Product ID </td>"
					+ "<td style='font-weight:bold; text-align:center'> Product Name</td></tr>");
			for (Map.Entry<String, String> prodElement : activeProds.entrySet()) {
				String prodName = prodElement.getKey();
				String brandId = prodElement.getValue();
				params.append("<tr style='text-align:center'>");
				params.append("<td>" + brandId + "</td>");
				params.append("<td>" + prodName + "</td>");
				params.append("</tr>");
				final WorkflowData workflowData = workflowSession.newWorkflowData("JCR_PATH", path + "/" + prodName);
				// Start the workflow!
				logger.debug("before starting workflows");
				workflowMetaData.put("workflowTitle",
						workflowModel.getTitle() + "-AN-Activate-" + prodName + " [Brand ID:" + brandId + "]");
				Workflow currentWF = workflowSession.startWorkflow(workflowModel, workflowData, workflowMetaData);
				duplicateWorkflowItemTermination(workflowSession, brandId, resourceResolver);
				logger.debug("after starting workflow ----- {}", currentWF.getInitiator());
				List<WorkItem> currentWorkItems = currentWF.getWorkItems();
				Iterator<WorkItem> currentItems = currentWorkItems.iterator();
				if (currentItems.hasNext()) {
					WorkItem workItem = currentItems.next();
					List<Route> routes = workflowSession.getRoutes(workItem, false);
					workflowSession.complete(workItem, routes.get(0));
				}
			}
			params.append("</table>");
			workflowSession.logout();
			logger.debug("Workflow: {} started", pdpWorkflowModel);

		} catch (WorkflowException e) {
			logger.error("Error in publishPages: {0}", e);
		}
	}

	// Method to terminate duplicate workitems
	public void duplicateWorkflowItemTermination(WorkflowSession workflowSession, String brandId,
			ResourceResolver resourceResolver) throws WorkflowException {

		String[] status = { "RUNNING" };
		List<Workflow> model = new ArrayList<>();
		Workflow[] workflows = workflowSession.getWorkflows(status);
		int length = workflows.length;
		logger.debug("Number of workflow items {}", length);
		for (Workflow wf : workflows) {
			if (wf.getWorkflowModel().getTitle().equalsIgnoreCase("Abbott Global Workflow")) {
				model.add(wf);
			}
		}
		Workflow[] models = new Workflow[model.size()];
		model.toArray(models);

		for (Workflow instance : models) {
			Resource resource = resourceResolver
					.getResource(instance.getWorkflowData().getPayload() + "/" + JcrConstants.JCR_CONTENT);
			String productId = resource.getValueMap().get("productId", String.class);
			logger.debug("ProductId of the page {}", productId);
			if (brandId.equalsIgnoreCase(productId) && instance.getMetaDataMap().containsKey("currentStep")) {
				workflowSession.terminateWorkflow(instance);
				logger.debug("Workflow Item terminated Successfully.");
			}
		}

	}

	@Override
	public String sendEmailContent() {
		emailContent = params.toString();
		return emailContent;
	}
}