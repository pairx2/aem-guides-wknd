package com.abbott.aem.platform.common.components.models.impl.v1;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Delegate;

import com.abbott.aem.platform.common.components.models.AlertBanner;
import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.adobe.cq.wcm.core.components.models.Component;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;



@Model(adaptables = { SlingHttpServletRequest.class },
	   adapters = { AlertBanner.class, ComponentExporter.class },
	   resourceType = { AlertBannerImpl.RESOURCE_TYPE },
	   defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
		  extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class AlertBannerImpl extends ComponentProxyImpl implements AlertBanner {

	public static final String RESOURCE_TYPE = "abbott-platform/components/content/molecules/alertbanner/v1/alertbanner";

	@Self
	@Delegate(types = Component.class)
	@Setter(AccessLevel.NONE)
	@Getter(AccessLevel.NONE)
	private Component component;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private String alertMessage;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private String displayText;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private String buttonText;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private String collapseText;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private String expandText;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private String icon;
}