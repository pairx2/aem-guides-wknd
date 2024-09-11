package com.abbott.aem.cloud.api;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

import javax.servlet.Servlet;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.servlets.SlingAllMethodsServlet;
import org.apache.sling.event.jobs.JobManager;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.abbott.aem.cloud.api.configuration.ApiRunJobConfiguration;
import com.abbott.aem.cloud.api.jobs.AbbottJob;
import com.abbott.aem.cloud.api.jobs.NonExistingJob;

@SuppressWarnings("CQRules:CQBP-75")
@Component(service = Servlet.class,
        property = { "sling.servlet.paths=" + ApiRunJobServlet.SERVLET_PATH,
        "sling.auth.requirements=-" + ApiRunJobServlet.SERVLET_PATH })
public class ApiRunJobServlet extends SlingAllMethodsServlet {

    private static final long serialVersionUID = -7960965871323952419L;

    public static final String SERVLET_PATH = "/bin/servlet/abbott/api/runjob";
    public static final String JOB_PARAM = "jobname";
    public static final String API_KEY = "apikey";
    public static final String DOMAIN_NAME = "domainname";
    private static final Logger log = LoggerFactory.getLogger(ApiRunJobServlet.class);
    public static final String PAYLOAD = "data";    

    @Reference
    transient JobManager jobManager;

    @Reference
    transient ApiRunJobConfiguration config;

    @Reference
    transient volatile List<AbbottJob> abbotJobs;

    @Override
    protected void doPost(SlingHttpServletRequest request, SlingHttpServletResponse response) throws IOException {
        String jobName = request.getHeader(JOB_PARAM);
        String apiKey = request.getHeader(API_KEY);

        final Map<String, Object> props = new HashMap<>();
        log.debug("jobname requested {}" , jobName);
        String data = null;
        if(Objects.nonNull(request.getReader()) && Objects.nonNull(request.getReader().lines()))
        {
        	data = request.getReader().lines().collect(Collectors.joining(System.lineSeparator()));
        }
        if( Objects.nonNull(data))
        {
        	props.put(PAYLOAD, data);
        }
        
        if (StringUtils.equals(apiKey, config.getApiKey())) {
            if (jobName != null) {
                AbbottJob job = getProperJob(jobName);
                if (StringUtils.isNotBlank(job.getTopic())) {
                    jobManager.addJob(job.getTopic(), props);
                    response.setStatus(HttpServletResponse.SC_ACCEPTED);
                    response.getWriter().write("Job has been triggered");
                } else {
                    response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                    response.getWriter().write("Job with that name does not exist: " + jobName);
                }
            } else {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                response.getWriter().write("Header '" + JOB_PARAM + "' is mising in request.");
            }
        } else {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.getWriter().write("Incorrect or missing api key.");
        }
    }

    private AbbottJob getProperJob(String jobTopic) {
       return abbotJobs.stream()
               .filter(job -> StringUtils.equals(job.getTopic(), jobTopic))
               .findAny()
               .orElse(new NonExistingJob());
    }
}
