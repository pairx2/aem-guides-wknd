package com.abbott.aem.platform.common.components.models;

import com.adobe.cq.wcm.core.components.models.Component;

import org.osgi.annotation.versioning.ConsumerType;

@ConsumerType
public interface Badge extends Component {

	/**
	 * Returns the badge text value.
	 *
	 * @return the badge text value.
	 */
	String getBadgeText();
	String getBadgeType();

}
