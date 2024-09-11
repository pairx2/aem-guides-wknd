package com.abbott.aem.an.similac.core.utils;

import java.util.Iterator;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.PersistenceException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.abbott.aem.an.similac.core.models.FormContainerModel;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;

import lombok.NonNull;

public class SimilacUtils {

	private SimilacUtils() {
	}

	private static final Logger logger = LoggerFactory.getLogger(SimilacUtils.class);

	/**
	 * Filters internal and external links. gets relative url for internal links and
	 * appends http:/www for external links
	 * 
	 * @param uri
	 * @return
	 */
	public static String linkChecker(String uri) {
		if (StringUtils.isBlank(uri)) {
			return uri;
		}
		if (uri.length() >= 8 && ("/content").equals(uri.substring(0, 8))) { // Internal-Link
			if (("").equals(getExtension(uri))) {
				if (uri.contains("dam")) {
					return uri;
				} else {
					uri = uri + ".html";
				}
			}
		} else if (uri.length() >= 3 && ("www").equals(uri.subSequence(0, 3))) { // External-Link
			uri = "http://" + uri;
		}

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
	 * Closes the resource resolver and saves all resource changes.
	 *
	 * @param resourceResolver the resource resolver
	 */
	public static void closeResolver(ResourceResolver resourceResolver) {
		if (resourceResolver != null && resourceResolver.isLive()) {
			saveResourceChanges(resourceResolver);
			resourceResolver.close();
		} else {
			logger.debug("The resource resolver received for closing is null.");
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
			} catch (PersistenceException pEx) {
				logger.error("PersistenceException in saveResourceChanges ::",pEx);
			}
		}
	}

	/**
	 * If the provided {@code path} identifies a {@link Page}, this method will
	 * generate the correct URL for the page. Otherwise the original {@code String}
	 * is returned.
	 *
	 * @param request     the current request, used to determine the server's
	 *                    context path
	 * @param pageManager the page manager
	 * @param path        the page path
	 * @return the URL of the page identified by the provided {@code path}, or the
	 *         original {@code path} if this doesn't identify a {@link Page}
	 */
	@NonNull
	public static String getURL(@NonNull SlingHttpServletRequest request, @NonNull PageManager pageManager,
			@NonNull String path) {
		Page page = pageManager.getPage(path);
		if (page != null) {
			return getURL(request, page);
		}
		return path;
	}

	/**
	 * Given a {@link Page}, this method returns the correct URL, taking into
	 * account that the provided {@code page} might provide a vanity URL.
	 *
	 * @param request the current request, used to determine the server's context
	 *                path
	 * @param page    the page
	 * @return the URL of the page identified by the provided {@code path}, or the
	 *         original {@code path} if this doesn't identify a {@link Page}
	 */
	@NonNull
	public static String getURL(@NonNull SlingHttpServletRequest request, @NonNull Page page) {
		String vanityURL = page.getVanityUrl();
		return StringUtils.isEmpty(vanityURL) ? (request.getContextPath() + page.getPath() + ".html")
				: (request.getContextPath() + vanityURL);
	}

	/**
	 * Resolve path.
	 *
	 * @param resourceResolver the resource resolver
	 * @param path             the path
	 * @return the string
	 */
	public static String resolve(ResourceResolver resourceResolver, String path) {
		Resource resource = null;
		if (resourceResolver != null && StringUtils.isNotBlank(path)) {
			resource = resourceResolver.resolve(path);
		}
		return (null != resource && 
				!ResourceUtil.isNonExistingResource(resource)) ? 
				linkChecker(resource.getPath())
				: null;
	}

	/**
	 * Worker method to get the child form data as JSON String.
	 * 
	 * @param childName   The name of the child page node which has the form
	 * @param currentPage The current Page
	 * @param log         The Logger to log the exceptions
	 * 
	 * @return A String representing the JSON of the child Page
	 */
	public static String getChildJson(String childName, Page currentPage, Logger log) {
		String result = null;
		FormContainerModel containerModel = null;
		Resource pageContent = currentPage.getContentResource();
		if (pageContent == null) {
			return result;
		}
		Resource childPageResource = pageContent.getParent().getChild(childName);
		if (childPageResource == null) {
			return result;
		}
		try {
			Resource root = childPageResource.getChild("jcr:content/root");
			Iterator<Resource> childIterator = root.listChildren();
			while (childIterator.hasNext()) {
				Resource child = childIterator.next();
				if (child.getResourceType().equals("an/similac/components/form/container")) {
					containerModel = child.adaptTo(FormContainerModel.class);
					break;
				}
			}
			if (containerModel == null) {
				throw new NullPointerException();
			}
			result = containerModel.getFormJson();
		} catch (RuntimeException e) {
			log.error("Exception encountered while getting form container from child  of page", e);
		}
		return result;
	}
}
