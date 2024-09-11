package com.abbott.aem.cv.division.core.components.models;

import com.adobe.cq.wcm.core.components.models.Component;
import org.osgi.annotation.versioning.ConsumerType;

@ConsumerType
public interface PoiLocatorResult extends Component{
    public String getDisplayType();

    public String getKmSelection();

}