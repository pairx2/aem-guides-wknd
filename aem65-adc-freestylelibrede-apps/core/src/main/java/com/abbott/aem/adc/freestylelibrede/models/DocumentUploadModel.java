package com.abbott.aem.adc.freestylelibrede.models;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

import javax.inject.Inject;
import com.abbott.aem.adc.freestylelibrede.models.injector.annotation.Externalize;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, resourceType = "adc/freestylelibrede/components/content/account/document-upload")
public interface DocumentUploadModel extends BaseComponentProperties{
	@Inject
	String getHeading();
	@Inject
	String getHealthHelpText();
	@Inject
	String getHealthStyle();
	@Inject
	String getReaderInformation();
	@Inject
	String getDndLabel();
	@Inject
	String getUploadLabel();
	@Inject
	String getExemptionStyle();
	@Inject
	String getUploadStyle();
	@Inject
	String getUploadMoreStyle();
	@Inject
	String getSubmitStyle();
	@Inject
	String getHealthCtaText();
	@Inject
	String getSubmitStyleCtaText();
	@Inject
	String getUploadMoreCtaText();
	@Inject
	String getUploadCtaText();
	@Inject
	String getExemptionCtaText();
	@Externalize
	String getHealthCtaLink();
	@Externalize
	String getExemptionCtaLink();
	@Externalize
	String getUploadCtaLink();
	@Externalize
	String getUploadMoreCtaLink();
	@Externalize
	String getSubmitCtaLink();
}
