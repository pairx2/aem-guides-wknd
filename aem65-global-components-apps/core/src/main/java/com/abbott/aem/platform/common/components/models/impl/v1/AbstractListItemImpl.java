package com.abbott.aem.platform.common.components.models.impl.v1;

import com.abbott.aem.platform.common.components.models.AbstractListItem;
import lombok.Getter;
import lombok.Setter;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

/**
 * Model used by AbstractList to create a list of Items
 */

@Model(adaptables = Resource.class,
	   adapters = { AbstractListItem.class },
	   defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class AbstractListItemImpl implements AbstractListItem {

	@ValueMapValue
	@Setter
	@Getter
	private String title;

	@ValueMapValue
	@Setter
	@Getter
	private String value;

}
