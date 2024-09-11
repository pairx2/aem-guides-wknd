package com.abbott.aem.platform.common.components.models.impl.v1;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Delegate;

import com.abbott.aem.platform.common.components.models.Header;
import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.adobe.cq.wcm.core.components.models.Component;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

/**
 * This model is used by header component
 */
@Model(adaptables = { SlingHttpServletRequest.class },
	   adapters = { Header.class, ComponentExporter.class },
	   resourceType = { HeaderImpl.RESOURCE_TYPE },
	   defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
		  extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class HeaderImpl extends ComponentProxyImpl implements Header {

	public static final String RESOURCE_TYPE = "abbott-platform/components/content/organism/header/v1/header";

	@Self
	@Delegate(types = Component.class)
	@Setter(AccessLevel.NONE)
	@Getter(AccessLevel.NONE)
	private Component component;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private boolean hideSignUpInNav;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private boolean hideSearchInNav;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private boolean pwaHideSearchInNav;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private boolean hideMegaMenuInNav;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private boolean underlineMegaMenuInNav;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private boolean enableSkipToContent;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private boolean enableCompactMobileHeader;
}
