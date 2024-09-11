package com.abbott.aem.corp.division.core.components.models;

import com.adobe.cq.wcm.core.components.models.Component;
import org.osgi.annotation.versioning.ConsumerType;

@ConsumerType
public interface PressReleaseDynamicPull extends Component{
	
	String getTitle();

	String getDescription();
	
	String getPressDate();

	String getPressPagePath();

	String getPressDateFormat();

	String getExecTitle();

	String getExecDescription();

	String getExecImage();

	String getProfileImage();
	
	String getArticleSubTitle();
	
	String getArticleDescription();
	
	String getArticleDate();
	
	String getArticleImage();
	
	String getCategoryTitle();
	
	String getArticleColor();
	
}
