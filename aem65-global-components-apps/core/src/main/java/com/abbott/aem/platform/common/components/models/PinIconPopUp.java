package com.abbott.aem.platform.common.components.models;

import java.util.List;

import com.adobe.cq.wcm.core.components.models.Component;

import org.osgi.annotation.versioning.ConsumerType;

@ConsumerType
public interface PinIconPopUp extends Component {

	/**
	 * Gets the Pin Pop Up Distance Label Text
	 *
	 * @return pinPopupDistanceLabelText
	 */	
	 String getPinPopupDistanceLabelText();
	
	/**
	 * Gets the Pin Pop Up Address Label Text
	 *
	 * @return pinPopupAddressLabelText
	 */
	 String getPinPopupAddressLabelText();
	/**
	 * Gets the Pin Pop Up Phone Label Text
	 *
	 * @return pinPopupPhoneLabelText
	 */	
	 String getPinPopupPhoneLabelText();
	
	/**
	 * Gets the Pop Up Get Directions Link Text
	 *
	 * @return pinPopupGetDirectionsLinkText
	 */
	 String getPinPopupGetDirectionsLinkText();
	/**
	 * Gets the Pin Pop Up Description Text
	 *
	 * @return pinPopupDescriptionLabelText
	 */
	 String getPinPopupDescriptionLabelText();
	
	/**
	 * Gets the Pin Pop Up Operating Hours Label Text
	 *
	 * @return pinPopupOperatingHoursLabelText
	 */
	 String getPinPopupOperatingHoursLabelText();
	
	/**
	 * Gets the Pin Pop Up Email Label Text
	 *
	 * @return pinPopupEmailLabelText
	 */
	 String getPinPopupEmailLabelText();

	 String getOverridePinIconPopItem();

	public List<PinIconPopUpItems> getOverridePinIconPopUpList();
	
}
