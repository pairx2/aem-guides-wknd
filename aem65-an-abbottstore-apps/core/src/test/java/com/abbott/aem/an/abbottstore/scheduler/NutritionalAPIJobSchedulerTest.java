package com.abbott.aem.an.abbottstore.scheduler;

import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.sling.event.jobs.JobBuilder;
import org.apache.sling.event.jobs.JobManager;
import org.apache.sling.event.jobs.ScheduledJobInfo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.mockito.Mockito.when;

@ExtendWith({MockitoExtension.class})
class NutritionalAPIJobSchedulerTest {

    @InjectMocks
    NutritionalAPIJobScheduler nutritionalAPIJobScheduler;

    @Mock
    JobManager jobManager;

    @Mock
    NutritionalAPIJobScheduler.Configuration config;

    @Mock
    JobBuilder jobBuilder;

    @Mock
    JobBuilder.ScheduleBuilder scheduleBuilder;


    @BeforeEach
    void setUp() {
        config.enabled();
        config.getCron();
    }

    @Test
    void configureDisable() {
        when(config.enabled()).thenReturn(true);
        when(jobManager.createJob(NutritionalAPIJobConsumer.NUTRITION_IMPORT_JOB_TOPIC)).thenReturn(jobBuilder);
        when(jobManager.createJob(NutritionalAPIJobConsumer.NUTRITION_IMPORT_JOB_TOPIC)
                .schedule()).thenReturn(scheduleBuilder);
        nutritionalAPIJobScheduler.configure(config);
        ScheduledJobInfo scheduledJobInfo = Mockito.mock(ScheduledJobInfo.class);
        when(scheduleBuilder.add()).thenReturn(scheduledJobInfo);
        nutritionalAPIJobScheduler.configure(config);
    }

    @Test
    void deactivate() {
        nutritionalAPIJobScheduler.deactivate(config);
    }
}