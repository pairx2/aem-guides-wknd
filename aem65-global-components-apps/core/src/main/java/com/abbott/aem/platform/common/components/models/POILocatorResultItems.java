package com.abbott.aem.platform.common.components.models;

import org.osgi.annotation.versioning.ConsumerType;

import com.adobe.cq.wcm.core.components.models.Component;

@ConsumerType
public interface POILocatorResultItems extends Component {

    String getResultKey();

    String getResultLabel();
    
}
