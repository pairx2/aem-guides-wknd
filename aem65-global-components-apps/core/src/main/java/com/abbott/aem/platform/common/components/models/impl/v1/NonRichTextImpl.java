package com.abbott.aem.platform.common.components.models.impl.v1;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.abbott.aem.platform.common.components.models.NonRichText;
import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.adobe.cq.wcm.core.components.models.Component;

import lombok.AccessLevel;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Delegate;

/**
 * This class implements the NonRichText model.
 */
@Model(adaptables = { SlingHttpServletRequest.class },
	   adapters = { NonRichText.class, ComponentExporter.class },
	   resourceType = { NonRichTextImpl.RESOURCE_TYPE },
	   defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
		  extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class NonRichTextImpl implements NonRichText {

	public static final String RESOURCE_TYPE = "abbott-platform/components/email/nonrichtext/v1/nonrichtext";

	/**
	 * Holds the text
	 */
	@Setter(AccessLevel.NONE)
	@ValueMapValue
	@Getter
	private String htmlText;
}
