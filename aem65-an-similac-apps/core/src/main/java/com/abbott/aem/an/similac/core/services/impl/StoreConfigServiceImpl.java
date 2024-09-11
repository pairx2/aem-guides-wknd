package com.abbott.aem.an.similac.core.services.impl;

import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.Designate;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

import com.abbott.aem.an.similac.core.services.StoreConfigService;

/**
 * The Class StoreConfigServiceImpl.
 */
@Component(immediate = true, enabled = true, service = StoreConfigService.class)
@Designate(ocd = StoreConfigServiceImpl.Config.class)
public class StoreConfigServiceImpl implements StoreConfigService {
	
	/** The similac server url. */
	private String similacServerUrl = null;
	
	/** The similac store name. */
	private String similacStoreName = null;
	
	/** The similac domain name. */
	private String similacDomainUrl = null;
	
	/** The similac default image name. */
	private String similacDefaultImgUrl = null;
	
	/** The similac page store url. */
	private String similacPageStoreUrl = null;
	
	
	/**
	 * The Interface Config.
	 */
	@ObjectClassDefinition(name = "Similac Store Service Url Configuration", description = "Similac OSGI Configuration Service that will return the store URL")
	public static @interface Config {

		/**
		 * Similac server url.
		 *
		 * @return the string
		 */
		@AttributeDefinition(name = "Similac Server Url")
		String similacServerUrl() ;
		
		/**
		 * Similac store name.
		 *
		 * @return the string
		 */
		@AttributeDefinition(name = "Similac Store Name")
		String similacStoreName() ;
		/**
		 * Similac domain name.
		 *
		 * @return the string
		 */
		@AttributeDefinition(name = "Similac Domain Url")
		String similacDomainUrl() ;
		/**
		 * Similac default image url.
		 *
		 * @return the string
		 */
		@AttributeDefinition(name = "Similac Default Img Url")
		String similacDefaultImgUrl() ;
		
		/**
		 * Similac default page store url.
		 *
		 * @return the string
		 */
		@AttributeDefinition(name = "Similac page store Url")
		String similacPageStoreUrl() ;
	}

	/**
	 * Activate.
	 *
	 * @param config the config
	 */
	@Activate
	protected void activate(final Config config) {
		similacServerUrl = config.similacServerUrl();
		similacStoreName = config.similacStoreName();
		similacDomainUrl = config.similacDomainUrl();
		similacDefaultImgUrl = config.similacDefaultImgUrl();
		similacPageStoreUrl = config.similacPageStoreUrl();
	}

	/**
	 * Return the server store url
	 */
	public String getStoreServerUrl() {
		return similacServerUrl;
	}
	
	/**
	 * Return the server store url
	 */
	public String getStoreName() {
		return similacStoreName;
	}
	
	/**
	 * Return the domain url
	 */
	public String getDomainName() {
		return similacDomainUrl;
	}
	
	
	/**
	 * Return the default image url
	 */
	public String getDefaultImgURL() {
		return similacDefaultImgUrl;
	}
	

	/**
	 * Return the default page store url
	 */
	public String getPageStoreURL() {
		return similacPageStoreUrl;
	}
	
	
}