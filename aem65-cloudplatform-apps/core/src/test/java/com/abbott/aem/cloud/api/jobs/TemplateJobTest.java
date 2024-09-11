package com.abbott.aem.cloud.api.jobs;

import org.apache.sling.event.jobs.Job;
import org.apache.sling.event.jobs.consumer.JobConsumer;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith({MockitoExtension.class})
class TemplateJobTest {
    @InjectMocks
    private TemplateJob templateJob;

    @Mock
    private Job job;

    @Test
    void testProcess() {
        assertEquals(JobConsumer.JobResult.OK, templateJob.process(job));
    }

    @Test
    void testGetTopic() {
        assertEquals("example/template/abbott/job", templateJob.getTopic());
    }
}
