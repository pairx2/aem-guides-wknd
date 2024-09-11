package com.abbott.aem.platform.common.components.models.impl.v1;

import com.abbott.aem.platform.common.components.models.SearchResultItem;
import com.abbott.aem.platform.common.constants.CommonConstants;
import com.adobe.cq.export.json.ExporterConstants;
import lombok.*;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

/**
 * The Class SearchResultItemImpl.
 */

@Model(adaptables = { SlingHttpServletRequest.class },
	   adapters = { SearchResultItem.class },
	   resourceType = { CommonConstants.RESOURCE_TYPE_SEARCH_RESULT },
	   defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
		  extensions = ExporterConstants.SLING_MODEL_EXTENSION)

public class SearchResultItemV1Impl implements SearchResultItem {

	/**
	 * The link text.
	 */
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private String linkText;

	/**
	 * The title text.
	 */
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private String titleText;

	/**
	 * The description text.
	 */
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private String descriptionText;

}
