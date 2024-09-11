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
import com.abbott.aem.platform.common.components.services.APILookupService;
import com.adobe.granite.ui.components.ds.DataSource;

import lombok.NonNull;

@ExtendWith(MockitoExtension.class)
@MockitoSettings(strictness = Strictness.LENIENT)
class AmdLookupDataSourceTest  {

	@InjectMocks
	AmdLookupDataSource lookupDataSource;

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
	APILookupService apiLookupService;
	
	@Mock
	ESLPostMethodUtil responseObject;

	private static final Logger log = LoggerFactory.getLogger(AmdLookupDataSourceTest.class);
	
	public static final String RESOURCE_TYPE = "amd/datasource/dropdown";
	private static final String LOOKUP_TYPE = "lookuptype";	
	public static final String DOMAIN_NAME = "domainname";
	
	public static final String X_ORIGIN_SECRET = "x-origin-secret";
	
	private static final String SITE_MOLECULARCATALOG_INT = "/content/molecularcatalog/int/en";
	private static final String SITE_MOLECULARCATALOG_US = "/content/molecularcatalog/us/en";
	private static final String SITE_MOLECULAR = "/content/molecular/";
	
	Map<String, String> dropDownMap;
    
	@BeforeEach
	public void setUp() throws Exception {
		
		
	}
    
	@Test
	void testDoGetMolecularCatalogUS() {
		try {

			doGetRepeatedCode();
			when(request.getRequestURI()).thenReturn(SITE_MOLECULARCATALOG_US);
			when(valueMap.get(LOOKUP_TYPE, String.class)).thenReturn("https://www.molecularcatalog.com");
			when(responseObject.getProductResult("https://www.molecularcatalog.com", "amdmolecularcatalog", "{\"action\":\"retrieveallorderinfo\",\"marketId\":\"1\"}")).thenReturn(getRetrieveAll_US());
			lookupDataSource.doGet(request, response);			
			verify(request,times(1)).setAttribute(Mockito.anyString(), Mockito.any(DataSource.class));
		} catch (ServletException | IOException e) {
			log.error("error is:{}", e);
		} catch (Exception e) {
			log.error("error is:{}", e);
		}
	}
	
	@Test
	void testDoGetMolecularCatalogINT() {
		try {

			doGetRepeatedCode();
			when(request.getRequestURI()).thenReturn(SITE_MOLECULARCATALOG_INT);
			when(valueMap.get(LOOKUP_TYPE, String.class)).thenReturn("https://www.molecularcatalog.com");
			when(responseObject.getProductResult("https://www.molecularcatalog.com", "amdmolecularcatalog", "{\"action\":\"retrieveallorderinfo\",\"marketId\":\"2\"}")).thenReturn(getRetrieveAll_INT());
			lookupDataSource.doGet(request, response);			
			verify(request,times(1)).setAttribute(Mockito.anyString(), Mockito.any(DataSource.class));
		} catch (ServletException | IOException e) {
			log.error("error is:{}", e);
		} catch (Exception e) {
			log.error("error is:{}", e);
		}
	}
	
	@Test
	void testDoGetMolecular() {
		try {

			doGetRepeatedCode();
			when(request.getRequestURI()).thenReturn(SITE_MOLECULAR);
			when(valueMap.get(LOOKUP_TYPE, String.class)).thenReturn("https://www.molecular.com");
			when(responseObject.getProductResult("https://www.molecular.com", "amdmolecular", "{\"action\":\"retrieveallproductfamilies\"}")).thenReturn(getRetrieveallproductfamilies());
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
	
	private String getRetrieveAll_US() {
	return "{\n"
			+ "	    \"status\": true,\n"
			+ "	    \"requestId\": \"3bf84eb3-56c4-496f-bb6f-e40a4a9896d9\",\n"
			+ "	    \"response\": [\n"
			+ "	        {\n"
			+ "	            \"productId\": \"112\",\n"
			+ "	            \"productName\": \"Vysis ToTelVysion Multi-Color FISH Probe\",\n"
			+ "	            \"productOrderInfoID\": \"150\",\n"
			+ "	            \"orderNumber\": \"05J05-001\",\n"
			+ "	            \"gtin\": \"00884999010703\",\n"
			+ "	            \"unitQuantity\": \"30 µL\",\n"
			+ "	            \"availableMarketId\": \"1\",\n"
			+ "	            \"regulatoryStatusId\": \"3\",\n"
			+ "	            \"regulatoryStatus\": \"ASR\",\n"
			+ "	            \"marketName\": \"OUS\"\n"
			+ "	        }],\n"
			+ "	    \"errorCode\": 0\n"
			+ "	}";
	}
	
	private String getRetrieveAll_INT() {
		return "{\n"
				+ "	    \"status\": true,\n"
				+ "	    \"requestId\": \"3bf84eb3-56c4-496f-bb6f-e40a4a9896d9\",\n"
				+ "	    \"response\": [\n"
				+ "	        {\n"
				+ "	            \"productId\": \"112\",\n"
				+ "	            \"productName\": \"Vysis ToTelVysion Multi-Color FISH Probe\",\n"
				+ "	            \"productOrderInfoID\": \"150\",\n"
				+ "	            \"orderNumber\": \"05J05-001\",\n"
				+ "	            \"gtin\": \"00884999010703\",\n"
				+ "	            \"unitQuantity\": \"30 µL\",\n"
				+ "	            \"availableMarketId\": \"1\",\n"
				+ "	            \"regulatoryStatusId\": \"3\",\n"
				+ "	            \"regulatoryStatus\": \"ASR\",\n"
				+ "	            \"marketName\": \"US\"\n"
				+ "	        }],\n"
				+ "	    \"errorCode\": 0\n"
				+ "	}";
		}
	
	private String getRetrieveallproductfamilies() {
		return "{\n"
				+ "  \"status\": true,\n"
				+ "  \"response\": [\n"
				+ "    {\n"
				+ "      \"familyName\": \" Vysis LSI CCND1 SpectrumGreen Probe \",\n"
				+ "      \"id\": \"1355\"\n"
				+ "    },\n"
				+ "    {\n"
				+ "      \"familyName\": \"1q21 CKS1B SpectrumOrange / 1p32 CDKN2C SpectrumGreen FISH Probe Kit\",\n"
				+ "      \"id\": \"1106\"\n"
				+ "    },\n"
				+ "    {\n"
				+ "      \"familyName\": \"Abbott Cervi-Collect Specimen Collection Kit\",\n"
				+ "      \"id\": \"2838\"\n"
				+ "    }\n"
				+ "	],\n"
				+ "  \"errorCode\": 0\n"
				+ "}";
		}
	
}
