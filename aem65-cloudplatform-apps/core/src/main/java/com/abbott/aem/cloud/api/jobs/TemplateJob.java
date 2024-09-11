package com.abbott.aem.cloud.api.jobs;

import org.apache.sling.event.jobs.Job;
import org.apache.sling.event.jobs.consumer.JobConsumer;
import org.osgi.service.component.annotations.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component(
        immediate = true,
        service = { JobConsumer.class, AbbottJob.class },
        property = {
                JobConsumer.PROPERTY_TOPICS + "=" + TemplateJob.TOPIC
        }
)
public class TemplateJob implements JobConsumer, AbbottJob {

        private static final Logger log = LoggerFactory.getLogger(TemplateJob.class);

        public static final String TOPIC = "example/template/abbott/job";

        @Override
        public JobResult process(Job job) {
                JobResult result = JobResult.OK;
                log.error("Find this in logs to verify if works!");
                return result;
        }

        public String getTopic() {
                return TOPIC;
        }
}
