package com.abbott.aem.an.similac.core.models;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.jcr.Node;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * ResourceValidation Class is used to validate whether the resource is valid or
 * not in the repository
 *
 */

@Model(adaptables = { Resource.class,
		SlingHttpServletRequest.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class ResourceValidation {
	private final Logger log = LoggerFactory.getLogger(getClass());
	Boolean validResource = null;
	@Inject
	SlingHttpServletRequest request;
	@Inject
	private String resourcePath;
	private Boolean enabled = false;
	
	/**
	* ResourceValidation Class is used to check whether the resource is present
	* in repository or not.If resource is found True is returned else false
	* 
	* @see org.apache.sling.models.annotations.Model#init()
	* @see Node
	* @see Resource
	* @see SlingHttpServletRequest
	* @return Nothing
	*/
	@PostConstruct
	protected void init() {
	Resource nodeResource = request.getResourceResolver().getResource(resourcePath);
	if (nodeResource != null) {
		Node pageNode = nodeResource.adaptTo(Node.class);
		if (pageNode != null) {
			validResource = true;
		}
		if (request.getRequestPathInfo().getSelectorString() != null && request.getRequestPathInfo().getSelectorString().equalsIgnoreCase("topnav")) {
			enabled=true;
		}
	}else {
		if(log.isDebugEnabled()) {
			log.debug("Provided Resource is not available {}",resourcePath);
		}
		validResource = false;
	}
	}
	
	/**
	* This method will return the boolean object
	* 
	* @return validResource
	*/
	public Boolean getValidResource() {
	return validResource;
	}
	 public Boolean isEnabled() {
	  return enabled;
	 }
}
