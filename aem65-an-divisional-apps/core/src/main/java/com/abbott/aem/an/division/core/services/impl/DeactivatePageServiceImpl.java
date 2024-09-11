package com.abbott.aem.an.division.core.services.impl;

import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.apache.sling.api.resource.ResourceResolver;
import org.osgi.service.component.annotations.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.abbott.aem.an.division.core.services.DeactivatePageService;
import com.abbott.aem.an.division.core.utils.Utils;
import com.abbott.aem.cloud.platform.core.constants.CommonConstants;
import com.adobe.granite.workflow.WorkflowException;
import com.adobe.granite.workflow.WorkflowSession;
import com.adobe.granite.workflow.exec.Route;
import com.adobe.granite.workflow.exec.WorkItem;
import com.adobe.granite.workflow.exec.Workflow;
import com.adobe.granite.workflow.exec.WorkflowData;
import com.adobe.granite.workflow.model.WorkflowModel;

@Component(service = DeactivatePageService.class, immediate = true)
public class DeactivatePageServiceImpl implements DeactivatePageService {

	private static final Logger LOGGER = LoggerFactory.getLogger(DeactivatePageServiceImpl.class);
	String emailContent = "";
	private StringBuilder params = new StringBuilder();

	@Override
	public void deactivatePages(String pdpWorkflowModel, String path, Map<String, String> discontinuedProds,
			ResourceResolver resourceResolver, String environmentType) {

		try {
			LOGGER.debug("in deactivate workflow service");
			final WorkflowSession workflowSession = resourceResolver.adaptTo(WorkflowSession.class);
			String groupName = "APP-Adobe-AEM-DM-" + environmentType + "-an-pim-approvers";
			Utils objutils = new Utils();
			boolean validGroup = objutils.verifyGroup(resourceResolver, groupName);
			if (!validGroup)
				throw new WorkflowException("PIM approver group in Abbott Global Workflow is not valid");

			// Get the workflow model object
			final WorkflowModel workflowModel = workflowSession.getModel(pdpWorkflowModel);
			final Map<String, Object> workflowMetaData = new HashMap<>();
			workflowMetaData.put("workflowtype", CommonConstants.DEACTIVATION);
			workflowMetaData.put(CommonConstants.FIRST_APPROVER, groupName);
			params.append("<table width='100%' border='1'><tr>");
			params.append("<td style='font-weight:bold; text-align:center'>Product ID </td>"
					+ "<td style='font-weight:bold; text-align:center'>Product Name</td></tr>");
			for (Map.Entry<String, String> prodElement : discontinuedProds.entrySet()) {
				String prodName = prodElement.getKey();
				String brandId = prodElement.getValue();
				params.append("<tr style='text-align:center'>");
				params.append("<td>" + brandId + "</td>");
				params.append("<td>" + prodName + "</td>");
				params.append("</tr>");
				final WorkflowData workflowData = workflowSession.newWorkflowData("JCR_PATH", path + "/" + prodName);

				// Start the workflow!
				workflowMetaData.put("workflowTitle",
						workflowModel.getTitle() + "-AN-Deactivate-" + prodName + " [Brand ID:" + brandId + "]");
				Workflow currentWF = workflowSession.startWorkflow(workflowModel, workflowData, workflowMetaData);
				LOGGER.info("In deactivating get current wf initiater {} " , currentWF.getInitiator());

				List<WorkItem> currentWorkItems = currentWF.getWorkItems();
				Iterator<WorkItem> currentItems = currentWorkItems.iterator();
				if (currentItems.hasNext()) {
					WorkItem workItem = currentItems.next();
					LOGGER.debug("before getroute {}", workItem);
					List<Route> routes = workflowSession.getRoutes(workItem, false);
					LOGGER.debug("After getroute {}", routes);
					workflowSession.complete(workItem, routes.get(0));
				}

			}
			params.append("</table>");
			workflowSession.logout();
			LOGGER.debug("Workflow: {} started", pdpWorkflowModel);

		} catch (WorkflowException e) {
			LOGGER.error("Error in deactivate Pages: {0}", e);
		}
	}

	@Override
	public String sendEmailContent() {
		emailContent = params.toString();
		return emailContent;
	}
}