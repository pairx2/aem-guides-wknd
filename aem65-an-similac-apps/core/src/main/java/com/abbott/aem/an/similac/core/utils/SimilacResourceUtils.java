package com.abbott.aem.an.similac.core.utils;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;

import javax.jcr.Node;
import javax.jcr.Property;
import javax.jcr.PropertyIterator;
import javax.jcr.RepositoryException;
import javax.jcr.Value;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceUtil;
import org.apache.sling.api.resource.ValueMap;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.day.cq.tagging.Tag;
import com.day.cq.tagging.TagManager;
import com.day.cq.wcm.api.Page;

public class SimilacResourceUtils extends ResourceUtil {

	private static final Logger LOGGER = LoggerFactory.getLogger(SimilacResourceUtils.class);

	/**
	 * Checks if the current page is a home page.
	 *
	 * @param currentPage
	 * @return
	 */
	public static boolean isHomePage(Page currentPage) {
		if (currentPage.getContentResource() == null) {
			LOGGER.debug("Page {} has no JCR:Content node. Check repository.", currentPage.getPath());
			return false;
		}

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

		while (currentPage.getParent() != null) {
			parentPages.add(currentPage.getParent());
			currentPage = currentPage.getParent();
		}
		
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
			if (page.getContentResource() == null) {
				LOGGER.debug("Page {} has no JCR:Content node. Check repository.", page.getPath());
				continue;
			}
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

	/**
	 * Returns the value of the property from the current resource.
	 *
	 * @param resource current resource
	 * @param property the property to look for
	 * @param type     the type of the property
	 * @return
	 */
	public static <T> T getProperty(Resource resource, String property, Class<T> type) {
		ValueMap properties = getValueMap(resource);

		T value = null;
		if (properties.containsKey(property)) {
			value = properties.get(property, type);
			if (type.isAssignableFrom(String.class) && StringUtils.isBlank((String) value)) {
				value = null;
			}
		}
		return value;
	}

	/**
	 * Returns the String value from the multiValue property from the current
	 * resource.
	 *
	 * @param resource
	 *
	 * @return
	 */
	public static String getMultiValueProperty(Resource resource) {

		String propertyValue = StringUtils.EMPTY;
		try {
			Node node = resource.adaptTo(Node.class);
			if (null != node) {
				for (PropertyIterator propeIterator = node.getProperties(); propeIterator.hasNext();) {
					Property prop = propeIterator.nextProperty();
					if (prop.isMultiple()) {
						Property propVal = node.getProperty(prop.getName());
						Value[] values = propVal.getValues();
						for (Value val : values) {
							propertyValue = val.getString();
						}
					}
				}
			}
		} catch (RepositoryException rEx) {
			LOGGER.error("Repository Exception : {0} ", rEx);
		}
		return propertyValue;
	}

	/**
	 * Returns true/false based on JCR properties' existence on the supplied
	 * resource.
	 *
	 * @param resource
	 * @param propName
	 * @return
	 */
	public static boolean ifPropExists(Resource resource, String propName) {
		ValueMap properties = getValueMap(resource);
		return properties.containsKey(propName);
	}

	/**
	 * @param resource
	 * @param model
	 * @return
	 */
	public static <T> List<T> getListFromResource(Resource resource, Class<T> model) {
		List<T> models = new LinkedList<>();
		if (null == resource) {
			return models;
		}
		Iterator<Resource> children = resource.listChildren();
		while (children.hasNext()) {
			Resource child = children.next();
			if (null != child) {
				models.add(child.adaptTo(model));
			}
		}
		return models;
	}

	/**
	 * @param tagStr
	 * @param tagManager
	 * @return
	 */
	public static String getTagName(String tagStr, TagManager tagManager) {
		Tag tag = tagManager.resolve(tagStr);
		if (tag != null) {
			return tag.getName();
		}
		return StringUtils.EMPTY;
	}

}
