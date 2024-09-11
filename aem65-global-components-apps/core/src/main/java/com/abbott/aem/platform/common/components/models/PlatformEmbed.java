package com.abbott.aem.platform.common.components.models;

import com.adobe.cq.wcm.core.components.models.Embed;

import org.osgi.annotation.versioning.ConsumerType;

/**
 * The interface Custom embed components to support Iframe.
 */

@ConsumerType
public interface PlatformEmbed extends Embed {

	/**
	 * Gets Iframe .
	 *
	 * @return the iframe
	 */
	public String getIframe();

}
