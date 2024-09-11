package com.abbott.aem.platform.common.components.models;

import org.osgi.annotation.versioning.ConsumerType;

/**
 * The Interface CustomOptionItem.
 */
@ConsumerType
public interface CustomOptionItem {

	/**
	 * Returns {@code true} if item should be initially error, otherwise
	 * {@code false}.
	 *
	 * @return {@code true} if item should be initially error, otherwise
	 * {@code false}
	 */
	default boolean isError() {
		throw new UnsupportedOperationException();
	}

	/**
	 * Returns {@code true} if item should be initially indeterminate, otherwise
	 * {@code false}.
	 *
	 * @return {@code true} if item should be initially indeterminate, otherwise
	 * {@code false}
	 */
	default boolean isIndeterminate() {
		throw new UnsupportedOperationException();
	}

	/**
	 * Returns {@code true} if item should be initially selected, otherwise
	 * {@code false}.
	 *
	 * @return {@code true} if item should be initially selected, otherwise
	 * {@code false}
	 */
	default boolean isSelected() {
		throw new UnsupportedOperationException();
	}

	/**
	 * Returns {@code true} if item should be disabled and therefore not clickable,
	 * otherwise {@code false}.
	 *
	 * @return {@code true} if item should be disabled and therefore not clickable,
	 * otherwise {@code false}
	 */
	default boolean isDisabled() {
		throw new UnsupportedOperationException();

	}

	/**
	 * Returns the value of this item.
	 *
	 * @return the value of this item
	 */
	default String getValue() {
		throw new UnsupportedOperationException();
	}

	/**
	 * Returns the initial state of this item.
	 *
	 * @return the initial state of this item
	 */
	default String getInitialState() {
		throw new UnsupportedOperationException();
	}

	/**
	 * Return the text for this item.
	 *
	 * @return the text for this item
	 */
	default String getText() {
		throw new UnsupportedOperationException();
	}

	/**
	 * Return the dropdown icon for this item.
	 *
	 * @return the dropdown icon for this item
	 */
	default String getDropdownIcon() {
		throw new UnsupportedOperationException();
	}
}
