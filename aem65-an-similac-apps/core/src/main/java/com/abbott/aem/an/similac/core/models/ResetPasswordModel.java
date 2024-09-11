package com.abbott.aem.an.similac.core.models;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;


/**
 *  Reset Password Model  is the SlingModel to hold the details of reset password properties.
 * 
 */
@Model(adaptables = { Resource.class,
		SlingHttpServletRequest.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class ResetPasswordModel {
	
	@ValueMapValue
	private String centerImagePath;
	
	@ValueMapValue
	private String footerImagePath;
	
	
	@SlingObject
    private SlingHttpServletRequest request;
	
	
	String centreImage;
	
	String footerImage;
	
	public String getCentreImage() {
		/* un-used invocation of getBase64Image is removed. */		
		return centreImage;
	}

	public String getFooterImage() {
		/* un-used invocation of getBase64Image is removed. */
		return footerImage;
	}
}
