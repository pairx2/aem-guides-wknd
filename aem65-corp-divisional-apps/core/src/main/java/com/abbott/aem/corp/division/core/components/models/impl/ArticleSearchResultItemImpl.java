package com.abbott.aem.corp.division.core.components.models.impl;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.abbott.aem.corp.division.core.components.models.ArticleSearchResultItem;
import com.adobe.cq.export.json.ExporterConstants;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;

/**
 * The Class ArticleSearchResultItemImpl.
 */

@Model(adaptables = { SlingHttpServletRequest.class }, adapters = { ArticleSearchResultItem.class }, resourceType = {
		ArticleSearchResultItemImpl.RESOURCE_TYPE }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)

public class ArticleSearchResultItemImpl implements ArticleSearchResultItem {

	/**
	 * The Constant RESOURCE_TYPE.
	 */
	protected static final String RESOURCE_TYPE = "corp/division/component/content/searchresultitem";

	/**
	 * The Article Date.
	 */
	@Setter(AccessLevel.NONE)
    @Getter
    @ValueMapValue
    public String articleDate;

	/**
	 * The design type.
	 */
	@Setter(AccessLevel.NONE)
    @Getter
    @ValueMapValue
    public String designType;

	/**
	 * The image link.
	 */
	@Setter(AccessLevel.NONE)
    @Getter
    @ValueMapValue
    public String imagePath;

	/**
	 * The search button label.
	 */
	@Setter(AccessLevel.NONE)
    @Getter
    @ValueMapValue
    public String searchButtonLabel;

	/**
	 * The default search button label.
	 */
	@Setter(AccessLevel.NONE)
    @Getter
    @ValueMapValue
    public String defaultSearchButtonLabel;

	/**
	 * The search button link.
	 */
	@Setter(AccessLevel.NONE)
    @Getter
    @ValueMapValue
    public String searchButtonLink;

	/**
	 * The default search button link.
	 */
	@Setter(AccessLevel.NONE)
    @Getter
    @ValueMapValue
    public String defaultSearchButtonLink;

	/**
	 * The video popup enable.
	 */
	@Setter(AccessLevel.NONE)
    @Getter
    @ValueMapValue
    public Boolean isVideoPopupEnable;

	/**
	 * The video popup experience fragment path.
	 */
	@Setter(AccessLevel.NONE)
    @Getter
    @ValueMapValue
    public String videoPopupXpPath;

	/**
	 * The compare popup enable.
	 */
	
    @Setter(AccessLevel.NONE)
    @Getter
    @ValueMapValue
    public Boolean isComparePopupEnable;

	/**
	 * The product compare label.
	 */
	@Setter(AccessLevel.NONE)
    @Getter
    @ValueMapValue
    public String productCompareLabel;

	/**
	 * The compare popup experience fragment path.
	 */
	@Setter(AccessLevel.NONE)
    @Getter
    @ValueMapValue
    public String comparePopupXpPath;

	/**
	 * The video app id.
	 */
	@Setter(AccessLevel.NONE)
    @Getter
    @ValueMapValue
    public String videoAppId;

	/**
	 * The video account id.
	 */
	@Setter(AccessLevel.NONE)
    @Getter
    @ValueMapValue
    public String videoAccountId;

	/**
	 * The video id.
	 */
	@Setter(AccessLevel.NONE)
    @Getter
    @ValueMapValue
	public String videoId;

	/**
	 * The video type.
	 */
	@Setter(AccessLevel.NONE)
    @Getter
    @ValueMapValue
    public String videoType;

	/**
	 * The link text.
	 */
	@Setter(AccessLevel.NONE)
    @Getter
    @ValueMapValue
    public String linkText;

	/**
	 * The title text.
	 */
	@Setter(AccessLevel.NONE)
    @Getter
    @ValueMapValue
    public String titleText;

	/**
	 * The description text.
	 */
	@Setter(AccessLevel.NONE)
    @Getter
    @ValueMapValue
	public String descriptionText;
		
	/**
	 * The category  title.
	 */
	@Setter(AccessLevel.NONE)
    @Getter
    @ValueMapValue
	private String categoryTitle;
	
	/**
	 * The heading color.
	 */	
	@Setter(AccessLevel.NONE)
    @Getter
    @ValueMapValue
	private String headingColor;
}