package com.abbott.aem.platform.common.components.models.impl.v1;

import lombok.*;

import com.abbott.aem.platform.common.components.models.Button;
import com.adobe.cq.export.json.ExporterConstants;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

/**
 * The Class buttonImpl.
 */
@Model(adaptables = { SlingHttpServletRequest.class },
	   adapters = { Button.class },
	   resourceType = { ButtonImpl.RESOURCE_TYPE },
	   defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
		  extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class ButtonImpl extends LinkImpl implements Button {
	/**
	 * The Constant RESOURCE_TYPE.
	 */
	public static final String RESOURCE_TYPE = "abbott-platform/components/content/atoms/button/v1/button";

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	protected String image;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	protected String altText;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private String buttonType;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private String formButtonType;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private String buttonName;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private boolean disabledButton;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private boolean hideButtonText;

}
