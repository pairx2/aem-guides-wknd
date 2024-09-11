package com.abbott.aem.ardx.division.core.components.models;

import org.osgi.annotation.versioning.ConsumerType;

import com.adobe.cq.wcm.core.components.models.Component;

@ConsumerType
public interface TextImage extends Component {

    public String getImageAsset();

    public String getTabletImage();

    public String getMobileImage();
    
    public String getNoWrapUpText();
    
    public String getDecorative();

    public String getAltText();
    
    public String getImageTitle();

    public String getImageCta();
	
	public String getExternal();

    public String getTargetUrl();

    public String getTargetUrlNewWindow();

    public String getText();
    
    public String getFullScreenPopup();
    
    public String getImagePlacement();
    
    public String getImageAlignment();
    
    public String getFullWidthImage();
 
}