package com.abbott.aem.platform.common.components.models.impl.v2;

import com.abbott.aem.platform.common.components.models.impl.v1.HeaderImpl;
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

@Model(adaptables = { SlingHttpServletRequest.class },
	   adapters = { Header.class, ComponentExporter.class },
	   resourceType = { HeaderV2Impl.RESOURCE_TYPE },
	   defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class HeaderV2Impl extends HeaderImpl implements Header {
	public static final String RESOURCE_TYPE = "abbott-platform/components/content/organism/header/v2/header";

	@Self
	@Delegate(types = Component.class)
	@Setter(AccessLevel.NONE)
	@Getter(AccessLevel.NONE)
	private Component component;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private boolean hideTopUtilitySection;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private boolean hideBottomUtilitySection;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private boolean isSticky;
}
