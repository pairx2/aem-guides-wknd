package com.abbott.aem.platform.common.components.models.impl.v1;

import lombok.Data;

import com.abbott.aem.platform.common.components.models.CustomTextItem;
import com.abbott.aem.platform.common.components.models.utils.PlatformUtil;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

/**
 * Model used by LinkStack to create a list of Links
 */
@Data
@Model(adaptables = Resource.class,
	   adapters = { CustomTextItem.class },
	   defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class CustomTextItemImpl implements CustomTextItem {

	@ValueMapValue
	private String text;

	@ValueMapValue
	private String listText;

	@ValueMapValue
	private boolean external;

	@ValueMapValue
	private String link;

	@ValueMapValue
	private String icon;

	@ValueMapValue
	private boolean redirectConfirm;

	@Override
	public String getLink() {
		if (link != null) {
			link = PlatformUtil.ensureProperLink(link);
		}
		return link;
	}

}
