package com.abbott.aem.platform.common.components.models;

import org.osgi.annotation.versioning.ConsumerType;

@ConsumerType
public interface Spacer {

    String getDesktopPixels();

    String getTabletPixels();

    String getMobilePixels();

}