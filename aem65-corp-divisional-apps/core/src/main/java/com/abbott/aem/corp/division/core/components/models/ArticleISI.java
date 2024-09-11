package com.abbott.aem.corp.division.core.components.models;

import java.util.List;
import org.osgi.annotation.versioning.ConsumerType;

@ConsumerType
public interface ArticleISI {
	
	public List<ArticleDetails> getArticleDetails();

	public String getHeadlineText();

}
