package com.abbott.aem.platform.common.components.models;

import org.osgi.annotation.versioning.ConsumerType;

import com.adobe.cq.wcm.core.components.models.Component;

/**
 * The HeaderImage model.
 */
@ConsumerType
public interface HeaderImage extends Component {
	
	String getImageUrl();

}
