package com.abbott.aem.platform.common.components.models.impl.v1;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Delegate;

import com.abbott.aem.platform.common.components.models.LinkSet;
import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.adobe.cq.wcm.core.components.models.Button;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.apache.sling.models.annotations.via.ResourceSuperType;

@Model(adaptables = { SlingHttpServletRequest.class },
	   adapters = { LinkSet.class, ComponentExporter.class },
	   resourceType = { LinkSetImpl.RESOURCE_TYPE },
	   defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
		  extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class LinkSetImpl implements LinkSet {

	public static final String RESOURCE_TYPE = "abbott-platform/components/content/atoms/linkset/v1/linkset";

	/**
	 * The button.
	 */
	@Self
	@Via(type = ResourceSuperType.class)
	@Delegate(types = Button.class)
	@Setter(AccessLevel.NONE)
	@Getter(AccessLevel.NONE)
	private Button button;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private String subtitle;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private String action;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private boolean external;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private String icon;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private String color;

}