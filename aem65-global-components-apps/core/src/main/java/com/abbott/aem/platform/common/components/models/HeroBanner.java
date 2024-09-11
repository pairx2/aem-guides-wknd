package com.abbott.aem.platform.common.components.models;

import java.util.List;

import com.adobe.cq.wcm.core.components.models.Component;

import org.osgi.annotation.versioning.ConsumerType;

@ConsumerType
public interface HeroBanner extends Component {

	default String getFormFragmentPath() {
		throw new UnsupportedOperationException();
	}

	default Integer getNumberOfButtons() {
		throw new UnsupportedOperationException();
	}

	default String getAltText() {
		throw new UnsupportedOperationException();
	}
	
	default String getStartColor() {
		throw new UnsupportedOperationException();
	}

	default String getEndColor() {
		throw new UnsupportedOperationException();
	}

	default Integer getStartColorPosition() {
		throw new UnsupportedOperationException();
	}

	default Integer getEndColorPosition() {
		throw new UnsupportedOperationException();
	}

	default String getFileReference() {
		throw new UnsupportedOperationException();
	}
	
	default String getTabletImage() {
		throw new UnsupportedOperationException();
	}
	
	default String getMobileImage() {
		throw new UnsupportedOperationException();
	}


	default String getSubtitle() {
		throw new UnsupportedOperationException();
	}

	public List<String> getListOfButtons();

}