package com.abbott.aem.platform.common.components.models.impl.v1;

import java.util.List;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import com.abbott.aem.platform.common.components.models.VideoPlayList;
import com.abbott.aem.platform.common.components.models.VideoPlayListItem;

import com.adobe.cq.export.json.ComponentExporter;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import com.adobe.cq.export.json.ExporterConstants;
import com.adobe.cq.wcm.core.components.models.Component;

import lombok.AccessLevel;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Delegate;


@Model(adaptables = { SlingHttpServletRequest.class }, adapters = { VideoPlayList.class,
		ComponentExporter.class }, resourceType = {
		VideoPlayListImpl.RESOURCE_TYPE }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class VideoPlayListImpl implements VideoPlayList {
	public static final String RESOURCE_TYPE = "abbott-platform/components/content/molecules/videoplaylist/v1/videoplaylist";

	@Self
	@Delegate(types = Component.class)
	@Setter(AccessLevel.NONE)
	@Getter(AccessLevel.NONE)
	private Component component;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private String playListType;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private String additionalHeading;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private String hideDescInPlayListPanel;

	@ChildResource
	@Setter(AccessLevel.NONE)
	public List<VideoPlayListItem> sectionItems;

	@Override
	public List<VideoPlayListItem> getSectionItems() {
		return sectionItems;
	}

}