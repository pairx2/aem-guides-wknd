package com.abbott.aem.platform.common.components.models.impl.v1;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.abbott.aem.platform.common.components.models.LegendListItem;

import lombok.Data;

@Data
@Model(adaptables = Resource.class, adapters = {
		LegendListItem.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class LegendListItemImpl implements LegendListItem {

	@ValueMapValue
	private String legendColor;

	@ValueMapValue
	private String legendText;

	@Override
	public String getLegendColor() {
		return legendColor;
	}

	@Override
	public String getLegendText() {
		return legendText;
	}

}
