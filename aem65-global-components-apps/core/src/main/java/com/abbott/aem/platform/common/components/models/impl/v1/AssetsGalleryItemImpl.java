package com.abbott.aem.platform.common.components.models.impl.v1;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.abbott.aem.platform.common.components.models.AssetsGalleryItem;
import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.AccessLevel;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Setter;

@Data
@EqualsAndHashCode(callSuper = false)
@Model(adaptables = Resource.class, adapters = AssetsGalleryItem.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class AssetsGalleryItemImpl implements AssetsGalleryItem {

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Default(values = StringUtils.EMPTY)
	private String wistiaID;

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
	private String videoDocumentNumber;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Default(values = StringUtils.EMPTY)
	private String altText;

	@Override
	public String getSmallImage() {
		return smallImage != null ? smallImage : getLargeImage();
	}

}
