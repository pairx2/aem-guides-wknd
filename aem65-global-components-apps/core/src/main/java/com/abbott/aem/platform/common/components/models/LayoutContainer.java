package com.abbott.aem.platform.common.components.models;

import java.util.List;

import com.adobe.cq.wcm.core.components.models.Component;

import org.osgi.annotation.versioning.ConsumerType;

/**
 * The LayoutContainer model.
 */
@ConsumerType
public interface LayoutContainer extends Component {
	/**
	 * Gets the count of columns.
	 *
	 * @return the counter count
	 */
	int getColumnCount();

	/**
	 * Returns a list of columns
	 *
	 * @return returns the list of columns with size as per column count
	 */
	List<Integer> getColumnList();

}
