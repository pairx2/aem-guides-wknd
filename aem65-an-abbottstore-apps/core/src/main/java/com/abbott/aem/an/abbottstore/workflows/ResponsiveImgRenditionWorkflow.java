package com.abbott.aem.an.abbottstore.workflows;

import com.abbott.aem.an.abbottstore.constants.CommonConstants;
import com.abbott.aem.an.abbottstore.services.RenditionsService;
import com.abbott.aem.an.abbottstore.utils.AbbottUtils;
import com.adobe.granite.workflow.WorkflowException;
import com.adobe.granite.workflow.WorkflowSession;
import com.adobe.granite.workflow.exec.WorkItem;
import com.adobe.granite.workflow.exec.WorkflowData;
import com.adobe.granite.workflow.exec.WorkflowProcess;
import com.adobe.granite.workflow.metadata.MetaDataMap;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * @author saikrishna.s
 * 
 *         Work flow step to generate renditions with custom name and renditions
 *         from Tablet or Mobile folder.
 *
 */
@Component(service = WorkflowProcess.class, property = {
		"process.label=Abbott Tablet/Mobile Asset Rendition WorkFlow" })
public class ResponsiveImgRenditionWorkflow implements WorkflowProcess {

	/** The resource resolver factory. */
	@Reference
	private ResourceResolverFactory resourceResolverFactory;

	/** The renditions service. */
	@Reference
	private RenditionsService renditionsService;

	/** The log. */
	protected final Logger log = LoggerFactory.getLogger(ResponsiveImgRenditionWorkflow.class);

	/**
	 * Execute method to call rendition service to generate renditions
	 */
	@Override
	public void execute(WorkItem item, WorkflowSession wfSession, MetaDataMap metaDataMap) throws WorkflowException {
		String damPath = renditionsService.getDamPath();
		WorkflowData workflowData = item.getWorkflowData();
		String path = workflowData.getPayload().toString();
		if (path.indexOf(damPath) == -1
				|| (path.indexOf(CommonConstants.MOBILE_DAM) == -1 && path.indexOf(CommonConstants.TABLET_DAM) == -1)) {
			log.error("Not a Tablet or Mobile or image Dam Folder {}", path);
			return;
		}
		AbbottUtils.generateAssestRenditions(item, wfSession, path, renditionsService, CommonConstants.MOBILE_DAM);

	}

}
