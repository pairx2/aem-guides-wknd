package com.abbott.aem.platform.search.coveoconnector.core.service.impl;

import com.day.cq.commons.jcr.JcrConstants;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.Designate;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

import com.abbott.aem.platform.search.coveoconnector.core.service.FormConfigurationService;

/**
 * Configuration Service used to configure the form for Coveo.
 *
 * @author Pavan
 */
@Component(immediate = true, service = FormConfigurationService.class)
@Designate(ocd = FormConfigurationServiceImpl.Config.class)

public class FormConfigurationServiceImpl implements FormConfigurationService {

	/**
	 * The Interface Config.
	 */
	@ObjectClassDefinition(name = "Abbott Platform - Coveo Configuration", description = "Abbott Platform - Coveo Configuration")
	public static @interface Config {

		/**
		 * Push url.
		 *
		 * @return the string
		 */
		@AttributeDefinition(name = "Coveo PUSH URL", description = "Coveo Configuration Form PUSH URL field", defaultValue = "https://push.cloud.coveo.com")
		public String pushUrl();

		/**
		 * Platform url.
		 *
		 * @return the string
		 */
		@AttributeDefinition(name = "Coveo Platform URL", description = "Coveo Configuration Form Platform URL field", defaultValue = "https://platform.cloud.coveo.com")
		public String platformUrl();

		/**
		 * Connector url.
		 *
		 * @return the string
		 */
		@AttributeDefinition(name = "Coveo Connector URL", description = "Coveo Configuration Form Submit URL field", defaultValue = "")
		public String connectorUrl();

		/**
		 * Organization id.
		 *
		 * @return the string
		 */
		@AttributeDefinition(name = "Coveo Organization Id", description = "Coveo Configuration Form Submit Organization Id field", defaultValue = "techaspectdemobhcbh61u")
		public String organizationId();

		/**
		 * Source id.
		 *
		 * @return the string
		 */
		@AttributeDefinition(name = "Coveo Source Id", description = "Coveo Configuration Form Submit Source Id field", defaultValue = "techaspectdemobhcbh61u-vua5oebalvhg5bv2a4xhyp2eby")
		public String sourceId();

		/**
		 * Source name.
		 *
		 * @return the string
		 */
		@AttributeDefinition(name = "Coveo Source Name", description = "Coveo Configuration Form Submit Source Name field", defaultValue = "AemPush")
		public String sourceName();

		/**
		 * Api key.
		 *
		 * @return the string
		 */
		@AttributeDefinition(name = "Coveo Api key", description = "Coveo Configuration Form Submit Api key field", defaultValue = "xx0905cfa6-edb5-4afc-95cd-f67840285261")
		public String apiKey();

		/**
		 * Inheritance logic properties.
		 *
		 * @return the string[]
		 */
		@AttributeDefinition(name = "Inheritance Properties(String)", description = "Properties(String) that should use Inheritance Logic to fetch values from Parent Nodes if not present on node.", defaultValue = {
				JcrConstants.JCR_LANGUAGE, "division","siteName","contentCategory","externalizerDomain","componentRootPath","contentType","searchpagepath" })
		public String[] inheritanceLogicProperties();

		/**
		 * Dam allowed extensions.
		 *
		 * @return the string[]
		 */
		@AttributeDefinition(name = "DAM allowed Extension types(String)", description = "DAM asset type extensions that are allowed", defaultValue = {
				"pdf", "txt", "xls", "xlsx", "ppt", "pptx", "doc", "docx", "jpeg", "jpg", "png", "gif", "mp4" })
		public String[] damAllowedExtensionTypes();
	}

	/** The coveo push url. */
	private String coveoPushUrl;

	/** The coveo platform url. */
	private String coveoPlatformUrl;

	/** The coveo connector url. */
	private String coveoConnectorUrl;

	/** The coveo organization id. */
	private String coveoOrganizationId;

	/** The coveo source id. */
	private String coveoSourceId;

	/** The coveo source name. */
	private String coveoSourceName;

	/** The coveo api key. */
	private String coveoApiKey;


	/** The inheritance logic properties. */
	private String[] inheritanceLogicProperties;

	/** The dam allowed extension types. */
	private String[] damAllowedExtensionTypes;

	/**
	 * Activate.
	 *
	 * @param config the config
	 */
	@Activate
	protected void activate(final Config config) {
		this.coveoPushUrl = config.pushUrl();
		this.coveoPlatformUrl = config.platformUrl();
		this.coveoConnectorUrl = config.connectorUrl();
		this.coveoOrganizationId = config.organizationId();
		this.coveoSourceId = config.sourceId();
		this.coveoSourceName = config.sourceName();
		this.coveoApiKey = config.apiKey();
		this.inheritanceLogicProperties = config.inheritanceLogicProperties();
		this.damAllowedExtensionTypes = config.damAllowedExtensionTypes();
	}

	/**
	 * {@inheritDoc}
	 *
	 * @see com.abbott.aem.platform.search.coveoconnector.core.service.FormConfigurationService#getCoveoPushUrl()
	 */
	public String getCoveoPushUrl() {
		return coveoPushUrl;
	}

	/**
	 * {@inheritDoc}
	 *
	 * @see com.abbott.aem.platform.search.coveoconnector.core.service.FormConfigurationService#getCoveoPlatformUrl()
	 */
	public String getCoveoPlatformUrl() {
		return coveoPlatformUrl;
	}

	/**
	 * {@inheritDoc}
	 *
	 * @see com.abbott.aem.platform.search.coveoconnector.core.service.FormConfigurationService#getCoveoConnectorUrl()
	 */
	public String getCoveoConnectorUrl() {
		return coveoConnectorUrl;
	}

	/**
	 * {@inheritDoc}
	 *
	 * @see com.abbott.aem.platform.search.coveoconnector.core.service.FormConfigurationService#getCoveoOrganizationId()
	 */
	public String getCoveoOrganizationId() {
		return coveoOrganizationId;
	}

	/**
	 * {@inheritDoc}
	 *
	 * @see com.abbott.aem.platform.search.coveoconnector.core.service.FormConfigurationService#getCoveoSourceId()
	 */
	public String getCoveoSourceId() {
		return coveoSourceId;
	}

	/**
	 * {@inheritDoc}
	 *
	 * @see com.abbott.aem.platform.search.coveoconnector.core.service.FormConfigurationService#getCoveoSourceName()
	 */
	public String getCoveoSourceName() {
		return coveoSourceName;
	}

	/**
	 * {@inheritDoc}
	 *
	 * @see com.abbott.aem.platform.search.coveoconnector.core.service.FormConfigurationService#getCoveoApiKey()
	 */
	public String getCoveoApiKey() {
		return coveoApiKey;
	}

	/**
	 * {@inheritDoc}
	 *
	 * @see com.abbott.aem.platform.search.coveoconnector.core.service.FormConfigurationService#getInheritanceLogicProperties()
	 */
	public String[] getInheritanceLogicProperties() {
		return inheritanceLogicProperties.clone();
	}

	/**
	 * Gets the dam allowed extension types.
	 *
	 * @return the dam allowed extension types
	 */
	public String[] getDamAllowedExtensionTypes() {
		return damAllowedExtensionTypes.clone();
	}

}