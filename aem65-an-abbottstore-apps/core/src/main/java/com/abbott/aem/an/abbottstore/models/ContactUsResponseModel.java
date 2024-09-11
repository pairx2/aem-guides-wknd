package com.abbott.aem.an.abbottstore.models;

import lombok.Getter;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.PostConstruct;
import java.util.List;

/**
 * The Class ContactUsResponseModel.
 */
@Model(adaptables = {Resource.class, SlingHttpServletRequest.class} , defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class ContactUsResponseModel {

	/** The Constant LOGGER. */
	private static final Logger log = LoggerFactory.getLogger(SubscriptionDescriptionModel.class);
	
	@Self
	private SlingHttpServletRequest slingHttpServletRequest;
	
	/** The response list. */
	@ChildResource(name = "responseList")
	@Getter
	private List<ResponseModel> responseList;
	
	private String status = null;
	
	@PostConstruct()
	protected void activate() {
		status =  slingHttpServletRequest.getRequestPathInfo().getSelectorString();
		log.info("Contact Us URL :: {}", status);
	}

	public String getRequestStatus() {
		
		if(StringUtils.equals(status, null)) {
			return "invalid";
		}else {
			return status;
		}
	}
	
}
