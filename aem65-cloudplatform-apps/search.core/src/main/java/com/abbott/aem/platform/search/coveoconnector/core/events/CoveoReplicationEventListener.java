package com.abbott.aem.platform.search.coveoconnector.core.events;

import java.util.HashMap;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.apache.sling.event.jobs.JobManager;
import org.osgi.framework.Constants;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

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

/**
 * The listener interface for receiving coveoReplicationEvent events. The class
 * that is interested in processing a coveoReplicationEvent event implements
 * this interface, and the object created with that class is registered with a
 * component using the component's <code>addCoveoReplicationEventListener<code>
 * method. When the coveoReplicationEvent event occurs, that object's
 * appropriate method is invoked.
 *
 * @author Pavan
 * @author PAIRX2
 */
@Component(property = { Constants.SERVICE_DESCRIPTION + "=Replication Listener" })
public class CoveoReplicationEventListener implements Preprocessor {

    /** The Constant ACTION_PATH. */
    private static final String ACTION_PATH = "actionPath";

    /** The Constant CONF. */
    private static final String CONF = "/conf/";

    /** The Constant ACTION_TYPE. */
    private static final String ACTION_TYPE = "actionType";

    /** The Constant log. */
    private static final Logger log = LoggerFactory.getLogger(CoveoReplicationEventListener.class);

    /** The resolver factory. */
    @Reference
    private ResourceResolverFactory resolverFactory;

    /** The config fetch. */
    @Reference
    FormConfigurationService configFetch;

    /** The job manager. */
    @Reference
    public JobManager jobManager;

    /** The job manager. */
    @Reference
    public AgentManager agentManager;

    /**
     * {@inheritDoc}
     * 
     * @see com.day.cq.replication.Preprocessor#preprocess(com.day.cq.replication.ReplicationAction,
     *      com.day.cq.replication.ReplicationOptions)
     */
    @Override
    public void preprocess(final ReplicationAction replicationAction, final ReplicationOptions replicationOptions)
            throws ReplicationException {

        log.debug("Preprocess start time :: {}", System.currentTimeMillis());
        log.debug("Replication details are :: replicationAction - {}, replicationOptions - {}", replicationAction,
                replicationOptions);

        String actionType = replicationAction.getType().getName();
        String actionPath = replicationAction.getPath();

        if (actionPath != null && !(actionPath.contains(CONF))) {

            // Create a property map to pass it to the JobConsumer service
            Map<String, Object> jobProperties = new HashMap<>();
            jobProperties.put(ACTION_TYPE, actionType);
            jobProperties.put(ACTION_PATH, actionPath);
            

            // For some reason if the job fails, but you want to keep retrying ; then in
            // JobConsumer//Set the result as failed . Check the JobConsumer
            
            AgentFilter s = replicationOptions.getFilter();
            if(null!=s && isPublish(s)) {
            	jobManager.addJob(CommonConstants.ABBOTT_SEARCH_COVEO_PUSHAPI, jobProperties);
            }
            if(s==null) {
            	jobManager.addJob(CommonConstants.ABBOTT_SEARCH_COVEO_PUSHAPI, jobProperties);
            }

             

        }
        log.debug("Preprocess end time :: {}", System.currentTimeMillis());

    }
    
    private boolean isPublish(AgentFilter replicationFilter) {
		if (agentManager != null && !agentManager.getAgents().isEmpty()) {
			for (Agent agent : agentManager.getAgents().values()) {
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

}