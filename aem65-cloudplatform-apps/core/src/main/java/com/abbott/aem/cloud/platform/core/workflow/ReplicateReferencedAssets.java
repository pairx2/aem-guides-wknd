package com.abbott.aem.cloud.platform.core.workflow;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Map;

import javax.jcr.Node;
import javax.jcr.RepositoryException;

import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.Header;
import org.apache.http.util.EntityUtils;
import org.apache.jackrabbit.JcrConstants;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.abbott.aem.cloud.platform.core.constants.CommonConstants;
import com.abbott.aem.cloud.platform.core.services.UpdatedESLConfiguration;
import com.adobe.granite.workflow.WorkflowSession;
import com.adobe.granite.workflow.exec.WorkItem;
import com.adobe.granite.workflow.exec.WorkflowProcess;
import com.adobe.granite.workflow.metadata.MetaDataMap;
import com.day.cq.dam.api.Asset;
import com.day.cq.dam.commons.util.AssetReferenceSearch;
import com.day.cq.replication.ReplicationActionType;
import com.day.cq.replication.ReplicationException;
import com.day.cq.replication.Replicator;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

@Component(property = { "service.description=Find the referenced asstes in the payload page",
		"process.label" + "=Replicate the Referenced Assets" })

public class ReplicateReferencedAssets implements WorkflowProcess {
	/** * Logger */
	private static final Logger LOGGER = LoggerFactory.getLogger(ReplicateReferencedAssets.class);

	private static final String DAM_PATH = "/content/dam";

	@Reference
	protected Replicator replicator;

	@Reference
	private UpdatedESLConfiguration updateESLConfig;
	private boolean siteApprovalFlag = false;
	private String siteApproval;
	private String eslResponse;
	private String productId;
	private String siteApprovalDateTime;
	private static String xApplicationAccessKey;
	private static String apiUrl;
	private static String contentType;
	private static String originSecret;

	@Override
	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap metaDataMap) {

		MetaDataMap workflowMetaData = workItem.getWorkflowData().getMetaDataMap();
		String workflowType = CommonConstants.ACTIVATION;
		if (workflowMetaData.containsKey("workflowtype")) {
			workflowType = workflowMetaData.get("workflowtype").toString();
		}
		String payloadPage = workItem.getWorkflowData().getPayload().toString();
		LOGGER.debug("workflow payloadPage {}", payloadPage);
		LOGGER.debug("workflowtype value {}", workflowType);
		ResourceResolver resourceResolver = workflowSession.adaptTo(ResourceResolver.class);
		Resource resource = resourceResolver.getResource(payloadPage + "/" + JcrConstants.JCR_CONTENT);
		LOGGER.debug("resource {}", resource.getName());
		Node pageNode = resource.adaptTo(Node.class);
		LOGGER.debug("pageNode {}", pageNode);
		productId = resource.getValueMap().get("productId", String.class);
		LOGGER.debug("productId {}", productId);
		try {
			AssetReferenceSearch referenceSearch = new AssetReferenceSearch(pageNode, DAM_PATH, resourceResolver);
			if (referenceSearch.search().size() > 0) {
				Map<String, Asset> assetsMap = referenceSearch.search();
				for (Map.Entry<String, Asset> entry : assetsMap.entrySet()) {
					if (workflowType.equalsIgnoreCase(CommonConstants.ACTIVATION)) {
						replicator.replicate(pageNode.getSession(), ReplicationActionType.ACTIVATE,
								entry.getValue().getPath());
						siteApprovalFlag = true;
					} else {
						replicator.replicate(pageNode.getSession(), ReplicationActionType.DEACTIVATE,
								entry.getValue().getPath());
					}
				}
				if (siteApprovalFlag) {
					callESLRestAPI();
				}
			} else {
				if (workflowType.equalsIgnoreCase(CommonConstants.ACTIVATION)) {
					siteApprovalFlag = true;
					LOGGER.debug("Before going into the function");
					callESLRestAPI();
					LOGGER.debug("After going into the function");
				}
			}
		} catch (RepositoryException | ReplicationException | IOException e) {
			LOGGER.error("Error in publishPages: {0}", e);
		}
	}

	private String getRequestParams() {
		JsonObject requestParams = new JsonObject();
		requestParams.addProperty("action", "updateProduct");
		requestParams.addProperty("productID", productId);
		LOGGER.debug("productId {}", productId);
		siteApproval = "Y";
		requestParams.addProperty("siteApproval", siteApproval);
		DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
		LocalDateTime ldt = LocalDateTime.now();
		siteApprovalDateTime = dtf.format(ldt);
		LOGGER.debug("siteApprovalDateTime {}", siteApprovalDateTime);
		requestParams.addProperty("siteApprovalDateTime", siteApprovalDateTime);
		return requestParams.toString();
	}

	public void callESLRestAPI() throws IOException {
		LOGGER.debug("Entering into the function :: callESLRestAPI");
		LOGGER.debug("ESL API :: callESLRestAPI for Product ID: {}", productId);
		getUpdatedESLConfigurations(updateESLConfig);
		HttpPost post = new HttpPost(apiUrl);
		String params = getRequestParams();
		LOGGER.debug("Get Request Params:{}",params);	
		StringEntity entity = new StringEntity(params, ContentType.APPLICATION_JSON);
		post.setEntity(entity);
		post.setHeader(CommonConstants.APPLICATION_ID, CommonConstants.APP_ID_VALUE);
		post.setHeader(CommonConstants.COUNTRY_CODE, CommonConstants.COUNTRY_CODE_VALUE);
		post.setHeader(CommonConstants.CONTENT_TYPE, contentType);
		post.setHeader(CommonConstants.APPLICATION_ACCESS_KEY, xApplicationAccessKey);
		post.setHeader(CommonConstants.ORIGIN_SECRET, originSecret);
		post.setHeader(CommonConstants.PREFERRED_LANGUAGE, CommonConstants.LANGUAGE_VALUE);
			
		Header[] headers = post.getAllHeaders();	     
	     int count=0;
		 for(Header head: headers) {
		 LOGGER.debug("Request Headers for ESL API Workflow " + count+ " {}", head);
		 count++;
		}
		LOGGER.debug("Request Body for ESL API Workflow {}", EntityUtils.toString(entity));
		try (CloseableHttpClient httpclient = HttpClients.createDefault();
				CloseableHttpResponse response = httpclient.execute(post);) {
			int statusCode = response.getStatusLine().getStatusCode();
			LOGGER.error("Site Version received from PIM API-statusCode:{}", statusCode);
			eslResponse = EntityUtils.toString(response.getEntity());

			if (null != eslResponse) {
				JsonObject eslResponseData = new JsonParser().parse(eslResponse.trim()).getAsJsonObject();
				if (!eslResponseData.isJsonNull()) {
					String status = eslResponseData.get("status").getAsString();
					JsonObject responseObject = eslResponseData.get("response").getAsJsonObject();
					String statusReason = responseObject.get("statusReason").getAsString();
					if (status.equalsIgnoreCase(CommonConstants.RESPONSE_STATUS)) {
						LOGGER.debug("Status of ESL Response:Successfully updated {}", status);
						LOGGER.debug("Status Reason of ESL Success Response {}", statusReason);
					} else {
						LOGGER.debug("Status of ESL Response:Fail {}", status);
						LOGGER.debug("Status Reason of ESL Failour Response {}", statusReason);
					}
				}
				LOGGER.debug("Status of ESL Response: Data {}", eslResponse);

			} else {

				LOGGER.error("Status of ESL Response:null");
			}

		} catch (IOException ex) {
			throw new IOException("Error Occurred Utils callRestAPI", ex);
		}
	}

	private static void getUpdatedESLConfigurations(UpdatedESLConfiguration updateESLConfig) {

		LOGGER.debug("Inside ESL Configs: {} ", updateESLConfig);
		apiUrl = updateESLConfig.getApiUrl();
		xApplicationAccessKey = updateESLConfig.getxApplicationAccessKey();
		contentType = updateESLConfig.getContentType();
		originSecret = updateESLConfig.getxOriginSecret();
		LOGGER.debug("Updated ESL Configurations ApiUrl :: {}", apiUrl);
		LOGGER.debug("Updated ESL Configurations XApplicationAccessKey :: {}", xApplicationAccessKey);
		LOGGER.debug("Updated ESL Configurations ContentType :: {}", contentType);
		LOGGER.debug("Updated ESL Configurations originSecret :: {}", originSecret);
		LOGGER.debug("exit of pim configs {} ", updateESLConfig);
		LOGGER.debug("exit of pim configs{} ", updateESLConfig);
	}
}