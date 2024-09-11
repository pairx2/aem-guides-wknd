package com.abbott.aem.platform.common.components.models.impl.v1;

import lombok.*;

import com.abbott.aem.platform.common.components.models.NonClickableLink;
import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

/**
 * @author Pawan.Namagiri
 */
@Model(adaptables = { SlingHttpServletRequest.class },
	   adapters = { NonClickableLink.class, ComponentExporter.class },
	   resourceType = { NonClickableLinkImpl.RESOURCE_TYPE },
	   defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
		  extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class NonClickableLinkImpl implements NonClickableLink {

	public static final String RESOURCE_TYPE = "abbott-platform/components/content/atoms/nonclickablelink/v1/nonclickablelink";

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private String text;
}
