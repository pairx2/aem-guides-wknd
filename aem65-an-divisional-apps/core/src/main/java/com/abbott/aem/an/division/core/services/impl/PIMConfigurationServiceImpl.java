package com.abbott.aem.an.division.core.services.impl;

import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.Designate;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.abbott.aem.an.division.core.services.PIMConfigurationService;

@Component(service = PIMConfigurationService.class, immediate = true)
@Designate(ocd = PIMConfigurationServiceImpl.Config.class)

public class PIMConfigurationServiceImpl implements PIMConfigurationService {

	@ObjectClassDefinition(name = "PIM Configurations", description = "Configurations for PIM integration")
	public static @interface Config {

		@AttributeDefinition(name = "Environment Name", description = "Environment Name", defaultValue = "$[env:AB_ENVIRONMENT_NAME;default=undefined]")
		public String environment();

		@AttributeDefinition(name = "Environment Type", description = "Environment Type", defaultValue = "$[env:AB_ACL_ENVIRONMENT_TYPE;default=DEV]")
		public String environmentType();

		@AttributeDefinition(name = "Run Mode", description = "Run Mode", defaultValue = "publish")
		public String runMode();

		@AttributeDefinition(name = "Products Parent Root Path", description = "Parent Root path value where the product pages will be created", defaultValue = "/content/an/abbottnutrition/us/en")
		public String productsParentRootPath();

		@AttributeDefinition(name = "Products Root Path", description = "Root path value where the product pages will be created", defaultValue = "/content/an/abbottnutrition/us/en/our-products")
		public String productsRootPath();

		@AttributeDefinition(name = "Product Detail Page Template", description = "Template used for creating the PDP pages", defaultValue = "/conf/an/abbottnutrition/settings/wcm/templates/an-product-detail-page")
		public String pdpTemplate();

		@AttributeDefinition(name = "Product Api Url", description = "PIM API URL", defaultValue = "$[env:ENTERPRISE_SERVICES_URL;default=https://dev2.services.abbott]/quality/api/public/products")
		public String pimApiUrl();

		@AttributeDefinition(name = "xapplication id", description = "x application id values used for PIM API", defaultValue = "abbottnutrition")
		public String xApplicationId();

		@AttributeDefinition(name = "xoriginsecret", description = "xoriginsecret used for PIM API", defaultValue = "")
		public String xOriginSecret();

		@AttributeDefinition(name = "Country Code", description = "Country code value used for PIM API", defaultValue = "US")
		public String xCountryCode();

		@AttributeDefinition(name = "Preferred Language", description = "Preferred language used for PIM API", defaultValue = "en")
		public String xPreferredLanguage();

		@AttributeDefinition(name = "Secret Header", description = "Secret Header used for PIM API", defaultValue = "")
		public String xSecretHeader();

		@AttributeDefinition(name = "proxylbabbottcorp", description = "proxylbabbottcorp", defaultValue = "proxy.lb.abbott.corp")
		public String proxyLbAbbottCorp();

		@AttributeDefinition(name = "Using Proxy", description = "Please set it to true in case of running in local environment", defaultValue = "false")
		public boolean usingProxy();

		@AttributeDefinition(name = "product base image path", description = "product base image path", defaultValue = "/content/dam/an/abbottnutrition/products/")
		public String productBaseImagePath();
		
		@AttributeDefinition(name = "product seo content fragment path", description = "product seo content fragment path", defaultValue = "/content/dam/an/abbottnutrition/content-fragments/product-seo-metadata")
		public String pdpSeoContentFragmentPath();
		
		@AttributeDefinition(name = "product seo content fragment model", description = "product seo content fragment model", defaultValue = "/conf/an/abbottnutrition/settings/dam/cfm/models/an-metadata-content-model")
		public String pdpSeoContentFragmentModel();
		
		@AttributeDefinition(name = "unavailable image path", description = "unavailable image path", defaultValue = "/content/dam/an/abbottnutrition/images/global/no-image-available.png")
		public String unavailableImagePath();

	}

	private static final Logger LOGGER = LoggerFactory.getLogger(PIMConfigurationServiceImpl.class);

	private String productsRootPath;
	private String productsParentRootPath;
	private String pdpTemplate;
	private String apiUrl;
	private String xApplicationId;
	private String xOriginSecret;
	private String xCountryCode;
	private String xPreferredLanguage;
	private String xSecretHeader;
	private String proxylbAbbottCorp;
	private boolean usingProxy;
	private String productBaseImagePath;
	private String pdpSeoContentFragmentPath;
	private String pdpSeoContentFragmentModel;
	private String unavailableImagePath;
	private String environment;
	private String environmentType;
	private String runMode;

	@Activate
	protected void activate(final Config pimConfigs) {

		LOGGER.info("in activate method of PIMConfigurationServiceImpl");
		this.environment = pimConfigs.environment();
		this.environmentType = pimConfigs.environmentType();
		this.runMode = pimConfigs.runMode();
		this.productsRootPath = pimConfigs.productsRootPath();
		this.productsParentRootPath = pimConfigs.productsParentRootPath();
		this.apiUrl = pimConfigs.pimApiUrl();
		this.pdpTemplate = pimConfigs.pdpTemplate();
		this.xApplicationId = pimConfigs.xApplicationId();
		this.xOriginSecret = pimConfigs.xOriginSecret();
		this.xCountryCode = pimConfigs.xCountryCode();
		this.xPreferredLanguage = pimConfigs.xPreferredLanguage();
		this.xSecretHeader = pimConfigs.xSecretHeader();
		this.proxylbAbbottCorp = pimConfigs.proxyLbAbbottCorp();
		this.usingProxy = pimConfigs.usingProxy();
		this.productBaseImagePath = pimConfigs.productBaseImagePath();
		this.pdpSeoContentFragmentPath = pimConfigs.pdpSeoContentFragmentPath();
		this.pdpSeoContentFragmentModel = pimConfigs.pdpSeoContentFragmentModel();
		this.unavailableImagePath = pimConfigs.unavailableImagePath();

	}

	public String getEnvironment() {
		return environment;
	}

	public String getEnvironmentType() {
		return environmentType;
	}

	public String getRunMode() {
		return runMode;
	}

	public String getProductsRootPath() {
		return productsRootPath;
	}

	public String getProductsParentRootPath() {
		return productsParentRootPath;
	}

	public String getPdpTemplate() {
		return pdpTemplate;
	}

	public String getApiUrl() {
		return apiUrl;
	}

	public String getxApplicationId() {
		return xApplicationId;
	}

	public String getxOriginSecret() {
		return xOriginSecret;
	}

	public String getxCountryCode() {
		return xCountryCode;
	}

	public String getxPreferredLanguage() {
		return xPreferredLanguage;
	}

	public String getxSecretHeader() {
		return xSecretHeader;
	}

	public String getProxylbAbbottCorp() {
		return proxylbAbbottCorp;
	}

	public String productBaseImagePath() {
		return productBaseImagePath;
	}

	public String pdpSeoContentFragmentPath() {
		return pdpSeoContentFragmentPath;
	}

	public String pdpSeoContentFragmentModel() {
		return pdpSeoContentFragmentModel;
	}

	public String unavailableImagePath() {
		return unavailableImagePath;
	}

	public boolean isUsingProxy() {
		return usingProxy;
	}

}
