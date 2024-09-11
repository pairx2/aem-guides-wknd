package com.abbott.aem.platform.common.components.models;

import java.util.List;

import org.osgi.annotation.versioning.ConsumerType;

import com.adobe.cq.wcm.core.components.models.Component;

@ConsumerType
public interface VideoPlayList extends Component {
	public String getPlayListType();
	public String getAdditionalHeading();

	public String getHideDescInPlayListPanel();

	public List<VideoPlayListItem> getSectionItems();

}