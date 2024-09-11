package com.abbott.aem.platform.common.components.models.impl.v1;

import lombok.Data;

import com.abbott.aem.platform.common.components.models.LinkStackItem;
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
	   adapters = { LinkStackItem.class },
	   defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class LinkStackItemImpl implements LinkStackItem {

	@ValueMapValue
	private String text;

	@ValueMapValue
	private boolean external;

	@ValueMapValue
	private String action;

	@ValueMapValue
	private String link;

	@Override
	public String getLink() {
		return PlatformUtil.ensureProperLink(link);
	}

}
