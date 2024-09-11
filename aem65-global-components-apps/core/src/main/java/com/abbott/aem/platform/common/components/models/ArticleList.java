package com.abbott.aem.platform.common.components.models;

import com.abbott.aem.platform.common.components.models.impl.v1.ArticleCategory;
import com.adobe.cq.wcm.core.components.models.Component;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.osgi.annotation.versioning.ConsumerType;

import java.util.List;

@ConsumerType
public interface ArticleList extends Component {

	default String getLatestCategoryTitle() {
		throw new UnsupportedOperationException();
	}
	default String getDefaultImage() {
		throw new UnsupportedOperationException();
	}
	default List<ArticleCategory> getCategories()  {
		throw new UnsupportedOperationException();
	}
	default String getJson() {
		throw new UnsupportedOperationException();
	}

	default Boolean getUseGETRequest() {
		throw new UnsupportedOperationException();
	}

	default ObjectNode getJsonObjectNode() {
		throw new UnsupportedOperationException();
	}
	
}
