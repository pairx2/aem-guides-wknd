package com.abbott.aem.an.abbottstore.listeners;

import com.abbott.aem.an.abbottstore.services.ResResolverBySysUserService;
import com.abbott.aem.an.abbottstore.services.UrlConfigService;
import com.abbott.aem.an.abbottstore.utils.AbbottUtils;
import com.day.cq.replication.ReplicationAction;
import com.day.cq.workflow.WorkflowException;
import com.day.cq.workflow.WorkflowService;
import com.day.cq.workflow.WorkflowSession;
import com.day.cq.workflow.exec.WorkflowData;
import com.day.cq.workflow.model.WorkflowModel;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.ResourceResolver;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.component.propertytypes.ServiceDescription;
import org.osgi.service.event.Event;
import org.osgi.service.event.EventConstants;
import org.osgi.service.event.EventHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.jcr.Session;
import java.util.Arrays;

//Sling Imports


/**
 * Just a simple DS Component
 */
@Component(immediate = true, enabled = true, service = EventHandler.class,
        property = {
                EventConstants.EVENT_TOPIC +"="+ReplicationAction.EVENT_TOPIC
        })
@ServiceDescription("Updating header and footer on magento after replicating the page")
public class HeaderAndFooterHandler implements EventHandler {

    private Logger log = LoggerFactory.getLogger(this.getClass());

    private String[] baseUrls ;

    @Reference
    private WorkflowService workflowService;

    @Reference
    ResResolverBySysUserService resolverService;

    @Reference
    private UrlConfigService urlConfigService;

    public void handleEvent(Event event) {
        ReplicationAction action = ReplicationAction.fromEvent(event);
        baseUrls = urlConfigService.getBaseUrls().stream().toArray(String[]::new);
        if (action != null && StringUtils.equalsIgnoreCase(action.getType().getName(), "Activate") && null != baseUrls && Arrays.asList(baseUrls).contains(action.getPath())) {
            log.info("Replication action {} occured on {} ", action.getType().getName(), action.getPath());
            //Create a workflow session
            ResourceResolver resourceResolver = resolverService.getReadAndWriteResourceResolver();
            Session session = resourceResolver.adaptTo(Session.class);
            WorkflowSession wfSession = workflowService.getWorkflowSession(session);
            try {
                // Get the workflow model
                WorkflowModel wfModel = wfSession.getModel("/var/workflow/models/abbott/header-and-footer-model");
                log.info("workflow model {}", wfModel);
                // Get the workflow data
                // The first param in the newWorkflowData method is the payloadType.  Just a fancy name to let it know what type of workflow it is working with.
                WorkflowData wfData = wfSession.newWorkflowData("JCR_PATH", action.getPath());
                log.info("workflow data {}", wfData);
                // Run the Workflow.
                wfSession.startWorkflow(wfModel, wfData);
                log.info("workflow triggered");
            } catch (WorkflowException e) {
                log.error("WorkflowException in Preprocessor service {}",e.getMessage());
            }finally{
                AbbottUtils.closeResolver(resourceResolver);
            }
        } else {
            log.info("Event handler process ends");
        }


        log.info("***replication event handler end***");

    }


}