package com.abbott.aem.platform.common.components.models.impl.v1;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Delegate;

import com.abbott.aem.platform.common.components.models.SectionPanelWithNavigation;
import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.adobe.cq.wcm.core.components.models.Container;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.apache.sling.models.annotations.via.ResourceSuperType;

/**
 * The Class SectionPanelWithNavigation Impl.
 */
@Model(adaptables = { SlingHttpServletRequest.class },
	   adapters = { SectionPanelWithNavigation.class, ComponentExporter.class },
	   resourceType = { SectionPanelWithNavigationImpl.RESOURCE_TYPE },
	   defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
		  extensions = ExporterConstants.SLING_MODEL_EXTENSION)

public class SectionPanelWithNavigationImpl extends ComponentProxyImpl implements SectionPanelWithNavigation {

	protected static final String RESOURCE_TYPE = "abbott-platform/components/content/organism/sectionpanelwithnavigation/v1" + "/sectionpanelwithnavigation";

	@Self
	@Via(type = ResourceSuperType.class)
	@Delegate(types = Container.class)
	@Setter(AccessLevel.NONE)
	@Getter(AccessLevel.NONE)
	private Container container;

	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	private String backgroundImage;

	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	private String backgroundColor;

	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	private boolean sectionTitleRequired;

	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	private String leftImage;

	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	private boolean titleRequired;

	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	private boolean textRequired;

	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	private boolean tileListRequired;

	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	private boolean ctaLinkRequired;

	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	private String altText;


}