package com.abbott.aem.platform.search.coveoconnector.core.events;

import com.abbott.aem.platform.search.coveoconnector.core.cloudfront.CloudFrontUtil;
import com.abbott.aem.platform.search.coveoconnector.core.constants.CommonConstants;
import com.abbott.aem.platform.search.coveoconnector.core.service.FormConfigurationService;
import com.day.cq.commons.Externalizer;
import com.day.cq.replication.Agent;
import com.day.cq.replication.AgentFilter;
import com.day.cq.replication.AgentManager;
import com.day.cq.replication.Preprocessor;
import com.day.cq.replication.ReplicationAction;
import com.day.cq.replication.ReplicationException;
import com.day.cq.replication.ReplicationOptions;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.apache.sling.event.jobs.JobManager;
import org.osgi.framework.Constants;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.HashMap;
import java.util.Map;

/**
 * The listener interface for receiving ReplicationEvent events. The class
 * that is interested in processing a ReplicationEvent event implements
 * this interface, and the object created with that class is registered with a
 * component using the component's <code>addReplicationEventListener<code>
 * method. When the ReplicationEvent event occurs, that object's
 * appropriate method is invoked.
 *
 * @author XRX9
 */
@Component(property = { Constants.SERVICE_DESCRIPTION + "=Replication Listener" })
public class ReplicationEventListener implements Preprocessor {

    /** The Constant ACTION_PATH. */
    private static final String ACTION_PATH = "actionPath";

    /** The Constant ACTION_TYPE. */
    private static final String ACTION_TYPE = "actionType";

    /** The Constant ACTION_TYPE. */
    private static final String AGENT_ID = "agentId";

    /** The Constant log. */
    private static final Logger log = LoggerFactory.getLogger(ReplicationEventListener.class);

    /** The config fetch. */
    @Reference
    FormConfigurationService configFetch;
    
    /** The resolver factory. */
    @Reference
    private ResourceResolverFactory resolverFactory;

    /** The job manager. */
    @Reference
    public JobManager jbManager;

    /** The job manager. */
    @Reference
    public AgentManager agntManager;

    /**
     * {@inheritDoc}
     * 
     * @see com.day.cq.replication.Preprocessor#preprocess(com.day.cq.replication.ReplicationAction,
     *      com.day.cq.replication.ReplicationOptions)
     */
    @Override
    public void preprocess(final ReplicationAction replicationAction, final ReplicationOptions replicationOptions)
            throws ReplicationException {

        log.debug("Preprocess start time ::: {}", System.currentTimeMillis());
        log.debug("Replication details are ::: replicationAction - {}, replicationOptions - {}", replicationAction,
                replicationOptions);
        String actionType = replicationAction.getType().getName();
        String actionPath = replicationAction.getPath();
        if (actionPath != null && actionPath.startsWith("/content")&& !actionPath.contains("/jcr:content")) {
            // Create a property map to pass it to the JobConsumer service
            String agentId = getAgentId(replicationOptions.getFilter());
            Map<String, Object> jobProperties = new HashMap<>();
            jobProperties.put(ACTION_TYPE, actionType);
            jobProperties.put(ACTION_PATH, actionPath);
            jobProperties.put(AGENT_ID, agentId);

            // For some reason if the job fails, but you want to keep retrying ; then in
            // JobConsumer//Set the result as failed . Check the JobConsumer
            
            AgentFilter s = replicationOptions.getFilter();
            boolean isPreview = CloudFrontUtil.isPreview(agentId);
            if(null != s && (isPublish(s) || isPreview)) {
            	jbManager.addJob(CommonConstants.ABBOTT_CLOUDFRONT_CACHECLEAR, jobProperties);
                jbManager.addJob(CommonConstants.ABBOTT_FASTLY_CACHECLEAR, jobProperties);
            }

            if(s==null) {
            	jbManager.addJob(CommonConstants.ABBOTT_CLOUDFRONT_CACHECLEAR, jobProperties);
                jbManager.addJob(CommonConstants.ABBOTT_FASTLY_CACHECLEAR, jobProperties);
            }
            
           
            // Consumer Property Topics

        }
        log.debug("Preprocess end time :: {}", System.currentTimeMillis());

    }
    private boolean isPublish(AgentFilter replicationFilter) {
        if (replicationFilter != null && agntManager != null && !agntManager.getAgents().isEmpty()) {
            for (Agent agent : agntManager.getAgents().values()) {
                if (replicationFilter.isIncluded(agent)) {
                    log.info("Replication agent for this path :: {}", agent.getId());
                    if (StringUtils.equalsIgnoreCase(agent.getId(), Externalizer.PUBLISH)) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    private String getAgentId(AgentFilter replicationFilter) {
        if (replicationFilter != null && agntManager != null && !agntManager.getAgents().isEmpty()) {
            for (Agent agent : agntManager.getAgents().values()) {
                if (agent != null && replicationFilter.isIncluded(agent)) {
                    log.info("Agent Id for this path :: {}", agent.getId());
                    return agent.getId();
                }
            }
        }
        return StringUtils.EMPTY;
    }
}