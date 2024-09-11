package com.abbott.aem.platform.common.components.models;

import org.osgi.annotation.versioning.ConsumerType;

import com.adobe.cq.wcm.core.components.models.Component;

/**
 * The NonRichText model.
 */
@ConsumerType
public interface NonRichText extends Component {
	/**
	 * Gets the text.
	 *
	 * @return the text
	 */
	String getHtmlText();

}
