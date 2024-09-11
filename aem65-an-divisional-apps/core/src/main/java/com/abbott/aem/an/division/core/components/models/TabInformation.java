package com.abbott.aem.an.division.core.components.models;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import lombok.AccessLevel;
import lombok.Data;
import lombok.Setter;

@Data
@Model(adaptables = { Resource.class }, adapters = {
		TabInformation.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class TabInformation {

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String tabName;

	public String getTabName() {
		return tabName;
	}	
}
