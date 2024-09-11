package com.abbott.aem.adc.freestylelibrede.models;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import javax.inject.Inject;
import com.abbott.aem.adc.freestylelibrede.models.injector.annotation.Externalize;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class LinksHeaderModel extends BaseComponentPropertiesImpl{

    @Inject
    String desktopImagePath;

    @Inject
    String mobileImagePath;

    @Inject
    String imageAlt;

    @Inject
    String serviceNumber;

    @Externalize
    String link;

    @Inject
    String openTab;

    @Inject
    String imageLabel;

    @Inject
    String miniCart;

    @Inject
    String headerLinkEvent;

    public String getDesktopImagePath(){
        return this.desktopImagePath;
    }

    public String getMobileImagePath(){
        return this.mobileImagePath;
    }

    public String getImageAlt(){
        return this.imageAlt;
    }

    public String getServiceNumber(){
        return this.serviceNumber;
    }

    public String getLink(){
        return this.link;
    }

    public String getOpenTab(){
        return this.openTab;
    }

    public String getImageLabel(){
        return this.imageLabel;
    }

    public String getMiniCart(){
        return this.miniCart;
    }

    public String getHeaderLinkEvent(){
        return this.headerLinkEvent;
    }
 
}