package com.abbott.aem.platform.common.components.models.impl.v1;

import lombok.*;

import com.abbott.aem.platform.common.components.models.Switcher;
import com.adobe.cq.export.json.ExporterConstants;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

/**
 * The Class SwitcherModelImpl.
 */

@Model(adaptables = { SlingHttpServletRequest.class },
	   adapters = { Switcher.class },
	   resourceType = { SwitcherImpl.RESOURCE_TYPE },
	   defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
		  extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class SwitcherImpl implements Switcher {

	/**
	 * The Constant RESOURCE_TYPE.
	 */
	protected static final String RESOURCE_TYPE = "abbott-platform/components/content/atoms/switcher/v1/switcher";

	/**
	 * The off label.
	 */
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private String offLabel;

	/**
	 * The on label.
	 */
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private String onLabel;

	/**
	 * The default state.
	 */
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private String defaultState;

}