package com.abbott.aem.ardx.division.core.components.models;

import org.osgi.annotation.versioning.ConsumerType;

import com.adobe.cq.wcm.core.components.models.Component;

@ConsumerType
public interface HorizontalRule extends Component {

    public String getRuleColor();
    public String getRuleTopMargin();
    public String getRuleBottomMargin();
    public String getRuleThickness();
    public String getMarginCheckBox();
    public String getRuleTopAndBottomMargin();
    
}
