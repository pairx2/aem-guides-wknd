package com.abbott.aem.platform.common.components.models;

import com.adobe.cq.wcm.core.components.models.Component;

import org.osgi.annotation.versioning.ConsumerType;

@ConsumerType
public interface InformationSectionPanel extends Component {

	public boolean isSectionTitleRequired();
	
	public boolean isCtaLinkRequired();
	
	public String getLeftContentText();
	
	public String getRightContentText();
	
	public boolean getShowHideMobileImage();

}
