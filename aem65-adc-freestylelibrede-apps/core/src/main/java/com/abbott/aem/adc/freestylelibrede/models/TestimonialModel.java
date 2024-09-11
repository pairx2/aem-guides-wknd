package com.abbott.aem.adc.freestylelibrede.models;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

import javax.inject.Inject;
import com.abbott.aem.adc.freestylelibrede.models.injector.annotation.Externalize;


@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, resourceType = "adc/freestylelibrede/components/content/testimonial")
public interface TestimonialModel extends BaseComponentProperties{

	@Inject
	String getTestimonialImage();

	@Inject
	String getTestimonialImageMobile();

	@Inject
	String getTestimonialName();

	@Inject
	String getTestimonialQuote();
	
	@Inject
	String getCtaStyling();
	
	@Inject
	String getCtaText();

	@Externalize
	String getCtaURL();

	@Inject
	String getCtaAction();

	@Inject
	String getTestimonialImageAltText();

}
