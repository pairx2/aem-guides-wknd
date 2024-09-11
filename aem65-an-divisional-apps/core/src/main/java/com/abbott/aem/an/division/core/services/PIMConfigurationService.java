package com.abbott.aem.an.division.core.services;

public interface PIMConfigurationService {

	public String getEnvironment();

	public String getEnvironmentType();

	public String getRunMode();

	public String getProductsRootPath();

	public String getProductsParentRootPath();

	public String getPdpTemplate();

	public String getApiUrl();

	public String getxApplicationId();

	public String getxOriginSecret();

	public String getxCountryCode();

	public String getxPreferredLanguage();

	public String getxSecretHeader();

	public String getProxylbAbbottCorp();

	public boolean isUsingProxy();
	
	public String productBaseImagePath();
	
	public String pdpSeoContentFragmentPath();
	
	public String pdpSeoContentFragmentModel();
	
	public String unavailableImagePath();
	

}
