package com.abbott.aem.an.abbottstore.models;

import com.abbott.aem.an.abbottstore.constants.CommonConstants;
import com.abbott.aem.an.abbottstore.utils.AbbottResourceUtils;
import com.day.cq.commons.LanguageUtil;
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

@Model(adaptables = { Resource.class,
		SlingHttpServletRequest.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class FooterModel {

	private static final String DEFAULT_VARIATION = CommonConstants.ABBOTT_TEMPLATE_FOOTER_DEFAULT;
	private static final Logger LOGGER = LoggerFactory.getLogger(FooterModel.class);

	@SlingObject
	Resource resource;

	@ValueMapValue
	private String variation;

	@ScriptVariable
    Page currentPage;

	@SlingObject
	public ResourceResolver resourceResolver;

	
	@Inject
	public String footerResourcePath;
	
	Resource languageResource =null;
	
	
	@PostConstruct
	public void activate() {
		String currentPagePath = footerResourcePath;
		if(StringUtils.isNotBlank(currentPagePath)) {
			languageResource = resourceResolver.getResource(LanguageUtil.getLanguageRoot(currentPagePath));
		}
		if(languageResource != null) {
			Resource footerResource =  AbbottResourceUtils.getFirstChildWithResourceType(languageResource.getChild(JcrConstants.JCR_CONTENT),CommonConstants.GLOBAL_FOOTER_RES_TYPE);
			Resource res = null;
			if(null != footerResource) {
				res = resourceResolver.getResource(footerResource.getPath());
				if(res.getValueMap().containsKey("variation")) {
					this.variation = res.getValueMap().get("variation").toString();
					LOGGER.debug("Footer Variation :: {}", this.variation);
				}
			}
		}
	}
	
	/**
	 * Returns the path relative to footer resource configured at the site locale
	 * node. This path would vary as per site.
	 *
	 * @return
	 */
	public String getRelativeFooterPath() {
		String relativeFooterPath = CommonConstants.DOT + CommonConstants.FORWARD_SLASH;

		String siteLocalePath = AbbottResourceUtils.getHomePageForPage(currentPage).getPath();
		LOGGER.debug("Locale Page Path is : {} for current page : {}", siteLocalePath, currentPage.getPath());
		
		if (StringUtils.isNotBlank(siteLocalePath)) {
			if (!AbbottResourceUtils.isTemplate(currentPage) && !AbbottResourceUtils.isHomePage(currentPage)) {
				Resource footerResource = AbbottResourceUtils.getFirstChildWithResourceType(
						resourceResolver.resolve(siteLocalePath).getChild(JcrConstants.JCR_CONTENT), CommonConstants.GLOBAL_FOOTER_RES_TYPE);
				if (!ResourceUtil.isNonExistingResource(footerResource)) {
					relativeFooterPath = footerResource.getPath();
				}
			}
		} else {
			LOGGER.error("Could not find the locale page");
		}
		return relativeFooterPath;
	}

	/**
	 * Returns if the footer component is dragged on the template.
	 *
	 * @return
	 */
	public boolean isTemplatePage() {
		return AbbottResourceUtils.isTemplate(currentPage);
	}

	/**
	 * Returns the default variation when the variation field is empty.
	 * 
	 * @return
	 */
	public String getVariation() {
		if (StringUtils.isEmpty(variation)) {
			variation = DEFAULT_VARIATION;
		}
		return variation;
	}
	


}
