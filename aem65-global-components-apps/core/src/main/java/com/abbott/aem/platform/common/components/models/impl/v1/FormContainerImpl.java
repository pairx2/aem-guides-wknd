package com.abbott.aem.platform.common.components.models.impl.v1;

import com.abbott.aem.platform.common.components.models.FormContainer;
import com.abbott.aem.platform.common.components.services.APILookupService;
import com.abbott.aem.platform.common.components.services.ProxyComponentService;
import com.abbott.aem.platform.common.components.services.ProxyPaths;
import com.abbott.aem.platform.common.constants.CommonConstants;
import com.abbott.aem.platform.common.util.PageUtil;
import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.adobe.cq.wcm.core.components.models.Component;
import com.day.cq.commons.inherit.HierarchyNodeInheritanceValueMap;
import com.day.cq.commons.inherit.InheritanceValueMap;
import com.day.cq.wcm.api.Page;
import lombok.AccessLevel;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Delegate;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import javax.annotation.PostConstruct;
import javax.inject.Inject;

import static org.apache.sling.api.servlets.HttpConstants.METHOD_POST;

@Data
@EqualsAndHashCode(callSuper = false)
@Model(adaptables = { SlingHttpServletRequest.class },
	   adapters = { FormContainer.class, ComponentExporter.class },
	   resourceType = { FormContainerImpl.RESOURCE_TYPE },
	   defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
		  extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class FormContainerImpl implements FormContainer {

	/**
	 * The Constant RESOURCE_TYPE.
	 */
	public static final String RESOURCE_TYPE = "abbott-platform/components/form/formcontainer/v1/formcontainer";

	public static final String STEP_LABEL = "stepLabel";

	@Self
	@Delegate(types = Component.class)
	@Setter(AccessLevel.NONE)
	@Getter(AccessLevel.NONE)
	private Component modelComponent;

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
	private String kountEnable;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String kountClientID;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String kountEnvironment;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String isSPA;

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
	private String updateRequest;

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
	
	@Setter(AccessLevel.NONE)
	private String methodAction;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String enterpriseRecaptcha;
	
	private static final String DELIMETER = "::";
	
	@ScriptVariable
	@Setter(AccessLevel.NONE)
	@Getter(AccessLevel.NONE)
	private com.day.cq.wcm.api.components.Component component;
	
	@OSGiService
	@Setter(AccessLevel.NONE)
	@Getter(AccessLevel.NONE)
	private ProxyComponentService proxyComponentService;
	
	@SlingObject
	@Setter(AccessLevel.NONE)
	@Getter(AccessLevel.NONE)
	private ResourceResolver resolver;
	
	@Setter(AccessLevel.NONE)
	private String buttonProxyPath;
	
	@PostConstruct
	public void initModel() {
		buttonProxyPath = proxyComponentService.getProxyPath(component, ProxyPaths.buttonProxy);
		methodAction = METHOD_POST;
		if(StringUtils.contains(formType, DELIMETER)) {
			String[] formTypeWithAction = StringUtils.split(formType, DELIMETER);
			this.formType = formTypeWithAction[0];
			this.methodAction = formTypeWithAction[1];
		}
	}

	@Override
	public String getReCaptchaKey() {
		InheritanceValueMap inheritedProperties = new HierarchyNodeInheritanceValueMap(currentPage.adaptTo(Resource.class));
		return inheritedProperties.getInherited(CommonConstants.RE_CAPTCHA_SITE_KEY, String.class);
	}

	@Override
	public String getRecaptchaScriptsrc() {
		InheritanceValueMap inheritedProperties = new HierarchyNodeInheritanceValueMap(currentPage.adaptTo(Resource.class));
		return inheritedProperties.getInherited(CommonConstants.RE_CAPTCHA_SCRIPT_SRC, String.class);
	}

	@Override
	public String getThankYouPage() {
		return PageUtil.getUrl(redirect, resolver);
	}

	@Override
	public String getUpdateRequest() {
		if (this.updateRequest != null) {
			return this.updateRequest;
		}
		return StringUtils.EMPTY;
	}

	@Override
	public String getOnBeforeCall() {
		if (this.onBeforeCall != null) {
			return this.onBeforeCall;
		}
		return StringUtils.EMPTY;
	}

	@Override
	public String getOnSuccess() {
		if (this.onSuccess != null) {
			return this.onSuccess;
		}
		return StringUtils.EMPTY;
	}

	@Override
	public String getOnError() {
		if (this.onError != null) {
			return this.onError;
		}
		return StringUtils.EMPTY;
	}

	@Override
	public String getOnComplete() {
		if (this.onComplete != null) {
			return this.onComplete;
		}
		return StringUtils.EMPTY;
	}

	@Override
	public String getDomainName() {
		return apiLookupService.getRequestEndpoint(StringUtils.EMPTY);
	}
	
	@Override
	public String getCurrentPagePath() {
		return PageUtil.getUrl(currentPage.getPath(), resolver);
	}
	
	@Override
	public String getEnterpriseRecaptcha()
	{
		return enterpriseRecaptcha;
	}
}