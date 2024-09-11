package com.abbott.aem.an.abbottstore.workflows;

import com.abbott.aem.an.abbottstore.constants.CommonConstants;
import com.abbott.aem.an.abbottstore.services.NutritionDataService;
import com.abbott.aem.an.abbottstore.utils.AbbottUtils;
import com.adobe.granite.workflow.WorkflowException;
import com.adobe.granite.workflow.WorkflowSession;
import com.adobe.granite.workflow.exec.WorkItem;
import com.adobe.granite.workflow.exec.WorkflowProcess;
import com.adobe.granite.workflow.metadata.MetaDataMap;
import com.day.cq.commons.jcr.JcrConstants;
import com.day.cq.wcm.api.NameConstants;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import com.google.gson.JsonSyntaxException;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.jcr.Node;
import javax.jcr.RepositoryException;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Calendar;

/**
 * @author saikrishna.s
 * 
 *         NutritionInfoWorkflow - This workflow will provide methods to set
 *         product data in product pages.
 *
 */
@Component(property = { "descrciption" + "=Get Nutrition info data and set as page properties",
		"process.label" + "=Import Nutrition Facts from 'PIM' integration" })
public class NutritionInfoWorkflow implements WorkflowProcess {

	/** The Constant LOG. */
	private static final Logger log = LoggerFactory.getLogger(NutritionInfoWorkflow.class);

	/** The nutrition data service. */
	@Reference
	private transient NutritionDataService nutritionDataService;

	/** Gets the payload. */
	@Override
	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap processArguments)
			throws WorkflowException {

		String payloadPath = workItem.getWorkflowData().getPayload().toString();
		ResourceResolver resourceResolver = workflowSession.adaptTo(ResourceResolver.class);
		Resource productPage = resourceResolver.getResource(payloadPath);

		checkProductPageProperties(resourceResolver, productPage);
	}

	/**
	 * Check product page properties.
	 *
	 * @param resourceResolver the resource resolver
	 * @param productPage      the product page
	 */
	private void checkProductPageProperties(ResourceResolver resourceResolver, Resource productPage) {
		if (productPage.getValueMap().get(JcrConstants.JCR_PRIMARYTYPE).equals(NameConstants.NT_PAGE)) {
			Resource jcrContent = resourceResolver.getResource(productPage.getPath() + "/" + JcrConstants.JCR_CONTENT);
			String templateName = jcrContent.getValueMap().get(NameConstants.NN_TEMPLATE, String.class);
			String skuId = jcrContent.getValueMap().get(CommonConstants.SKU, String.class);

			if ((templateName.contains(CommonConstants.ABBOTT_PRODUCT_TEMPLATE)
					|| (templateName.contains(CommonConstants.GLUCERNA_PRODUCT_TEMPLATE)))
							&& jcrContent.getValueMap().containsKey(CommonConstants.SKU)) {
				log.info("Setting Nutrition Information for: {}", productPage.getPath());
				AbbottUtils.setPageProperties(resourceResolver, jcrContent, skuId, nutritionDataService,true);
			}
		} else if (productPage.getName().equalsIgnoreCase(JcrConstants.JCR_CONTENT)) {
			Resource jcrContent = resourceResolver.getResource(productPage.getPath());
			String templateName = jcrContent.getValueMap().get(NameConstants.NN_TEMPLATE, String.class);
			String skuId = jcrContent.getValueMap().get(CommonConstants.SKU, String.class);

			if ((templateName.contains(CommonConstants.ABBOTT_PRODUCT_TEMPLATE)
					|| (templateName.contains(CommonConstants.GLUCERNA_PRODUCT_TEMPLATE)))
							&& jcrContent.getValueMap().containsKey(CommonConstants.SKU)) {
				log.info("Setting Nutrition Information for 111: {}", productPage.getPath());
				AbbottUtils.setPageProperties(resourceResolver, jcrContent, skuId, nutritionDataService,true);
			}
		}
	}
}