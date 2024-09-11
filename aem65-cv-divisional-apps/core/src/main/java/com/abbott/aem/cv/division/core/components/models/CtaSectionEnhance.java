package com.abbott.aem.cv.division.core.components.models;

import com.abbott.aem.platform.common.components.models.CtaSection;
import org.osgi.annotation.versioning.ConsumerType;

@ConsumerType
public interface CtaSectionEnhance extends CtaSection {
    public String getIcon();
    public String getIconColor();
}
