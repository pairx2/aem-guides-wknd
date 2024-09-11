package com.abbott.aem.an.similac.core.models;

import javax.annotation.PostConstruct;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;

import com.abbott.aem.an.similac.core.services.StoreConfigService;


@Model(adaptables = { Resource.class, SlingHttpServletRequest.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class SimilacConfigModel {

	
	/** Store URL */
	private String storeUrl = null;
	
	/** Store name */
	private String storeName = null;
	
	/** Store name */
	private String storeDomain = null;
	
	/** Store name */
	private String defaultImage = null;
	
	/** page store url */
	private String pageStoreUrl = null;
	

	
	/** The store service. */
	@OSGiService
	private StoreConfigService storeService;
	
	
	@PostConstruct
	public void activate() {
		storeUrl = storeService.getStoreServerUrl();
		storeName = storeService.getStoreName();
		storeDomain=storeService.getDomainName();
		defaultImage=storeService.getDefaultImgURL();
		pageStoreUrl = storeService.getPageStoreURL();
	}
	
	/**
	 * Return the server store url
	 * 
	 * @return store url
	 */
	public String getStoreUrl() {
		return storeUrl;
	}
	
	/**
	 * Return the store name
	 * 
	 * @return store name
	 */
	public String getStoreName() {
		return storeName;
	}

	public String getStoreDomain() {
		return storeDomain;
	}


	public String getDefaultImage() {
		return defaultImage;
	}
	
	public String getPageStoreUrl() {
		return pageStoreUrl;
	}
	
	
}
