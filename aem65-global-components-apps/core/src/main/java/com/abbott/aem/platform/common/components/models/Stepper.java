package com.abbott.aem.platform.common.components.models;

import org.osgi.annotation.versioning.ConsumerType;

import com.adobe.cq.wcm.core.components.models.Component;

@ConsumerType
public interface Stepper extends Component {

	/**
	 * Returns the min value.
	 *
	 * @return the min value.
	 */
	int getMinVal();

	/**
	 * Returns the Max value.
	 *
	 * @return the max value.
	 */
	int getMaxVal();

	/**
	 * Returns the default value.
	 *
	 * @return the defaultvalue.
	 */
	int getDefVal();
	
	default String getMinErrorMessage() {
		throw new UnsupportedOperationException();
	}
	
	default String getMaxErrorMessage() {
		throw new UnsupportedOperationException();
	}	
}
