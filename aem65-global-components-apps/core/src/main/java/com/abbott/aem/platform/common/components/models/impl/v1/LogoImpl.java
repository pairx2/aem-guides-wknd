package com.abbott.aem.platform.common.components.models.impl.v1;

import lombok.*;

import com.abbott.aem.platform.common.components.models.Logo;
import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;


@Model(adaptables = { SlingHttpServletRequest.class },
	   adapters = { Logo.class, ComponentExporter.class },
	   resourceType = { LogoImpl.RESOURCE_TYPE },
	   defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
		  extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class LogoImpl extends LinkImpl implements Logo {

	protected static final String RESOURCE_TYPE = "abbott-platform/components/content/atoms/logo/v1/logo";

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	protected String fileReference;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private String logoAltText;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private String stickyLogoImage;

}