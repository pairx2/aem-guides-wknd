package com.abbott.aem.adc.freestylelibrede.models;

import java.beans.Transient;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.inject.Named;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.injectorspecific.Self;

import com.day.cq.tagging.TagConstants;
import com.day.cq.tagging.TagManager;
import com.abbott.aem.adc.freestylelibrede.dto.ProductDto;
import com.abbott.aem.adc.freestylelibrede.services.ConfigurationService;
import com.abbott.aem.adc.freestylelibrede.services.ExternalizerService;
import com.abbott.aem.adc.freestylelibrede.services.ProductPageService;
import com.abbott.aem.adc.freestylelibrede.services.SiteScriptService;
import com.abbott.aem.adc.freestylelibrede.utils.AuthenticationUtils;
import com.day.cq.commons.jcr.JcrConstants;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
import com.day.cq.wcm.api.Template;
import com.day.cq.wcm.api.WCMMode;
import com.day.cq.commons.inherit.HierarchyNodeInheritanceValueMap;
import com.day.cq.commons.inherit.InheritanceValueMap;

@Model(adaptables = SlingHttpServletRequest.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, resourceType={"adc/freestylelibrede/components/structure/page","adc/freestylelibrede/components/structure/product-page","adc/freestylelibrede/components/structure/xfpage"})
public class ServiceModel {
	@SuppressWarnings("squid:S1075")
	private static String templatePath = "/conf/adc/freestylelibrede/settings/wcm/templates/";

	private static final List<String> EXCLUDED_KEYS = Arrays.asList("service.pid","component.name","component.id");

	@Self
	private SlingHttpServletRequest request;

	@Inject
	private ConfigurationService configurationService;

	@Inject
	private ProductPageService productPageService;

	@Inject
	private ExternalizerService externalizerService;
	
	@Inject
	private SiteScriptService siteScriptService;

	@Inject
	@Via("resource")
	@Named(TagConstants.PN_TAGS)
	private String[] tags;
	
	@Inject @Via("resource") @Named(JcrConstants.JCR_DESCRIPTION)
	private String description;

	@Inject
	private Resource resource;

	@Inject
	private String reCaptchaSiteKey;

	@Inject
	private String reCaptchaScriptsrc;

	/**
	 *  Map containing all the service url's
	 */
	private Map<String,Object> serviceMap;

	@PostConstruct
	public void init(){
		serviceMap=new HashMap<>();
		Map<String,Object> map= configurationService.getPropertiesMap();
		//Creating a copy of map as configurationService.getPropertiesMap() returns an Unmodifiable map
		for (Map.Entry<String,Object> entry: map.entrySet()) {
			if(!EXCLUDED_KEYS.contains(entry.getKey())) {
				if(entry.getValue().toString().startsWith("/content")) {
					final String rewrittenUrl = externalizerService.externalizeIfNecessary(entry.getValue().toString(), request.getResourceResolver());
					serviceMap.put(entry.getKey(), rewrittenUrl);
				}else {
					serviceMap.put(entry.getKey(), entry.getValue());
				}
			}

		}

		if (resource != null)
		{
			reCaptchaSiteKey = setInheritedPageValues("reCaptchaSiteKey",resource);
			reCaptchaScriptsrc = setInheritedPageValues("reCaptchaScriptsrc",resource);
		}
	}

	protected String setInheritedPageValues(String name, Resource resource) {
		return setInheritedPageValues(name, resource, null);
	}

	private String setInheritedPageValues(String name, Resource resource,  String defaultValue) {
		InheritanceValueMap inheritedProperties = new HierarchyNodeInheritanceValueMap(resource);
		return inheritedProperties.getInherited(name, defaultValue);
	}

	/**
	 * @return the serviceMap
	 */
	public Map<String, Object> getServiceMap() {
		return serviceMap;
	}

	public String getPageType() {
		return Optional.ofNullable(request.getResource().getParent())
				.map(p -> p.adaptTo(Page.class))
				.map(Page::getTemplate)
				.map(Template::getPath)
				.map(t -> t.replace(templatePath,""))
				.orElse("");
	}

	@Transient
	public String getTags() {
		TagManager tgMgr = request.getResourceResolver().adaptTo(TagManager.class);
		String tagsTitle = StringUtils.EMPTY;
		if (null == tags) {
			return StringUtils.EMPTY;
		}

		for (String tag : tags) {
			if (tagsTitle.isEmpty()) {
				tagsTitle = tgMgr.resolve(tag).getTitle();
			} else {
				tagsTitle = tagsTitle + "," + tgMgr.resolve(tag).getTitle();
			}
		}
		//removing null always false condition
		return tagsTitle;
	}

	public Map<String, Map<String,ProductDto>> getProductData() {
		return productPageService.mapAll(request);
	}

	public String getWCMMode() {
		return WCMMode.fromRequest(request).toString();
	}

	public String getLoginPageUrl() {
		String loginPagePath = AuthenticationUtils.getAuthenticationRedirectPath(request.getResource());
		return externalizerService.externalizeIfNecessary(loginPagePath, request.getResourceResolver());
	}

	public String getPath() {
		PageManager pageManager = request.getResource().getResourceResolver().adaptTo(PageManager.class);
		return externalizerService.externalizeIfNecessary(pageManager.getContainingPage(request.getResource()).getPath(), request.getResourceResolver());
	}

	public String getOneTrustDomain() {
		return serviceMap.get("onetrust.domain").toString();
	}

	public String getDomain() {
		String domain = request.getRequestURL().toString();	
		domain = domain.replaceAll(request.getRequestURI(), "");	
		return domain;
	}
	
	public String getDescription() {
		return description;
	}

	@Inject
	@Via("resource")
	@Named("metaTagList")
	private List<Resource> metaTagList;

	private Map<String, String> metaTags;

	public Map<String, String> getMetaTags() {
		metaTags = new HashMap<String, String>();
		if (metaTagList != null) {
			int index = 0;
			for (Resource rs : metaTagList) {
				ValueMap valueMap = rs.adaptTo(ValueMap.class);
				metaTags.put(valueMap.get("metaName", String.class) + "#key" + index,
						valueMap.get("metaValue", String.class));
				index++;
			}
		}
		return metaTags;
	}
	
	public String getSiteScript() {
		return siteScriptService.getPropertiesMap().get("siteScript").toString();
	}
	
	public String getEnableSiteScript() {
		return siteScriptService.getPropertiesMap().get("enableSiteScript").toString();
	}
	
	public String getGtmDataLayer() {
		return serviceMap.get("gtm.data.layer").toString();
	}

	public String getUnsupportedBrowserPagePath() {
		return serviceMap.get("unsupported.browser.page.path").toString();
	}

	public String getReCaptchaSiteKey() {
		return reCaptchaSiteKey;
	}

	public String getReCaptchaScriptsrc() {
		return reCaptchaScriptsrc;
	}
}
