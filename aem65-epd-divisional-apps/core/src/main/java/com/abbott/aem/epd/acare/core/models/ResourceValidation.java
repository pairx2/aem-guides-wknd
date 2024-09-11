/**
* Copyright (c)   Abbott Laboratories
* Program Name :  ResourceValidation.java
* Application  :  Abbott.EPD.ACare
* Purpose      :  See description
* Description  :  This class is used for validating the resource.
* Modification History:
* ---------------------
*    Date                                Modified by                                       Modification Description
* -----------                         ----------------                                    -------------------------
* 23-Oct-2020                  Cognizant Technology solutions            					Initial Creation
* -----------                         -----------------                                   -------------------------
**/
package com.abbott.aem.epd.acare.core.models;

import javax.annotation.PostConstruct;
import javax.inject.Inject;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceUtil;
import org.apache.sling.models.annotations.Model;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * ResourceValidation Class is used to validate whether the resource is valid or
 * not in the repository
 *
 * @author Cognizant
 */

@Model(adaptables = SlingHttpServletRequest.class)
public class ResourceValidation {
	
	private static final Logger log = LoggerFactory.getLogger(ResourceValidation.class);
	private boolean validResource;
	
	@Inject
	SlingHttpServletRequest request;
	
	@Inject
	private String resourcePath;

	/**
	 * ResourceValidation Class is used to check whether the resource is present
	 * in repository or not.If resource is found True is returned else false
	 * 
	 * @see Model# //init()
	 * @see Resource
	 * @see SlingHttpServletRequest
	 * @return Nothing
	 */
	@PostConstruct
	protected void init() {

		Resource nodeResource = request.getResourceResolver().getResource(resourcePath);
		if (!ResourceUtil.isNonExistingResource(nodeResource)) {
			validResource = true;
		}

		log.debug(this.getClass() + "ResourceValidation Result" + validResource);

	}

	/**
	 * This method will return the boolean object
	 * 
	 * @return validResource
	 */
	public boolean getValidResource() {
		return validResource;
	}

	public void setResourcePath(String resourcePath) {
this.resourcePath=	resourcePath;	
	}

	public void setRequest(SlingHttpServletRequest request) {
		this.request = request;
	}
}