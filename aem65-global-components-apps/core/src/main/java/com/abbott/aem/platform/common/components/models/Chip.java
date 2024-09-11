package com.abbott.aem.platform.common.components.models;

import com.adobe.cq.wcm.core.components.models.Component;

import org.osgi.annotation.versioning.ConsumerType;

/**
 * The Interface Chip.
 */
@ConsumerType
public interface Chip extends Component {

	/**
	 * Gets the chip title.
	 *
	 * @return the chip title
	 */
	public String getTagTitle();

	/**
	 * Gets the field name.
	 *
	 * @return the field name
	 */
	public String getFieldName(); 

	/**
	 * Gets the resolved tag title.
	 *
	 * @return the resolved tag title
	 */
	String getResolvedTagTitle();
	
	/**
	 * Gets the resolved tag title.
	 *
	 * @return the resolved tag title without locale
	 */
	String getResolvedTagTitleWithoutLocale();
	
	/**
	 * Gets the resolved tag title.
	 *
	 * @return the resolved tag name
	 */
	String getResolvedTagName();

	/**
	 * Gets the resolved tag parent title.
	 *
	 * @return the resolved tag parent title
	 */
	String getResolvedTagParentTitle();
	
}
