package com.abbott.aem.cv.division.core.components.models;

import com.abbott.aem.platform.common.components.models.Container;
import org.osgi.annotation.versioning.ConsumerType;

@ConsumerType
public interface ContainerEnhance extends Container {
    public String getBackgroundMobileImageReference();
    public String getImageDisplayOptions();
}
