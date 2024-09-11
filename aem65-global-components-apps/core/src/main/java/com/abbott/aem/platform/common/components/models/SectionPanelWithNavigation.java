package com.abbott.aem.platform.common.components.models;
import com.adobe.cq.wcm.core.components.models.Container;

import org.osgi.annotation.versioning.ConsumerType;

@ConsumerType
public interface SectionPanelWithNavigation extends Container{

	String getBackgroundImage();

	String getBackgroundColor();

	boolean isSectionTitleRequired();

	String getLeftImage();

	boolean isTitleRequired();

	boolean isTextRequired();

	boolean isTileListRequired();

	boolean isCtaLinkRequired();

	String getAltText();


}