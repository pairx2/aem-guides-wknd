package com.abbott.aem.cloud.api.jobs;

import org.apache.commons.lang3.StringUtils;
import org.osgi.service.component.annotations.Component;

@Component(
        immediate = true,
        service = AbbottJob.class
)
public class NonExistingJob implements AbbottJob {

    @Override
    public String getTopic() {
        return StringUtils.EMPTY;
    }
}
