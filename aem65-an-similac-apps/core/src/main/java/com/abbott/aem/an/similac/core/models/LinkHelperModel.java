package com.abbott.aem.an.similac.core.models;

import static com.abbott.aem.an.similac.core.utils.CommonConstants.FORWARD_SLASH;
import static com.abbott.aem.an.similac.core.utils.CommonConstants.HTML_EXTENSION;
import static com.abbott.aem.an.similac.core.utils.CommonConstants.QUESTION_MARK;
import static com.abbott.aem.an.similac.core.utils.CommonConstants.EQUAL_TO;

import java.io.Serializable;

import javax.inject.Inject;
import com.day.cq.commons.Externalizer;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.RequestAttribute;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;


import com.abbott.aem.an.similac.core.services.StoreConfigService;

/**
 * Sling model to process Link Hrefs
 * 
 * @author Anirudh Garg
 */
@Model(adaptables = { SlingHttpServletRequest.class,
		Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class LinkHelperModel implements Serializable {
	
	
	private static final String AN_SIMILAC_COM = "an_similac_com";

	/** The generated Serial Version UID */
	private static final long serialVersionUID = 7991327753383726905L;

	@SlingObject
	private transient ResourceResolver resourceResolver;

	/** The href to be processed. */
	@RequestAttribute
	private String href;

	@Inject
	private StoreConfigService storeService;

	@Inject
	private transient Externalizer externalizer;

	/** Set the href */
	public void setLinkHref(String href) {
		this.href = href;
	}

	/** Get the processed href */
	public String getLinkHref() {
		if (StringUtils.isBlank(href)) {
			return "";
		}
		if (href.endsWith(HTML_EXTENSION)) {
			return href;
		}
		
		if (href.contains(QUESTION_MARK) && href.contains(EQUAL_TO)) {
			return href;
		}
		if (href.startsWith(FORWARD_SLASH)) {
			if (href.endsWith(FORWARD_SLASH)) {
				href = href.substring(0, href.length() - 1);
			}
			href = href.concat(HTML_EXTENSION);
		}
		
		return href;
	}

	/** Get the processed href for Domain */
	public String getLinkHrefDomain() {

		if (StringUtils.isBlank(href)) {
			return "";
		}

		if (href.endsWith(HTML_EXTENSION) && href.startsWith(FORWARD_SLASH)) {
			return externalizer.externalLink(resourceResolver, AN_SIMILAC_COM, href);
		}
		if (href.endsWith(HTML_EXTENSION)) {
			return href;
		}
		
		if (href.contains(QUESTION_MARK) && href.contains(EQUAL_TO)) {
			return href;
		}
		
		if (href.startsWith(FORWARD_SLASH)) {
			if (href.endsWith(FORWARD_SLASH)) {
				href = href.substring(0, href.length() - 1);
			}
			if(href.startsWith("/content/dam")) {
				href = externalizer.externalLink(resourceResolver, AN_SIMILAC_COM, href);
			}
			else {
				href = externalizer.externalLink(resourceResolver, AN_SIMILAC_COM, String.format("%s.html", href));
			}
		}
		
		
		return href;
	}

	public String getLinkDomain() {
		return storeService.getDomainName();
	}
}
