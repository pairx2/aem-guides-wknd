package com.abbott.aem.cv.division.core.components.models;

import org.osgi.annotation.versioning.ConsumerType;
import com.adobe.cq.wcm.core.components.models.Component;

@ConsumerType
public interface GatewayBanneritem extends Component{
    
    public String getPanelEyeBrow();

    public String getPanelTitle();

    public String getPanelDescription();

    public String getDisplayPanelDescriptionOnMobile();

    public String getCta();

    public String getUrlLink();

    public String getTargetNewWindow();

    public String getAnchorID();

    public String getMediaId();

    public String getPlayerId();

    public String getVideoId();
    public String getAssetURL();
    public String getPhoneNumber();
}