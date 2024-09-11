package com.abbott.aem.epd.acare.core.models.components.impl;

import javax.inject.Inject;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.abbott.aem.epd.acare.core.models.ExternalUrlModel;
import com.abbott.aem.epd.acare.core.models.components.BodyTextWithTag;
import com.abbott.aem.epd.acare.core.models.components.EmailInfo;
import com.abbott.aem.epd.acare.core.models.components.EmailTag;
import com.adobe.cq.export.json.ExporterConstants;

import lombok.AccessLevel;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Setter;
import lombok.experimental.Delegate;

/**
 * The Class BodyTextWithTagImpl.
 */

@Data
@EqualsAndHashCode(callSuper = false)
@Model(adaptables = { SlingHttpServletRequest.class }, adapters = { BodyTextWithTag.class }, resourceType = {
		BodyTextWithTagImpl.RESOURCE_TYPE }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class BodyTextWithTagImpl implements BodyTextWithTag {

	/** The Constant RESOURCE_TYPE. */
	public static final String RESOURCE_TYPE = "epd/acare/components/email/body-text-with-tag";

	@Self
	@Via
	@Delegate(types = EmailTag.class)
	public EmailTag tag;
	
	  @Self 
	  @Via	  
	  @Delegate(types = EmailInfo.class)
	  public EmailInfo emailInfo;
	 

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	public String text;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	public String nonRichText;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	public String needNonRichText;

	@Inject
	@Self
	public ExternalUrlModel externalizerModel;

	/**
	 * This method returns the text with link configured reforemd with externalized
	 * value
	 * 
	 * @return String text
	 * 
	 * 
	 */
	
	
	@Override
		public String getNeedNonRichText() {
		return needNonRichText;
		}
	 @Override
	
		public String getNonRichText() {
		return nonRichText;
		}
	@Override
	public String getText() {
		String inputText = (null != needNonRichText && needNonRichText.equals("true")) ? this.nonRichText: this.text;
		return externalizerModel.getReformedText(inputText);
	}
	
}
