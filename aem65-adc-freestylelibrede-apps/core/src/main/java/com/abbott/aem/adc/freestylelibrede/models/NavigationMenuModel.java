package com.abbott.aem.adc.freestylelibrede.models;

import java.util.List;

import javax.inject.Inject;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.via.ChildResource;

import com.abbott.aem.adc.freestylelibrede.models.injector.annotation.Externalize;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public interface NavigationMenuModel {
	@Inject
    @Via(type = ChildResource.class)
    List<NavList> getMobileNavList();


    @Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
    interface NavList {

        @Inject
        String getSideNavIcon();

        @Inject
        String getSideNavImageAlt();
        
        @Inject
        String getSideNavLabel();
        
        @Externalize
        String getSideNavLink();  
        
        @Inject
        String getLinkAction();
        
        @Inject
    	Boolean getCountrySelectorXF();
        
        @Inject
        String getButtonType();
        
        @Inject
        String getSideNavButtonLabel();
        
        @Externalize
        String getButtonNavLink();
        
        @Inject
        String getButtonLinkAction();
       
    }
}