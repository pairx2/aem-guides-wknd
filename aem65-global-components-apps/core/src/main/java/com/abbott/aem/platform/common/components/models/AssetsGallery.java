package com.abbott.aem.platform.common.components.models;

import java.util.List;

import org.osgi.annotation.versioning.ConsumerType;

import com.adobe.cq.wcm.core.components.models.Component;

@ConsumerType
public interface AssetsGallery extends Component {

	public List<AssetsGalleryItem> getProductImageList();

	String getThumbnailPosition();

}