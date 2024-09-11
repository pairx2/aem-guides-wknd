package com.abbott.aem.an.abbottstore.models;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

/**
 * The Class ResponseModel.
 */
@Model(adaptables = {Resource.class, SlingHttpServletRequest.class}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class ResponseModel {

	
	/** The status. */
	@ValueMapValue
    private String status;
    
    /** The response text. */
    @ValueMapValue
    private String responseText;

	/**
	 * Gets the status.
	 *
	 * @return the status
	 */
	public String getStatus() {
		return status;
	}

	/**
	 * Gets the response text.
	 *
	 * @return the response text
	 */
	public String getResponseText() {
		return responseText;
	}
}
