package com.abbott.aem.bts.cybersecurity.core;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.*;

import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.event.jobs.JobBuilder;
import org.apache.sling.event.jobs.JobBuilder.ScheduleBuilder;
import org.apache.sling.event.jobs.JobManager;
import org.apache.sling.event.jobs.ScheduledJobInfo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import com.abbott.aem.bts.cybersecurity.core.ArcherAPIJobScheduler.Configuration;
import com.day.cq.commons.inherit.HierarchyNodeInheritanceValueMap;
import com.day.cq.commons.inherit.InheritanceValueMap;
import com.day.cq.wcm.api.Page;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import junitx.util.PrivateAccessor;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;


@ExtendWith(AemContextExtension.class)
@ExtendWith(MockitoExtension.class)
class ArcherAPIJobSchedulerTest {

	private static final Object Expected = null;

	AemContext ctx = new AemContext();

	@InjectMocks
	ArcherAPIJobScheduler archerAPIJobScheduler;

	Map<String, Object> parameters = new HashMap<>();

	ScheduledJobInfo scheduledJobInfo;

	@Mock
	JobBuilder jobBuilder;

	ScheduleBuilder scheduleBuilder;

	ArcherAPIJobConsumer archApiJobConsumer;

	Configuration config;

	JobManager jobManager;

	Collection<ScheduledJobInfo> collectnofvalues = new ArrayList<>();

	@BeforeEach
	void setup() {
		jobManager=Mockito.mock(JobManager.class);
		config=Mockito.mock(ArcherAPIJobScheduler.Configuration.class);
		scheduleBuilder=Mockito.mock(ScheduleBuilder.class);
		scheduledJobInfo= Mockito.mock(ScheduledJobInfo.class);
		archApiJobConsumer= Mockito.mock(ArcherAPIJobConsumer.class);
	}

	@Test
	void startScheduledJob() throws Exception {
		Method method=ArcherAPIJobScheduler.class.getDeclaredMethod("startScheduledJob", Configuration.class);
		method.setAccessible(true);
		Configuration c2=(Configuration) method.invoke(archerAPIJobScheduler, config);
		PrivateAccessor.setField(archerAPIJobScheduler, "jobManager", jobManager);
		lenient().when(scheduleBuilder.add()).thenReturn(scheduledJobInfo);
		when(config.enabled()).thenReturn(true);
		when(jobManager.createJob(any())).thenReturn(jobBuilder);
		when(jobBuilder.schedule()).thenReturn(scheduleBuilder);
		when(config.getCron()).thenReturn("0 0/5 * 1/1 * ? *");
		archerAPIJobScheduler.startScheduledJob(config);
		when(scheduleBuilder.add()).thenReturn(null);
		archerAPIJobScheduler.startScheduledJob(config);
	}

	@Test
	void removeScheduler() throws Exception {
		String ARCHER_IMPORT_JOB_TOPIC = "bts/cybersecurity/archerimport";
		PrivateAccessor.setField(archerAPIJobScheduler, "jobManager", jobManager);
		collectnofvalues.add(scheduledJobInfo);
		Method method=ArcherAPIJobScheduler.class.getDeclaredMethod("removeScheduler", Configuration.class);
		method.setAccessible(true);
		lenient().when(jobManager.getScheduledJobs(ARCHER_IMPORT_JOB_TOPIC, 0, null)).thenReturn(collectnofvalues);
		Configuration c2=(Configuration) method.invoke(archerAPIJobScheduler, config);
		assertEquals(Expected, c2);
	}

	@Test
	void testConfigure() throws Exception {
		Method method=ArcherAPIJobScheduler.class.getDeclaredMethod("startScheduledJob", Configuration.class);
		method.setAccessible(true);
		Configuration c2=(Configuration) method.invoke(archerAPIJobScheduler, config);
		PrivateAccessor.setField(archerAPIJobScheduler, "jobManager", jobManager);
		lenient().when(scheduleBuilder.add()).thenReturn(scheduledJobInfo);
		when(config.enabled()).thenReturn(true);
		when(jobManager.createJob(any())).thenReturn(jobBuilder);
		when(jobBuilder.schedule()).thenReturn(scheduleBuilder);
		when(config.getCron()).thenReturn("0 0/5 * 1/1 * ? *");
		archerAPIJobScheduler.configure(config);
	}

	@Test
	void testDeactivate() throws Exception{
		String ARCHER_IMPORT_JOB_TOPIC = "bts/cybersecurity/archerimport";
		PrivateAccessor.setField(archerAPIJobScheduler, "jobManager", jobManager);
		collectnofvalues.add(scheduledJobInfo);
		Method method=ArcherAPIJobScheduler.class.getDeclaredMethod("removeScheduler", Configuration.class);
		method.setAccessible(true);
		lenient().when(jobManager.getScheduledJobs(ARCHER_IMPORT_JOB_TOPIC, 0, null)).thenReturn(collectnofvalues);
		archerAPIJobScheduler.deactivate(config);
	}

}
