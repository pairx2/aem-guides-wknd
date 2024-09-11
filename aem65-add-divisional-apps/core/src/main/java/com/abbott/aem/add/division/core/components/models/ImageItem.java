package com.abbott.aem.add.division.core.components.models;

import org.osgi.annotation.versioning.ConsumerType;

/**
 * Model used by Productgallery to create a list of images
 */

@ConsumerType
public interface ImageItem {	
	
	public String getAlt();
	
	public String getFileReference();
	
	//For Probe info and order info
	
	public String getLookupService();
	
	
	
	
}
