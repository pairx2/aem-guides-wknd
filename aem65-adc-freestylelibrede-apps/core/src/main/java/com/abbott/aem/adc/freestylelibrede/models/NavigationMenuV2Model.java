package com.abbott.aem.adc.freestylelibrede.models;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;

import java.util.List;
import java.util.ArrayList;
import java.util.Collections;
import javax.inject.Inject;
import com.abbott.aem.adc.freestylelibrede.models.injector.annotation.Externalize;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, resourceType = "adc/freestylelibrede/components/content/navigationmenu-v2")
public class NavigationMenuV2Model extends BaseComponentPropertiesImpl{

    @Externalize
    private String homepagePath;

    @Inject
    private String homepagePathLabel;

    @Inject
    private String closeIconText;

    @ChildResource
    private List<NavigationMenuItemModel> menuItems = new ArrayList<>();

    @ChildResource
    private List<BaseCTAModel> menuButtons = new ArrayList<>();

    public String getHomepagePath(){
        return this.homepagePath;
    }

    public String getHomepagePathLabel(){
        return this.homepagePathLabel;
    }

    public String getCloseIconText(){
        return this.closeIconText;
    }

    public List<NavigationMenuItemModel> getMenuItems(){
        return Collections.unmodifiableList(new ArrayList<>(this.menuItems));
    }

    public List<BaseCTAModel> getMenuButtons(){
        return Collections.unmodifiableList(new ArrayList<>(this.menuButtons));
    }

}