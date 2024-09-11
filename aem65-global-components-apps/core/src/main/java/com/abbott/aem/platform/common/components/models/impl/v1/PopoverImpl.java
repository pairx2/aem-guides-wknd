package com.abbott.aem.platform.common.components.models.impl.v1;

import lombok.*;

import com.abbott.aem.platform.common.components.models.Popover;
import com.adobe.cq.export.json.ExporterConstants;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

/**
 * The Class PopoverImpl.
 */
@Model(adaptables = { SlingHttpServletRequest.class },
	   adapters = { Popover.class },
	   resourceType = { PopoverImpl.RESOURCE_TYPE },
	   defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
		  extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class PopoverImpl extends ComponentProxyImpl implements Popover {
	/**
	 * The Constant RESOURCE_TYPE.
	 */
	public static final String RESOURCE_TYPE = "abbott-platform/components/content/molecules/popover/v1/popover";

	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	private String image;

	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	private String altText;

	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	private String title;

	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	private String content;

	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	private boolean linkCheck;

	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	private String position;

}