package com.abbott.aem.platform.common.components.models;

import java.util.List;

import org.osgi.annotation.versioning.ConsumerType;

import com.adobe.cq.wcm.core.components.models.Component;

@ConsumerType
public interface ImageMapWithStickyMenu extends Component{

  public String getSelect();

  public String getVariation();

  public String getMapTitle();

  public String getBackToMap();

  public String getHideStickyMenu();

  public String getViewStoryText();

  public String getIconColor();

  public List<ImageMapWithStickyMenuItem> getContentConfig();
}