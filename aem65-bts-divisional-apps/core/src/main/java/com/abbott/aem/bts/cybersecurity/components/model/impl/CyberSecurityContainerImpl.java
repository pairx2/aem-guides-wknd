package com.abbott.aem.bts.cybersecurity.components.model.impl;

import com.abbott.aem.bts.cybersecurity.components.model.CyberSecurityFormContainer;
import com.abbott.aem.platform.common.components.models.LayoutContainer;
import com.abbott.aem.platform.common.components.services.APILookupService;
import com.abbott.aem.platform.common.constants.CommonConstants;
import com.abbott.aem.platform.common.util.PageUtil;
import com.adobe.cq.export.json.ExporterConstants;
import com.adobe.cq.wcm.core.components.models.Component;
import com.day.cq.commons.Externalizer;
import com.day.cq.commons.inherit.HierarchyNodeInheritanceValueMap;
import com.day.cq.commons.inherit.InheritanceValueMap;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
import lombok.*;
import lombok.experimental.Delegate;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.injectorspecific.*;
import org.apache.sling.models.annotations.via.ResourceSuperType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.inject.Inject;

@Data
@EqualsAndHashCode(callSuper = false)
@Model(adaptables = { SlingHttpServletRequest.class }, adapters = { CyberSecurityFormContainer.class }, resourceType = {
		com.abbott.aem.platform.common.components.models.impl.v1.FormContainerImpl.RESOURCE_TYPE }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class CyberSecurityContainerImpl implements CyberSecurityFormContainer {

	/** The Constant RESOURCE_TYPE. */
	public static final String RESOURCE_TYPE = "bts/cybersecurity/components/form/formcontainer";
	private static final Logger log = LoggerFactory.getLogger(CyberSecurityContainerImpl.class);

	@SlingObject
	private ResourceResolver resourceResolver;

	@Self
	@Via(type = ResourceSuperType.class)
	private LayoutContainer layoutContainer;

	@ScriptVariable
	private PageManager pageManager;

	@Self
	@Delegate(types = Component.class)
	@Setter(AccessLevel.NONE)
	@Getter(AccessLevel.NONE)
	private Component component;

	@OSGiService
	@Setter(AccessLevel.NONE)
	@Getter(AccessLevel.NONE)
	private APILookupService apiLookupService;

	@Inject
	@Setter(AccessLevel.NONE)
	@Getter(AccessLevel.NONE)
	private Page currentPage;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String formMode;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String formType;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String successMessage;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String failureMessage;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String recaptcha;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String submit;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String reset;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String cancel;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private java.util.List<String> stepLabel;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String stepCompleteIcon;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String requestType;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String redirect;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String errorPage;
  
  	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String onBeforeCall;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String onSuccess;
  
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String onError;
  
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String onComplete;
  
    @ValueMapValue
	@Setter(AccessLevel.NONE)
	private String updateRequest;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String script;

	@Override
	public String getReCaptchaKey() {
		InheritanceValueMap inheritedProperties = new HierarchyNodeInheritanceValueMap(
				currentPage.adaptTo(Resource.class));
		return inheritedProperties.getInherited(CommonConstants.RE_CAPTCHA_SITE_KEY, String.class);
	}

	@Override
	public String getRecaptchaScriptsrc() {
		InheritanceValueMap inheritedProperties = new HierarchyNodeInheritanceValueMap(
				currentPage.adaptTo(Resource.class));
		return inheritedProperties.getInherited(CommonConstants.RE_CAPTCHA_SCRIPT_SRC,
				String.class);
	}

	@Override
	public String getThankYouPage() {
		if (StringUtils.isNotBlank(redirect) && redirect.startsWith("/content")) {
			Page thankyouPage = pageManager.getPage(redirect);
			if (thankyouPage != null) {
				redirect = getExternalizedPath(thankyouPage.getPath());
			}
			else{
				log.debug("thankyouPage is null.");
			}
		}
		return redirect;
	}

	@Override
	public String getErrorPage() {
		if (StringUtils.isNotBlank(errorPage) && errorPage.startsWith("/content")) {
			Page errPage = pageManager.getPage(errorPage);
			if (errPage != null) {
				errorPage = getExternalizedPath(errPage.getPath());
			}
			else{
				log.debug("errPage is null.");
			}
		}
		return errorPage;
	}

	@Override
	public String getCurrentPagePath() {
		return getExternalizedPath(currentPage.getPath());
	}

	private String getExternalizedPath(String path) {
		PageUtil pageUtil = new PageUtil();
		Externalizer externalizer = resourceResolver.adaptTo(Externalizer.class);
		return pageUtil.getExternalUrl(path, resourceResolver, externalizer, false, false);
	}

}
