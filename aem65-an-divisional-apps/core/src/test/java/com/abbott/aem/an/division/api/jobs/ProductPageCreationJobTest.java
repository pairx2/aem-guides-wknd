package com.abbott.aem.an.division.api.jobs;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mockConstruction;

import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.apache.sling.event.jobs.Job;
import org.apache.sling.event.jobs.consumer.JobConsumer.JobResult;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockedConstruction;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import com.abbott.aem.an.division.core.services.PIMConfigurationService;
import com.abbott.aem.an.division.core.services.ProductListService;
import com.abbott.aem.an.division.core.services.impl.ProductListServiceImpl;
import com.abbott.aem.an.division.core.utils.Utils;

class ProductPageCreationJobTest {

	@Mock
	PIMConfigurationService pimConfigs;
	
	@Mock
	EmailRunJobConfiguration emailJobs;

	@Mock
	ResourceResolverFactory resourceResolverFactory;

	@Mock
	ResourceResolver resourceResolver;

	@Mock
	ProductListService productListService;

	@InjectMocks
	ProductPageCreationJob product;

	@BeforeEach
	void setUp() {
		MockitoAnnotations.openMocks(this);
	}

	@Test
	void testGetTopic() {
		assertEquals(ProductPageCreationJob.TOPIC, product.getTopic());
	}

	@Test
	void testJobResultProcess() throws LoginException {
		Job job = Mockito.mock(Job.class);
		try (MockedConstruction<Utils> serviceImpl = mockConstruction(Utils.class, (mockObject, context) -> {
			Mockito.when(mockObject.isAuthorMode(pimConfigs)).thenReturn(true);
		})) {
			Mockito.when(resourceResolverFactory.getServiceResourceResolver(Mockito.anyMap()))
					.thenReturn(resourceResolver);
			JobResult jobResult = product.process(job);
			assertEquals(JobResult.OK, jobResult);
		}
	}

	@Test
	void testJobResultProcess_NoAuthorMode() throws LoginException {
		Job job = Mockito.mock(Job.class);
		try (MockedConstruction<Utils> serviceImpl = mockConstruction(Utils.class, (mockObject, context) -> {
			Mockito.when(mockObject.isAuthorMode(pimConfigs)).thenReturn(false);
		})) {
			Mockito.when(resourceResolverFactory.getServiceResourceResolver(Mockito.anyMap()))
					.thenReturn(resourceResolver);
			JobResult jobResult = product.process(job);
			assertEquals(JobResult.FAILED, jobResult);
		}
	}

	@Test
	void testStartCreationProcess() throws LoginException {
		try (MockedConstruction<ProductListServiceImpl> serviceImpl = mockConstruction(ProductListServiceImpl.class,
				(mockObject, context) -> {
					Mockito.doNothing().when(mockObject).getProducts(Mockito.any(), Mockito.any(), Mockito.any());
				})) {
			product.startProductCreationProcess();
		}
		;
	}

	@Test
	void testStartCreationProcess_RuntimeException() throws LoginException {
		try (MockedConstruction<ProductListServiceImpl> serviceImpl = mockConstruction(ProductListServiceImpl.class,
				(mockObject, context) -> {
					Mockito.doThrow(new RuntimeException()).when(mockObject).getProducts(Mockito.any(), Mockito.any(), Mockito.any());
				})) {
			product.startProductCreationProcess();
		}
		;
	}
}
