package com.abbott.aem.bts.cybersecurity.core;

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

@Component(immediate = true, configurationPolicy = ConfigurationPolicy.REQUIRE)
@Designate(ocd = ArcherAPIJobScheduler.Configuration.class)
public class ArcherAPIJobScheduler {
	@Reference
	private JobManager jobManager;

	private static final Logger log = LoggerFactory.getLogger(ArcherAPIJobScheduler.class);

	@Activate
	@Modified
	void configure(Configuration config) {
		removeScheduler(config);
		log.debug("Archer API Job Scheduler Configuration changed");
		startScheduledJob(config); 
	}
 
	@Deactivate
	protected void deactivate(Configuration config) {
		log.debug("Inside deactivation of job scheduler");
		removeScheduler(config);
	}

	/**
	 * Remove a scheduler based on the job topic
	 */
	protected void removeScheduler(Configuration config) {
		log.debug("removing job scheduler");
		if (!config.enabled()) {
			Collection<ScheduledJobInfo> scheduledJobInfos = jobManager 
					.getScheduledJobs(ArcherAPIJobConsumer.ARCHER_IMPORT_JOB_TOPIC, 0, null);
			for (ScheduledJobInfo scheduledJobInfo : scheduledJobInfos) {
				scheduledJobInfo.unschedule();
				log.debug("Job is unscheduled.");
			}
		}
	}

	 protected void startScheduledJob(Configuration config) {
		if (config.enabled()) {
			log.debug("Scheduler is enabled");  
			ScheduleBuilder scheduleBuilder = jobManager.createJob(ArcherAPIJobConsumer.ARCHER_IMPORT_JOB_TOPIC)
					.schedule(); 
          	log.debug("Archer API Job Cron expression :: ", config.getCron()); 
			scheduleBuilder.cron(config.getCron());  
			ScheduledJobInfo scheduledJobInfo = scheduleBuilder.add();
			if (scheduledJobInfo == null) {  
				log.debug("Archer API Job Scheduler errored out while adding.");
			} else {
				log.debug("Archer API Job Scheduled successfully");
			}
		} else {
			log.debug("Archer API Job Scheduler is disabled.");
		}
	}

	@ObjectClassDefinition(name = "Archer API Job Scheduler Configuration")
	public @interface Configuration {

		@AttributeDefinition(description = "Period at which scheduler should kickoff",
				name = "Cron Expression",
				type = AttributeType.STRING)
		String getCron() default "0 0/5 * 1/1 * ? *";

		@AttributeDefinition(name = "Enabled",
				description = "True, if scheduler is enabled",
				type = AttributeType.BOOLEAN)
		boolean enabled() default false;

	}
}
