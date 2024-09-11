package com.abbott.aem.platform.common.components.models;

import com.adobe.cq.wcm.core.components.models.Component;

import org.osgi.annotation.versioning.ConsumerType;

@ConsumerType
public interface Alert extends Component {

	default String getAlertType() {
		throw new UnsupportedOperationException();
	}

	default int getTime() {
		throw new UnsupportedOperationException();
	}

	default String getExpiryDate() {
		throw new UnsupportedOperationException();
	}

	default boolean isCloseButton() {
		throw new UnsupportedOperationException();
	}

	default String getIcon() {
		throw new UnsupportedOperationException();
	}
}

