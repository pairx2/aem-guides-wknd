package com.abbott.aem.platform.common.components.models.impl.v1;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Delegate;

import com.abbott.aem.platform.common.components.models.CookieBar;
import com.adobe.cq.export.json.ExporterConstants;
import com.adobe.cq.wcm.core.components.models.Component;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adaptables = { SlingHttpServletRequest.class },
	   adapters = { CookieBar.class },
	   resourceType = { CookieBarImpl.RESOURCE_TYPE },
	   defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
		  extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class CookieBarImpl extends ComponentProxyImpl implements CookieBar {

	public static final String RESOURCE_TYPE = "abbott-platform/components/content/molecules/cookiebar/v1/cookiebar";

	@Self
	@Delegate(types = Component.class)
	@Setter(AccessLevel.NONE)
	@Getter(AccessLevel.NONE)
	private Component component;

	@Setter(AccessLevel.NONE)
	@ValueMapValue
	@Getter
	private int cookieExpirationTime;

	@Setter(AccessLevel.NONE)
	@ValueMapValue
	@Getter
	private String countryLabel;

	@Setter(AccessLevel.NONE)
	@ValueMapValue
	@Getter
	private boolean disableLanguageNavigation;
}