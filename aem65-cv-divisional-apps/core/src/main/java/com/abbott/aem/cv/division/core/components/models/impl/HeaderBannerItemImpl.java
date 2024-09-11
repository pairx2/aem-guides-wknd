package com.abbott.aem.cv.division.core.components.models.impl;


import com.abbott.aem.cv.division.core.components.models.Button;
import com.abbott.aem.cv.division.core.components.models.HeaderBannerItem;

import lombok.Getter;
import lombok.AccessLevel;
import lombok.Setter;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;


import java.util.List;



/**
 * Model used by HeaderBanner to create a list of img
 */
@Model(adaptables = Resource.class,
	   adapters = { HeaderBannerItem.class },
	   defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class HeaderBannerItemImpl implements HeaderBannerItem {
	
	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	public String imageFileReference;

	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	public String decorative;
	
	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	public String altText;

	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	public String title;
	
	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	public String titleTag;
	
	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	public String titleColor;
	
	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	public String subtitle;
	
	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	public String subtitleTag;
		
	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	public String subtitleColor;

	
	@ChildResource
	@Getter
    @Setter(AccessLevel.NONE)
    public List<Button> buttonlist;

	@Override
	public List<Button> getButtonList() {
		return buttonlist;
	}
}