package com.abbott.aem.add.division.core.components.models.impl;


import lombok.Data;
import com.abbott.aem.add.division.core.components.models.ImageItem;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

/**
 * Model used by LinkStack to create a list of Links
 */
@Data
@Model(adaptables = Resource.class,
	   adapters = { ImageItem.class },
	   defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class ImageItemImpl implements ImageItem {
	
	@ValueMapValue
	private String alt;
	
	@ValueMapValue	
	private String fileReference;	
	
	@ValueMapValue	
	private String lookupService;

	@Override
	public String getAlt() {
		return alt;
	}

	@Override
	public String getFileReference() {
		return fileReference;
	}

	@Override
	public String getLookupService() {
		return lookupService;
	}	
	
}
