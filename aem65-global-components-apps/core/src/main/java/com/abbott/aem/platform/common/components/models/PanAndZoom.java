package com.abbott.aem.platform.common.components.models;

import org.osgi.annotation.versioning.ConsumerType;

import com.adobe.cq.wcm.core.components.models.Image;

@ConsumerType
public interface PanAndZoom extends Image{ 

default boolean  isTopMargin() {
	throw new UnsupportedOperationException();
}
default boolean  isBottomMargin() {
	throw new UnsupportedOperationException();
}

default String getCaptionPlacement() {
	throw new UnsupportedOperationException();
}
default String getCaptionAlignment() {
	throw new UnsupportedOperationException();
}
default String getImageAlignment() {
	throw new UnsupportedOperationException();
}
default boolean  isDisplayOriginalImage(){
    throw new UnsupportedOperationException();
}
default boolean  isDisplayPopupTitle(){
    throw new UnsupportedOperationException();
}

default String getZoomIn(){
    throw new UnsupportedOperationException();
}

default String getZoomOut(){
    throw new UnsupportedOperationException();
}

}