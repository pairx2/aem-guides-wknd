package com.abbott.aem.add.division.core.components.models;

import java.util.List;

import com.adobe.cq.wcm.core.components.models.Component;

import org.osgi.annotation.versioning.ConsumerType;

@ConsumerType
public interface ProductGallery extends Component {
	
	public List<ImageItem> getImageLists() ;
	
	public List<ImageItem> getProductLists();
	
	public String getId() ;
	
	public String getComponentType();

	public String getImagePath();
	
	

}
