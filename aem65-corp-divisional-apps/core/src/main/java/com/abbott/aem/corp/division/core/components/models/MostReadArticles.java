package com.abbott.aem.corp.division.core.components.models;

import com.adobe.cq.wcm.core.components.models.Component;
import org.osgi.annotation.versioning.ConsumerType;

import java.util.List;

@ConsumerType
public interface MostReadArticles extends Component {

	List<MostReadArticlesModal> getArticleListObj();

	String getTitle();

	String getHoverTitle();

	String getDisplayType();

	String getMostReadArticles();

	String getTotalResults();

}
