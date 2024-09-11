package com.abbott.aem.an.abbottstore.models;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.PostConstruct;

/**
 *
 * @author jayant.jain
 * 
 *         Button - queryParam
 * 
 *         QueryParamButton Model is the SlingModel to hold the details of individual button
 *         component
 * 
 *         Version Number: 1.0
 */
@Model(adaptables = { Resource.class, SlingHttpServletRequest.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class QueryParamButtonModel extends UrlServiceModel{

	/** The Constant LOGGER. */
	private static final Logger log = LoggerFactory.getLogger(QueryParamButtonModel.class);

	/** The resource resolver. */
	@SlingObject
	private ResourceResolver resourceResolver;

	@Self
	private SlingHttpServletRequest slingHttpServletRequest;

	/** The Title. */
	@ValueMapValue
	private String title;

	/** The External Url */
	@ValueMapValue
	private String externalLink;

	/** The redirection target. */
	@ValueMapValue
	private String redirectionTarget;

	/** The Query Param Key. */
	@ValueMapValue
	private String queryParamKey;

	/** The Query Param Key to be Appended. */
	@ValueMapValue
	private Boolean appendQueryParamKey;

	@Override
	@PostConstruct()
	public void activate() {
		String qrProcessId = slingHttpServletRequest.getRequestParameter(queryParamKey).getString();
		if(Boolean.TRUE.equals(appendQueryParamKey)){
			externalLink=externalLink+queryParamKey+"="+qrProcessId;
		}else{
			externalLink=externalLink+qrProcessId;
		}
		log.info("QR Processor External URL :: {}", externalLink);
	}

	/**
	 * Gets the redirection target.
	 *
	 * @return the redirection target
	 */
	public String getRedirectionTarget() {
		return redirectionTarget;
	}

	/**
	 * Gets the title.
	 *
	 * @return the title
	 */
	public String getTitle() {
		return title;
	}

	/**
	 * Gets the externalLink
	 *
	 * @return the externalLink
	 */
	public String getExternalLink() {
		return externalLink;
	}

	/**
	 * Sets the externalLink
	 *
	 * @return the externalLink
	 */
	public void setExternalLink(String externalLink) {
		this.externalLink = externalLink;
	}

	/**
	 * Gets the queryParamKey
	 *
	 * @return the queryParamKey
	 */
	public String getQueryParamKey() {
		return queryParamKey;
	}

	/**
	 * Sets the queryParamKey
	 *
	 * @return the queryParamKey
	 */
	public void setQueryParamKey(String queryParamKey) {
		this.queryParamKey = queryParamKey;
	}

	public Boolean getAppendQueryParamKey() {
		return appendQueryParamKey;
	}

	public void setAppendQueryParamKey(Boolean appendQueryParamKey) {
		this.appendQueryParamKey = appendQueryParamKey;
	}
}
