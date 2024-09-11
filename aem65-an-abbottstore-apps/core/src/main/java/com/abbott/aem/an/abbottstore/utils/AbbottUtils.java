package com.abbott.aem.an.abbottstore.utils;

import com.abbott.aem.an.abbottstore.constants.CommonConstants;
import com.abbott.aem.an.abbottstore.services.NutritionDataService;
import com.abbott.aem.an.abbottstore.services.RenditionsService;
import com.abbott.magento.exception.CommerceException;
import com.adobe.granite.workflow.WorkflowSession;
import com.adobe.granite.workflow.exec.WorkItem;
import com.day.cq.commons.jcr.JcrConstants;
import com.day.cq.dam.api.Asset;
import com.day.cq.dam.api.Rendition;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import com.google.gson.JsonSyntaxException;
import org.apache.commons.io.FilenameUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.jcr.Node;
import javax.jcr.RepositoryException;
import javax.jcr.ValueFormatException;
import javax.jcr.lock.LockException;
import javax.jcr.nodetype.ConstraintViolationException;
import javax.jcr.version.VersionException;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.ProtocolException;
import java.net.URL;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

public class AbbottUtils {
	private static final Logger LOG = LoggerFactory.getLogger(AbbottUtils.class);
	private static String HTML = ".html";
	private AbbottUtils() {
	}

	private static final Logger logger = LoggerFactory.getLogger(AbbottUtils.class);

	/**
	 * Generate assest renditions.
	 *
	 * @param item              the item
	 * @param wfSession         the wf session
	 * @param path              the path
	 * @param renditionsService the renditions service
	 * @param type              the type
	 */
	public static void generateAssestRenditions(WorkItem item, WorkflowSession wfSession, String path,
			RenditionsService renditionsService, String type) {
		logger.debug("Asset path {}", path);
		Asset asset = renditionsService.getAssetFromPayload(item, wfSession);
		if (asset == null) {
			logger.error("Asset does not exist in path {}", item.getWorkflowData().getPayload());
			return;
		}
		String tempPath = path.substring(0, path.indexOf(CommonConstants.FORWARD_SLASH + JcrConstants.JCR_CONTENT));
		String originalFileName = tempPath.substring(tempPath.lastIndexOf(CommonConstants.FORWARD_SLASH) + 1);
		String originalFileExtension = FilenameUtils.getExtension(originalFileName);
		originalFileName = FilenameUtils.getBaseName(originalFileName);
		Rendition rendition = asset.getOriginal();
		if (type.equalsIgnoreCase(CommonConstants.DESKTOP_DAM)) {
			renditionsService.generateRenditions(asset, rendition, originalFileName, originalFileExtension, path);
		} else if (type.equalsIgnoreCase(CommonConstants.MOBILE_DAM)) {
			renditionsService.generateCustomResponsiveRenditions(asset, rendition, originalFileName,
					originalFileExtension);
		}
	}

	public static String getResolvedPath(ResourceResolver resourceResolver, String path, List<String> baseStores, String serverUrl) {
		String shortenLink = path;
		LOG.debug("Path in getResolvedPath method {}",shortenLink);
		if(StringUtils.startsWith(path,"/content")) {
			shortenLink = (StringUtils.endsWith(path, HTML))?StringUtils.substringAfter(path, HTML):path;
			shortenLink = resourceResolver.map(shortenLink);
			LOG.debug("Resolver path in getResolvedPath method {}",shortenLink);
			if (baseStores.contains(shortenLink)) {
				shortenLink = "/";
			}
			LOG.debug("Path after checking in baseStores paths in getResolvedPath method {}",shortenLink);
			if (!StringUtils.equalsIgnoreCase(shortenLink, "/") && !StringUtils.endsWith(shortenLink, ".com")) {
				shortenLink = shortenLink + HTML;
				return (null != serverUrl) ? (serverUrl+shortenLink): shortenLink;
			}
		}
		LOG.debug("Retuning Path from getResolvedPath method {}",shortenLink);
		return shortenLink;
	}

	/**
	 * Filters internal and external links. gets relative url for internal links and
	 * appends http:/www for external links
	 * 
	 * @param uri
	 * @return
	 */
	public static String linkChecker(String uri) {
		LOG.debug("link checker url before {}", uri);
		if (uri != null && StringUtils.isNotEmpty(uri)) {
			if (StringUtils.startsWith(uri,"/content/") || StringUtils.startsWith(uri,"/en/")) { // Internal-Link
				if (("").equals(getExtension(uri))) {
					if (StringUtils.startsWith(uri,"/content/dam/")) {
						return uri;
					} else {
						uri = uri + ".html";
					}
				}
			} else if (StringUtils.startsWith(uri, "www")) { // External-Link
				uri = "http://" + uri;
			}
		}
		LOG.debug("link checker url after {}", uri);
		return uri;
	}

	/**
	 * Returns the extension of the link
	 * 
	 * @param uri
	 * @return extension
	 */
	public static String getExtension(String uri) {
		String extension = "";
		if (uri.contains(".")) {
			extension = uri.substring(uri.lastIndexOf('.'));
		}
		return extension;
	}

	/**
	 * Resolve path.
	 *
	 * @param resourceResolver the resource resolver
	 * @param path             the path
	 * @return the string
	 */
	public static String getHtmlLink(ResourceResolver resourceResolver, String path) {
		return linkChecker(resolve(resourceResolver, path));
	}

	public static String resolve(ResourceResolver resourceResolver, String path){
		LOG.debug("resolving the path for {}", path);
		Resource resource = null;
		if (resourceResolver != null && StringUtils.isNotBlank(path)) {
			resource = resourceResolver.resolve(path);
			LOG.debug("resolved path {}", resource);
		}
		return (null != resource && !ResourceUtil.isNonExistingResource(resource)) ? resource.getPath() : null;
	}

	/**
	 * Returns the resource resolver instance for a passed user name.
	 *
	 * @param resolverFactory the resolver factory
	 * @param userName        the user name
	 * @return ResourceResolver
	 * @throws LoginException the login exception
	 */
	private static ResourceResolver getResourceResolver(ResourceResolverFactory resolverFactory, String userName)
			throws LoginException {
		Map<String, Object> params = new HashMap<>();
		params.put(ResourceResolverFactory.SUBSERVICE, userName);
		return resolverFactory.getServiceResourceResolver(params);
	}

	/**
	 * Gets the write resource resolver.
	 *
	 * @param resolverFactory the resolver factory
	 * @return the write resource resolver
	 * @throws CommerceException the commerce exception
	 */
	public static ResourceResolver getWriteResourceResolver(ResourceResolverFactory resolverFactory)
	{
		ResourceResolver resourceResolver = null;
		try {
			resourceResolver = getResourceResolver(resolverFactory, CommonConstants.WRITE_USER);
		} catch (LoginException e) {
			logger.error("LoginException in getWriteResourceResolver:: {} ", e.getMessage());
		}
		return resourceResolver;
	}

	/**
	 * Gets the read resource resolver.
	 *
	 * @param resolverFactory the resolver factory
	 * @return the read resource resolver
	 * @throws CommerceException the commerce exception
	 */
	public static ResourceResolver getReadResourceResolver(ResourceResolverFactory resolverFactory)
	{
		ResourceResolver resourceResolver = null;
		try {
			resourceResolver = getResourceResolver(resolverFactory, CommonConstants.RESOURCE_RESOLVER_USER);
		} catch (LoginException e) {
			logger.error("LoginException in getReadResourceResolver:: {} ", e.getMessage());
		}
		return resourceResolver;
	}

	/**
	 * Closes the resource resolver and saves all resource changes.
	 *
	 * @param resourceResolver the resource resolver
	 * @throws CommerceException the commerce exception
	 */
	public static void closeResolver(ResourceResolver resourceResolver) {
		if (resourceResolver != null && resourceResolver.isLive()) {
			saveResourceChanges(resourceResolver);
			resourceResolver.close();
		} else {
			logger.warn("The resource resolver received for closing is null.");
		}
	}

	/**
	 * Saves all resource changes using resource resolver.
	 *
	 * @param resourceResolver the resource resolver
	 */
	private static void saveResourceChanges(ResourceResolver resourceResolver) {
		if (resourceResolver.hasChanges()) {
			try {
				resourceResolver.commit();
			} catch (PersistenceException e) {
				logger.error("PersistenceException in saveResourceChanges:: {} ", e.getMessage());
			}
		}
	}

	/**
	 * Sets the page properties.
	 *
	 * @param resourceResolver the resource resolver
	 * @param jcrContent       the jcr content
	 * @param skuId            the skuId
	 */
	public static void setPageProperties(ResourceResolver resourceResolver, Resource jcrContent, String skuId, NutritionDataService nutritionDataService, boolean updateAll) {
		HttpURLConnection conn = null;
		logger.debug( "Inside setPageProperties method" );
		String jsonUrlPath = nutritionDataService.getNutritionWebServiceUrl();
		if (StringUtils.isNotBlank( skuId ) && skuId.length() > 5) {
			skuId = skuId.substring( 0, 5 );
		}
		try {
			int timeout = nutritionDataService.getTimeOut();
			URL url = new URL( jsonUrlPath + skuId );
			conn = (HttpURLConnection) url.openConnection();
			conn.setRequestMethod( CommonConstants.GET );
			conn.setRequestProperty( CommonConstants.ACCEPT, CommonConstants.APPLICATION_JSON );
			conn.setConnectTimeout( timeout );
			conn.setReadTimeout( timeout );
			if (conn.getResponseCode() != 200) {
				logger.error( CommonConstants.FAILED_HTTP_CODE, conn.getResponseCode() );
			}
			JsonObject productJsonObj = getJsonResult( conn );
			Node jcrNode = jcrContent.adaptTo( Node.class );
			if (null != jcrNode) {
				if (productJsonObj != null && (!updateAll ? checkUpdates( productJsonObj, jcrNode ) : true)) {
					logger.debug( "productJsonObj is not null" );
					jcrNode.setProperty( CommonConstants.PUBLISHED_AT,
							productJsonObj.get( CommonConstants.PUBLISHED_AT ).toString().replace( "\"", "" ) );
					jcrNode.setProperty( CommonConstants.NUTRITIONAL_INFO, productJsonObj.toString() );
					jcrNode.setProperty( CommonConstants.LAST_MODIFIED, Calendar.getInstance() );
				}
				jcrNode.setProperty( CommonConstants.GENERATE_NUTRITION_FACTS, false );
				resourceResolver.commit();
			}
		} catch (RepositoryException re) {
			logger.error( "RepositoryException occured : {}", re.getMessage() );
		} catch (IOException ioe) {
			logger.error( "IOException : {}", ioe.getMessage() );
		} finally {
			if (conn != null) {
				conn.disconnect();
			}
		}
	}

	/**
	 * This method returns json result.
	 *
	 * @param conn the connection
	 * @return JsonObject the JsonObjectResult
	 * @throws IOException the IOException
	 */
	public static JsonObject getJsonResult(HttpURLConnection conn) throws IOException {
		try (BufferedReader br = new BufferedReader( new InputStreamReader( (conn.getInputStream()) ) )) {
			Gson gson = new GsonBuilder().create();
			return gson.fromJson( br, JsonObject.class );
		} catch (JsonSyntaxException je) {
			logger.error( "Response is null ::{}", je.getMessage() );
		}
		return null;
	}

	/**
	 * This method checks for updates and returns boolean value.
	 *
	 * @param productJsonObj the productJsonObj
	 * @return boolean true if update exists
	 */
	public static Boolean checkUpdates(JsonObject productJsonObj, Node jcrNode) {
		logger.debug( "Inside check updates method" );
		String publishedDate = productJsonObj.get( CommonConstants.PUBLISHED_AT ).toString().replace( "\"", "" );
		try {
			if (jcrNode.hasProperty( CommonConstants.PUBLISHED_AT )) {
				String prodSaveDate = jcrNode.getProperty( CommonConstants.PUBLISHED_AT ).getString();
				DateFormat formatter = new SimpleDateFormat( "yyyy-MM-dd'T'HH:mm:ss.SSS" );
				Date prodDate = formatter.parse( publishedDate );
				Date nodeDate = formatter.parse( prodSaveDate );
				if (prodDate.compareTo( nodeDate ) > 0) {
					logger.debug( "has updates" );
					return true;
				}
			} else if (!jcrNode.hasProperty( CommonConstants.PUBLISHED_AT )) {
				logger.debug( "has updates" );
				return true;
			}
		} catch (ParseException pe) {
			logger.error( "Parse exception while formatting date :: {}", pe.getMessage() );
		} catch (RepositoryException re) {
			logger.error( "Exception while getting the property:: {}", re.getMessage() );
		}
		return false;
	}

}
