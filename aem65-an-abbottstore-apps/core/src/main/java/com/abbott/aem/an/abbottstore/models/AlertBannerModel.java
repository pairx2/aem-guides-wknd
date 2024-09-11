package com.abbott.aem.an.abbottstore.models;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adaptables = {Resource.class}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class AlertBannerModel extends UrlServiceModel {

    public static final String RESOURCE_TYPE = "abbott/components/content/alertbanner/v1/alertbanner";

    /**
     * The alert icon.
     **/
    @ValueMapValue
    private String icon;

    /**
     * The alert message
     **/
    @ValueMapValue
    private String alertMessage;

    /* The display text */
    @ValueMapValue
    private String displayText;

    /* The button text */
    @ValueMapValue
    private String buttonText;

    /* The collapse text */
    @ValueMapValue
    private String collapseText;

    /* The expand text */
    @ValueMapValue
    private String expandText;

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public String getAlertMessage() {
        return alertMessage;
    }

    public void setAlertMessage(String alertMessage) {
        this.alertMessage = alertMessage;
    }

    public String getDisplayText() {
        return displayText;
    }

    public void setDisplayText(String displayText) {
        this.displayText = displayText;
    }

    public String getButtonText() {
        return buttonText;
    }

    public void setButtonText(String buttonText) {
        this.buttonText = buttonText;
    }

    public String getCollapseText() {
        return collapseText;
    }

    public void setCollapseText(String collapseText) {
        this.collapseText = collapseText;
    }

    public String getExpandText() {
        return expandText;
    }

    public void setExpandText(String expandText) {
        this.expandText = expandText;
    }
}
