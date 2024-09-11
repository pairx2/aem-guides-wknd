package com.abbott.aem.platform.common.components.models;

import com.adobe.cq.wcm.core.components.models.Component;

import org.osgi.annotation.versioning.ConsumerType;

@ConsumerType
public interface Tooltips extends Component {

	/**
	 * Returns the Disable Tooltip .
	 *
	 * @return the disableTooltip value.
	 */
	boolean isDisableTooltip();

	/**
	 * Returns the Tooltip Title .
	 *
	 * @return the tooltip title value.
	 */
	String getTooltipTitle();

	/**
	 * Returns the Tooltip Body.
	 *
	 * @return the tooltip body value.
	 */
	String getTooltipBody();

	/**
	 * Returns the tool tip icon.
	 *
	 * @return the tool tip icon value.
	 */
	String getIcon();

	/**
	 * Returns the tool tip alignment.
	 *
	 * @return the tool tip Alignment value.
	 */
	String getAlignment();

	/**
	 * Returns the tool tip background.
	 *
	 * @return the tool tip Background value.
	 */
	String getBackground();

	/**
	 * Returns the tool tip size.
	 *
	 * @return the tool tip Size value.
	 */
	String getSize();

	/**
	 * Returns the tool tip action.
	 *
	 * @return the tool tip action value.
	 */
	String getAction();

	/**
	 * Returns the tool tip action.
	 *
	 * @return the tool tip action value.
	 */
	String getPopUpUrl();

}