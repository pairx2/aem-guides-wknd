package com.abbott.aem.platform.common.components.models;

import com.adobe.cq.wcm.core.components.models.Component;
import org.osgi.annotation.versioning.ConsumerType;

@ConsumerType
public interface AbstractListItem extends Component {

	default String getTitle() {
		throw new UnsupportedOperationException();
	}

	default String getValue() {
		throw new UnsupportedOperationException();
	}

}

