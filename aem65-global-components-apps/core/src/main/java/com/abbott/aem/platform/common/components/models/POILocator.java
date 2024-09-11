package com.abbott.aem.platform.common.components.models;

import com.adobe.cq.wcm.core.components.models.Component;

import org.osgi.annotation.versioning.ConsumerType;

/**
 * The Interface POILocator.
 */
@ConsumerType
public interface POILocator extends Component {

	/**
	 * Gets the locator type.
	 *
	 * @return the locator type
	 */
	String getLocatorType();
	
	/**
	 * Gets the Map radius.
	 *
	 * @return radius
	 */
	String getMapRadius();
	/**
	 * Gets the Map radius.
	 *
	 * @return radius
	 */
	String getMapZoom();
	
	/**
	 * Gets the value of city or state
	 *
	 * @return enterCityOrStateNameOnPageLoad
	 */
	String getEnterCityOrStateNameOnPageLoad();
	
	/**
	 * Gets the Show Result On Page Load Checkbox Value.
	 *
	 * @return showResultOnPageLoad
	 */
	boolean isShowResultOnPageLoad();

	/**
	 * Gets the Show Duplicate Number Result On Page Load Checkbox Value.
	 *
	 * @return showDuplicateResultNumber
	 */
	boolean isShowDuplicateResultNumber();

	String getMapMarkerTextColor();
	
	/**
	 * Gets the Map Marker Image.
	 *
	 * @return mapMarkerImage
	 */
	String getMapMarkerImage();

	
	String getGoogleMapApiKey();

	String getGoogleMapApiUrl();
	
	String getUpdateRequest();
	
	String getDomainName();
		
	String getCurrentPagePath();
}
