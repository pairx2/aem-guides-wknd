package com.abbott.aem.an.abbottstore.utils;

import com.abbott.aem.an.abbottstore.constants.CommonConstants;
import com.day.cq.wcm.api.Page;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceUtil;
import org.apache.sling.api.resource.ValueMap;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class AbbottResourceUtils extends ResourceUtil {

	private static final Logger LOGGER = LoggerFactory.getLogger(AbbottResourceUtils.class);

	/**
	 * Checks if the current page is a home page.
	 *
	 * @param currentPage
	 * @return
	 */
	public static boolean isHomePage(Page currentPage) {
		return currentPage.getContentResource().getResourceType().equalsIgnoreCase(CommonConstants.HOME_PAGE_RES_TYPE);
	}

	/**
	 * Searches for home page through current page's parent hierarchy.
	 *
	 * @param currentPage the current page
	 * @return home page
	 */
	public static Page getHomePageForPage(Page currentPage) {
		if (currentPage != null) {
			List<Page> parentPages = getParentPagesForPage(currentPage);
			return getHomePage(parentPages);
		}
		LOGGER.warn("current page was null, can not get home page");
		return null;
	}

	/**
	 * Returns true if the supplied page is a template page
	 *
	 * @param currentPage
	 * @return
	 */
	public static boolean isTemplate(Page currentPage) {
		return currentPage.getPath().startsWith(CommonConstants.ABBOTT_TEMPLATE_PATH_PREFIX);
	}

	/**
	 * Returns all parent pages for the current page
	 *
	 * @param page the current page
	 * @return a list containing the current page's parent pages
	 */
	public static List<Page> getParentPagesForPage(Page page) {
		Page currentPage = page;
		List<Page> parentPages = new ArrayList<>();

		parentPages.add(currentPage);

		if (currentPage.getParent() != null) {
			while (currentPage.getParent() != null) {
				parentPages.add(currentPage.getParent());
				currentPage = currentPage.getParent();
			}
		}
		LOGGER.debug("Current page {} has no parents...", page.getPath());
		return parentPages;
	}

	/**
	 * Returns home page for a hierarchical set of pages
	 *
	 * @param parentPages the parent pages
	 * @return the home page
	 */
	public static Page getHomePage(List<Page> parentPages) {
		for (Page page : parentPages) {
			if (page.getContentResource().getResourceType().equalsIgnoreCase(CommonConstants.HOME_PAGE_RES_TYPE)) {
				return page;
			}
		}
		return null;
	}

	/**
	 * Returns the first resource that matched the specified resource type.
	 *
	 * @param resource
	 * @param resourceType
	 * @return
	 */
	public static Resource getFirstChildWithResourceType(Resource resource, String resourceType) {
		List<Resource> resources = getChildrenWithResourceType(resource, resourceType);
		if (!resources.isEmpty()) {
			return resources.get(0);
		}
		return null;
	}

	/**
	 * Return list of child resources with the given resource type
	 *
	 * @param resource     the parent resource
	 * @param resourceType the resource type
	 * @return list of child resources with the given resource type
	 */
	public static List<Resource> getChildrenWithResourceType(Resource resource, String resourceType) {
		List<Resource> foundResources = new ArrayList<>();
		Iterator<Resource> children = resource.listChildren();
		while (children.hasNext()) {
			Resource child = children.next();
			if (child.getResourceType().equals(resourceType)) {
				foundResources.add(child);
			}
			foundResources.addAll(getChildrenWithResourceType(child, resourceType));
		}
		return foundResources;
	}

}
