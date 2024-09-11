package com.abbott.aem.platform.common.components.models;

import com.adobe.cq.wcm.core.components.models.Component;

import org.osgi.annotation.versioning.ConsumerType;

/**
 * The Interface FAQResultItem.
 */
@ConsumerType
public interface FAQResultItem extends Component {

	/**
	 * Gets the question text.
	 *
	 * @return the question text
	 */
	default String getQuestionText() {
		throw new UnsupportedOperationException();
	}

	/**
	 * Gets the answer text.
	 *
	 * @return the answer text
	 */
	default String getAnswerText() {
		throw new UnsupportedOperationException();
	}

}
