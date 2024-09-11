package com.abbott.aem.platform.common.components.models;

import java.util.List;

import com.adobe.cq.wcm.core.components.models.Component;

import org.osgi.annotation.versioning.ConsumerType;

@ConsumerType
public interface TileList extends Component {

	default Integer getTilesCount() {
		throw new UnsupportedOperationException();
	}

	public List<String> getListOfTiles();

}
