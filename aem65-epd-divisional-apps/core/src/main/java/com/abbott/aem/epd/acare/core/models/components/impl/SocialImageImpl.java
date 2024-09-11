package com.abbott.aem.epd.acare.core.models.components.impl;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.abbott.aem.epd.acare.core.models.components.SocialImage;

import lombok.Data;

/**
 *
 * Model used by Footer EMail to create a list of Social Images and Links
 */
@Data
@Model(adaptables = Resource.class, adapters = { SocialImage.class } , defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class SocialImageImpl implements SocialImage {

	@ValueMapValue
	public String socialIcon;
	
	@ValueMapValue
	public String link;
	
	@ValueMapValue
	public String socialAltText;

	@Override
	public String getSocialIcon() {
		return socialIcon;
	}

	@Override
	public void setSocialIcon(String socialIcon) {
		
	

		/**
		 * 
		 * Set the socialIcon alt text.
		 */
}

	@Override
	public String getLink() {
		return link;
	}

	@Override
	public void setLink(String link) {

		/**
		 * 
		 * Set the link .
		 */	

	}

	@Override
	public String getSocialAltText() {
		return socialAltText;
	}

	@Override
	public void setSocialAltText(String socialAltText) {
	
		

		/**
		 * 
		 * Set the socialIcon alt text.
		 */
	}
		
}
