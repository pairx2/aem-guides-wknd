package com.abbott.aem.an.similac.core.services;

/**
 * The Interface StoreConfigService.
 */
public interface StoreConfigService {

	/**
	 * Gets the store server url.
	 *
	 * @return the store server url
	 */
	public String getStoreServerUrl();
	
	/**
	 * Gets the store name.
	 *
	 * @return the store name
	 */
	public String getStoreName();
	/**
	 * Gets the domain name.
	 *
	 * @return the domain name
	 */
	public String getDomainName();
	/**
	 * Gets the default image url.
	 *
	 * @return the default url
	 */
	public String getDefaultImgURL();
	
	/**
	 * Gets the default page store url.
	 *
	 * @return the page store url
	 */
	public String getPageStoreURL();
	
}
