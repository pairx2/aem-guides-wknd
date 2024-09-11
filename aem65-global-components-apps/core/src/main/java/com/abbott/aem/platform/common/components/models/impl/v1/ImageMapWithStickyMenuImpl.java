package com.abbott.aem.platform.common.components.models.impl.v1;

import java.util.List;

import lombok.Getter;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.abbott.aem.platform.common.components.models.ImageMapWithStickyMenu;
import com.abbott.aem.platform.common.components.models.ImageMapWithStickyMenuItem;
import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;

import lombok.AccessLevel;
import lombok.Setter;


@Model(adaptables = { SlingHttpServletRequest.class, Resource.class }, adapters = { ImageMapWithStickyMenu.class,
		ComponentExporter.class }, resourceType = {
			ImageMapWithStickyMenuImpl.RESOURCE_TYPE }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)

public class ImageMapWithStickyMenuImpl extends ComponentProxyImpl implements ImageMapWithStickyMenu {

	protected static final String RESOURCE_TYPE = "abbott-platform/components/content/organism/imagemapwithstickymenu/v1"
			+ "/imagemapwithstickymenu";

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Default(values = "Select")
	@Getter
	private String select;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private String variation;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private String mapTitle;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private String backToMap;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private String hideStickyMenu;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private String viewStoryText;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private String iconColor;

	@ChildResource
	@Setter(AccessLevel.NONE)
	@Getter
	public List<ImageMapWithStickyMenuItem> contentConfig;

}
