package com.abbott.aem.bts.cybersecurity.core;


import com.abbott.aem.bts.cybersecurity.services.ArcherAPIJobService;

import com.abbott.aem.cloud.api.jobs.AbbottJob;
import com.google.gson.*;

import org.apache.sling.event.jobs.Job;
import org.apache.sling.event.jobs.consumer.JobConsumer;
import org.osgi.service.component.annotations.*;
import org.osgi.service.metatype.annotations.Designate;
import org.osgi.util.converter.Converter;
import org.osgi.util.converter.Converters;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import static org.apache.sling.event.jobs.consumer.JobConsumer.PROPERTY_TOPICS;
import static org.osgi.framework.Constants.SERVICE_DESCRIPTION;
import static org.osgi.service.event.EventConstants.SERVICE_ID;

@Component(immediate = true, service = { JobConsumer.class, AbbottJob.class }, property = {
        PROPERTY_TOPICS + "=" + ArcherAPIJobConsumer.ARCHER_IMPORT_JOB_TOPIC,
        SERVICE_ID + "=Cybersecurity Archer API Consumer Job",
        SERVICE_DESCRIPTION + "=This job imports products from Archer Portal" })
@Designate(ocd = ArcherAPIJobConsumerConfiguration.class)
public class ArcherAPIJobConsumer implements JobConsumer, AbbottJob {

    @Reference
    private ArcherAPIJobService archerAPIJobService;

    public static final String ARCHER_IMPORT_JOB_TOPIC = "bts/cybersecurity/archerimport";

    private static final Logger log = LoggerFactory.getLogger(ArcherAPIJobConsumer.class);
    Converter converter = Converters.standardConverter();

    @Override
    public JobResult process(Job job) {
        log.info("ArcherAPIJobConsumer started...");
        try {
            archerAPIJobService.getProductDetails();

        }catch (JsonSyntaxException e) {
            log.error("ArcherAPIJobConsumer ran into an exception!", e);
            return JobResult.FAILED;
        }
        log.info("ArcherAPIJobConsumer successfully ended...");
        return JobResult.OK;
    }

    public String getTopic() {
        return ArcherAPIJobConsumer.ARCHER_IMPORT_JOB_TOPIC;
    }

}
