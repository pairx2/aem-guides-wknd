package com.abbott.aem.cv.division.core.components.models;

import org.osgi.annotation.versioning.ConsumerType;

import com.adobe.cq.wcm.core.components.models.Component;
@ConsumerType
public interface EducationTraining extends Component {

    public String getPathField();
    public String getWidth();
    public String getHeight();

}