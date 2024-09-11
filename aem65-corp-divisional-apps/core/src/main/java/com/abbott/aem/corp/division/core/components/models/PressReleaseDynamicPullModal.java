package com.abbott.aem.corp.division.core.components.models;

import com.adobe.cq.wcm.core.components.models.Component;
import org.osgi.annotation.versioning.ConsumerType;
import java.util.List;

@ConsumerType
public interface PressReleaseDynamicPullModal extends Component {

	List<PressReleaseDynamicPull> getPressPages();

	List<PressReleaseDynamicPull> getPressPagesObj();

	String getTotalResults();
	
	String getPressReleaseRootPath();
	
	String getShowMoreText();

	String getErrorMsg();

	String getPaginationText();

	String getInitialCount();

	String getDisplayType();
	
	String getSeeAllText();

	String getViewAllLink();
	
	String getReadMore();
}
