package com.abbott.aem.platform.common.components.models;

import org.osgi.annotation.versioning.ConsumerType;

/**
 * Model used by ImageMapwithStickymenuImpl to create a list of content
 */

@ConsumerType
public interface ImageMapWithStickyMenuItem {

    String getPosition();

    String getStoryId();

    String getStoryTitle();

    String getStoryTitleDropdown();

    String getStoryTagline();

    String getStoryIcon();

}
