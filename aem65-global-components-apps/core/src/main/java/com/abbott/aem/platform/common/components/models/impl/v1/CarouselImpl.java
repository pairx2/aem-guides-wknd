package com.abbott.aem.platform.common.components.models.impl.v1;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Delegate;

import com.abbott.aem.platform.common.components.models.CustomCarousel;
import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.apache.sling.models.annotations.via.ResourceSuperType;

/**
 * The Class Carousel Impl.
 */
@Model(adaptables = { SlingHttpServletRequest.class },
	   adapters = { CustomCarousel.class, ComponentExporter.class },
	   resourceType = { CarouselImpl.RESOURCE_TYPE },
	   defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
		  extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class CarouselImpl implements CustomCarousel {

	protected static final String RESOURCE_TYPE = "abbott-platform/components/content/organism/carousel/v1/carousel";

	@Self
	@Via(type = ResourceSuperType.class)
	@Delegate(types = com.adobe.cq.wcm.core.components.models.Carousel.class)
	@Setter(AccessLevel.NONE)
	@Getter(AccessLevel.NONE)
	private com.adobe.cq.wcm.core.components.models.Carousel carousel;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private String carouselType;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private Integer cardsPerScreen;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private Integer cardsPerScroll;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private String categoryTag;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private String carouselHeight;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private boolean hideIndicators;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private String iconRight;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private String iconLeft;

}
