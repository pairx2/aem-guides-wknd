package com.abbott.aem.adc.freestylelibrede.models;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import javax.inject.Inject;
import com.abbott.aem.adc.freestylelibrede.models.injector.annotation.Externalize;
@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class NavigationSubMenuItemModel extends BaseComponentPropertiesImpl{

    @Inject
    private String title;

    @Inject
    private String description;

    @Inject 
    String iconPath;

    @Externalize
    String link;

    @Inject 
    String linkAction;

    @Inject
    String subNavItemLinkEvent;

    public String getTitle(){
        return this.title;
    }  

    public String getDescription(){
        return this.description;
    }

    public String getIconPath(){
        return this.iconPath;
    }

    public String getLink(){
        return this.link;
    }

    public String getLinkAction(){
        return this.linkAction;
    }

    public String getSubNavItemLinkEvent(){
        return this.subNavItemLinkEvent;
    }
 
}