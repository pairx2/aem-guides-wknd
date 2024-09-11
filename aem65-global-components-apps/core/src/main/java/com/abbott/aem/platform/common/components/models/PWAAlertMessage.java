package com.abbott.aem.platform.common.components.models;

import org.osgi.annotation.versioning.ConsumerType;

import com.adobe.cq.wcm.core.components.models.Component;

/**
 * The Interface PWAAlertMessage.
 */
@ConsumerType
public interface PWAAlertMessage extends Component {

	/**
	 * Gets the safari message
	 *
	 * @return the safari message
	 */
	String getSafariMessage();

	/**
	 * Gets the safari Icon
	 *
	 * @return the Safari Icon
	 */
	String getSafariIcon();
	/**
	 * Gets the Chrome Message
	 *
	 * @return the Chrome Message
	 */
	String getChromeMessage();
	/**
	 * Gets the Chrome Icon
	 *
	 * @return the Chrome Icon
	 */
	String getChromeIcon();
	/**
	 * Gets the Close Icon for Download Message
	 *
	 * @return the Close Icon for Download Message
	 */
	String getCloseIcon();
	/**
	 * Gets the Success Message
	 *
	 * @return the Success Message
	 */
	 String getSuccessMessage();
	/**
	 * Gets the Failed Message
	 *
	 * @return the Failed Message
	 */
	 String getFailedMessage();
	/**
	 * Gets the Close Icon for Download Status
	 *
	 * @return the Close Icon for Download Status
	 */
	String getCloseIconStatus();
	/**
	 * Gets the Online Message
	 *
	 * @return the Online Message
	 */
	 String getOnlineMessage();
	/**
	 * Gets the Offline Message
	 *
	 * @return the Offline Message
	 */
	String getOfflineMessage();
	/**
	 * Gets the Close Icon for Internet status
	 *
	 * @return the Close Icon for Internet status
	 */
	String getCloseIconInternet();
}