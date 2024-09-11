package com.abbott.aem.add.division.core.components.servlets;

import static org.apache.sling.api.servlets.HttpConstants.METHOD_GET;
import static org.apache.sling.api.servlets.ServletResolverConstants.SLING_SERVLET_METHODS;
import static org.apache.sling.api.servlets.ServletResolverConstants.SLING_SERVLET_RESOURCE_TYPES;

import java.util.Map;

import javax.servlet.Servlet;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.servlets.SlingSafeMethodsServlet;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.abbott.aem.add.division.core.components.util.ESLPostMethodUtil;

import com.abbott.aem.platform.common.components.services.APILookupService;
import com.abbott.aem.platform.common.util.ConvertToDropdown;
import com.abbott.aem.platform.common.util.ConvertToDropdownImpl;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import lombok.NonNull;

@Component(service = Servlet.class,
		property = { SLING_SERVLET_RESOURCE_TYPES + "=" + AmdLookupDataSource.RESOURCE_TYPE, SLING_SERVLET_METHODS + "=" + METHOD_GET })
public class AmdLookupDataSource extends SlingSafeMethodsServlet {

	public static final String RESOURCE_TYPE = "amd/datasource/dropdown";
	private static final long serialVersionUID = 2222720152081520255L;
	private static final String LOOKUP_TYPE = "lookuptype";
	private static final String DATASOURCE = "datasource";
	public static final String DOMAIN_NAME = "domainname";
	
	public static final String X_ORIGIN_SECRET = "x-origin-secret";
	
	private static final String SITE_MOLECULARCATALOG_INT = "/molecularcatalog/int/en";
	private static final String SITE_MOLECULARCATALOG_US = "/molecularcatalog/us/en";
	private static final String SITE_MOLECULAR = "/molecular/";

	private static final Logger LOGGER = LoggerFactory.getLogger(AmdLookupDataSource.class);

	@Reference
	private transient APILookupService apiLookupService;

	private String requestBody = "";
	
	@Reference 
    private transient ESLPostMethodUtil responseObject;
    

	/**
	 * Do get.
	 *
	 * @param request  the request
	 * @param response the response
	 */
	@Override
	protected void doGet(@NonNull SlingHttpServletRequest request, @NonNull SlingHttpServletResponse response) {
		try {

			Resource resource = request.getResource();				
			String resourcepagePath = request.getRequestURI();		
			
			if(resourcepagePath.contains(SITE_MOLECULARCATALOG_US))
			{requestBody = "{\"action\": \"retrieveallorderinfo\",\n    \"marketId\": \"1\"\n}";				
			}
			else if(resourcepagePath.contains(SITE_MOLECULARCATALOG_INT))
			{ requestBody = "{\"action\": \"retrieveallorderinfo\",\n    \"marketId\": \"2\"\n}";
			}	
			else if(resourcepagePath.contains(SITE_MOLECULAR))
			{ requestBody = "{\"action\": \"retrieveallproductfamilies\"}";
			}			

			ResourceResolver resolver = request.getResourceResolver();
			String lookup = resource.getChild(DATASOURCE).getValueMap().get(LOOKUP_TYPE, String.class);			
							
			JsonObject jsonObject = new JsonParser().parse(requestBody).getAsJsonObject();
			StringBuilder entity = new StringBuilder();
			String responseString ="";
			String xappid="";
			entity.append(jsonObject.toString());

			if(resourcepagePath.contains(SITE_MOLECULARCATALOG_INT) || resourcepagePath.contains(SITE_MOLECULARCATALOG_US))
			{
				xappid = "amdmolecularcatalog";
			
			}
			else if(resourcepagePath.contains(SITE_MOLECULAR))
			{
				xappid = "amdmolecular";
			
			}
			
			responseString = responseObject.getProductResult(lookup,xappid,entity.toString());
			
			LOGGER.debug(" ESL response from AMD Lookup ==> {} ",responseString);
			
			if((resourcepagePath.contains(SITE_MOLECULAR)) && (responseString.contains("familyName") || responseString.contains("id")))
			{
				responseString = responseString.replace("id","key");
				responseString = responseString.replace("familyName","value");
			}
			
			else if((resourcepagePath.contains(SITE_MOLECULARCATALOG_INT) || resourcepagePath.contains(SITE_MOLECULARCATALOG_US)) && (responseString.contains("productOrderInfoID") || responseString.contains("productName")))
			{
				responseString = responseString.replace("productOrderInfoID","key");
				responseString = responseString.replace("productName","value");
			}			
			Map<String, String> dropDownMap = null;
			ConvertToDropdown convertTodropdown = new ConvertToDropdownImpl();
			dropDownMap = convertTodropdown.getDropDownList(StringUtils.EMPTY, responseString);
			convertTodropdown.constructDataSource(request, resolver, dropDownMap);
		} catch (IllegalStateException e) {
			LOGGER.error("Error in sendNotification {}", e.getMessage());			
		}
	}
	
}
