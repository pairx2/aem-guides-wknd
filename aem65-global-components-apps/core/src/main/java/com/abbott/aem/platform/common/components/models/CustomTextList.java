package com.abbott.aem.platform.common.components.models;

import java.util.List;

import com.adobe.cq.wcm.core.components.models.Component;

import org.osgi.annotation.versioning.ConsumerType;

@ConsumerType
public interface CustomTextList extends Component {

	String getListType();

	String getHeaderTitle();

	String getTextAboveList();

	String getTextBelowList();

	public List<CustomTextItem> getCustomLists();

	String getIconSize();
	
	String getStartColor();
	
	String getStartColorPosition();
	
	String getEndColor();
	
	String getEndColorPosition();
}
