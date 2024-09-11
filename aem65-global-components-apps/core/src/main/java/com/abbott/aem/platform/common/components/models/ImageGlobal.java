package com.abbott.aem.platform.common.components.models;

import org.osgi.annotation.versioning.ConsumerType;

import com.adobe.cq.wcm.core.components.models.Image;

@ConsumerType
public interface ImageGlobal extends Image {

    public String getTabletImage();
    public String getMobileImage();
    
}
