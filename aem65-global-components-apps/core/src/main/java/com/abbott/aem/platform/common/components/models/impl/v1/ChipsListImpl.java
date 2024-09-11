package com.abbott.aem.platform.common.components.models.impl.v1;

import java.util.ArrayList;
import java.util.List;

import lombok.AccessLevel;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Setter;

import com.abbott.aem.platform.common.components.models.ChipsList;
import com.adobe.cq.export.json.ExporterConstants;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

/**
 * The Class Chipslist Impl.
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Model(adaptables = { SlingHttpServletRequest.class },
	   adapters = { ChipsList.class },
	   resourceType = { ChipsListImpl.RESOURCE_TYPE },
	   defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
		  extensions = ExporterConstants.SLING_MODEL_EXTENSION)

public class ChipsListImpl extends ComponentProxyImpl implements ChipsList {

	protected static final String RESOURCE_TYPE = "abbott-platform/components/content/molecules/chipslist/v1/chipslist";

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private Integer chipsCount;

	public List<String> getListOfChips() {
		List<String> listOfChips = new ArrayList<>();
		for (int i = 0; i < chipsCount; i++) {
			listOfChips.add("chip-" + i);
		}
		return listOfChips;
	}
}
