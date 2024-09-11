package com.abbott.aem.platform.common.components.models;

import com.adobe.cq.wcm.core.components.models.Component;

import org.osgi.annotation.versioning.ConsumerType;

/**
 * The Interface CookieBar.
 */
@ConsumerType
public interface CookieBar extends Component {

	int getCookieExpirationTime();

	String getCountryLabel();

	boolean isDisableLanguageNavigation();
}
