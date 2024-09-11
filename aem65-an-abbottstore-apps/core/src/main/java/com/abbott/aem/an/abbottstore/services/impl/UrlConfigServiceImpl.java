package com.abbott.aem.an.abbottstore.services.impl;

import com.abbott.aem.an.abbottstore.services.UrlConfigService;
import org.apache.commons.lang3.StringUtils;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.Designate;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

/**
 * The Class UrlConfigServiceImpl.
 */
@Component(immediate = true, enabled = true, service = UrlConfigService.class)
@Designate(ocd = UrlConfigServiceImpl.Config.class)
public class UrlConfigServiceImpl implements UrlConfigService {
	/**
	 * The Interface Config.
	 */
	@ObjectClassDefinition(name = "Abbott Store Service Url Configuration", description = "Abbott OSGI Configuration Service that will return the Contact-Us URL")
	public static @interface Config {

		/**
		 * Abbott server url.
		 *
		 * @return the string
		 */
		@AttributeDefinition(name = "Abbott Server Url")
		String abbottServerUrl() default "https://dev-secure.abbottstore.com";

		/**
		 * Glucerna server url.
		 *
		 * @return the string
		 */
		@AttributeDefinition(name = "Glucerna Server Url")
		String glucernaServerUrl() default "https://dev-secure.glucernastore.com";

		/**
		 * Similac server url.
		 *
		 * @return the string
		 */
		@AttributeDefinition(name = "Similac Server Url")
		String similacServerUrl() default "https://dev-secure.similacstore.com";
		
		@AttributeDefinition(name = "New Similac Server Url")
		String newSimilacServerUrl() default "http://dev-secure.similac.com";

		/**
		 * Abbott AEM Server Url.
		 *
		 * @return the string
		 */
		@AttributeDefinition(name = "Abbott AEM Server Url")
		String abbottAemServerUrl() default "https://dev.abbottstore.com";

		/**
		 * Glucerna AEM Server Url.
		 *
		 * @return the string
		 */
		@AttributeDefinition(name = "Glucerna AEM Server Url")
		String glucernaAemServerUrl() default "https://dev.glucernastore.com";

		/**
		 * Similac AEM Server Url.
		 *
		 * @return the string
		 */
		@AttributeDefinition(name = "Similac AEM Server Url")
		String similacAemServerUrl() default "https://dev.similacstore.com";
		
		@AttributeDefinition(name = "Similac New AEM Server Url")
		String newSimilacAemServerUrl() default "https://dev.similac.com";

		@AttributeDefinition(name = "Unavailable Product Image path")
		String unavailableImagePath() default "/content/dam/abbott/mandatory/Unavailable-Product-1300x1300.jpg";

		@AttributeDefinition(name = "All Store Base Urls")
		String[] baseUrls() default {"/content/abbott/en","/content/glucerna/en","/content/similac/en","/content/an/similac/global/en"};

		@AttributeDefinition(name = "Abbott Header Static Block Id(check it in magento)")
		int abbottHeaderStaticBlockId() default 10;
		@AttributeDefinition(name = "Abbott Footer Static Block Id(check it in magento)")
		int abbottFooterStaticBlockId() default 13;
		@AttributeDefinition(name = "Glucerna Header Static Block Id(check it in magento)")
		int glucernaHeaderStaticBlockId() default 22;
		@AttributeDefinition(name = "Glucerna Footer Static Block Id(check it in magento)")
		int glucernaFooterStaticBlockId() default 25;
		@AttributeDefinition(name = "Similac Header Static Block Id(check it in magento)")
		int similacHeaderStaticBlockId() default 16;
		@AttributeDefinition(name = "Similac Footer Static Block Id(check it in magento)")
		int similacFooterStaticBlockId() default 19;

		@AttributeDefinition(name = "Site Key")
		String siteKey() default "6LdthrsUAAAAAJ9HeTcQ4N3BeFYp6imRMD85-5FS";

		@AttributeDefinition(name = "Secret Key")
		String secretKey() default "6LdthrsUAAAAAMcc4Kecmxly2HC6yNIAueEuhd39";

		@AttributeDefinition(name = "Login Site Key")
		String loginSiteKey() default "";

		@AttributeDefinition(name = "Login Secret Key")
		String loginSecretKey() default "";

		@AttributeDefinition(name = "AEM Magento Secret Key")
		String loginAemMagentoSecretKey() default "";

	}

	/** The abbott server url. */
	String abbottServerUrl = null;

	/** The glucerna server url. */
	String glucernaServerUrl = null;

	/** The similac server url. */
	String similacServerUrl = null;
	
	/** The new similac server url. */
	String newSimilacServerUrl = null;

	/** The Abbott AEM server url. */
	String abbottAemServerUrl = null;

	/** The Glucerna AEM server url. */
	String glucernaAemServerUrl = null;

	/** The similac AEM server url. */
	String similacAemServerUrl = null;
	
	/** The New similac AEM server url. */
	String newSimilacAemServerUrl = null;

	String unavailableImagePath = null;
	private String[] baseUrls;
	private int abbottHeaderStaticId;
	private int abbottFooterStaticId;
	private int glucernaHeaderStaticId;
	private int glucernaFooterStaticId;
	private int similacHeaderStaticId;
	private int similacFooterStaticId;
	String siteKey = null;
	String secretKey = null;
	private String loginSiteKey = null;
	private String loginSecretKey = null;
	private String loginAemMagentoSecretKey = null;

	/**
	 * Activate.
	 *
	 * @param config
	 *            the config
	 */
	@Activate
	protected void activate(final Config config) {
		abbottServerUrl = config.abbottServerUrl();
		glucernaServerUrl = config.glucernaServerUrl();
		similacServerUrl = config.similacServerUrl();
		newSimilacServerUrl = config.newSimilacServerUrl();
		abbottAemServerUrl = config.abbottAemServerUrl();
		glucernaAemServerUrl = config.glucernaAemServerUrl();
		similacAemServerUrl = config.similacAemServerUrl();
		newSimilacAemServerUrl=config.newSimilacAemServerUrl();
		unavailableImagePath = config.unavailableImagePath();
		baseUrls = config.baseUrls();
		abbottHeaderStaticId = config.abbottHeaderStaticBlockId();
		abbottFooterStaticId = config.abbottFooterStaticBlockId();
		glucernaHeaderStaticId = config.glucernaHeaderStaticBlockId();
		glucernaFooterStaticId = config.glucernaFooterStaticBlockId();
		similacHeaderStaticId = config.similacHeaderStaticBlockId();
		similacFooterStaticId = config.similacFooterStaticBlockId();
		siteKey = config.siteKey();
		secretKey = config.secretKey();
		loginSecretKey = config.loginSecretKey();
		loginSiteKey = config.loginSiteKey();
		loginAemMagentoSecretKey = config.loginAemMagentoSecretKey();
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.abbott.aem.core.services.StoreServerService#getStore(java.lang.
	 * String)
	 */
	public String getStore(String variation) {
		switch (variation) {
		case "abbott.abbottstore":
			return abbottServerUrl;
		case "abbott.similac":
			return similacServerUrl;
		case "abbott.glucerna":
			return glucernaServerUrl;
		default:
			return abbottServerUrl;
		}
	}

	public String getMagentoStore(String storeName){
		switch (storeName) {
			case "abbott":
				return abbottServerUrl;
			case "similac":
				return similacServerUrl;
			case "glucerna":
				return glucernaServerUrl;
			case "new_similac":
				return newSimilacServerUrl;
			default:
				return abbottServerUrl;
		}
	}
	public String getAemServer(String variation) {
		if (StringUtils.equalsIgnoreCase(variation, "abbott.abbottstore")){
			return abbottAemServerUrl;
		}else if (StringUtils.equalsIgnoreCase(variation, "abbott.similac")){
			return similacAemServerUrl;
		}else if (StringUtils.equalsIgnoreCase(variation, "abbott.glucerna")){
			return glucernaAemServerUrl;
		} else {
			return abbottAemServerUrl;
		}
	}

	public String getMagentoStoreCode(String aem_Url){
		if (StringUtils.startsWith(aem_Url, "/content/abbott/")) {
			return "abbott";
		} else if (StringUtils.startsWith(aem_Url, "/content/glucerna/")) {
			return "glucerna";
		}else if (StringUtils.startsWith(aem_Url, "/content/similac/")) {
			return "similac";
		}
		return null;
	}


	public String getSiteKey() {
		return siteKey;
	}

	public String getSecretKey() {
		return secretKey;
	}

	public String getUnavailableProductImagePath() {
		return unavailableImagePath;
	}
	public List<String> getBaseUrls(){
		return Arrays.asList(baseUrls);
	}

	public HashMap<String, Integer> getHeaderFooterId() {
		HashMap<String, Integer> map = new HashMap<String,Integer>();
		map.put("abbottHeaderStaticId", abbottHeaderStaticId);
		map.put("abbottFooterStaticId", abbottFooterStaticId);
		map.put("glucernaHeaderStaticId", glucernaHeaderStaticId);
		map.put("glucernaFooterStaticId", glucernaFooterStaticId);
		map.put("similacHeaderStaticId", similacHeaderStaticId);
		map.put("similacFooterStaticId", similacFooterStaticId);
		return map;
	}

	public HashMap<String, String> getStoreServers() {
		HashMap<String, String> map = new HashMap<String,String>();
		map.put("abbottMagentoServer", abbottServerUrl);
		map.put("glucernaMagentoServer", glucernaServerUrl);
		map.put("similacMagentoServer", similacServerUrl);
		return map;
	}

	public String getLoginSiteKey() {
		return loginSiteKey;
	}

	public String getLoginSecretKey() {
		return loginSecretKey;
	}

	public String getLoginAemMagentoSecretKey() {
		return loginAemMagentoSecretKey;
	}
}
