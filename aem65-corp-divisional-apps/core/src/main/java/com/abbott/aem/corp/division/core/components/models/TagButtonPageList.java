package com.abbott.aem.corp.division.core.components.models;

import java.util.Map;

import org.osgi.annotation.versioning.ConsumerType;

import com.adobe.cq.wcm.core.components.models.Component;

@ConsumerType
public interface TagButtonPageList extends Component {


	Map<String, String> getTagUrlList(); 
	
	Map<String, String> getTagsWithOutPages();

}
