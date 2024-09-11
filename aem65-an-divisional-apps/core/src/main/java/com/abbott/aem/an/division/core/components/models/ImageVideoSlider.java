package com.abbott.aem.an.division.core.components.models;

import java.util.List;

import org.osgi.annotation.versioning.ConsumerType;

import com.adobe.cq.wcm.core.components.models.Component;

@ConsumerType
public interface ImageVideoSlider extends Component {

	public List<ImageVideoSliderItem> getProductImageList();

	String getThumbnailPosition();
	
}
