package com.abbott.aem.platform.search.coveoconnector.core.events;

import com.abbott.aem.platform.search.coveoconnector.core.service.FormConfigurationService;
import com.day.cq.replication.Agent;
import com.day.cq.replication.AgentFilter;
import com.day.cq.replication.AgentManager;
import com.day.cq.replication.ReplicationAction;
import com.day.cq.replication.ReplicationActionType;
import com.day.cq.replication.ReplicationException;
import com.day.cq.replication.ReplicationOptions;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.apache.sling.event.jobs.JobManager;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.HashMap;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.mockito.Mockito.anyMap;
import static org.mockito.Mockito.anyString;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith({MockitoExtension.class})
class ReplicationEventListenerTest {
    @Mock
    private FormConfigurationService configFetch;

    @Mock
    private ResourceResolverFactory resolverFactory;

    @Mock
    private JobManager jbManager;

    @Mock
    private AgentManager agntManager;

    @InjectMocks
    private ReplicationEventListener replicationEventListener;

    @Test
    void testPreprocessWithActivateAction() throws ReplicationException {
        // Mock data for Activate action
        String actionPath = "/content/sample";
        ReplicationAction replicationAction = mock(ReplicationAction.class);
        ReplicationOptions replicationOptions = mock(ReplicationOptions.class);
        AgentFilter agentFilter = mock(AgentFilter.class);
        Agent agent = mock(Agent.class);
        Map<String, Agent> agents = new HashMap<>();
        agents.put("agent", agent);

        when(replicationAction.getType()).thenReturn(ReplicationActionType.ACTIVATE);
        when(replicationAction.getPath()).thenReturn(actionPath);
        when(replicationOptions.getFilter()).thenReturn(agentFilter);
        when(agentFilter.isIncluded(agent)).thenReturn(true);
        when(agntManager.getAgents()).thenReturn(agents);
        when(agent.getId()).thenReturn("author");

        // Test the preprocess method for Activate action
        replicationEventListener.preprocess(replicationAction, replicationOptions);
        verify(agentFilter, times(2)).isIncluded(agent);
    }

    @Test
    void testPreprocessWithActivateAction_whenPublishAgent() throws ReplicationException {
        // Mock data for Activate action
        String actionPath = "/content/sample";
        ReplicationAction replicationAction = mock(ReplicationAction.class);
        ReplicationOptions replicationOptions = mock(ReplicationOptions.class);
        AgentFilter agentFilter = mock(AgentFilter.class);
        Agent agent = mock(Agent.class);
        Map<String, Agent> agents = new HashMap<>();
        agents.put("agent", agent);

        when(replicationAction.getType()).thenReturn(ReplicationActionType.ACTIVATE);
        when(replicationAction.getPath()).thenReturn(actionPath);
        when(replicationOptions.getFilter()).thenReturn(agentFilter);
        when(agentFilter.isIncluded(agent)).thenReturn(true);
        when(agntManager.getAgents()).thenReturn(agents);
        when(agent.getId()).thenReturn("publish");

        // Test the preprocess method for Activate action
        replicationEventListener.preprocess(replicationAction, replicationOptions);
        verify(jbManager, times(2)).addJob(anyString(), anyMap());
    }

    @Test
    void testPreprocessWithDeactivateAction() throws ReplicationException {
        // Mock data for Deactivate action
        String actionPath = "/content/sample";
        ReplicationAction replicationAction = mock(ReplicationAction.class);
        ReplicationOptions replicationOptions = mock(ReplicationOptions.class);

        when(replicationAction.getType()).thenReturn(ReplicationActionType.DEACTIVATE);
        when(replicationAction.getPath()).thenReturn(actionPath);

        // Test the preprocess method for Activate action
        replicationEventListener.preprocess(replicationAction, replicationOptions);
        verify(jbManager, times(2)).addJob(anyString(), anyMap());
    }

    @Test
    void testPreprocessWithNullActionPath() {
        // Mock data for Activate action with null action path
        ReplicationAction replicationAction = mock(ReplicationAction.class);
        ReplicationOptions replicationOptions = mock(ReplicationOptions.class);
        when(replicationAction.getType()).thenReturn(ReplicationActionType.ACTIVATE);
        when(replicationAction.getPath()).thenReturn(null);

        // Test the preprocess method with null action path
        assertDoesNotThrow(() -> replicationEventListener.preprocess(replicationAction, replicationOptions));

        // Verify that the addJob method is not called for null action path
        verify(jbManager, never()).addJob(anyString(), anyMap());
    }

    @Test
    void testPreprocessWithNonContentPath() {
        // Mock data for Activate action with non-content path
        String actionPath = "/apps/sample";
        ReplicationAction replicationAction = mock(ReplicationAction.class);
        ReplicationOptions replicationOptions = mock(ReplicationOptions.class);
        when(replicationAction.getType()).thenReturn(ReplicationActionType.ACTIVATE);
        when(replicationAction.getPath()).thenReturn(actionPath);

        // Test the preprocess method with non-content path
        assertDoesNotThrow(() -> replicationEventListener.preprocess(replicationAction, replicationOptions));

        // Verify that the addJob method is not called for non-content path
        verify(jbManager, never()).addJob(anyString(), anyMap());
    }

    @Test
    void testPreprocessWithJcrContentPath() {
        // Mock data for Activate action with non-content path
        String actionPath = "/content/sample/jcr:content";
        ReplicationAction replicationAction = mock(ReplicationAction.class);
        ReplicationOptions replicationOptions = mock(ReplicationOptions.class);
        when(replicationAction.getType()).thenReturn(ReplicationActionType.ACTIVATE);
        when(replicationAction.getPath()).thenReturn(actionPath);

        // Test the preprocess method with non-content path
        assertDoesNotThrow(() -> replicationEventListener.preprocess(replicationAction, replicationOptions));

        // Verify that the addJob method is not called for non-content path
        verify(jbManager, never()).addJob(anyString(), anyMap());
    }
}
