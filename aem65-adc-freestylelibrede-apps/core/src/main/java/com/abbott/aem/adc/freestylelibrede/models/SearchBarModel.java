package com.abbott.aem.adc.freestylelibrede.models;

import com.abbott.aem.adc.freestylelibrede.models.injector.annotation.Externalize;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

import javax.inject.Inject;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, resourceType = "adc/freestylelibrede/components/content/search-bar")
public interface SearchBarModel extends BaseComponentProperties {

	@Inject
	String getShowAllStyle();

	@Externalize
	String getResultPage();

	@Inject
	int getNrOfResults();

	@Inject
	int getNrOfViewMore();
	
	@Inject
	String getTopFaqLabel();

	@Externalize
	String getFaqPagePath();
}
