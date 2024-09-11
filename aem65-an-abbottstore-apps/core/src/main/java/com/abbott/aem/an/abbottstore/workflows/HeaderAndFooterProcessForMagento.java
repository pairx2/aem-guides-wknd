/*package com.abbott.aem.an.abbottstore.workflows;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.net.ProtocolException;
import java.net.URL;
import java.net.URLConnection;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.HashMap;

import org.apache.commons.lang.StringUtils;
import org.apache.http.client.fluent.Request;
import org.apache.http.entity.ContentType;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.json.JSONException;
import org.json.JSONObject;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.abbott.aem.an.abbottstore.services.UrlConfigService;
import com.abbott.magento.catalog.connector.MagentoConnectorService;
import com.abbott.magento.services.IdentityProvider;
import com.adobe.granite.workflow.WorkflowSession;
import com.adobe.granite.workflow.exec.WorkItem;
import com.adobe.granite.workflow.exec.WorkflowProcess;
import com.adobe.granite.workflow.metadata.MetaDataMap;
import com.day.cq.commons.Externalizer;

@Component(property = {"descrciption" + "=Header and footer update on Magento while activating the home page",
        "process.label" + "=Header and Footer process for Magento"})
public class HeaderAndFooterProcessForMagento implements WorkflowProcess {
    private static final Logger LOG = LoggerFactory.getLogger(HeaderAndFooterProcessForMagento.class);

    private String[] baseUrls;
    private int abbottHeaderStaticId;
    private int abbottFooterStaticId;
    private int glucernaHeaderStaticId;
    private int glucernaFooterStaticId;
    private int similacHeaderStaticId;
    private int similacFooterStaticId;
    private String abbottMagentoServer;
    private String glucernaMagentoServer;
    private String similacMagentoServer;

    @Reference
    Externalizer externalizer;

    @Reference
    private UrlConfigService urlConfigService;
    
    
	@Reference 
    private transient IdentityProvider magentoIdentityProvider;

    @Override
    public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap metaDataMap) {

        HashMap<String, Integer> idMap = urlConfigService.getHeaderFooterId();
        abbottHeaderStaticId = idMap.get("abbottHeaderStaticId");
        abbottFooterStaticId = idMap.get("abbottFooterStaticId");
        glucernaHeaderStaticId = idMap.get("glucernaHeaderStaticId");
        glucernaFooterStaticId = idMap.get("glucernaFooterStaticId");
        similacHeaderStaticId = idMap.get("similacHeaderStaticId");
        similacFooterStaticId = idMap.get("similacFooterStaticId");
        HashMap<String, String> serverMap = urlConfigService.getStoreServers();
        abbottMagentoServer = serverMap.get("abbottMagentoServer");
        glucernaMagentoServer = serverMap.get("glucernaMagentoServer");
        similacMagentoServer = serverMap.get("similacMagentoServer");
        LOG.info("execute method in HeaderAndFooterProcessForMagento");
        String payloadPath = workItem.getWorkflowData().getPayload().toString();
        ResourceResolver resourceResolver = workflowSession.adaptTo(ResourceResolver.class);
        Resource homePage = resourceResolver.getResource(payloadPath);
        if (null == homePage && !Arrays.asList(baseUrls).contains(payloadPath)) {
            LOG.error("home page does not exists {}", payloadPath);
            return;
        }
        String storeKey = getStoreKey(payloadPath);
        LOG.debug("storekey :{}", storeKey);
        String[] headerAndFooterKey = new String[]{"header", "footer"};
        int[] storeIds = getBlockId(storeKey);
        for (int i=0; null != storeIds && i<headerAndFooterKey.length; i++) {
            String headerSource = getSource(homePage, resourceResolver, headerAndFooterKey[i]);
            headerSource = StringUtils.replaceChars(headerSource, "\"","'");
            LOG.debug("input header source {}", headerSource);
            String serverUrl = getServerUrl(storeKey);
            StringBuilder requestUrl = new StringBuilder(serverUrl).append("/rest/V1/cmsBlock/").append(storeIds[i]);
            JSONObject inputJson = new JSONObject();
            JSONObject contentJson = new JSONObject();
            try {
                contentJson.put("content", headerSource.trim());
                inputJson.put("block", contentJson);
            } catch (JSONException e) {
				LOG.error("JSONException in do get method of test servlet : {}", e);
            }
            String magentoResponse = pushContentToMagento(requestUrl.toString(), inputJson);
            LOG.info("magentoResponse {}",magentoResponse);
        }
    }

    private String getStoreKey(String payload) {
        if (null != payload && StringUtils.contains(payload, "/")) {
            String[] payloadPieces = payload.split("/");
            if (payloadPieces.length > 3) {
                return payloadPieces[2];
            }
        }
        return null;
    }
    private String getSource(Resource homagePageResource, ResourceResolver resourceResolver, String headerOrFooter) {
        LOG.info("getSource method in header and footer process for magento {}", homagePageResource.getPath());
        Resource header = homagePageResource.getChild("jcr:content/root/" + headerOrFooter);
        if (null != header) {
            try {
                StringBuilder fullPath = new StringBuilder(externalizer.publishLink(resourceResolver, ""));
                fullPath.append(StringUtils.replace(header.getPath(), "jcr:content","_jcr_content")).append(".html");
                URL url = new URL(fullPath.toString());
                LOG.debug("Requested url :{}", fullPath.toString());
                URLConnection conn = url.openConnection();
                conn.setRequestProperty("User-Agent", "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.95 Safari/537.11");
                return toString(conn.getInputStream());
            } catch (ProtocolException e) {
                LOG.error("ProtocolException in getSource {}", e.getMessage());
            } catch (MalformedURLException e) {
                LOG.error("MalformedURLException in getSource {}", e.getMessage());
            } catch (IOException e) {
                LOG.error("IOException in getSource {}", e.getMessage());
            }
        }
        return null;
    }

    private String pushContentToMagento(String requestUrl, JSONObject inputBody) {
        LOG.info("pushContentToMagento method in header and footer process for magento");
        try {

            String username = magentoIdentityProvider.getAdminUser();
            String password = magentoIdentityProvider.getAdminPassword();
            String server = magentoIdentityProvider.getServer();
			LOG.debug("Admin user is :{} & server  is :{} ", magentoIdentityProvider.getAdminUser(),
					magentoIdentityProvider.getServer());
            MagentoConnectorService magentoConnectorService = new MagentoConnectorService(server, username, password);
            String token = magentoConnectorService.getToken();
            LOG.debug("token {}", token);
            LOG.debug("requestUrl {}", requestUrl);
            String response = Request.Put(requestUrl).addHeader("Authorization", token).bodyString(inputBody.toString(), ContentType.APPLICATION_JSON).execute().returnContent().asString();
            LOG.info("response from magento after header push {}", response);
            return response;
		} catch (ProtocolException | MalformedURLException e) {
			LOG.error("IO related Exception in pushContentToMagento {}", e);
		} catch (Exception e) {
			LOG.error("Exception in pushContentToMagento {}", e);
        }
        return null;
    }

    private static String toString(InputStream inputStream) throws IOException
    {
        try (BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(inputStream, StandardCharsets.UTF_8)))
        {
            String inputLine;
            StringBuilder stringBuilder = new StringBuilder();
            while ((inputLine = bufferedReader.readLine()) != null)
            {
                stringBuilder.append(inputLine);
            }
            return stringBuilder.toString();
        }
    }

    private int[] getBlockId(String storeKey){
        int[] blockIds = null;
        if (StringUtils.equalsIgnoreCase(storeKey, "abbott")) {
            blockIds = new int[]{abbottHeaderStaticId, abbottFooterStaticId};
        } else if (StringUtils.equalsIgnoreCase(storeKey, "glucerna")) {
            blockIds = new int[]{glucernaHeaderStaticId, glucernaFooterStaticId};
        } else if (StringUtils.equalsIgnoreCase(storeKey, "similac")) {
            blockIds = new int[]{similacHeaderStaticId, similacFooterStaticId};
        }
        return blockIds;
    }

    private String getServerUrl(String storeKey) {
        switch (storeKey) {
            case "abbott":
                return abbottMagentoServer;
            case "glucerna":
                return glucernaMagentoServer;
            case "similac":
                return similacMagentoServer;
            default:
                return abbottMagentoServer;
        }
    }
}
*/