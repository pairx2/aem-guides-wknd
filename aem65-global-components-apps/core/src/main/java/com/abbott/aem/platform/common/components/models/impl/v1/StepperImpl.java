package com.abbott.aem.platform.common.components.models.impl.v1;

import com.abbott.aem.platform.common.components.models.Stepper;
import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.adobe.cq.wcm.core.components.models.Component;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Delegate;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;


@Model(adaptables = { SlingHttpServletRequest.class }, adapters = { Stepper.class,
		ComponentExporter.class }, resourceType = {
				StepperImpl.RESOURCE_TYPE }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class StepperImpl implements Stepper {

	public static final String RESOURCE_TYPE = "abbott-platform/components/content/atoms/stepper/v1/stepper";

	@ValueMapValue(name = "min")
	@Setter(AccessLevel.NONE)
	@Getter
	private int minVal;

	@ValueMapValue(name = "max")
	@Setter(AccessLevel.NONE)
	@Getter
	private int maxVal;

	@ValueMapValue(name = "default")
	@Setter(AccessLevel.NONE)
	@Getter
	private int defVal;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private String maxErrorMessage;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private String minErrorMessage;

	@Self
	@Delegate(types = Component.class)
	@Setter(AccessLevel.NONE)
	@Getter(AccessLevel.NONE)
	private Component component;

}
