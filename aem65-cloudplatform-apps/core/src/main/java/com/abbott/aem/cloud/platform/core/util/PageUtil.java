/*
* Copyright (c) Abbott
*/
package com.abbott.aem.cloud.platform.core.util;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.ResourceResolver;
import org.osgi.annotation.versioning.ProviderType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.day.cq.commons.Externalizer;
import com.day.cq.commons.inherit.HierarchyNodeInheritanceValueMap;
import com.day.cq.commons.inherit.InheritanceValueMap;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;

import lombok.extern.slf4j.Slf4j;

/**
 * @author GUPTAMX35 This class provides the utility methods for Page
 */
@ProviderType
@Slf4j
public final class PageUtil {

	private static final Logger log = LoggerFactory.getLogger(PageUtil.class);

	private static final String EXTERNALIZER_DOMAIN = "externalizerDomain";
	public static final String FORWARD_SLASH = "/";

	private PageUtil(){}

	/**
	 * This method will return the external domain path given the AEM page path
	 * on the basis of Externalizer or Maps
	 * 
	 * @param pagePath
	 *            - Content path of any page
	 * @param resolver
	 *            - Resource resolver
	 * @param externalizer
	 *            - Externalizer
	 * @param extensionlessUrls
	 *            - Boolean value whether URL's would be extension less or not
	 * @param removeTrailingSlash
	 *            - Boolean value whether URL's would be having trailing slash
	 *            or not
	 * @return String - Final URL value
	 */
	public static String getUrl(String pagePath, ResourceResolver resolver, Externalizer externalizer,
			boolean extensionlessUrls, boolean removeTrailingSlash) {
		String vanityPath = "";
		String finalUrl = pagePath;

		// Checking whether the page path is empty or not
		if (StringUtils.isNotEmpty(pagePath) && null != resolver) {
				PageManager pageManager = resolver.adaptTo(PageManager.class);
				Page pageResource = pageManager.getPage(pagePath);

				// Checking whether the page is valid or not
				if (null != pageResource && pageResource.isValid()) {

					log.debug("Valid AEM page: {}", pagePath);
					// Getting the externalizer domain from the hierarchy
					InheritanceValueMap iProperties = new HierarchyNodeInheritanceValueMap(
							resolver.getResource(pagePath));
					String siteMapHierarchy = iProperties.getInherited(EXTERNALIZER_DOMAIN, String.class);
					boolean externalizerValid = (null != externalizer) && (StringUtils.isNotEmpty(siteMapHierarchy));
					
					log.debug("Externalizer valid: {}; Externalizer Domain: {}", externalizerValid, siteMapHierarchy);

					// If Vanity URL exists
					if (StringUtils.isNotEmpty(pageResource.getVanityUrl())) {
						vanityPath = pageResource.getVanityUrl();
						// Checking whether vanity url exists, if yes whether it
						// starts with '/'
						// or not otherwise adding it
						if (!vanityPath.startsWith(FORWARD_SLASH)) {
							vanityPath = FORWARD_SLASH + vanityPath;
						}

						finalUrl = externalizerValid ? externalizer.externalLink(resolver, siteMapHierarchy, vanityPath)
								: resolver.map(vanityPath);

						// If extensionlessUrls are not required
					} else if (!extensionlessUrls) {
						finalUrl = externalizerValid
								? externalizer.externalLink(resolver, siteMapHierarchy,
										String.format("%s.html", pageResource.getPath()))
								: resolver.map(String.format("%s.html", pageResource.getPath()));

						// If Trailing slashes are not required
					} else {
						String urlFormat = removeTrailingSlash ? "%s" : "%s/";
						finalUrl = externalizerValid
								? externalizer.externalLink(resolver, siteMapHierarchy,
										String.format(urlFormat, pageResource.getPath()))
								: resolver.map(String.format(urlFormat, pageResource.getPath()));
					}
				}
		}
		
		log.debug("Final URL: {}", finalUrl);
		return finalUrl;
	}
	
	/**
	 * This method will return the external domain path given the AEM page path
	 * on the basis of Externalizer or Maps
	 * 
	 * @param pagePath
	 *            - Content path of any page
	 * @param resolver
	 *            - Resource resolver
	 * @return String - Final URL value
	 */
	public static String getUrl(String pagePath, ResourceResolver resolver) {
		Externalizer externalizer = resolver.adaptTo(Externalizer.class);
		return getUrl(pagePath, resolver, externalizer, false, false);
	}
}