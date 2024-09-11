package com.abbott.aem.platform.common.components.models;

import com.adobe.cq.wcm.core.components.models.Component;

import org.osgi.annotation.versioning.ConsumerType;

@ConsumerType
public interface AlertBanner extends Component {

	default String getAlertMessage() {
		throw new UnsupportedOperationException();
	}

	default String getDisplayText() {
		throw new UnsupportedOperationException();
	}

	default String getButtonText() {
		throw new UnsupportedOperationException();
	}

	default String getCollapseText() {
		throw new UnsupportedOperationException();
	}
	default String getExpandText() {
		throw new UnsupportedOperationException();
	}

	default String getIcon() {
		throw new UnsupportedOperationException();
	}
}

