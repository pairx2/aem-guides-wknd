package com.abbott.aem.an.abbottstore.servlets;

import com.abbott.aem.an.abbottstore.constants.CommonConstants;
import com.day.cq.search.PredicateGroup;
import com.day.cq.search.QueryBuilder;
import com.day.cq.search.result.Hit;
import com.day.cq.search.result.SearchResult;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.request.RequestParameter;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.api.servlets.HttpConstants;
import org.apache.sling.api.servlets.SlingAllMethodsServlet;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.propertytypes.ServiceDescription;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.jcr.RepositoryException;
import javax.jcr.Session;
import javax.servlet.Servlet;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.apache.sling.api.servlets.ServletResolverConstants.SLING_SERVLET_METHODS;
import static org.apache.sling.api.servlets.ServletResolverConstants.SLING_SERVLET_PATHS;

/**
 * @author sreenu.l, saikrishna.s
 * 
 *         The VariationSelect servlet is used to get the variations of product
 */
@Component(service = Servlet.class, immediate = true, property = { SLING_SERVLET_PATHS + "=/bin/getVariation",
		SLING_SERVLET_METHODS + "=" + HttpConstants.METHOD_GET })
@ServiceDescription("Get variation based on selected size and flavor")
public class VariationSelect extends SlingAllMethodsServlet {

	/** The Constant LOGGER. */
	private static final Logger LOGGER = LoggerFactory.getLogger(VariationSelect.class);

	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = 1L;

	private static final String SLASH_CONTENT_SLASH = "/content/";
	private static final String SLASH = "/";
	/** The Constant currentSelection. */
	private static final String CURRENT_SELECTION = "currentSelection";

	/*
	 * This method is used to get url parameters and send response
	 * 
	 * @see
	 * org.apache.sling.api.servlets.SlingSafeMethodsServlet#doGet(org.apache.sling.
	 * api.SlingHttpServletRequest, org.apache.sling.api.SlingHttpServletResponse)
	 */
	@Override
	protected void doGet(SlingHttpServletRequest request, SlingHttpServletResponse response) throws IOException {
		LOGGER.debug("do get in get variant servlet");
		try {
			RequestParameter sizeParam = request.getRequestParameter(CommonConstants.SIZE);
			RequestParameter flavorParam = request.getRequestParameter(CommonConstants.FLAVOR);
			RequestParameter pathParam = request.getRequestParameter(CommonConstants.PROD_PATH);
			RequestParameter storeNameParam = request.getRequestParameter(CommonConstants.STORE);
			RequestParameter currentSelectionParam = request.getRequestParameter(CURRENT_SELECTION);

			String size = null != sizeParam ? String.valueOf(sizeParam) : null;
			String flavor = null != flavorParam ? String.valueOf(flavorParam) : null;
			String path = null != pathParam ? String.valueOf(pathParam) : null;
			String storeName = null != storeNameParam ? String.valueOf(storeNameParam) : null;
			String currentSelection = null != currentSelectionParam ? String.valueOf(currentSelectionParam) : null;
			LOGGER.debug("size: ,flavor: ,path: ,storeName: ,currentSelection: " +size +" "+flavor+ " "+path+ " "+storeName+" " +currentSelection);
			//local has to be passed from Ajax in future once multi site management is implemented
			String defaultLocale = "en";
			if (path == null || storeName == null) {
				response.setContentType(CommonConstants.APPLICATION_JSON);
				response.getWriter().write("invalid input");
			} else {
				String contentPath = path;
				boolean shortPath = false;
				if (!StringUtils.startsWith(contentPath, SLASH_CONTENT_SLASH)) {
					shortPath = true;
					StringBuilder pathBuilder = new StringBuilder(SLASH_CONTENT_SLASH).append(storeName).append("/").append(defaultLocale);
					contentPath = pathBuilder.append(contentPath).toString();
				}
				if (StringUtils.isNotEmpty(contentPath)) {
					int index = contentPath.lastIndexOf(CommonConstants.FORWARD_SLASH);
					String actualPath = contentPath.substring(0, index);
					LOGGER.debug("size : {} : flavor : {} : path : {} contentPath: {} storeName : {} currentSelection : {} ", size, flavor, actualPath, contentPath, storeName, currentSelection);
					response.setContentType(CommonConstants.APPLICATION_JSON);
					String responsePath = null;
					responsePath = getVariant(request, size, flavor, actualPath, shortPath, storeName, currentSelection).toString();
					response.getWriter().write(responsePath);

				} else {
					response.setContentType(CommonConstants.APPLICATION_JSON);
					response.getWriter().write("input path is empty");
				}
			}
		}
		catch (RepositoryException e) {
			LOGGER.error("Exception occurred in variation select servlet :: ", e);
		}
	}

	/**
	 * Gets the variant.
	 *
	 * @param request the request
	 * @param size    the size
	 * @param flavor  the flavor
	 * @param path    the path
	 * @return the variant
	 */
	protected JsonArray getVariant(SlingHttpServletRequest request, String size, String flavor, String path, boolean shortPath, String storeName, String currentSelection) throws RepositoryException {
		final Map<String, Object> queryMap = new HashMap<>();
		String locale = "en";
		JsonArray jsonArray = new JsonArray();
		QueryBuilder queryBuilder = request.getResourceResolver().adaptTo(QueryBuilder.class);
		queryMap.put("path", path);
		queryMap.put("type", "cq:PageContent");
		queryMap.put( "1_property", CommonConstants.FLAVORS );
		queryMap.put( "1_property.value", flavor );
		LOGGER.debug("path before query run : {} flavor before query run : {} size before query run : {}",path,flavor,size);
		if (StringUtils.equalsIgnoreCase( currentSelection, CommonConstants.SIZE )) {
			queryMap.put( "2_property", CommonConstants.SIZE );
			queryMap.put( "2_property.value", size );
		}
		com.day.cq.search.Query query = queryBuilder.createQuery(PredicateGroup.create(queryMap),
				request.getResourceResolver().adaptTo(Session.class));
		SearchResult result = query.getResult();
		List<Hit> results = result.getHits();
		if (null != results && !results.isEmpty()) {
			String pagePath = null;
			if (StringUtils.equalsIgnoreCase( currentSelection, CommonConstants.FLAVOR ) ) {
				pagePath = getFlavorSizePath( results, size );
				LOGGER.debug("flavorSizePath {}",pagePath);
			}
			if(pagePath == null) {
				for (Hit hit : results) {
					pagePath = hit.getPath();
					LOGGER.debug("page path: {}", pagePath);
				}
			}
			jsonArray = addVariantSize(pagePath,shortPath,request,storeName,locale);
		}
		return jsonArray;
}

	private JsonArray addVariantSize(String pagePath, boolean shortPath, SlingHttpServletRequest request, String storeName, String locale){
		JsonArray jsonArr = new JsonArray();
		if(null != pagePath) {
			JsonObject jsonObject = new JsonObject();
			int index = pagePath.lastIndexOf( CommonConstants.FORWARD_SLASH );
			String actualPagePath = pagePath.substring( 0, index ) + CommonConstants.HTML_EXTENSION;
			if (shortPath) {
				actualPagePath = StringUtils.substringAfter( actualPagePath, SLASH_CONTENT_SLASH + storeName + SLASH + locale );
			}
			jsonObject.addProperty( CommonConstants.PATH, actualPagePath );
			ValueMap map = request.getResourceResolver().getResource( pagePath ).adaptTo( ValueMap.class );
			if (map.containsKey( CommonConstants.SIZE )) {
				jsonObject.addProperty( CommonConstants.SIZE, map.get( CommonConstants.SIZE ).toString() );
			}
			if (map.containsKey( CommonConstants.FLAVORS )) {
				jsonObject.addProperty( CommonConstants.FLAVORS, map.get( CommonConstants.FLAVORS ).toString() );
			}
			jsonArr.add( jsonObject );
		}
		return jsonArr;
	}
	/**
	 * Gets the FlavorSizePath.
	 *
	 * @param results
	 * @return the variant
	 */
	private String getFlavorSizePath(List <Hit> results, String size) {
		String flavorSizePath = null;
		try {
			for (Hit hit : results) {
				flavorSizePath = hit.getPath();
				ValueMap resValueMap = hit.getResource().adaptTo( ValueMap.class );
				if (resValueMap.containsKey( CommonConstants.SIZE ) && StringUtils.equalsIgnoreCase( resValueMap.get( CommonConstants.SIZE ).toString(), size )) {
					return flavorSizePath;
				}
			}
		} catch (RepositoryException e) {
			LOGGER.error( "RepositoryException in getting variant :{}", e.getMessage() );
		}
		return flavorSizePath;
	}
}