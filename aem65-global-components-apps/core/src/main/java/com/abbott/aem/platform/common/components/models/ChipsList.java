package com.abbott.aem.platform.common.components.models;

import java.util.List;

import com.adobe.cq.wcm.core.components.models.Component;

import org.osgi.annotation.versioning.ConsumerType;

@ConsumerType
public interface ChipsList extends Component {

	default Integer getChipsCount() {
		throw new UnsupportedOperationException();
	}

	public List<String> getListOfChips();

}
