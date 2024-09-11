package com.abbott.aem.platform.common.components.models.impl.v1;

import com.abbott.aem.platform.common.components.models.ArticleList;
import com.adobe.cq.export.json.ExporterConstants;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import lombok.AccessLevel;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import javax.annotation.PostConstruct;
import java.util.List;

/**
 * The Class ArticleList.
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Model(
		adaptables = { SlingHttpServletRequest.class, Resource.class },
		adapters = { ArticleList.class },
		resourceType = { ArticleListImpl.RESOURCE_TYPE },
		defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(
		name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
		extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class ArticleListImpl implements ArticleList {

	/**
	 * The Constant RESOURCE_TYPE.
	 */
	protected static final String RESOURCE_TYPE = "abbott-platform/components/content/molecules/articlelist/v1/articlelist";

	/**
	 * The Constant LATEST_CATEGORY_TITLE
	 */
	public static final String LATEST_CATEGORY_TITLE = "latestCategoryTitle";

	/**
	 * The Constant NO_RESULTS_FOUND
	 */
	public static final String NO_RESULTS_FOUND = "noResultsFound";

	/**
	 * The Constant LOAD_MORE_BUTTON_TEXT
	 */
	public static final String LOAD_MORE_BUTTON_TEXT = "loadMoreButtonText";

	/**
	 * The Constant DEFAULT_IMAGE
	 */
	public static final String DEFAULT_IMAGE = "defaultImage";

	private ObjectMapper mapper = new ObjectMapper();

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String latestCategoryTitle;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String noResultsFound;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String loadMoreButtonText;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String fileReference;

	@ChildResource(name = "categories")
	@Setter(AccessLevel.NONE)
	private List<ArticleCategory> categories;

	@ChildResource(name = "useGETRequest")
	@Setter(AccessLevel.NONE)
	private Boolean useGETRequest;

	@Getter
	@Setter(AccessLevel.NONE)
	private String json;

	@PostConstruct
	private void init() {
		ObjectNode objectNode = mapper.createObjectNode();
		objectNode.put(LATEST_CATEGORY_TITLE, latestCategoryTitle);
		objectNode.put(NO_RESULTS_FOUND, noResultsFound);
		objectNode.put(LOAD_MORE_BUTTON_TEXT, loadMoreButtonText);
		if(StringUtils.isNotBlank(fileReference)) {
			objectNode.put(DEFAULT_IMAGE, fileReference);
		}
		final ArrayNode arrayNode = mapper.createArrayNode();
		if(categories != null && !categories.isEmpty()) {
			categories.forEach(category -> arrayNode.add(category.getObjectNode()));
		}
		objectNode.set("categories", arrayNode);
		json = objectNode.toString();
	}

}
