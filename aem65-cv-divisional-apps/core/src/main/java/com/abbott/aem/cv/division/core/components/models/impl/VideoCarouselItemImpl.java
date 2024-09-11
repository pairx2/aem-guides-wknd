package com.abbott.aem.cv.division.core.components.models.impl;

import com.abbott.aem.cv.division.core.components.models.VideoCarouselItem;
import com.day.cq.dam.api.Asset;
import com.day.cq.dam.commons.util.DamUtil;
import com.day.cq.dam.api.DamConstants;
import lombok.*;
import javax.annotation.PostConstruct;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

/**
 * Model used by VideoCarousel to create a list 
 */
@Model(adaptables = Resource.class,
adapters = { VideoCarouselItem .class },
defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class VideoCarouselItemImpl implements VideoCarouselItem {

	@ValueMapValue
	@Getter
	private String videoType;

	@ValueMapValue
	@Getter
	private String orgID;

	@ValueMapValue
	@Getter
	private String mediaID;

	@ValueMapValue
	@Getter
	private String limelightPlayerID;

	@ValueMapValue
	@Getter
	private String videoURL;

	@ValueMapValue
	@Getter
	private String videoCarouselAccountID;

	@ValueMapValue
	@Getter
	private String videoCarouselBrightVideoID;

	@ValueMapValue
	@Getter
	private String videoCarouselBrightPlayerID;

	@ValueMapValue
	@Getter
	@Setter
	private String chapterImage;

	@ValueMapValue
	@Getter
	private String altText;
	
	@ValueMapValue
	@Getter
	private String isDecorative;

	@ValueMapValue
	@Getter
	private String chapterTitle;

	@ValueMapValue
	@Getter
	private String altValueFromDAM;

	@ValueMapValue
	@Getter
	private String alt;

	@ValueMapValue
	@Getter
	private String chapterDescription;
	
	@ValueMapValue
	@Getter
	private String uniqueId;
	

	public void setAltText(String altText) {
		this.altText = altText;
	}

	@SlingObject
	private Resource resource;

	@SlingObject
	private ResourceResolver resourceResolver;

	@PostConstruct
	protected void init() {
		this.imagetitle();
	}
	// For dynamically fetching DAM image title property
	public void imagetitle() {
		if (null != chapterImage) {
			Resource assetResource = resourceResolver.getResource(chapterImage);
			if (null != assetResource) {
				Asset asset = DamUtil.resolveToAsset(assetResource);
				if (null != asset && null != asset.getMetadataValue(DamConstants.DC_TITLE)) {
                      setAltText(asset.getMetadataValue(DamConstants.DC_TITLE));
				}
			}
		}
	}		
}
