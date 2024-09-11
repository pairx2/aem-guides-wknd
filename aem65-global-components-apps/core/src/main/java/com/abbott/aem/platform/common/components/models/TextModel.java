package com.abbott.aem.platform.common.components.models;

import org.osgi.annotation.versioning.ConsumerType;

import com.adobe.cq.wcm.core.components.models.Text;

@ConsumerType
public interface TextModel extends Text {

	public String getShortEnabled();

	public String getNumberOfLines();

	public String getMoreLink();

	public String getLessLink();

	public String getStartColor();
	
	public String getStartColorPosition();
	
	public String getEndColor();

	public String getEndColorPosition();
	

}
