package com.abbott.aem.platform.common.components.models.impl.v1;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;

import com.abbott.aem.platform.common.components.models.TextBanner;
import com.adobe.cq.export.json.ExporterConstants;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

/**
 * The Class TextBannerImpl.
 */


@Model(adaptables = { SlingHttpServletRequest.class },
	   adapters = { TextBanner.class },
	   resourceType = { TextBannerImpl.RESOURCE_TYPE },
	   defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
		  extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class TextBannerImpl implements TextBanner {

	/**
	 * The Constant RESOURCE_TYPE.
	 */
	public static final String RESOURCE_TYPE = "abbott-platform/components/content/atoms/text-banner/v1/text-banner";

	
	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	private String bannerTitle;

	
	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	private String id;
	
	
	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	private String startColor;
	
	
	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	private String startColorPosition;
	
	
	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	private String endColor;
	
	
	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	private String endColorPosition;


}
