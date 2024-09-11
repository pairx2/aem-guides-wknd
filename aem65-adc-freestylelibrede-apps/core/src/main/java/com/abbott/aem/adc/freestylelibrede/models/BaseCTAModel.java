package com.abbott.aem.adc.freestylelibrede.models;

import com.abbott.aem.adc.freestylelibrede.models.injector.annotation.Externalize;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

import javax.inject.Inject;


@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public interface BaseCTAModel {

    @Inject
    String getText();

    @Inject
    String getType();

    @Externalize
    String getLink();
	
	@Inject
    String getDisclaimer();
	
	@Inject
	String getAssetPath();
	
	@Inject
	String getAction();

    @Inject
    String getNavBtnEvent();
	
}
