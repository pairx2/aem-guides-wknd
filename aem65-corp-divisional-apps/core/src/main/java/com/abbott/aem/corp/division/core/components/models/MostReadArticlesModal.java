package com.abbott.aem.corp.division.core.components.models;

import com.adobe.cq.wcm.core.components.models.Component;
import org.osgi.annotation.versioning.ConsumerType;

@ConsumerType
public interface MostReadArticlesModal extends Component{
	
	String getArticleTitle();

	String getArticleDescription();
	
	String getArticleImage();

	String getArticleDate();

	String getParentPageTitle();

	String getArticleColor();

	String getArticlePath();
}
