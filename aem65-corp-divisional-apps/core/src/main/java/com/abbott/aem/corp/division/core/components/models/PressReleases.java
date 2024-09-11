package com.abbott.aem.corp.division.core.components.models;

import org.osgi.annotation.versioning.ConsumerType;
import com.adobe.cq.wcm.core.components.models.Component;

@ConsumerType
public interface PressReleases extends Component{
	
	String getArticleText();

	String getPressReleaseLink();
	
	String getPressDate();
	
	String getOpenInNewTab();
	
}
