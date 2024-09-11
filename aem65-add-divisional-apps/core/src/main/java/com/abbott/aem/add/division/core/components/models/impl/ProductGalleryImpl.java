package com.abbott.aem.add.division.core.components.models.impl;

import java.util.ArrayList;
import java.util.List;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.abbott.aem.add.division.core.components.models.ImageItem;
import com.abbott.aem.add.division.core.components.models.ProductGallery;
import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;

import lombok.AccessLevel;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Setter;

/**
 * The Class ProductGallery Impl.
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Model(adaptables = { SlingHttpServletRequest.class },
	   adapters = { ProductGallery.class, ComponentExporter.class },
	   resourceType = { ProductGalleryImpl.RESOURCE_TYPE },
	   defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
		  extensions = ExporterConstants.SLING_MODEL_EXTENSION)

public class ProductGalleryImpl implements ProductGallery {

	protected static final String RESOURCE_TYPE = "";


	@ChildResource
	@Setter(AccessLevel.NONE)
	private List<ImageItem> imageLists;
	
	@ChildResource
	@Setter(AccessLevel.NONE)
	private List<ImageItem> productLists;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String id; 
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String componentType; 
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String imagePath;

	@Override
	public String getImagePath() {
		return imagePath;
	}

	@Override
	public String getComponentType() {

		return componentType;
	}

	@Override
	public String getId() {
		return id;
	}

	@Override
	public List<ImageItem> getImageLists() {
		List<ImageItem> imageListsCopy = new ArrayList<ImageItem>(imageLists);
		return imageListsCopy;
	}

	@Override
	public List<ImageItem> getProductLists() {
		List<ImageItem> productListsCopy = new ArrayList<ImageItem>(productLists);
		return productListsCopy;
	} 
	
	  

}

