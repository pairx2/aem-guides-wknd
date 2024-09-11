package com.abbott.aem.corp.division.core.components.models;

import org.osgi.annotation.versioning.ConsumerType;

import com.abbott.aem.platform.common.components.models.PlatformTitle;

@ConsumerType
public interface CorpTitle extends PlatformTitle {
	/**
	 * @return Article type
	 */
	String getArticleType();

	/**
	 * @return Authored Date
	 */
	String getAuthoredDate();

	/**
	 * @return Article Title
	 */
	String getArticleTitle();
	
	/**
	 * @return Article Headline
	 */
	String getArticleHeadline();

	/**
	 * @return Article Description
	 */
	String getArticleDescription();

}
