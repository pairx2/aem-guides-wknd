package com.abbott.aem.an.abbottstore.models;

import com.abbott.aem.an.abbottstore.constants.CommonConstants;
import com.abbott.aem.an.abbottstore.utils.AbbottResourceUtils;
import com.day.cq.commons.LanguageUtil;
import com.day.cq.commons.inherit.HierarchyNodeInheritanceValueMap;
import com.day.cq.commons.inherit.InheritanceValueMap;
import com.day.cq.commons.jcr.JcrConstants;
import com.day.cq.wcm.api.Page;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceUtil;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.PostConstruct;
import javax.inject.Inject;

/**
 * The Class HeaderModel.
 */
@Model(adaptables = { Resource.class,
		SlingHttpServletRequest.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class HeaderModel {

	/** The Constant LOGGER. */
	private static final Logger LOGGER = LoggerFactory.getLogger(HeaderModel.class);
	
	/** The Constant DEFAULT_VARIATION. */
	private static final String DEFAULT_VARIATION = CommonConstants.ABBOTT_DEFAULT_VARIATION;

	/** The resource resolver. */
	@SlingObject
	public ResourceResolver resourceResolver;

	/** The current page. */
	@ScriptVariable
    Page currentPage;
	
	/** The variation type. */
	@ValueMapValue
	private String variationType;

	
	/** The header resource path. */
	@Inject
	public String headerResourcePath;
	
	
	/** The language resource. */
	Resource languageResource =null;
	
	
	/**
	 * Activate.
	 */
	@PostConstruct
	public void activate() {
		String currentPagePath = headerResourcePath;
		if(StringUtils.isNotBlank(currentPagePath)) {
			languageResource = resourceResolver.getResource(LanguageUtil.getLanguageRoot(currentPagePath));
		}
		if(languageResource != null) {
			Resource headerResource =  AbbottResourceUtils.getFirstChildWithResourceType(languageResource.getChild(JcrConstants.JCR_CONTENT),CommonConstants.GLOBAL_HEADER_RES_TYPE);
			Resource res = null;
			if(null != headerResource) {
				res = resourceResolver.getResource(headerResource.getPath());
				if(res.getValueMap().containsKey("variation")) {
					this.variationType = res.getValueMap().get("variationType").toString();
					LOGGER.debug("header variation  :: {}", this.variationType);
				}
			}
		}
	}
	
	/**
	 * Returns the path relative to header resource configured at the site home
	 * node. This path would vary as per site.
	 *
	 * @return the relative header path
	 */
	public String getRelativeHeaderPath() {
		String relativeHeaderPath = CommonConstants.DOT + CommonConstants.FORWARD_SLASH;
		String siteHomePath = AbbottResourceUtils.getHomePageForPage(currentPage).getPath();
		if (StringUtils.isNotBlank(siteHomePath)) {
			if (!AbbottResourceUtils.isTemplate(currentPage) && !AbbottResourceUtils.isHomePage(currentPage)) {
				Resource headerResource = AbbottResourceUtils.getFirstChildWithResourceType(
						resourceResolver.resolve(siteHomePath).getChild(JcrConstants.JCR_CONTENT), CommonConstants.GLOBAL_HEADER_RES_TYPE);
				if (!ResourceUtil.isNonExistingResource(headerResource)) {
					relativeHeaderPath = headerResource.getPath();
				}
			}
		} else {
			LOGGER.error("Could not find the home page");
		}
		return relativeHeaderPath;
	}

	/**
	 * Returns if the header component is dragged on the template.
	 *
	 * @return true, if is template page
	 */
	public boolean isTemplatePage() {
		return AbbottResourceUtils.isTemplate(currentPage);
	}

	/**
	 * Returns if the header component is dragged on the template.
	 *
	 * @return the home page
	 */
	public String getHomePage() {
		return AbbottResourceUtils.getHomePageForPage(currentPage).getPath();
	}

	
	/**
	 * Returns the default variation when the variation field is empty.
	 *
	 * @return the variation type
	 */
	public String getVariationType() {
		if (StringUtils.isEmpty(variationType)) {
			variationType = DEFAULT_VARIATION;
		}
		return variationType;
	}

	/**
	 * @return body scripts
	 */
	public String getBodyScripts() {
		InheritanceValueMap ivm = new HierarchyNodeInheritanceValueMap(currentPage.getContentResource());
		return ivm.getInherited("bodyScripts", String.class);
	}
}
