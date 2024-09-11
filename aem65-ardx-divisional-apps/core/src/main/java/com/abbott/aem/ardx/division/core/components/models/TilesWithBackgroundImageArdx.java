package com.abbott.aem.ardx.division.core.components.models;

import com.abbott.aem.platform.common.components.models.ImageGlobal;
import com.abbott.aem.platform.common.components.models.TilesWithBackgroundImage;
import org.osgi.annotation.versioning.ConsumerType;

@ConsumerType
public interface TilesWithBackgroundImageArdx extends TilesWithBackgroundImage, ImageGlobal{
    
    public String getHeadingTheme();
    public String getTextHoverColor();
    public String getTextTheme();
    public String getPanelHoverColor();
    
}
