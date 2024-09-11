package com.abbott.aem.cv.division.core.components.models;


import com.adobe.cq.wcm.core.components.models.LayoutContainer;
import org.osgi.annotation.versioning.ConsumerType;

@ConsumerType
public interface AnimationContainer extends LayoutContainer {
    public String getDirection();
    public String getSpeed();
    public String getDuration();
    public String getDelay();
}
