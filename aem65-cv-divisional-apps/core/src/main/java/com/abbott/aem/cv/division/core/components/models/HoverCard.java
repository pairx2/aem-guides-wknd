package com.abbott.aem.cv.division.core.components.models;

import com.abbott.aem.platform.common.components.models.Cards;
import org.osgi.annotation.versioning.ConsumerType;

@ConsumerType
public interface HoverCard extends Cards {
    public String getHoverTextTitle();
    public String getHoverTextDescription();
}