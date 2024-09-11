package com.abbott.aem.epd.acare.core.models.components.impl;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.abbott.aem.epd.acare.core.models.components.LinkItem;

import lombok.Data;

/**
 *
 * Model used by Footer EMail to create a list of Social Images and Links
 */
@Data
@Model(adaptables = Resource.class, adapters = { LinkItem.class } , defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class LinkItemImpl implements LinkItem {
	
	@ValueMapValue
	public String text;
	
	@ValueMapValue
	public String link;

	@Override
	public String getLink() {
		return link;
	}

		@Override
	public String getText() {
		return text;
	}

		@Override
		public void setLink(String link) {

			/**
			 * 
			 * Set the Link added.
			 */
		}

		@Override
		public void setText(String text) {
			

			/**
			 * 
			 * Set the text
			 */
			
		}

	
	
}
