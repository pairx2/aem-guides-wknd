package com.abbott.aem.platform.common.components.models.impl.v1;

import java.util.List;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;

import com.abbott.aem.platform.common.components.models.SearchKeyword;
import com.abbott.aem.platform.common.components.models.TopSearchList;
import com.adobe.cq.export.json.ExporterConstants;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;


@Model(adaptables = { SlingHttpServletRequest.class },
		adapters = { TopSearchList.class },
		resourceType = { TopSearchListImpl.RESOURCE_TYPE },
		defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
		extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class TopSearchListImpl implements TopSearchList {
	public static final String RESOURCE_TYPE = "abbott-platform/components/content/atoms/topsearchlist/v1/topsearchlist";

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private String headline;

	@ChildResource
	@Setter(AccessLevel.NONE)
	@Getter
	public List<SearchKeyword> searchKeywords;

	@Override
	public List<SearchKeyword> getSearchKeywords() {
		return searchKeywords;
	}
}