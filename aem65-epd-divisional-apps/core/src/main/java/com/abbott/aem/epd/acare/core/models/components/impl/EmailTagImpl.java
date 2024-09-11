package com.abbott.aem.epd.acare.core.models.components.impl;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.apache.sling.models.annotations.injectorspecific.Self;
import javax.inject.Inject;

import com.abbott.aem.epd.acare.core.models.components.EmailTag;
import com.abbott.aem.epd.acare.core.models.ExternalUrlModel;

import com.adobe.cq.export.json.ExporterConstants;
import com.adobe.cq.sightly.SightlyWCMMode;
import com.day.cq.commons.inherit.HierarchyNodeInheritanceValueMap;
import com.day.cq.commons.inherit.InheritanceValueMap;
import com.day.cq.wcm.api.Page;

import lombok.AccessLevel;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Setter;



/**
 * The Class EmailTagImpl.
 */

@Data
@EqualsAndHashCode(callSuper = false)
@Model(adaptables = { SlingHttpServletRequest.class }, adapters = { EmailTag.class }, resourceType = {
		EmailTagImpl.RESOURCE_TYPE }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class EmailTagImpl implements EmailTag {
	
	/** The Constant RESOURCE_TYPE. */
	public static final String RESOURCE_TYPE = "epd/acare/components/email/email-tag";

	@ScriptVariable
	private Page currentPage;
	
	@ScriptVariable
	private SightlyWCMMode wcmmode;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	public String tagLinkText;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	public String tagLink;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	public String tagIcon;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	public String tagAltText;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	public String textColor;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	public String tagBGColor;
	
	@Inject
	@Self
	private ExternalUrlModel externalizerModel;
	
	/**
	 * This method return the tagImage authored	
	 * @return String - tagImage
	 */
	@Override
	public String getTagIcon() {
		String tagImage;
		InheritanceValueMap ivm = new HierarchyNodeInheritanceValueMap(currentPage.getContentResource());
		String assetDomain = ivm.getInherited("assetDomain", String.class);
		
		if(null !=assetDomain && !assetDomain.isEmpty() && null != this.tagIcon && wcmmode.isDisabled()){
			tagImage = assetDomain + this.tagIcon;
		}
		else{
			tagImage = this.tagIcon;	
		}	
	  return tagImage;
	}

	@Override
	public void setTagIcon(String tagIcon){
		this.tagIcon=tagIcon;
	}
	
	/**
	 * This method return the tag link authored	
	 * @return String - tagLink
	 */
	@Override
	public String getTagLink(){
	  String link = this.tagLink;
	  return externalizerModel.getExternalizedUrl(link);
	}
	@Override
	public void setTagLink(String tagLink){
		this.tagLink=tagLink;
	}

	@Override
	public String getTagLinkText(){
		return tagLinkText;
	}
	@Override
	public void setTagLinkText(String tagLinkText) { this.tagLinkText=tagLinkText; }

	@Override
	public String getTagAltText(){
		return tagAltText;
	}
	@Override
	public void setTagAltText(String tagAltText) { this.tagAltText=tagAltText; }

	@Override
	public String getTextColor(){
		return textColor;
	}

	@Override
	public void setTextColor(String textColor) { this.textColor=textColor; }

	@Override
	public String getTagBGColor(){
		return tagBGColor;
	}

	@Override
	public void setTagBGColor(String tagBGColor) { this.tagBGColor=tagBGColor; }
}