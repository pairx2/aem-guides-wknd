package com.abbott.aem.platform.common.components.models;

import org.osgi.annotation.versioning.ConsumerType;

/**
 * Interface that models terms section in the page.
 */
@ConsumerType
public interface TermsSection {
	/**
	 * @return the symbol for the terms section.
	 */
	default String getSymbol() {
		throw new UnsupportedOperationException();
	}

	/**
	 * @return the terms section path of the content fragment
	 */
	default String getTermsSectionPath() {
		throw new UnsupportedOperationException();
	}

	/**
	 * @return the content from the content fragment
	 */
	default String getContent() {
		throw new UnsupportedOperationException();
	}
}
