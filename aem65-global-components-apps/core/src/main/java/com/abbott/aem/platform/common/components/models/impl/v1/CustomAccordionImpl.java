package com.abbott.aem.platform.common.components.models.impl.v1;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Delegate;

import com.abbott.aem.platform.common.components.models.CustomAccordion;
import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.adobe.cq.wcm.core.components.models.Accordion;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.apache.sling.models.annotations.via.ResourceSuperType;

/**
 * @author Pawan.Namagiri
 */

@Model(adaptables = { SlingHttpServletRequest.class },
	   adapters = { CustomAccordion.class, ComponentExporter.class },
	   resourceType = { CustomAccordionImpl.RESOURCE_TYPE },
	   defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
		  extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class CustomAccordionImpl implements CustomAccordion {

	/**
	 * The constant RESOURCE_TYPE.
	 */
	public static final String RESOURCE_TYPE = "abbott-platform/components/content/molecules/accordion/v1/accordion";

	@Self
	@Via(type = ResourceSuperType.class)
	@Delegate(types = Accordion.class)
	@Setter(AccessLevel.NONE)
	@Getter(AccessLevel.NONE)
	private Accordion accordion;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private String collapseTitle;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private String expandTitle;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private String iconExpand;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private String iconCollapse;

}
