package com.abbott.aem.platform.common.components.models.impl.v1;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Delegate;

import com.abbott.aem.platform.common.components.models.Tooltips;
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
	   adapters = { Tooltips.class, ComponentExporter.class },
	   resourceType = { TooltipsImpl.RESOURCE_TYPE },
	   defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
		  extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class TooltipsImpl implements Tooltips {

	public static final String RESOURCE_TYPE = "abbott-platform/components/content/atoms/tooltips/v1/tooltips";

	@Self
	@Delegate(types = Component.class)
	@Setter(AccessLevel.NONE)
	@Getter(AccessLevel.NONE)
	private Component component;

	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	private boolean disableTooltip;

	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	private String tooltipTitle;

	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	private String tooltipBody;

	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	private String icon;

	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	private String alignment;

	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	private String background;

	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	private String size;

	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	private String action;

	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	private String popUpUrl;
	
}