package com.abbott.aem.corp.division.core.components.models;

import org.osgi.annotation.versioning.ConsumerType;
import com.adobe.cq.wcm.core.components.models.Component;

@ConsumerType
public interface ArticleDetails extends Component{
	
	String getIsiTitle();

	String getIsiRichtext();

}
