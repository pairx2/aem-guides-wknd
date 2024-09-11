package com.abbott.aem.cloud.api;

import com.abbott.aem.cloud.api.configuration.ApiRunJobConfiguration;
import com.abbott.aem.cloud.api.jobs.AbbottJob;
import com.abbott.aem.cloud.api.jobs.NonExistingJob;
import com.abbott.aem.cloud.api.jobs.TemplateJob;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.event.jobs.JobBuilder;
import org.apache.sling.event.jobs.JobManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class ApiRunJobServletTest {

    private static final String EXAMPLE_API_KEY = "12345qwerty";

    ApiRunJobServlet apiRunJobServlet = new ApiRunJobServlet();

    SlingHttpServletRequest request = mock(SlingHttpServletRequest.class);
    SlingHttpServletResponse response = mock(SlingHttpServletResponse.class);
    JobManager jobManager = mock(JobManager.class);
    ApiRunJobConfiguration config = mock(ApiRunJobConfiguration.class);
    JobBuilder jobBuilder = mock(JobBuilder.class);
    PrintWriter writer = mock(PrintWriter.class);
    List<AbbottJob> abbottJobList = List.of(new NonExistingJob(), new TemplateJob());

    @BeforeEach
    void onBefore() throws IOException {
        apiRunJobServlet.jobManager = jobManager;
        apiRunJobServlet.config = config;
        apiRunJobServlet.abbotJobs = abbottJobList;
        when(jobManager.createJob(any())).thenReturn(jobBuilder);
        when(config.getApiKey()).thenReturn(EXAMPLE_API_KEY);
        when(response.getWriter()).thenReturn(writer);
    }

    @Test
    void requestWithCorrectJobName() throws ServletException, IOException {
        when(request.getHeader(ApiRunJobServlet.JOB_PARAM)).thenReturn(new TemplateJob().getTopic());
        when(request.getHeader(ApiRunJobServlet.API_KEY)).thenReturn(EXAMPLE_API_KEY);

        apiRunJobServlet.doPost(request, response);

        verify(jobManager, times(1)).addJob(any(), any());
        verify(response).setStatus(HttpServletResponse.SC_ACCEPTED);
    }

    @Test
    void requestWithInCorrectJobName() throws ServletException, IOException {
        when(request.getHeader(ApiRunJobServlet.JOB_PARAM)).thenReturn("nothing");
        when(request.getHeader(ApiRunJobServlet.API_KEY)).thenReturn(EXAMPLE_API_KEY);

        apiRunJobServlet.doPost(request, response);

        verify(jobManager, times(0)).addJob(any(), any());
        verify(response).setStatus(HttpServletResponse.SC_BAD_REQUEST);
        verify(writer).write("Job with that name does not exist: nothing");
    }

    @Test
    void requestWithoutJobName() throws ServletException, IOException {
        when(request.getHeader(ApiRunJobServlet.API_KEY)).thenReturn(EXAMPLE_API_KEY);

        apiRunJobServlet.doPost(request, response);

        verify(jobManager, times(0)).addJob(any(), any());
        verify(response).setStatus(HttpServletResponse.SC_BAD_REQUEST);
        verify(writer).write("Header 'jobname' is mising in request.");
    }

    @Test
    void requestWithoutApiKey() throws ServletException, IOException {
        when(request.getHeader(ApiRunJobServlet.JOB_PARAM)).thenReturn(new TemplateJob().getTopic());

        apiRunJobServlet.doPost(request, response);

        verify(jobManager, times(0)).addJob(any(), any());
        verify(response).setStatus(HttpServletResponse.SC_BAD_REQUEST);
        verify(writer).write("Incorrect or missing api key.");
    }

    @Test
    void requestWithWrongApiKey() throws ServletException, IOException {
        when(request.getHeader(ApiRunJobServlet.JOB_PARAM)).thenReturn(new TemplateJob().getTopic());
        when(request.getHeader(ApiRunJobServlet.API_KEY)).thenReturn("wrong api key");

        apiRunJobServlet.doPost(request, response);

        verify(jobManager, times(0)).addJob(any(), any());
        verify(response).setStatus(HttpServletResponse.SC_BAD_REQUEST);
        verify(writer).write("Incorrect or missing api key.");
    }

}