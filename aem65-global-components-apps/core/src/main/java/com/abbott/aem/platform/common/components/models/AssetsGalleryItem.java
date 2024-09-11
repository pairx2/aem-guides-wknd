package com.abbott.aem.platform.common.components.models;

import org.osgi.annotation.versioning.ConsumerType;

@ConsumerType
public interface AssetsGalleryItem {

	String getWistiaID();

	String getLargeImage();

	String getSmallImage();

	String getAltText();

	String getAssetType();

	String getVideoDocumentNumber();

}