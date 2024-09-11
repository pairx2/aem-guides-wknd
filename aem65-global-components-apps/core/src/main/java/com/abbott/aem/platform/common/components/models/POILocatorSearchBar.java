package com.abbott.aem.platform.common.components.models;

import com.adobe.cq.wcm.core.components.models.Component;

import org.osgi.annotation.versioning.ConsumerType;

@ConsumerType
public interface POILocatorSearchBar extends Component {

	/**
	 * Returns the Search Title Place Holder value.
	 *
	 * @return the search title value.
	 */
	String getSearchPlaceHolderText();
	
	String getSearchLabelText();
	
	String getInputFieldErrorMessage();

	boolean isHideUseMyLocation();
}
