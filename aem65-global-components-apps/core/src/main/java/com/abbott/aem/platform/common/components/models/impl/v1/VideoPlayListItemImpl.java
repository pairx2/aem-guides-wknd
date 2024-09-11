package com.abbott.aem.platform.common.components.models.impl.v1;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.abbott.aem.platform.common.components.models.VideoPlayListItem;

import lombok.AccessLevel;
import lombok.Data;
import lombok.Setter;

@Data
@Model(adaptables = Resource.class, adapters = {
		VideoPlayListItem.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)

public class VideoPlayListItemImpl implements VideoPlayListItem {
	public static final String RESOURCE_TYPE = "abbott-platform/components/content/molecules/videoplaylist/v1/videoplaylist";

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String title;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String wistiaId;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String videoSrc;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String videoText;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String buttonText;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String buttonLink;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String iconImage;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String videoDocumentNumber;

	@Override
	public String getTitle() {

		return title;
	}

	@Override
	public String getWistiaId() {

		return wistiaId;
	}

	@Override
	public String getVideoSrc() {

		return videoSrc;
	}

	@Override
	public String getVideoText() {
		return videoText;
	}

	@Override
	public String getButtonText() {
		return buttonText;
	}

	@Override
	public String getButtonLink() {
		return buttonLink;
	}

	@Override
	public String getIconImage() {
		return iconImage;
	}

	@Override
	public String getVideoDocumentNumber() {
		return videoDocumentNumber;
	}

}
