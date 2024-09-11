package com.abbott.aem.platform.common.components.models;

import com.adobe.cq.wcm.core.components.models.Component;
import org.osgi.annotation.versioning.ConsumerType;

@ConsumerType
public interface AbstractList extends Component {

	default String getDataSourceUrl() {
		throw new UnsupportedOperationException();
	}

	default String getManualData() {
		throw new UnsupportedOperationException();
	}

	default String getHeadingTitle() {
		throw new UnsupportedOperationException();
	}

	default String getFunctionToCall() {
		throw new UnsupportedOperationException();
	}

	default String getNoneLabel() {
		throw new UnsupportedOperationException();
	}

}

