package com.abbott.aem.platform.common.components.models.impl.v1;

import lombok.*;

import com.abbott.aem.platform.common.components.models.FeaturesCard;
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
	   adapters = { FeaturesCard.class },
	   resourceType = { FeaturesCardImpl.RESOURCE_TYPE },
	   defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
		  extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class FeaturesCardImpl extends ComponentProxyImpl implements FeaturesCard {

	public static final String RESOURCE_TYPE = "abbott-platform/components/content/organism/featurescard/v1/featurescard";

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private String largeFormatNumber;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private boolean buttonRequired;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private boolean badgeRequired;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private String featureStyle;

}
