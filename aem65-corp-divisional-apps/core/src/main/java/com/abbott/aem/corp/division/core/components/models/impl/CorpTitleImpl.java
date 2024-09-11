package com.abbott.aem.corp.division.core.components.models.impl;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.inject.Inject;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.InjectionStrategy;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.abbott.aem.corp.division.core.components.models.CorpTitle;
import com.adobe.cq.export.json.ExporterConstants;
import com.day.cq.commons.jcr.JcrConstants;
import com.day.cq.wcm.api.Page;

import lombok.AccessLevel;

import lombok.Getter;
import lombok.Setter;


@Model(adaptables = { SlingHttpServletRequest.class }, adapters = { CorpTitle.class }, resourceType = {
		CorpTitleImpl.RESOURCE_TYPE }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class CorpTitleImpl implements CorpTitle {
	public static final String RESOURCE_TYPE = "corp/division/component/content/title";

	private static final Logger log = LoggerFactory.getLogger(CorpTitleImpl.class);

	private static final String AUTH_DATE = "authoredDate";
	private static final String CATEGORY = "category";
	private static final String DESCRIPTION = "description";
	private static final String HEADLINE = "headline";

	@Setter(AccessLevel.NONE)
    @Getter
    @ValueMapValue
	public String articleType;

	@Inject
	@Setter(AccessLevel.NONE)
	@Getter(AccessLevel.NONE)
	public Page currentPage;

	@Setter(AccessLevel.NONE)
	@Getter(AccessLevel.NONE)
	@ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL, name = JcrConstants.JCR_TITLE)

	public String title;

	/**
	 * @return Title of Article Page
	 */
	@Override
	public String getArticleTitle() {
		if (getArticleType().equals(CATEGORY)) {
			ValueMap parentPageProperties = currentPage.getParent().getProperties();
			return parentPageProperties.get(JcrConstants.JCR_TITLE, String.class);
		}
		return StringUtils.EMPTY;
	}

	/**
	 * @return Description of the Article page
	 */
	@Override
	public String getArticleDescription() {
		if (getArticleType().equals(DESCRIPTION)) {
			ValueMap pageProperties = currentPage.getProperties();
			return pageProperties.get(JcrConstants.JCR_DESCRIPTION, String.class);
		}
		return StringUtils.EMPTY;
	}

	/**
	 * @return Article Type to choose out of three variation
	 */
	@Override
	public String getArticleType() {
		return articleType;
	}

	@Override
	public String getAuthoredDate() {
		ValueMap pageProperties = currentPage.getProperties();
		String dateInString = pageProperties.get(AUTH_DATE, String.class);
		SimpleDateFormat smplDateFrmt = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss");
		SimpleDateFormat output = new SimpleDateFormat("MMM.dd, yyy");
		Date authDate = new Date();
		try {
			authDate = smplDateFrmt.parse(dateInString);
		} catch (ParseException e) {
			log.error("Exception in parsing date{} ", e.getMessage());
		}
		return output.format(authDate);

	}

	@Override
	public String getText() {
		return title;
	}

	@Override
	public String getArticleHeadline() {
		if (getArticleType().equals(HEADLINE)) {
			return currentPage.getTitle();
		}
		return StringUtils.EMPTY;
	}
}
