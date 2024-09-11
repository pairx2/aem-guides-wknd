package com.abbott.aem.platform.common.components.pojo;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * PWAContentFragment POJO class that is used to provide the mapping of PWA
 * Content Fragment Model.
 */
public class PWAContentFragment {

	/**
	 * Caching strategy that should be applied to the content package that will be
	 * cached for offline availability.
	 */
	private String cachingStrategy;

	/**
	 * The name that will be used to establish the cache store within the users web
	 * browser for the specific web application.
	 */
	private String cacheName;

	/**
	 * A list of URLs that should be considered part of the offline content package
	 * that will be cached in the users device.
	 */
	private List<String> precachedUrl = Collections.emptyList();

	/**
	 * An array of URLs that should be considered part of the offline content
	 * package that will be cached in the users device.
	 */
	private String offlinePage;

	/**
	 * List of domains to be whitelisted in PWA.
	 */
	private String domainWhiteList;

	/**
	 * This variable will contain any additional pages other than preCache URLs that
	 * need to cache by PWA Service Worker when user visit them organically.
	 */
	private List<String> cacheableUrls = Collections.emptyList();

	/**
	 * List of URLs that need to be excluded from the master cache URLs list
	 * containing preCached and cacheable URLs.
	 */
	private String excludedUrls;

	/**
	 * This value will be used to determine how long to cache the pages for.
	 * After this time the content will be cleared from the user cache.
	 */
	private String handlerExpirationLimit;

	/**
	 * List of URLs having combinations of preCache URLs, offline page URL,
	 * cacheable URLs without excluded URLs. It should be considered part of the
	 * offline content package that will be cached in the users device.
	 */
	private List<String> masterCacheUrlList = Collections.emptyList();
	
	/**
	 * This value will be used to make it work on local url
	 */
	private String localHostUrl;
	
	/**
	 * This value will be used to hide actual path from caching
	 */
	private String contentBasePath;

	public String getCachingStrategy() {
		return cachingStrategy;
	}

	public void setCachingStrategy(String cachingStrategy) {
		this.cachingStrategy = cachingStrategy;
	}

	public String getCacheName() {
		return cacheName;
	}

	public void setCacheName(String cacheName) {
		this.cacheName = cacheName;
	}

	public List<String> getPrecachedUrl() {
		return new ArrayList<>(precachedUrl);
	}

	public void setPrecachedUrl(List<String> precachedUrl) {
		precachedUrl = new ArrayList<>(precachedUrl);
		this.precachedUrl = Collections.unmodifiableList(precachedUrl); 
	}

	public String getOfflinePage() {
		return offlinePage;
	}

	public void setOfflinePage(String offlinePage) {
		this.offlinePage = offlinePage;
	}

	public String getDomainWhiteList() {
		return domainWhiteList;
	}

	public void setDomainWhiteList(String domainWhiteList) {
		this.domainWhiteList = domainWhiteList;
	}

	public List<String> getCacheableUrls() {
		return new ArrayList<>(cacheableUrls);
	}

	public void setCacheableUrls(List<String> cacheableUrls) {
		cacheableUrls = new ArrayList<>(cacheableUrls);
		this.cacheableUrls = Collections.unmodifiableList(cacheableUrls); 
	}

	public String getExcludedUrls() {
		return excludedUrls;
	}

	public void setExcludedUrls(String excludedUrls) {
		this.excludedUrls = excludedUrls;
	}

	public String getHandlerExpirationLimit() {
		return handlerExpirationLimit;
	}

	public void setHandlerExpirationLimit(String handlerExpirationLimit) {
		this.handlerExpirationLimit = handlerExpirationLimit;
	}

	public List<String> getMasterCacheUrlList() {
		return new ArrayList<>(masterCacheUrlList);
	}

	public void setMasterCacheUrlList(List<String> masterCacheUrlList) {
		masterCacheUrlList = new ArrayList<>(masterCacheUrlList);
		this.masterCacheUrlList = Collections.unmodifiableList(masterCacheUrlList); 
	}

	public String getLocalHostUrl() {
		return localHostUrl;
	}

	public void setLocalHostUrl(String localHostUrl) {
		this.localHostUrl = localHostUrl;
	}

	public String getContentBasePath() {
		return contentBasePath;
	}

	public void setContentBasePath(String contentBasePath) {
		this.contentBasePath = contentBasePath;
	}
	
	

}
