package com.abbott.aem.platform.common.components.models.impl.v2;

import com.abbott.aem.platform.common.components.models.SearchResultItem;
import com.abbott.aem.platform.common.components.models.SearchResultItemList;
import com.adobe.cq.export.json.ExporterConstants;
import lombok.*;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import java.util.List;

/**
 * The Class SearchResultItemImpl.
 */
@Model(adaptables = { SlingHttpServletRequest.class },
		adapters = { SearchResultItem.class },
		resourceType = { SearchResultItemImpl.RESOURCE_TYPE },
		defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
		extensions = ExporterConstants.SLING_MODEL_EXTENSION)

public class SearchResultItemImpl extends com.abbott.aem.platform.common.components.models.impl.v1.SearchResultItemV1Impl {

	/**
	 * The Constant RESOURCE_TYPE.
	 */
	protected static final String RESOURCE_TYPE = "abbott-platform/components/content/molecules/searchresultitem/v2/searchresultitem";

	/**
	 * The design type.
	 */
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private String designType;

	/**
	 * The image link.
	 */
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private String imagePath;

	/**
	 * The search button label.
	 */
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private String searchButtonLabel;

	/**
	 * The default search button label.
	 */
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private String defaultSearchButtonLabel;

	/**
	 * The search button link.
	 */
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private String searchButtonLink;

	/**
	 * The default search button link.
	 */
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private String defaultSearchButtonLink;

	/**
	 * The video popup enable.
	 */
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private Boolean isVideoPopupEnable;

	/**
	 * The video popup experience fragment path.
	 */
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private String videoPopupXpPath;

	/**
	 * The compare popup enable.
	 */
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private Boolean isComparePopupEnable;

	/**
	 * The product compare label.
	 */
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private String productCompareLabel;

	/**
	 * The compare popup experience fragment path.
	 */
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private String comparePopupXpPath;

	/**
	 * The video app id.
	 */
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private String videoAppId;

	/**
	 * The video account id.
	 */
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private String videoAccountId;

	/**
	 * The video id.
	 */
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private String videoId;

	/**
	 * The video type.
	 */
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private String videoType;


	/**
	 * The Banner Layout.
	 */
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private String bannerLayout;

	/**
	 * The Corner Radius.
	 */
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private String cornerRadius;

	/**
	 * The Banner Position.
	 */
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private String bannerPosition;


	/**
	 * The Icon Alignment.
	 */
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private String iconAlignment;


	/**
	 * The Text Alignment.
	 */
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private String textAlignment;

	
	/**
	 * The iconpicker.
	 */
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private String iconpicker;

	@ChildResource
	@Setter(AccessLevel.NONE)
	@Getter
	public List<SearchResultItemList> searchResultItemList;

}