/**
 *
 */

package com.abbott.aem.platform.common.components.models;

import java.util.List;

import com.adobe.cq.wcm.core.components.models.Component;

import org.osgi.annotation.versioning.ConsumerType;

/**
 * Model representing the product section.
 *
 * @author tadigital
 */
@ConsumerType
public interface ProductSection extends Component {
	default String getTitle() {
		throw new UnsupportedOperationException();
	}

	default String getDescription() {
		throw new UnsupportedOperationException();
	}

	default String getProductSectionType() {
		throw new UnsupportedOperationException();
	}

	default String getImageSize() {
		throw new UnsupportedOperationException();
	}

	default int getButtonCount() {
		throw new UnsupportedOperationException();
	}

	List<Integer> getButtonList();

	default boolean isBadgeChecked() {
		throw new UnsupportedOperationException();
	}
	
	default String getStartColor() {
		throw new UnsupportedOperationException();
	}
	
	default String getStartColorPosition() {
		throw new UnsupportedOperationException();
	}
	
	default String getEndColor() {
		throw new UnsupportedOperationException();
	}
	
	default String getEndColorPosition() {
		throw new UnsupportedOperationException();
	}
}
