package com.abbott.aem.platform.common.components.models.impl.v1;

import lombok.Data;

import com.abbott.aem.platform.common.components.models.SearchKeyword;

import lombok.Getter;
import lombok.Setter;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

/**
 * Model used by TopSearchList to create a list of search keywords
 */
@Model(adaptables = Resource.class,
	   adapters = { SearchKeyword.class },
	   defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class SearchKeywordImpl implements SearchKeyword {

	@ValueMapValue
	@Getter
	@Setter
	private String searchKeyword;
}
