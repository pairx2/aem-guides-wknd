package com.abbott.aem.cv.division.core.components.models;

import com.adobe.cq.wcm.core.components.models.Component;
import org.osgi.annotation.versioning.ConsumerType;

@ConsumerType
public interface Button extends Component {

    public String getButtonType();
    public String getButtonText();
    public String getButtonColor();
    public String getUrlLink();
    public String getTargetNewWindow();
    public String getAnchorName();
    public String getPlayerId(); 
    public String getMediaId(); 
    public String getVideoId(); 
    public String getPhoneNumber();
    public String getAssetLink();
    
    public String getAccountID();
    public String getBrightVideoID();
    public String getBrightPlayerID();

}