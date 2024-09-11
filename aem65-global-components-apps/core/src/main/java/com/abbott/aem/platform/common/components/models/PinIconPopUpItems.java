package com.abbott.aem.platform.common.components.models;

import org.osgi.annotation.versioning.ConsumerType;

import com.adobe.cq.wcm.core.components.models.Component;


@ConsumerType
public interface PinIconPopUpItems extends Component{
    
    String getPinIconPopUpKey();

    String getPinIconPopUpLabel();
}