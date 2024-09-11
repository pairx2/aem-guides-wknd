package com.abbott.aem.corp.division.core.components.models;

import com.adobe.cq.wcm.core.components.models.Component;
import org.osgi.annotation.versioning.ConsumerType;

/**
 * The Interface SearchResultItem.
 */
@ConsumerType
public interface ArticleSearchResultItem extends Component {

	/**
	 * Gets the Article Date.
	 *
	 * @return the Article Date
	 */
	public default String getArticleDate() {
		throw new UnsupportedOperationException();
	}
	/**
	 * Gets the CategoryTitle.
	 *
	 * @return the CategoryTitle.
	 */	
	default String getCategoryTitle() {
		throw new UnsupportedOperationException();
	}
	/**
	 * Gets the HeadingColor.
	 *
	 * @return the HeadingColor
	 */	
	default String getHeadingColor() {
		throw new UnsupportedOperationException();
	}


}