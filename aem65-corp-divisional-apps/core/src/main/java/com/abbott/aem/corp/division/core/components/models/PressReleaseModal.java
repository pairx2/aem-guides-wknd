package com.abbott.aem.corp.division.core.components.models;

import java.util.List;
import org.osgi.annotation.versioning.ConsumerType;

import com.adobe.cq.wcm.core.components.models.Component;

@ConsumerType
public interface PressReleaseModal extends Component {
	
	List<PressReleases> getPressItems();

	String getSeeMore();
	
	String getArticleTitle();
	
	String getSeeMoreLink();

}
