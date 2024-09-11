package com.abbott.aem.an.abbottstore.services;

import java.util.HashMap;
import java.util.List;

/**
 * The Interface StoreServerService.
 */
public interface UrlConfigService {

	/**
	 * Gets the store server url.
	 *
	 * @param variation the variation
	 * @return the store server url
	 */
	public String getStore(String variation);

	public String getAemServer(String variation);

	public String getUnavailableProductImagePath();

	public List<String> getBaseUrls();
	public String getMagentoStore(String storeName);
	public String getMagentoStoreCode(String aem_Url);
	public String getSiteKey();
	public String getSecretKey();
	public HashMap<String, String> getStoreServers();
	public HashMap<String, Integer> getHeaderFooterId();
	public String getLoginSiteKey();
	public String getLoginSecretKey();
	public String getLoginAemMagentoSecretKey();
}
