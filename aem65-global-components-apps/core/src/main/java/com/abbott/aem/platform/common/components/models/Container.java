package com.abbott.aem.platform.common.components.models;

import com.adobe.cq.wcm.core.components.models.LayoutContainer;

import org.osgi.annotation.versioning.ConsumerType;

@ConsumerType
public interface Container extends LayoutContainer {

	default String getBackgroundImageReference(){
		throw new UnsupportedOperationException();
	}
	
	default boolean isDecorative() {
		throw new UnsupportedOperationException();
	}
	
	default String getAlt() {
		throw new UnsupportedOperationException();
	}
	
	default boolean isHideImgOnMobile() {
		throw new UnsupportedOperationException();
	}
	
	default String getStartColor() {
		throw new UnsupportedOperationException();
	}
	
	default String getStartColorPosition() {
		throw new UnsupportedOperationException();
	}
	
	default String getEndColor() {
		throw new UnsupportedOperationException();
	}
	
	default String getEndColorPosition() {
		throw new UnsupportedOperationException();
	}

}