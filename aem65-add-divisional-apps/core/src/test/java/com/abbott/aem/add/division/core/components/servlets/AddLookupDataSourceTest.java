package com.abbott.aem.add.division.core.components.servlets;

import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.io.IOException;
import java.util.Map;

import javax.servlet.ServletException;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.junit.jupiter.MockitoSettings;
import org.mockito.quality.Strictness;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.abbott.aem.add.division.core.components.util.ESLPostMethodUtil;
import com.adobe.granite.ui.components.ds.DataSource;

import lombok.NonNull;

@ExtendWith(MockitoExtension.class)
@MockitoSettings(strictness = Strictness.LENIENT)
class AddLookupDataSourceTest  {

	
	@InjectMocks
	AddLookupDataSource lookupDataSource;

	@NonNull
	@Mock
	SlingHttpServletRequest request;

	@NonNull
	@Mock
	SlingHttpServletResponse response;

	@Mock
	Resource resource;

	@Mock
	Resource dataSource;


	@Mock
	ResourceResolver resolver;

	@Mock
	ValueMap valueMap;

	@Mock
	ESLPostMethodUtil responseObject;


	private static final Logger log = LoggerFactory.getLogger(AddLookupDataSourceTest.class);
	Map<String, String> dropDownMap;
	private static final String LOOKUP_TYPE = "lookuptype";
	private static final String ResourcePath = "/content/add/transfusion/us/en/home";
    
	@BeforeEach
	public void setUp() throws Exception {
		
		
	}
    
	@Test
	void testDoGetForCondition() {
		try {

			doGetRepeatedCode();
			when(valueMap.get(LOOKUP_TYPE, String.class)).thenReturn("https://www.google.com?filterType=condition");
			when(responseObject.getProductResult("https://www.google.com", "transfusion", "{\"type\":\"condition\"}")).thenReturn(getDropDownData());
			lookupDataSource.doGet(request, response);			
			verify(request,times(1)).setAttribute(Mockito.anyString(), Mockito.any(DataSource.class));
		} catch (ServletException | IOException e) {
			log.error("error is:{}", e);
		} catch (Exception e) {
			log.error("error is:{}", e);
		}
	}
	
	@Test
	void testDoGetForProduct() {
		try {

			doGetRepeatedCode();
			when(valueMap.get(LOOKUP_TYPE, String.class)).thenReturn("https://www.google.com?filterType=product");
			when(responseObject.getProductResult("https://www.google.com", "transfusion", "{\"type\":\"product\"}")).thenReturn(getDropDownData());
			lookupDataSource.doGet(request, response);			
			verify(request,times(1)).setAttribute(Mockito.anyString(), Mockito.any(DataSource.class));
		} catch (ServletException | IOException e) {
			log.error("error is:{}", e);
		} catch (Exception e) {
			log.error("error is:{}", e);
		}
	}
	
	@Test
	void testDoGetForTabular() {
		try {

			doGetRepeatedCode();
			when(valueMap.get(LOOKUP_TYPE, String.class)).thenReturn("https://www.google.com?filterType=tabular");
			when(responseObject.getProductResult("https://www.google.com", "transfusion", "{\"type\":\"tabular\"}")).thenReturn(getDropDownData());
			lookupDataSource.doGet(request, response);			
			verify(request,times(1)).setAttribute(Mockito.anyString(), Mockito.any(DataSource.class));
		} catch (ServletException | IOException e) {
			log.error("error is:{}", e);
		} catch (Exception e) {
			log.error("error is:{}", e);
		}
	}

	@Test
	void testDoGetElse() {
		try {
			doGetRepeatedCode();
			when(valueMap.get(LOOKUP_TYPE, String.class)).thenReturn("https://www.google.com?filterType=elsepart");
			when(responseObject.getProductResult("https://www.google.com", "transfusion", "{\"type\":\"elsepart\"}")).thenReturn(getDropDownData2());
			lookupDataSource.doGet(request, response);			
			verify(request,times(1)).setAttribute(Mockito.anyString(), Mockito.any(DataSource.class));
		} catch (ServletException | IOException e) {
			log.error("error is:{}", e);
		} catch (Exception e) {
			log.error("error is:{}", e);
		}
	}
	
	private void getVM() {
		when(resource.getChild("datasource")).thenReturn(dataSource);
		when(dataSource.getValueMap()).thenReturn(valueMap);
	}
	
	private String doGetRepeatedCode() throws Exception {
		when(request.getResource()).thenReturn(resource);
		when(request.getResourceResolver()).thenReturn(resolver);
		getVM();
		return "responseString";
	}
	
	private String getDropDownData() {
	return "{\n"
			+ "    \"status\": true,\n"
			+ "    \"requestId\": \"ff576086-5644-4af3-875c-c11fc34810c9\",\n"
			+ "    \"response\": [\n"
			+ "        {\n"
			+ "            \"key\": \"Alabama\",\n"
			+ "            \"value\": \"Alabama\"\n"
			+ "        },\n"
			+ "        {\n"
			+ "            \"key\": \"Alaska\",\n"
			+ "            \"value\": \"Alaska\"\n"
			+ "        }\n"
			+ "    ],\n"
			+ "    \"errorCode\": 0\n"
			+ "}";
	}
	
	private String getDropDownData2() {
	return "{\n"
			+ "    \"status\": true,\n"
			+ "    \"requestId\": \"ff576086-5644-4af3-875c-c11fc34810c9\",\n"
			+ "    \"response\": [\n"
			+ "        {\n"
			+ "            \"key\": \"Alabama\",\n"
			+ "            \"value\": \"Alabama\"\n"
			+ "        }\n"
			+ "        {\n"
			+ "            \"key\": \"Alaska\",\n"
			+ "            \"value\": \"Alaska\"\n"
			+ "        }\n"
			+ "    ],\n"
			+ "    \"errorCode\": 0\n"
			+ "}";
	}
	
}
