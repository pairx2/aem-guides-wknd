package com.abbott.aem.platform.search.coveoconnector.core.service;

/**
 * The Interface FormConfigurationService.
 */
public interface FormConfigurationService {

	/**
	 * Gets the coveo push url.
	 *
	 * @return the coveo push url
	 */
	public String getCoveoPushUrl();

	/**
	 * Gets the coveo platform url.
	 *
	 * @return the coveo platform url
	 */
	public String getCoveoPlatformUrl();

	/**
	 * Gets the coveo connector url.
	 *
	 * @return the coveo connector url
	 */
	public String getCoveoConnectorUrl();

	/**
	 * Gets the coveo organization id.
	 *
	 * @return the coveo organization id
	 */
	public String getCoveoOrganizationId();

	/**
	 * Gets the coveo source id.
	 *
	 * @return the coveo source id
	 */
	public String getCoveoSourceId();

	/**
	 * Gets the coveo source name.
	 *
	 * @return the coveo source name
	 */
	public String getCoveoSourceName();

	/**
	 * Gets the coveo api key.
	 *
	 * @return the coveo api key
	 */
	public String getCoveoApiKey();

	/**
	 * Gets the inheritance logic properties.
	 *
	 * @return the inheritance logic properties
	 */
	public String[] getInheritanceLogicProperties();

	/**
	 * Gets the dam allowed extension types.
	 *
	 * @return the dam allowed extension types
	 */
	public String[] getDamAllowedExtensionTypes();

}
