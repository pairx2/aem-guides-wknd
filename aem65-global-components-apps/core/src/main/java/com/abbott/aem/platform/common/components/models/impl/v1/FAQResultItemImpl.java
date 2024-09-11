package com.abbott.aem.platform.common.components.models.impl.v1;

import lombok.*;

import com.abbott.aem.platform.common.components.models.FAQResultItem;
import com.adobe.cq.export.json.ExporterConstants;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

/**
 * The Class FAQResultItemImpl.
 */
@Model(adaptables = { SlingHttpServletRequest.class },
	   adapters = { FAQResultItem.class },
	   resourceType = { FAQResultItemImpl.RESOURCE_TYPE },
	   defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
		  extensions = ExporterConstants.SLING_MODEL_EXTENSION)

public class FAQResultItemImpl implements FAQResultItem {

	/**
	 * The Constant RESOURCE_TYPE.
	 */
	protected static final String RESOURCE_TYPE = "abbott-platform/components/content/molecules/faqresultitem/v1/faqresultitem";

	/**
	 * The question text.
	 */
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private String questionText;

	/**
	 * The answer text.
	 */
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private String answerText;

}
