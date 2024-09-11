package com.abbott.aem.adc.freestylelibrede.models;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

import javax.inject.Inject;


@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL,resourceType = "adc/freestylelibrede/components/content/account/account-overview")
public interface UserGreetModel extends BaseComponentProperties{

	@Inject
	String getMessageMorning();

	@Inject
	String getMessageAfternoon();

	@Inject
	String getMessageEvening();

}
