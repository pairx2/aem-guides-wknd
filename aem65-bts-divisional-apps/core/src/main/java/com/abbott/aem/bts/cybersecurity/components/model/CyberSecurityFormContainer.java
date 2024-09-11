package com.abbott.aem.bts.cybersecurity.components.model;

import org.osgi.annotation.versioning.ConsumerType;

/**
 * The Interface FormContainer.
 */
@ConsumerType
public interface CyberSecurityFormContainer extends com.abbott.aem.platform.common.components.models.FormContainer {

	/**
	 * Gets the Error Page Path.
	 *
	 * @return the Error Page.
	 */
	default String getErrorPage() {
		throw new UnsupportedOperationException();
	}

	@Override
	default String getCurrentPagePath() {
		throw new UnsupportedOperationException();
	}

	@Override
	default String getThankYouPage() {
		throw new UnsupportedOperationException();
	}

}
