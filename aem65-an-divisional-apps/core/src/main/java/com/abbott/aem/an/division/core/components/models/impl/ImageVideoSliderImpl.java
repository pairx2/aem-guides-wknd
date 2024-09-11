package com.abbott.aem.an.division.core.components.models.impl;

import java.util.List;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.abbott.aem.an.division.core.components.models.ImageVideoSlider;
import com.abbott.aem.an.division.core.components.models.ImageVideoSliderItem;
import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;

import lombok.AccessLevel;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Setter;

@Data
@EqualsAndHashCode(callSuper = false)
@Model(adaptables = { SlingHttpServletRequest.class }, adapters = { ImageVideoSlider.class,
		ComponentExporter.class }, resourceType = {
				ImageVideoSliderImpl.RESOURCE_TYPE }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)

public class ImageVideoSliderImpl implements ImageVideoSlider {

	protected static final String RESOURCE_TYPE = "an/division/components/content/imagevideoslider";

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String thumbnailPosition;

	@ChildResource
	@Setter(AccessLevel.NONE)
	private List<ImageVideoSliderItem> productImageList;

	@Override
	public String getThumbnailPosition() {
		return thumbnailPosition;
	}	
}
