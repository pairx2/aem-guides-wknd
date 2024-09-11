package com.abbott.aem.platform.common.components.models.impl.v1;

import java.util.ArrayList;
import java.util.List;

import lombok.AccessLevel;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Setter;

import com.abbott.aem.platform.common.components.models.TileList;
import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

/**
 * The Class TileList Impl.
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Model(adaptables = { SlingHttpServletRequest.class },
	   adapters = { TileList.class, ComponentExporter.class },
	   resourceType = { TileListImpl.RESOURCE_TYPE },
	   defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
		  extensions = ExporterConstants.SLING_MODEL_EXTENSION)

public class TileListImpl extends ComponentProxyImpl implements TileList {

	protected static final String RESOURCE_TYPE = "abbott-platform/components/content/molecules/tilelist/v1/tilelist";

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private Integer tilesCount;

	public List<String> getListOfTiles() {
		List<String> listOfTiles = new ArrayList<>();
		for (int i = 0; i < tilesCount; i++) {
			listOfTiles.add("tile-" + i);
		}
		return listOfTiles;
	}

}
