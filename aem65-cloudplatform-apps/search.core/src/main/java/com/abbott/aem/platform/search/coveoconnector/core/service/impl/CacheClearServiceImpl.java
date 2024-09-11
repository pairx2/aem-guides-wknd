package com.abbott.aem.platform.search.coveoconnector.core.service.impl;

import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.Designate;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

import com.abbott.aem.platform.search.coveoconnector.core.service.CacheClearService;

/**
 * Configuration Service used to configure the form for Coveo.
 *
 * @author Ravindranath
 */
@Component(immediate = true, service = CacheClearService.class)
@Designate(ocd = CacheClearServiceImpl.Config.class)

public class CacheClearServiceImpl implements CacheClearService {

	/**
	 * The Interface Config.
	 */
	@ObjectClassDefinition(name = "Abbott Platform - Cache Clear Configuration", description = "Abbott Platform - Cache Clear Configuration")
	public static @interface Config {

		/**
		 * Push url.
		 *
		 * @return the string
		 */
		@AttributeDefinition(name = "Purge Key", description = "Cache Clear Purge Key", defaultValue = "5c354a825a29c3441397ed565b44aa30cd776bae03689e74dafe26031e274329")
		public String aemPurgeKey();

		/**
		 * Platform url.
		 *
		 * @return the string
		 */
		@AttributeDefinition(name = "Publish Host", description = "Cache Clear Publish Host", defaultValue = "publish-p33328-e114754.adobeaemcloud.com")
		public String aemPublishHost();

		/**
		 * Api key.
		 *
		 * @return the string
		 */
		@AttributeDefinition(name = "Cdn Access Key", description = "Cache Clear cdn key field", defaultValue = "******")
		public String cdnAccessKey();
		
		/**
		 * Api key.
		 *
		 * @return the string
		 */
		@AttributeDefinition(name = "Cdn Secret Key", description = "Cache Clear cdn secret key field", defaultValue = "**********")
		public String cdnSecretKey();
		
		/**
		 * Api key.
		 *
		 * @return the string
		 */
		@AttributeDefinition(name = "Edge Key", description = "Cache Clear Edge key field", defaultValue = "03e858e62465319eb15085f08ad718d0bdbe56427c621bda3170087922c14492")
		public String aemEdgeKey();

		/**
		 * Preview url.
		 *
		 * @return the string
		 */
		@AttributeDefinition(name = "Preview Host", description = "Cache Clear Preview Host", defaultValue = "preview-p33328-e114754.adobeaemcloud.com")
		public String aemPreviewHost();

		/**
		 * Preview Edge key.
		 *
		 * @return the string
		 */
		@AttributeDefinition(name = "Preview Edge Key", description = "Cache Clear Preview Edge key field", defaultValue = "")
		public String aemPreviewEdgeKey();

		/**
		 * Preview Purge Key.
		 *
		 * @return the string
		 */
		@AttributeDefinition(name = "Preview Purge Key", description = "Cache Clear Preview Purge Key", defaultValue = "")
		public String aemPreviewPurgeKey();

	}

	private String purgeKey;

	private String publishHost;

	private String edgeKey;
	
	private String accessKey;

	private String secretKey;

	private String previewHost;

	private String previewEdgeKey;

	private String previewPurgeKey;

	/**
	 * Activate.
	 *
	 * @param config the config
	 */
	@Activate
	protected void activate(final Config config) {
		this.purgeKey = config.aemPurgeKey();
		this.publishHost = config.aemPublishHost();
		this.accessKey=config.cdnAccessKey();
		this.secretKey=config.cdnSecretKey();
		this.edgeKey = config.aemEdgeKey();

		this.previewHost = config.aemPreviewHost();
		this.previewEdgeKey = config.aemPreviewEdgeKey();
		this.previewPurgeKey = config.aemPreviewPurgeKey();

	}

	public String getPurgeKey() {
		return purgeKey;
	}

	public String getPublishHost() {
		return publishHost;
	}

	public String getEdgeKey() {
		return edgeKey;
	}
	
	public String getSecretKey() {
		return secretKey;
	}
	
	public String getAccessKey() {
		return accessKey;
	}

	public String getPreviewHost() {
		return previewHost;
	}

	public String getPreviewEdgeKey() {
		return previewEdgeKey;
	}

	public String getPreviewPurgeKey() {
		return previewPurgeKey;
	}
}