package com.abbott.aem.adc.freestylelibrede.models;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;

import javax.inject.Inject;
import java.util.List;
import java.util.ArrayList;
import java.util.Collections;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class NavigationMenuItemModel extends BaseComponentPropertiesImpl{

    @Inject
    private String title;

    @Inject
    private String menuItemId;

    @Inject
    private String navItemLinkEvent;

    @ChildResource
    private List<NavigationSubMenuItemModel> subMenuItems;

    public String getTitle(){
        return this.title;
    }

    public String getMenuItemId(){
        return this.menuItemId;
    }

    public String getNavItemLinkEvent(){
        return this.navItemLinkEvent;
    }

    public List<NavigationSubMenuItemModel> getSubMenuItems(){
        return Collections.unmodifiableList(new ArrayList<>(this.subMenuItems));
    }
 
}