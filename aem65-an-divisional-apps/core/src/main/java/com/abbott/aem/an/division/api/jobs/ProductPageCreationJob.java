package com.abbott.aem.an.division.api.jobs;

import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.apache.sling.event.jobs.Job;
import org.apache.sling.event.jobs.consumer.JobConsumer;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.abbott.aem.an.division.core.services.PIMConfigurationService;
import com.abbott.aem.an.division.core.services.ProductListService;
import com.abbott.aem.an.division.core.services.impl.ProductListServiceImpl;
import com.abbott.aem.an.division.core.utils.Utils;
import com.abbott.aem.cloud.api.jobs.AbbottJob;

@Component(immediate = true, service = { JobConsumer.class, AbbottJob.class }, property = {
		JobConsumer.PROPERTY_TOPICS + "=" + ProductPageCreationJob.TOPIC })
public class ProductPageCreationJob implements JobConsumer, AbbottJob {

	private static final Logger LOGGER = LoggerFactory.getLogger(ProductPageCreationJob.class);

	public static final String TOPIC = "pdp/template/abbottnutrition/job";

	@Reference
	private ResourceResolverFactory resourceResolverFactory;

	@Reference
	private PIMConfigurationService pimConfigs;

	@Reference
	EmailRunJobConfiguration emailJobs;

	@Override
	public JobResult process(Job job) {
		JobResult result = JobResult.FAILED;
		Utils objUtils = new Utils();
		if (objUtils.isAuthorMode(pimConfigs)) {
			result = JobResult.OK;
			LOGGER.debug("ProductPageCreationJob processing Started!");
			startProductCreationProcess();
			LOGGER.debug("ProductPageCreationJob processing Completed!");
		} else {
			LOGGER.debug("ProductPageCreationJob processing will work only for author mode!!");
		}

		return result;

	}

	public String getTopic() {
		return TOPIC;
	}

	public void startProductCreationProcess() {
		LOGGER.debug("Started calling product list lambda");
		try {
			ProductListService productListService = new ProductListServiceImpl();
			productListService.getProducts(this.resourceResolverFactory, pimConfigs, emailJobs);
		} catch (RuntimeException | LoginException e) {
			LOGGER.error("Finished calling product list lambda {0}", e);
		}

		LOGGER.debug("Finished calling product list lambda");

	}

}
