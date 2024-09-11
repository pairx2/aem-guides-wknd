package com.abbott.aem.platform.common.components.models.impl.v1;

import com.abbott.aem.platform.common.components.models.HrefLangAttribute;

import lombok.Data;
import com.abbott.aem.platform.common.util.PageUtil;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import javax.annotation.PostConstruct;
import javax.inject.Inject;

import lombok.Getter;
import lombok.extern.slf4j.Slf4j;

import com.day.cq.commons.inherit.HierarchyNodeInheritanceValueMap;
import com.day.cq.commons.inherit.InheritanceValueMap;
import com.day.cq.commons.jcr.JcrConstants;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceUtil;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Slf4j
@Model(adaptables = {Resource.class}, adapters = {HrefLangAttribute.class}, resourceType = HrefLangAttributeImpl.RESOURCE_TYPE,
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class HrefLangAttributeImpl implements HrefLangAttribute{

	protected static final String RESOURCE_TYPE = "abbott-platform/components/structure/page/v1/page";
	private static final String PATH_DELIMITER = "/";
	
	protected static final String PN_SITEMAP_ROOT_SITE_PATH = "rootSitePath";
	protected static final String HREFLANGURL_NODE_NAME = "hrefLangUrls";
	
	protected static final String COUNTRYCODE_PROPERTY = "countryCode";
	protected static final String SITEMAPHREFLANGURL_PROPERTY = "sitemapHreflangUrl";
	
	protected static final int PAGE_START_LEVEL = 4;
	
	
	@Inject
	private Resource currentPageResource;
	
	void setCurrentPageResource(Resource pageResource) {
		currentPageResource = pageResource;
	}
	
	@SlingObject
	protected ResourceResolver resourceResolver;
	
	@ValueMapValue(name = PN_SITEMAP_ROOT_SITE_PATH)
	@Getter
	private String sitemapRootSitePath;

	@Getter
	private Map<String, String> metaHrefLangUrlsMap;
	
	private Page currentPage;
	
	@PostConstruct
	protected void init() {
		if (null != currentPageResource) {
			sitemapRootSitePath = setInheritedPageValues(PN_SITEMAP_ROOT_SITE_PATH, currentPageResource);
			log.debug("sitemapRootSitePath:{}", sitemapRootSitePath);
			if(null != sitemapRootSitePath ) {
				currentPage = resourceResolver.adaptTo(PageManager.class).getContainingPage(currentPageResource);
				metaHrefLangUrlsMap = new HashMap<>();
				setHrefLangUrlsMap(sitemapRootSitePath, metaHrefLangUrlsMap);
				log.debug("hrefLangUrls: {}", metaHrefLangUrlsMap);
			}	
		}
	}
	
	protected String setInheritedPageValues(String name, Resource resource) {
		return setInheritedPageValues(name, resource, null);
	}

	private String setInheritedPageValues(String name, Resource resource,
			String defaultValue) {
		InheritanceValueMap inheritedProperties = new HierarchyNodeInheritanceValueMap(
				resource);
		return inheritedProperties.getInherited(name, defaultValue);
	}
	
	private void setHrefLangUrlsMap( String rootSitePath, Map<String, String> metaHrefLangUrlsMap) {
		String resourcepathComplete = rootSitePath.concat((PATH_DELIMITER).concat((JcrConstants.JCR_CONTENT).concat((PATH_DELIMITER).concat(HREFLANGURL_NODE_NAME))));
		log.debug("resourcepathComplete:{}", resourcepathComplete);
		Resource hrefLangResource = resourceResolver.getResource(resourcepathComplete);
		if (null != hrefLangResource
				&& !ResourceUtil.isNonExistingResource(hrefLangResource)) {

			Iterator<Resource> itrResource = hrefLangResource.listChildren();
			Resource itemResource = null;
			ValueMap valueMap = null;
			String locale = null;
			String hrefLangUrl = null;
            while(itrResource.hasNext()) {
            	itemResource = itrResource.next();
            	valueMap  = ResourceUtil.getValueMap(itemResource);
            	locale = valueMap.get(COUNTRYCODE_PROPERTY, String.class);
            	hrefLangUrl = valueMap.get(SITEMAPHREFLANGURL_PROPERTY, String.class);
            	getLocaleSpecificPage(locale, hrefLangUrl, metaHrefLangUrlsMap);
            }
			
		}
	}
	
	private void getLocaleSpecificPage(String locale, String hrefLangUrl, Map<String, String> metaHrefLangUrlsMap) {
		if(StringUtils.isNotBlank(hrefLangUrl)) {
			Page pagePathUntilCountryLang = currentPage.getAbsoluteParent(PAGE_START_LEVEL);
			String currentPageWithoutCountryLang = currentPage.getPath().replace(pagePathUntilCountryLang.getPath(), "");
			String localeSpecificPagePath = hrefLangUrl + currentPageWithoutCountryLang;
			log.debug("localeSpecificPagePath:{}", localeSpecificPagePath);
			Resource newResource = resourceResolver.getResource(localeSpecificPagePath);
			String localeSpecificPageUrl = PageUtil.getInternalAemUrlOrGetExternalUrl(localeSpecificPagePath, resourceResolver);
			if(null != newResource && !ResourceUtil.isNonExistingResource(newResource)) {
				metaHrefLangUrlsMap.put(locale, localeSpecificPageUrl);
			}
		}	
	}
}

