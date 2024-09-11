package com.abbott.aem.an.similac.core.workflows;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.when;

import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;

import com.abbott.aem.an.similac.core.services.NutritionDataService;
import com.adobe.granite.workflow.WorkflowException;
import com.adobe.granite.workflow.WorkflowSession;
import com.adobe.granite.workflow.exec.WorkItem;
import com.adobe.granite.workflow.exec.WorkflowData;
import com.adobe.granite.workflow.metadata.MetaDataMap;
import com.google.gson.JsonObject;

import ch.randelshofer.io.ByteArrayImageInputStream;

@ExtendWith(MockitoExtension.class)
class SimilacNutritionInfoWorkflowTest {
	
	@InjectMocks
	SimilacNutritionInfoWorkflow similacNutritionInfoWorkflow;
	
	@Mock
	WorkItem workItem;
	
	@Mock
	WorkflowSession workFlowSession;
	
	@Mock
	MetaDataMap metaDataMap;
	
	@Mock
	WorkflowData workFlowData;
	
	@Mock
	ResourceResolver resourceResolver;
	
	@Mock
	Resource productPageResource, jcrContentResource;
	
	@Mock
	ValueMap pageResourceValueMap, jcrContentResourceValueMap;
	
	@Spy
	NutritionDataService service;
	
	@Mock
	HttpURLConnection httpURLConnection; 
	
	@BeforeEach
	void setUpI() {
		MockitoAnnotations.initMocks(this);
	}

	@Test
	void testExecute() throws WorkflowException, IOException {
		when(workItem.getWorkflowData()).thenReturn(workFlowData);
		when(workFlowData.getPayload()).thenReturn("payload");
		when(workFlowSession.adaptTo(ResourceResolver.class)).thenReturn(resourceResolver);
		when(resourceResolver.getResource("payload")).thenReturn(productPageResource);
		when(productPageResource.getValueMap()).thenReturn(pageResourceValueMap);
		when(pageResourceValueMap.get("jcr:primaryType")).thenReturn("cq:Page");
		when(productPageResource.getPath()).thenReturn("resourcepath");
		when(resourceResolver.getResource("resourcepath/jcr:content")).thenReturn(jcrContentResource);
		when(jcrContentResource.getValueMap()).thenReturn(jcrContentResourceValueMap);
		when(jcrContentResourceValueMap.get("cq:template", String.class)).thenReturn("product-page");
		when(jcrContentResourceValueMap.get("sku", String.class)).thenReturn("skuId");
		when(jcrContentResourceValueMap.containsKey("sku")).thenReturn(true);
		when(service.getNutritionWebServiceUrl()).thenReturn("https://nutrition.com/product");
		when(service.getTimeOut()).thenReturn(1000);
		
		similacNutritionInfoWorkflow.execute(workItem, workFlowSession, metaDataMap);
		
		Mockito.verify(workItem, times(1)).getWorkflowData();
		Mockito.verify(workFlowData, times(1)).getPayload();
		Mockito.verify(workFlowSession, times(1)).adaptTo(ResourceResolver.class);
		Mockito.verify(resourceResolver, times(1)).getResource("payload");
		Mockito.verify(productPageResource, times(1)).getValueMap();
		Mockito.verify(pageResourceValueMap, times(1)).get("jcr:primaryType");
		Mockito.verify(productPageResource, times(1)).getPath();
		Mockito.verify(resourceResolver, times(1)).getResource("resourcepath/jcr:content");
		Mockito.verify(jcrContentResource, times(3)).getValueMap();
		Mockito.verify(jcrContentResourceValueMap, times(1)).get("cq:template", String.class);
		Mockito.verify(jcrContentResourceValueMap, times(1)).get("sku", String.class);
		Mockito.verify(jcrContentResourceValueMap, times(1)).containsKey("sku");
		Mockito.verify(service, times(1)).getNutritionWebServiceUrl();
		Mockito.verify(service, times(1)).getTimeOut();
	}
	
	@Test
	void testExecute2() throws WorkflowException, IOException {
		when(workItem.getWorkflowData()).thenReturn(workFlowData);
		when(workFlowData.getPayload()).thenReturn("payload");
		when(workFlowSession.adaptTo(ResourceResolver.class)).thenReturn(resourceResolver);
		when(resourceResolver.getResource("payload")).thenReturn(productPageResource);
		when(productPageResource.getValueMap()).thenReturn(pageResourceValueMap);
		when(productPageResource.getName()).thenReturn("jcr:content");
		when(pageResourceValueMap.get("jcr:primaryType")).thenReturn("cq:page");
		when(productPageResource.getPath()).thenReturn("resourcepath");
		when(resourceResolver.getResource("resourcepath")).thenReturn(jcrContentResource);
		when(jcrContentResource.getValueMap()).thenReturn(jcrContentResourceValueMap);
		when(jcrContentResourceValueMap.get("cq:template", String.class)).thenReturn("product-page");
		when(jcrContentResourceValueMap.get("sku", String.class)).thenReturn("skuId123");
		when(jcrContentResourceValueMap.containsKey("sku")).thenReturn(true);
		when(service.getNutritionWebServiceUrl()).thenReturn("https://nutrition.com/product");
		when(service.getTimeOut()).thenReturn(1000);
		
		similacNutritionInfoWorkflow.execute(workItem, workFlowSession, metaDataMap);
		
		Mockito.verify(workItem, times(1)).getWorkflowData();
		Mockito.verify(workFlowData, times(1)).getPayload();
		Mockito.verify(workFlowSession, times(1)).adaptTo(ResourceResolver.class);
		Mockito.verify(resourceResolver, times(1)).getResource("payload");
		Mockito.verify(productPageResource, times(1)).getValueMap();
		Mockito.verify(productPageResource, times(1)).getName();
		Mockito.verify(pageResourceValueMap, times(1)).get("jcr:primaryType");
		Mockito.verify(productPageResource, times(1)).getPath();
		Mockito.verify(resourceResolver, times(1)).getResource("resourcepath");
		Mockito.verify(jcrContentResource, times(3)).getValueMap();
		Mockito.verify(jcrContentResourceValueMap, times(1)).get("cq:template", String.class);
		Mockito.verify(jcrContentResourceValueMap, times(1)).get("sku", String.class);
		Mockito.verify(jcrContentResourceValueMap, times(1)).containsKey("sku");
		Mockito.verify(service, times(1)).getNutritionWebServiceUrl();
		Mockito.verify(service, times(1)).getTimeOut();
	}
	
	@Test
	void testExecute3() throws WorkflowException, IOException {
		when(workItem.getWorkflowData()).thenReturn(workFlowData);
		when(workFlowData.getPayload()).thenReturn("payload");
		when(workFlowSession.adaptTo(ResourceResolver.class)).thenReturn(resourceResolver);
		when(resourceResolver.getResource("payload")).thenReturn(productPageResource);
		when(productPageResource.getValueMap()).thenReturn(pageResourceValueMap);
		when(productPageResource.getName()).thenReturn("jcr:content");
		when(pageResourceValueMap.get("jcr:primaryType")).thenReturn("cq:page");
		when(productPageResource.getPath()).thenReturn("resourcepath");
		when(resourceResolver.getResource("resourcepath")).thenReturn(jcrContentResource);
		when(jcrContentResource.getValueMap()).thenReturn(jcrContentResourceValueMap);
		when(jcrContentResourceValueMap.get("cq:template", String.class)).thenReturn("product--page");
		
		similacNutritionInfoWorkflow.execute(workItem, workFlowSession, metaDataMap);
		
		Mockito.verify(workItem, times(1)).getWorkflowData();
		Mockito.verify(workFlowData, times(1)).getPayload();
		Mockito.verify(workFlowSession, times(1)).adaptTo(ResourceResolver.class);
		Mockito.verify(resourceResolver, times(1)).getResource("payload");
		Mockito.verify(productPageResource, times(1)).getValueMap();
		Mockito.verify(productPageResource, times(1)).getName();
		Mockito.verify(pageResourceValueMap, times(1)).get("jcr:primaryType");
		Mockito.verify(productPageResource, times(1)).getPath();
		Mockito.verify(resourceResolver, times(1)).getResource("resourcepath");
		Mockito.verify(jcrContentResource, times(2)).getValueMap();
		Mockito.verify(jcrContentResourceValueMap, times(1)).get("cq:template", String.class);
	}
	
	@Test
	void testGetJSONResult_InvalidJSON() throws IOException {
		when(httpURLConnection.getInputStream()).thenReturn(getInputStream("jsonString"));
	 	JsonObject jsonObject = similacNutritionInfoWorkflow.getJsonReslult(httpURLConnection);
	 	assertNull(jsonObject);
	}
	
	@Test
	void testGetJSONResult_ValidJSON() throws IOException {
		when(httpURLConnection.getInputStream()).thenReturn(getInputStream("{\"response\":\"response\"}"));
	 	JsonObject jsonObject = similacNutritionInfoWorkflow.getJsonReslult(httpURLConnection);
	 	assertNotNull(jsonObject);
	 	assertEquals("response", jsonObject.get("response").getAsString());
	}
	
	private InputStream getInputStream(String response) {
		InputStream inputStream = new ByteArrayImageInputStream(response.getBytes());
		return inputStream;
	}
}
