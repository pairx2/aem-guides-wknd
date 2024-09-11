package com.abbott.aem.cv.division.core.components.models;


import com.adobe.cq.wcm.core.components.models.Component;
import org.osgi.annotation.versioning.ConsumerType;

@ConsumerType
public interface HorizontalRule extends Component{

    public String getRuleColor();
    public String getTopMargin();
    public String getBottomMargin();
}