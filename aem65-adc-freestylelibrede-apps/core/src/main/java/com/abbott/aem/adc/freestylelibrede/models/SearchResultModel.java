package com.abbott.aem.adc.freestylelibrede.models;

import java.util.List;

import javax.annotation.PostConstruct;
import javax.inject.Inject;

import com.abbott.aem.adc.freestylelibrede.services.TreeTagService;

import lombok.Getter;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Model class for search result component.
 *
 * @author jordyelst
 */
@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, resourceType = "adc/freestylelibrede/components/content/search-result")
public class SearchResultModel extends BaseComponentPropertiesImpl {

	private static final Logger LOGGER = LoggerFactory.getLogger(SearchResultModel.class);

	/** The view more style. */
	@Inject
	private String viewMoreStyle;

	/** The nr of results. */
	@Inject
	private int nrOfResults;

	/** The nr of view more. */
	@Inject
	private int nrOfViewMore;

	/** The filter root path. */
	@Inject
	private String filterRootPath;

	@Inject
	private String searchRootPath;

	@Inject
	private ResourceResolver resolver;

	@Inject
	private TreeTagService treeTagService;

	@Self
	private Resource resource;
	@Getter
	/** The filters. */
	private List<TreeTag> filters;


	@PostConstruct
	protected void init() {
		if (filterRootPath != null) {
			filters = treeTagService.resolveTreeTags(resolver, resource, filterRootPath, 1, true);
		} else {
			LOGGER.error("Tag Namespace path not authored");
		}
	}

	/**
	 * Gets the view more style.
	 *
	 * @return the viewMoreStyle
	 */
	public String getViewMoreStyle() {
		return viewMoreStyle;
	}

	/**
	 * Gets the nr of results.
	 *
	 * @return the nrOfResults
	 */
	public int getNrOfResults() {
		return nrOfResults;
	}

	/**
	 * Gets the nr of view more.
	 *
	 * @return the nrOfViewMore
	 */
	public int getNrOfViewMore() {
		return nrOfViewMore;
	}


	public String getSearchRootPath() {
		return searchRootPath;
	}


}

