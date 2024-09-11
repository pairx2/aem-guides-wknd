package com.abbott.aem.bts.cybersecurity.components.model;

import com.adobe.cq.wcm.core.components.models.Component;

import org.osgi.annotation.versioning.ConsumerType;

@ConsumerType
public interface SessionPopup extends Component {

	/**
	 * Returns the enableTimeout value.
	 *
	 * @return the enableTimeout value.
	 */
	default Boolean isTimeoutEnabled() {
		throw new UnsupportedOperationException();
	}
	
	/**
	 * Returns the SessionPopup InactivityMessage value.
	 *
	 * @return the SessionPopup InactivityMessage value.
	 */
	default String getInactivityTimeoutMessage() {
		throw new UnsupportedOperationException();
	}
	
	/**
	 * Returns the SessionPopup AlertPrefix value.
	 *
	 * @return the SessionPopup AlertPrefix value.
	 */
	default String getTimeoutAlertPrefix() {
		throw new UnsupportedOperationException();
	}
	
	/**
	 * Returns the timeoutLimit value.
	 *
	 * @return the timeoutLimit value.
	 */
	default Integer getInactivityTimeoutLimit() {
		throw new UnsupportedOperationException();
	}

	/**
	 * Returns the timerLimit value.
	 *
	 * @return the timerLimit value.
	 */
	default Integer getTimerLimit() {
		throw new UnsupportedOperationException();
	}

}