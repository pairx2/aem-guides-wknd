package com.abbott.aem.platform.common.components.models.impl.v1;

import java.util.List;

import lombok.Getter;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.abbott.aem.platform.common.components.models.AssetsGallery;
import com.abbott.aem.platform.common.components.models.AssetsGalleryItem;
import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;

import lombok.AccessLevel;
import lombok.Setter;

@Model(adaptables = { SlingHttpServletRequest.class }, adapters = { AssetsGallery.class,
		ComponentExporter.class }, resourceType = {
				AssetsGalleryImpl.RESOURCE_TYPE }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)

public class AssetsGalleryImpl implements AssetsGallery {

	protected static final String RESOURCE_TYPE = "abbott-platform/components/content/molecules/assetsgallery/v1/assetsgallery";

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private String thumbnailPosition;

	@ChildResource
	@Setter(AccessLevel.NONE)
	@Getter
	public List<AssetsGalleryItem> productImageList;

}
