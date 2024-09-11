package com.abbott.aem.platform.common.components.models.navigation.impl.v1;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;
import lombok.experimental.Delegate;

import com.abbott.aem.platform.common.components.models.navigation.MegaMenuContainer;
import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ContainerExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.adobe.cq.wcm.core.components.models.Component;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@EqualsAndHashCode
@ToString
@Model(adaptables = { SlingHttpServletRequest.class },
	   adapters = { MegaMenuContainer.class, ComponentExporter.class, ContainerExporter.class },
	   resourceType = { MegaMenuContainerImpl.RESOURCE_TYPE },
	   defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
		  extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class MegaMenuContainerImpl implements MegaMenuContainer {

	public static final String RT_VERSIONS_V1 = "abbott-platform/components/content/molecules/megamenu/v1/megamenuversions";
	public static final String PN_DESIGN_ALLOWED_VERSIONS = "allowedVersions";
	protected static final String RESOURCE_TYPE = "abbott-platform/components/content/molecules/megamenu/v1/megamenu";
	@Self
	@Delegate(types = Component.class)
	private Component component;

	@Getter
	@ValueMapValue
	private String accessibilityLabel;

}