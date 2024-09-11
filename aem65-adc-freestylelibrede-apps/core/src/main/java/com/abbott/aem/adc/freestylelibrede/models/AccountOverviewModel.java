package com.abbott.aem.adc.freestylelibrede.models;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

import javax.inject.Inject;
import javax.inject.Named;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class AccountOverviewModel {

    @Inject
    @Named("cq:panelTitle")
    private String title;

    @Inject
    @Named("iconClass")
    private String iconClass;

    @Inject
    @Named("accountNavEvent")
    private String accountNavEvent;


    public String getTitle(){
        return  this.title;
    }

    public String getIconClass(){
        return  this.iconClass;
    }

    public String getAccountNavEvent(){
        return this.accountNavEvent;
    }


    public String getCreatedId(){
    	
    	String titleId = getTitle();
    	
    	if(titleId != null) {
    		titleId = titleId.replace("ü","ue");
    	}
    	
        return titleId == null ? "" : titleId.toLowerCase().replace(" ", "_").replace("[^a-zA-Z0-9_]", "");
    }
}