package com.abbott.aem.adc.freestylelibrede.models;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import com.abbott.aem.adc.freestylelibrede.models.injector.annotation.Externalize;
import javax.inject.Inject;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public interface CountrySelectorModel {

    @Inject
    String getCountrySelectorTitle();

    @Inject
    String getCountrySelectorLabel();
	
	@Inject
    String getTextlinklabel();
    
    @Externalize
    String getTextlink();

    @Inject
    Resource getCountries();

}
