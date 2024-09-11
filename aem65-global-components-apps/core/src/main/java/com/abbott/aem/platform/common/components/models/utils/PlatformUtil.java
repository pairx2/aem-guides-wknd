package com.abbott.aem.platform.common.components.models.utils;

import lombok.NonNull;

import com.abbott.aem.platform.common.constants.CommonConstants;
import com.day.cq.wcm.api.Page;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.ValueMap;

/**
 * The Class PlatformUtil.
 */
public class PlatformUtil {
	private PlatformUtil(){

	}

	/**
	 * Given a {@link Page}, this method returns the correct URL, taking into
	 * account that the provided {@code page} might provide a vanity URL.
	 *
	 * @param request the current request, used to determine the server's context
	 *                path
	 * @param page    the page
	 * @return the URL of the page identified by the provided {@code path}, or the
	 * original {@code path} if this doesn't identify a {@link Page}
	 */
	@NonNull
	public static String getURL(@NonNull SlingHttpServletRequest request, @NonNull Page page) {
		String vanityURL = page.getVanityUrl();
		return StringUtils.isEmpty(vanityURL) ? (request.getContextPath() + page.getPath() + ".html") : (request.getContextPath() + vanityURL);
	}

	/**
	 * Gets the property value.
	 *
	 * @param properties the properties
	 * @param key        the key
	 * @return the property value
	 */
	public static String getPropertyValue(ValueMap properties, String key) {
		String propertyValue = StringUtils.EMPTY;
		if (null != properties && properties.containsKey(key)) {
			propertyValue = properties.get(key, String.class);
		}
		return propertyValue;
	}

	/**
	 * Method to Validate Link by adding proper prefix or suffix.
	 *
	 * @param link the link
	 * @return the String or null
	 */
	public static String ensureProperLink(String link) {
		if (link == null || StringUtils.startsWith(link, CommonConstants.CONTENT_DAM)) {
			return link;
		} else {
			if (StringUtils.startsWith(link, CommonConstants.CONTENT) && !StringUtils.endsWithAny(link, CommonConstants.HTML_EXTENSION) && !StringUtils.contains(link, CommonConstants.HTML_HASH)) {
				link = link + CommonConstants.HTML_EXTENSION;
			}
			link = addHttpsIfRequired(link);
		}
		return link;
	}

	/**
	 * Method to add 'https://' prefix for all external links (links, which do not start with '/content')
	 *
	 * @param link link value
	 * @return the String or null
	 */
	public static String addHttpsIfRequired(String link) {
		if (link != null && !StringUtils.startsWithAny(link, CommonConstants.CONTENT, CommonConstants.HTTP, CommonConstants.HASH)) {
			link = CommonConstants.HTTPS + link;
		}
		return link;
	}

}
