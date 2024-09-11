package com.abbott.aem.platform.common.components.models;

public interface AccountNavigationItem {
    String getIcon();

    String getLinkText();

    String getLinkPath();

    String getActionFunction();

    String getCustomerAttr();

    String getActiveCss();

    void setActiveCss(String pagePath);
}
