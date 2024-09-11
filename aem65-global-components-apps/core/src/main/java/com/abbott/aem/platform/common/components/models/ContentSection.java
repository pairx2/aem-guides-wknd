package com.abbott.aem.platform.common.components.models;

import com.adobe.cq.wcm.core.components.models.Component;

import org.osgi.annotation.versioning.ConsumerType;

@ConsumerType
public interface ContentSection extends Component {

	default String getContentList() {
		throw new UnsupportedOperationException();
	}

}
