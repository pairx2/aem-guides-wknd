package com.abbott.aem.platform.common.components.models;

import com.adobe.cq.wcm.core.components.models.Component;

import org.osgi.annotation.versioning.ConsumerType;

/**
 * The Interface SearchCardItem.
 */
@ConsumerType
public interface SearchCardItem extends Component {

	/**
	 * Gets the title.
	 *
	 * @return the title
	 */
	default String getTagTitle() {
		throw new UnsupportedOperationException();
	}

	/**
	 * Gets the field name.
	 *
	 * @return the field name
	 */
	default String getFieldName() {
		throw new UnsupportedOperationException();
	}

	/**
	 * Gets the resolved tag title.
	 *
	 * @return the resolved tag title
	 */
	String getResolvedTagTitle();

	/**
	 * Gets the resolved tag parent title.
	 *
	 * @return the resolved tag parent title
	 */
	String getParentTagTitle();

	/**
	 * Gets the image.
	 *
	 * @return the image
	 */
	default String getFileReference() {
		throw new UnsupportedOperationException();
	}

}
