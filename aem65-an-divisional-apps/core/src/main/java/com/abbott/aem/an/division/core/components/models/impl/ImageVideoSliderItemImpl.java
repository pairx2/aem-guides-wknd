package com.abbott.aem.an.division.core.components.models.impl;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.abbott.aem.an.division.core.components.models.ImageVideoSliderItem;
import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.AccessLevel;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Setter;

@Data
@EqualsAndHashCode(callSuper = false)
@Model(adaptables = Resource.class, adapters = ImageVideoSliderItem.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ImageVideoSliderItemImpl implements ImageVideoSliderItem {

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Default(values = StringUtils.EMPTY)
	private String largeImage;

	@ValueMapValue
	private String smallImage;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String assetType;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Default(values = StringUtils.EMPTY)
	private String altText;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String videoUrl;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String videoTitle;

	@Override
	public String getSmallImage() {
		return smallImage != null ? smallImage : getLargeImage();
	}

	@Override
	public String getLargeImage() {	
		return largeImage;
	}

	@Override
	public String getAltText() {
		return altText;
	}

	@Override
	public String getAssetType() {
		return assetType;
	}

	@Override
	public String getVideoUrl() {
		return videoUrl;
	}
	
	@Override
	public String getVideoTitle() {
		return videoTitle;
	}

}