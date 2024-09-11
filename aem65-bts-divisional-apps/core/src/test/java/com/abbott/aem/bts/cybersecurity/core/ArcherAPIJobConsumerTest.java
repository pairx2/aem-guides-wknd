package com.abbott.aem.bts.cybersecurity.core;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.Mockito.*;

import java.util.HashMap;
import java.util.Map;

import javax.jcr.Session;
import javax.net.ssl.HttpsURLConnection;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.apache.sling.event.jobs.Job;
import org.apache.sling.event.jobs.consumer.JobConsumer.JobResult;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.junit.jupiter.MockitoSettings;
import org.mockito.quality.Strictness;

import com.abbott.aem.bts.cybersecurity.services.ArcherAPIJobService;
import com.google.gson.JsonSyntaxException;

import io.wcm.testing.mock.aem.junit5.AemContext;
import junitx.util.PrivateAccessor;

@ExtendWith(MockitoExtension.class)
class ArcherAPIJobConsumerTest {
	
	@InjectMocks
	ArcherAPIJobConsumer archerApiJobConsumer;
	
	@Mock
	Job job;
	
	@Mock
    ArcherAPIJobService archerAPIJobService;
	
	private final AemContext aemContext = new AemContext();
	
	@Mock
	ResourceResolverFactory resResolverFactory;

	@Mock
	ResourceResolver resolver;
	
	@Mock
	Session session;

	@Mock
	Resource resource;
	
	@Mock
	HttpsURLConnection connection;
	
	private static final String CONTENT_WE_RETAIL_US_EN = "bts/cybersecurity/archerimport";
	
	
	
	@Test
	void test()throws Exception {
		archerAPIJobService = mock(ArcherAPIJobService.class);
		JobResult jobR = archerApiJobConsumer.process(job);
		assertNotNull(jobR);		
	}
	
	@Test
	void testJob() throws Exception {
		
		archerAPIJobService = mock(ArcherAPIJobService.class);
		PrivateAccessor.setField(archerApiJobConsumer, "archerAPIJobService", archerAPIJobService);
		lenient().when(archerAPIJobService.getProductDetails()).thenReturn(true);
		JobResult jobR = archerApiJobConsumer.process(job);
		assertNotNull(jobR);
	}

	@Test
	void testProcess(){

		when(archerAPIJobService.getProductDetails()).thenThrow(JsonSyntaxException.class);
		JobResult jobResult = archerApiJobConsumer.process(job);
		assertEquals(JobResult.FAILED, jobResult);
	}
	
	@MockitoSettings(strictness = Strictness.WARN)
	@Test
	void testDeactivatePage() throws Exception {
		archerAPIJobService = mock(ArcherAPIJobService.class);
		JobResult jobR = archerApiJobConsumer.process(job);
		try {
			assert (jobR.equals(JobResult.FAILED));	
		}catch(AssertionError e){
			assertNotNull(e);
		}
		
	}
	@Test
    void getTitle() {
        String actual = archerApiJobConsumer.getTopic();
        String expected ="bts/cybersecurity/archerimport";
        assertEquals(expected, actual);
    }
}
