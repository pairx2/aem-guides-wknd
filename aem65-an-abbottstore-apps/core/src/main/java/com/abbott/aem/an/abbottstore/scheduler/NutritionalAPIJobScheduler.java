package com.abbott.aem.an.abbottstore.scheduler;

import org.apache.sling.event.jobs.JobBuilder.ScheduleBuilder;
import org.apache.sling.event.jobs.JobManager;
import org.apache.sling.event.jobs.ScheduledJobInfo;
import org.osgi.service.component.annotations.*;
import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.AttributeType;
import org.osgi.service.metatype.annotations.Designate;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Collection;
import java.util.Map;

@Component(immediate = true, configurationPolicy = ConfigurationPolicy.REQUIRE)
@Designate(ocd = NutritionalAPIJobScheduler.Configuration.class)
public class NutritionalAPIJobScheduler {
    private static final Logger log = LoggerFactory.getLogger(NutritionalAPIJobScheduler.class);

    @Reference
    private JobManager jobManager;

    /**
     * Gets call when activated or modified
     */
    @Activate
    @Modified
    void configure(Configuration config) {
        removeScheduler(config);
        log.debug("Archer API Job Scheduler Configuration changed");
        startScheduledJob(config);
    }
    /**
     * Removes a scheduler
     */
    @Deactivate
    protected void deactivate(Configuration config) {
        log.debug("Inside deactivation of job scheduler");
        removeScheduler(config);
    }
    /**
     * Start a scheduler based on the job topic
     */
    private void startScheduledJob(Configuration config) {
        if (config.enabled()) {
            log.info("Scheduler is enabled");
            ScheduleBuilder scheduleBuilder = jobManager.createJob(NutritionalAPIJobConsumer.NUTRITION_IMPORT_JOB_TOPIC)
                    .schedule();
            scheduleBuilder.cron(config.getCron());
            ScheduledJobInfo scheduledJobInfo = scheduleBuilder.add();
            if (scheduledJobInfo == null) {
                log.error("Nutritional Facts API Job Scheduler errored out while adding.");
            } else {
                log.info("Nutritional Facts API Job Scheduled successfully");
            }
        } else {
            log.info("Nutritional Facts API Job Scheduler is disabled.");
        }
    }
    /**
     * Remove a scheduler based on the job topic
     */
    private void removeScheduler(Configuration config) {
        log.info("removing job scheduler");
        if (!config.enabled()) {
            Collection <ScheduledJobInfo> scheduledJobInfos = jobManager
                    .getScheduledJobs(NutritionalAPIJobConsumer.NUTRITION_IMPORT_JOB_TOPIC, 0, (Map<String, Object>) null);
            for (ScheduledJobInfo scheduledJobInfo : scheduledJobInfos) {
                scheduledJobInfo.unschedule();
                log.info("Job is unscheduled.");
            }
        }
    }
    /**
     * Nutritional API Job Scheduler Configuration
     */
    @ObjectClassDefinition(name = "Nutritional API Job Scheduler Configuration")
    public @interface Configuration {
        /**
         * schedulerExpression
         * @return schedulerExpression
         */
        @AttributeDefinition(description = "Period at which scheduler should start",
                name = "Cron Expression",
                type = AttributeType.STRING)
        String getCron() default "0 0/3 * * * * ?";
        /**
         * serviceEnabled
         * @return serviceEnabled
         */
        @AttributeDefinition(name = "Enabled",
                description = "True, if scheduler is enabled",
                type = AttributeType.BOOLEAN)
        boolean enabled() default false;

    }
}
