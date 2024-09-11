package com.abbott.aem.an.similac.core.workflows;


import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

import javax.jcr.Node;
import javax.jcr.RepositoryException;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.abbott.aem.an.similac.core.utils.CommonConstants;
import com.abbott.aem.an.similac.core.services.NutritionDataService;
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


@Component(property = { "description" + "=Get Nutrition info data and set as page properties",
		"process.label" + "=Import Nutrition Facts from 'PIM' integration - Similac" })
public class SimilacNutritionInfoWorkflow implements WorkflowProcess{
	
	/** The Constant LOG. */
	private static final Logger log = LoggerFactory.getLogger(SimilacNutritionInfoWorkflow.class);

	/** The nutrition data service. */
	@Reference
	private NutritionDataService nutritionDataService;

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
			checkPageTemplate(jcrContent);			
			
		} else if (productPage.getName().equalsIgnoreCase(JcrConstants.JCR_CONTENT)) {
			Resource jcrContent = resourceResolver.getResource(productPage.getPath());
			checkPageTemplate(jcrContent);
		}

	}

	private void checkPageTemplate(Resource jcrContent) {

		String templateName = jcrContent.getValueMap().get(NameConstants.NN_TEMPLATE, String.class);
		String skuId = jcrContent.getValueMap().get(CommonConstants.SKU, String.class);
		if (!templateName.contains(CommonConstants.SIMILAC_PRODUCT_TEMPLATE)
				|| !jcrContent.getValueMap().containsKey(CommonConstants.SKU)) {
			return;
		}
		try {
			setPageProperties(jcrContent, skuId);
		} catch (MalformedURLException mEx) {
				log.error("MalformedURLException in checkPageTemplate :: ",mEx);
		} catch (IOException ioEx) {
				log.error("IOException in checkPageTemplate :: ",ioEx);
		} catch (RepositoryException rEx) {
				log.error("RepositoryException in checkPageTemplate :: ",rEx);
		}

	}

	/**
	 * Sets the page properties.
	 *
	 * @param resourceResolver the resource resolver
	 * @param jcrContent       the jcr content
	 */
	private void setPageProperties(Resource jcrContent, String skuId)
			throws IOException, RepositoryException{
		HttpURLConnection conn = null;
		String jsonUrlPath = nutritionDataService.getNutritionWebServiceUrl();
		if (StringUtils.isNotBlank(skuId) && skuId.length() > 5) {
			skuId = skuId.substring(0, 5);
		}
		try {
			int timeout = nutritionDataService.getTimeOut();
			URL url = new URL(jsonUrlPath + skuId);
			conn = (HttpURLConnection) url.openConnection();
			conn.setRequestMethod(CommonConstants.GET);
			conn.setRequestProperty(CommonConstants.ACCEPT, CommonConstants.APPLICATION_JSON);
			conn.setConnectTimeout(timeout);
			conn.setReadTimeout(timeout);
			log.info(CommonConstants.FAILED_HTTP_CODE, conn.getResponseCode());
			if (conn.getResponseCode() != 200) {
				log.info(CommonConstants.FAILED_HTTP_CODE, conn.getResponseCode());
			}
			JsonObject productJsonObj = getJsonReslult(conn);
			if (!productJsonObj.isJsonNull()) {
				Node jcrNode = jcrContent.adaptTo(Node.class);
				jcrNode.setProperty(CommonConstants.PUBLISHED_AT,
						productJsonObj.get(CommonConstants.PUBLISHED_AT).toString().replace("\"", ""));
				jcrNode.setProperty(CommonConstants.NUTRITIONAL_INFO, productJsonObj.toString());
				jcrNode.setProperty(CommonConstants.GENERATE_NUTRITION_FACTS, false);
			}

		} finally {
			if (conn != null) {
				conn.disconnect();
			}
		}
	}

	/**
	 * This method returns json result.
	 * 
	 * @param conn
	 * @return
	 * @throws IOException
	 */
	public JsonObject getJsonReslult(HttpURLConnection conn) throws IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader((conn.getInputStream())));

		Gson gson = new GsonBuilder().create();
		try {
			return gson.fromJson(br, JsonObject.class);
		} catch (JsonSyntaxException e) {
			log.error("Response is null :: ",e);
		}
		return null;
	}

}
