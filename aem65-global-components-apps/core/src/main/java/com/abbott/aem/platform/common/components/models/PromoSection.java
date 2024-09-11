package com.abbott.aem.platform.common.components.models;

import com.adobe.cq.wcm.core.components.models.Component;

import org.osgi.annotation.versioning.ConsumerType;

/**
 * The Interface PromoSection.
 */
@ConsumerType
public interface PromoSection extends Component {

	default int getButtonCount() {
		throw new UnsupportedOperationException();
	}

	default boolean isBadgeRequired() {
		throw new UnsupportedOperationException();
	}

	default String[] getButtonLength() {
		throw new UnsupportedOperationException();
	}
}
