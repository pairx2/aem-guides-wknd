package com.abbott.aem.corp.division.core.components.models;

import org.osgi.annotation.versioning.ConsumerType;

import com.adobe.cq.wcm.core.components.models.Component;

@ConsumerType
public interface RelatedArticle extends Component {

	Boolean getEnableManualArticleMethod();

	String getRelatedLabel();

	String getArticleType();

	String getArticlePath();

	String openInNewTab();

	String getArticleDescription();

	String getArticleImagePath();

	String getAltText();

}
