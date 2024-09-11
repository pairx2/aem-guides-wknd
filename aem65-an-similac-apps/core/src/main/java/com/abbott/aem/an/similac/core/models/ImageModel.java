package com.abbott.aem.an.similac.core.models;

import javax.annotation.PostConstruct;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Optional;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

/**
 * 
 * Image Model is the SlingModel to hold the details of individual image
 * component
 * 
 * Version Number: 1.0
 */
@Model(adaptables = SlingHttpServletRequest.class)
public class ImageModel {

	private static final String JCR_CONTENT_RENDITIONS_CQ5DAM_THUMBNAIL_48_48_PNG = "/jcr:content/renditions/cq5dam.thumbnail.48.48.png";

	@SlingObject
	private SlingHttpServletRequest request;

	@ValueMapValue
	@Optional
	private String imgSrc;

	/** The image. */

	String imageBase;

	@PostConstruct
	public void activate() {
		imageBase = imgSrc + JCR_CONTENT_RENDITIONS_CQ5DAM_THUMBNAIL_48_48_PNG;
	}

	public String getImageBase() {
		return imageBase;
	}

}
