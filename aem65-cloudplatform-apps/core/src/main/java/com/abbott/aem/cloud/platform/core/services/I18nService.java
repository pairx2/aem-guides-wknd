package com.abbott.aem.cloud.platform.core.services;

import java.util.Locale;
import java.util.Map;

import org.apache.sling.api.resource.ResourceResolver;

import com.day.cq.tagging.Tag;
import com.day.cq.wcm.api.Page;
import com.google.gson.JsonArray;

public interface I18nService {

	/**
	 * @param resolver - Resource Resolver
	 * @param sitename - Site name or application id. If this is NULL
	 * @return Returns the Map of global tags or application tags. If site name is
	 *         null, then global tags are returned. If the site name is present,
	 *         then it combines the global tags with application tags.
	 */
	public Map<String, Tag> getTags(ResourceResolver resolver, String sitename);

	public JsonArray getTagsJson(String sitename, String language, ResourceResolver resolver);

	/**
	 * 
	 * @param sitename - Site name or Application Id. If this is Null, then it looks
	 *                 up within the global path.
	 * @param tagKey   - Key within the Global or Application. If this is null then
	 *                 it returns the global or application Tag
	 * @param resolver - Resource Resolver object
	 * @return Returns the Tag object based on the input parameters.
	 */
	public Tag getTag(String sitename, String tagKey, ResourceResolver resolver);

	/**
	 * @param language - Pass the language string for which we need Locale.
	 * @param page     - As a second option, if language is null or invalid, then
	 *                 page language is utilized. This is optional and can be NULL.
	 * @return locale - Fetches locale from language string and if that is invalid,
	 *         it fetches from Page (if not null).
	 */
	public Locale getLocale(String language, Page page);
}
