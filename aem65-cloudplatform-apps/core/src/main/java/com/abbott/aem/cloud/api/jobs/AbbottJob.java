package com.abbott.aem.cloud.api.jobs;

/**
 * All Abbott jobs, which are available to being triggered via API have to implement this interface.
 */
public interface AbbottJob {

    /**
     *
     * @return Job topic value
     */
    String getTopic();
}
