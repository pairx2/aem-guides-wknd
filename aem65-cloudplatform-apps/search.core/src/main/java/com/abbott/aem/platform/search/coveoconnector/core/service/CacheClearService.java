package com.abbott.aem.platform.search.coveoconnector.core.service;

/**
 * The Interface FormConfigurationService.
 */
public interface CacheClearService {

	
	public String getPurgeKey();

	/**
	 * get publish host
	 */
	public String getPublishHost();

	
	public String getEdgeKey();
	
    public String getSecretKey();
	
	public String getAccessKey();


	String getPreviewHost();

	String getPreviewEdgeKey();

	String getPreviewPurgeKey();

}
