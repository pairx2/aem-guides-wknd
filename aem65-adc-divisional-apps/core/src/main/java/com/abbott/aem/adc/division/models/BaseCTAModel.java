package com.abbott.aem.adc.division.models;

import com.abbott.aem.adc.division.models.injector.annotation.Externalize;
import lombok.Getter;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

import javax.inject.Inject;


@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class BaseCTAModel {

    @Getter
    @Inject
    String text;

  @Getter
    @Inject
    String type;

  @Getter
    @Externalize
    String link;

  @Getter
	@Inject
    String disclaimer;

  @Getter
	@Inject
	String assetPath;

  @Getter
	@Inject
	String action;

}
