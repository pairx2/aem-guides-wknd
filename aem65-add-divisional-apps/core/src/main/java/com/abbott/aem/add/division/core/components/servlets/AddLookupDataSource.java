package com.abbott.aem.add.division.core.components.servlets;

import static org.apache.sling.api.servlets.HttpConstants.METHOD_GET;
import static org.apache.sling.api.servlets.ServletResolverConstants.SLING_SERVLET_METHODS;
import static org.apache.sling.api.servlets.ServletResolverConstants.SLING_SERVLET_RESOURCE_TYPES;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

import javax.servlet.Servlet;

import org.apache.commons.collections4.iterators.TransformIterator;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceMetadata;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.api.servlets.SlingSafeMethodsServlet;
import org.apache.sling.api.wrappers.ValueMapDecorator;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.abbott.aem.add.division.core.components.util.ESLPostMethodUtil;
import com.abbott.aem.platform.common.util.ConvertToDropdown;
import com.abbott.aem.platform.common.util.ConvertToDropdownImpl;
import com.adobe.granite.ui.components.ds.DataSource;
import com.adobe.granite.ui.components.ds.SimpleDataSource;
import com.adobe.granite.ui.components.ds.ValueMapResource;
import com.day.crx.JcrConstants;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.google.gson.JsonSyntaxException;

import lombok.NonNull;

@Component(service = Servlet.class, property = { SLING_SERVLET_RESOURCE_TYPES + "=" + AddLookupDataSource.RESOURCE_TYPE,
		SLING_SERVLET_METHODS + "=" + METHOD_GET })
public class AddLookupDataSource extends SlingSafeMethodsServlet {

	public static final String RESOURCE_TYPE = "add/datasource/dropdown";
	private static final long serialVersionUID = 2222720152081520255L;
	private static final String LOOKUP_TYPE = "lookuptype";
	private static final String DATASOURCE = "datasource";
	private static final String DROPDOWN_VALUE = "value";
	private static final String DROPDOWN_TEXT = "text";
	public static final String DOMAIN_NAME = "domainname";

	@Reference 
    private transient ESLPostMethodUtil responseObject;
	
	private static final Logger LOGGER = LoggerFactory.getLogger(AddLookupDataSource.class);

    private String productRequestBody = "";
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

			ResourceResolver resolver = request.getResourceResolver();
			String lookup = resource.getChild(DATASOURCE).getValueMap().get(LOOKUP_TYPE, String.class);
			
			String filterType = lookup.substring(lookup.indexOf("=") + 1);
			
			String url = lookup.substring(0, lookup.indexOf("?"));
			
			if (filterType.equalsIgnoreCase("condition")) {
				productRequestBody = "{  \"type\": \"condition\"}";
			} else if (filterType.equalsIgnoreCase("product")) {
				productRequestBody = "{  \"type\": \"product\"}";
			} else if (filterType.equalsIgnoreCase("tabular")) {
				productRequestBody = "{  \"type\": \"tabular\"}";
			}			
			
			JsonObject jsonObject = new JsonParser().parse(productRequestBody).getAsJsonObject();
			StringBuilder entity = new StringBuilder();
			String responseString = "";
			entity.append(jsonObject.toString());

			responseString = responseObject.getProductResult(url,"transfusion",entity.toString());
			
			LOGGER.debug(" ESL response from ADD Lookup ==> {} ",responseString);
			Map<String, String> dropDownMap = null;
			ConvertToDropdown convertTodropdown = new ConvertToDropdownImpl();
			dropDownMap = convertTodropdown.getDropDownList(StringUtils.EMPTY, responseString);
			constructDataSource(request, resolver, dropDownMap,filterType);

		} catch (JsonSyntaxException e) {
			LOGGER.error("Error in AddLookup Datasource  {}", e.getMessage());
		}
	}

	/**
	 * 
	 * @param request
	 * @param resolver
	 * @param dropDownMap
	 */
	public void constructDataSource(SlingHttpServletRequest request, ResourceResolver resolver,
			Map<String, String> dropDownMap, String filterType) {

		DataSource ds = new SimpleDataSource(new TransformIterator<>(dropDownMap.keySet().iterator(), dropValue -> {

			ValueMap vm = new ValueMapDecorator(new HashMap<>());
			if (Objects.nonNull(dropDownMap) && (dropDownMap.size() > 0 ) && filterType.equalsIgnoreCase("condition")) {
				vm.put(DROPDOWN_VALUE, dropDownMap.get(dropValue));
				vm.put(DROPDOWN_TEXT, dropDownMap.get(dropValue));
			}
			else if (Objects.nonNull(dropDownMap) && (dropDownMap.size() > 0 ) && 
					(filterType.equalsIgnoreCase("product") || filterType.equalsIgnoreCase("tabular") )) {
				vm.put(DROPDOWN_VALUE, dropValue);
				vm.put(DROPDOWN_TEXT, dropDownMap.get(dropValue));
			}
			
			return new ValueMapResource(resolver, new ResourceMetadata(), JcrConstants.NT_UNSTRUCTURED, vm);

		}));
		request.setAttribute(DataSource.class.getName(), ds);
	}

}