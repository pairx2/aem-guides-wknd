package com.abbott.aem.platform.search.coveoconnector.core.events;

import static org.mockito.Mockito.when;

import org.apache.sling.event.jobs.JobManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;

import com.abbott.aem.platform.search.coveoconnector.core.events.CoveoReplicationEventListener;
import com.day.cq.replication.ReplicationAction;
import com.day.cq.replication.ReplicationActionType;
import com.day.cq.replication.ReplicationException;
import com.day.cq.replication.ReplicationOptions;

@ExtendWith(MockitoExtension.class)
class CoveoReplicationEventListenerTest {

    @InjectMocks
    CoveoReplicationEventListener coveoReplicationEventListener;

    @Mock
    ReplicationAction replicationAction;
    @Mock
    ReplicationOptions replicationOptions;

    @Spy
    JobManager jobManager;

    @BeforeEach
    public void setup() throws Exception {
        when(replicationAction.getType()).thenReturn(ReplicationActionType.ACTIVATE);
        when(replicationAction.getPath()).thenReturn("/content/weretail/us/en");
        coveoReplicationEventListener.jobManager = jobManager;
    }

    @Test
    void test() throws ReplicationException {
        coveoReplicationEventListener.preprocess(replicationAction, replicationOptions);
        assert (true);
    }

}
