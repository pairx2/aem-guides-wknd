/*
 * Copyright (c) Abbott
 */
package com.abbott.aem.platform.common.util;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.ResourceResolver;
import org.osgi.annotation.versioning.ProviderType;

import com.day.cq.commons.Externalizer;
import com.day.cq.commons.inherit.HierarchyNodeInheritanceValueMap;
import com.day.cq.commons.inherit.InheritanceValueMap;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
import com.abbott.aem.platform.common.constants.CommonConstants;
import lombok.extern.slf4j.Slf4j;

import java.util.Optional;

/**
 * @author GUPTAMX35 This class provides the utility methods for Page
 */
@ProviderType
@Slf4j
public final class PageUtil {

	private static final String EXTERNALIZER_DOMAIN = "externalizerDomain";

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
	 *
	 * @deprecated Replaced by {@link #getUrl(String, ResourceResolver, Externalizer, boolean, boolean)}
	 */
	@Deprecated(forRemoval=false)
	public String getExternalUrl(String pagePath, ResourceResolver resolver, Externalizer externalizer,
								 boolean extensionlessUrls, boolean removeTrailingSlash) {
		return PageUtil.getUrl(pagePath, resolver, externalizer, extensionlessUrls, removeTrailingSlash);
	}

	/**
	 * This method will get the externalizer domain from the hierarchy
	 */
	public static String getExternalizerDomain(String pagePath,
											   ResourceResolver resolver) {

		String externalizerDomain = "";

		if (null != resolver && StringUtils.isNotEmpty(pagePath)) {

			InheritanceValueMap iProperties = new HierarchyNodeInheritanceValueMap(
					resolver.getResource(pagePath));
			externalizerDomain = iProperties.getInherited(EXTERNALIZER_DOMAIN,
					String.class);

		}

		return externalizerDomain;
	}

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
	public static String getUrl(String pagePath, ResourceResolver resolver,
								Externalizer externalizer, boolean extensionlessUrls,
								boolean removeTrailingSlash) {
		String vanityPath = "";
		String finalUrl = pagePath;
		Page pageResource =null;
		String siteMapHierarchy ="";
		boolean externalizerValid = false;
		try {
			// Checking whether the page path is empty or not
			if (StringUtils.isNotEmpty(pagePath) && null != resolver) {
				Optional<Page> page = Optional.ofNullable(resolver.adaptTo(PageManager.class))
						.map(manager -> manager.getPage(pagePath))
						.filter(Page::isValid);

				// Checking whether the page is valid or not
				if (page.isPresent()) {
					pageResource = page.get();
				}
				siteMapHierarchy = getExternalizerDomain(
						pagePath, resolver);

				externalizerValid = (null != externalizer)
						&& (StringUtils.isNotEmpty(siteMapHierarchy));
				log.debug(
						"Externalizer valid: {}; Externalizer Domain: {}",
						externalizerValid, siteMapHierarchy);


			}
				log.debug("Valid AEM page: {}", pagePath);

			String urlFormat = removeTrailingSlash ? "%s"
					: "%s/";

					// If Vanity URL exists
					if (null != pageResource && StringUtils.isNotEmpty(pageResource.getVanityUrl())) {
						vanityPath = pageResource.getVanityUrl();
						// Checking whether vanity url exists, if yes
						// whether it
						// starts with '/'
						// or not otherwise adding it
						if (!vanityPath.startsWith("/")) {
							vanityPath = CommonConstants.SLASH + vanityPath;
						}

						finalUrl = externalizerValid ? externalizer
								.externalLink(resolver, siteMapHierarchy,
										vanityPath) : resolver
								.map(vanityPath);

						// If extensionlessUrls are not required
					} else if (!extensionlessUrls && null != pageResource) {
						finalUrl = externalizerValid ? externalizer
								.externalLink(resolver, siteMapHierarchy,
										String.format("%s.html",
												pageResource.getPath()))
								: resolver.map(String.format("%s.html",
								pageResource.getPath()));

						// If Trailing slashes are not required
					} else if(null !=pageResource){

						finalUrl = externalizerValid ? externalizer
								.externalLink(resolver, siteMapHierarchy,
										String.format(urlFormat,
												pageResource.getPath()))
								: resolver.map(String.format(urlFormat,
								pageResource.getPath()));
					}
		} catch (IllegalArgumentException e) {
			log.error("IllegalArgumentException in PageUtil",e);
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

	/**
	 * This method will return the AEM Asset's external domain path given the
	 * AEM page path associated with Externalizer
	 *
	 */
	public static String getAssetUrl(String pagePath, String assetPath,
									 ResourceResolver resolver) {
		String finalUrl = assetPath;
		try {
			if (null != resolver && StringUtils.isNotEmpty(assetPath)) {

				if (StringUtils.isNotEmpty(pagePath)) {

					Externalizer externalizer = resolver
							.adaptTo(Externalizer.class);

					String externalizerDomain = getExternalizerDomain(pagePath,
							resolver);
					boolean externalizerValid = (null != externalizer)
							&& (StringUtils.isNotEmpty(externalizerDomain));

					log.debug("Externalizer valid: {}; Externalizer Domain: {}",
							externalizerValid, externalizerDomain);

					finalUrl = externalizerValid ? externalizer.externalLink(
							resolver, externalizerDomain, assetPath) : resolver
							.map(assetPath);
				} else {
					finalUrl = resolver.map(assetPath);
				}
			}
		} catch (IllegalArgumentException e) {
			log.error("IllegalArgumentException in PageUtil", e);
		}

		log.debug("Final Asset URL: {}", finalUrl);
		return finalUrl;
	}

	/**
	 * Function that checks if a path is an internal aem path
	 * @param path the path to check if it is internal
	 * @return true if the path is an aem internal path
	 */
	public static boolean isInternalAemUrl(String path){
		return Optional.ofNullable(path)
				.map(thePath -> thePath.startsWith("/content"))
				.orElse(false);
	}

	/**
	 * This function will return an aem internal url if the path is an internal url otherwise it will return the path as is
	 * @param path
	 * @param resolver
	 * @return path of internal aem path (externalized) or will return original path or null
	 */
	public static String getInternalAemUrlOrGetExternalUrl(String path, ResourceResolver resolver){
		return Optional.ofNullable(path)
				.filter(PageUtil::isInternalAemUrl)
				.map(thePath -> getUrl(thePath, resolver))
				.orElse(path);
	}
}