package com.abbott.aem.platform.common.components.models;

import com.adobe.cq.wcm.core.components.models.Component;

import org.osgi.annotation.versioning.ConsumerType;

@ConsumerType
public interface Header extends Component {
	/**
	 * Used to hide the sign-up sub-component in the header.
	 *
	 * @return true to hide the sign-up sub-component.
	 */
	default boolean isHideSignUpInNav() {
		throw new UnsupportedOperationException();
	}

	/**
	 * Used to hide the search sub-component in the header.
	 *
	 * @return true to hide the search sub-component.
	 */
	default boolean isHideSearchInNav() {
		throw new UnsupportedOperationException();
	}

	/**
	 * Used to hide the search sub-component in the header, when the user is offline.
	 *
	 * @return true to hide the search sub-component.
	 */
	default boolean isPwaHideSearchInNav() {
		throw new UnsupportedOperationException();
	}
	
	/**
	 * Used to hide the MegaMenu sub-component in the header.
	 *
	 * @return true to hide the MegaMenu sub-component.
	 */
	default boolean isHideMegaMenuInNav() {
		throw new UnsupportedOperationException();
	}
	
	/**
	 * Used to underline the MegaMenu in the header.
	 *
	 * @return true to hide the MegaMenu sub-component.
	 */
	default boolean isUnderlineMegaMenuInNav() {
		throw new UnsupportedOperationException();
	}

	/**
	 * Used to display the "Skip to Content" accessibility link in the header.
	 *
	 * @return true to enable the Skip to Content link.
	 */
	default boolean isEnableSkipToContent() {
		throw new UnsupportedOperationException();
	}
	/**
	 * Used to display as the compact mobile header.
	 *
	 * @return true to enable the compact mobile header.
	 */
	default boolean isEnableCompactMobileHeader() {
		throw new UnsupportedOperationException();
	}

	/**
	 * Used to show/hide the top utility section in the v2 header.
	 *
	 * @return true to hide the top utility section.
	 */
	default boolean getHideTopUtilitySection() {
		throw new UnsupportedOperationException();
	}

	/**
	 * Used to show/hide the bottom utility section in the v2 header.
	 *
	 * @return true to hide the bottom utility section.
	 */
    default boolean getHideBottomUtilitySection() {
		throw new UnsupportedOperationException();
	}

	/**
	 * Used to determine if the v2 header should be sticky.
	 *
	 * @return true to make the header sticky.
	 */
    default boolean getIsSticky() {
		throw new UnsupportedOperationException();
	}
}
