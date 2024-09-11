package com.abbott.aem.ardx.division.core.components.models;

import com.abbott.aem.platform.common.components.models.CustomTabs;
import org.osgi.annotation.versioning.ConsumerType;

@ConsumerType
public interface TabsArdx extends CustomTabs{
    
    public String getTabBgColor();
    public String getActiveTabColor();
    public String getTabFontColor();
    public String getActiveTabFontColor();
    
}
