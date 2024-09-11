package com.abbott.aem.platform.common.components.models;


import com.adobe.cq.wcm.core.components.models.Component;
import org.osgi.annotation.versioning.ConsumerType;

import java.util.List;

/**
 * The Interface SearchResultItem.
 */
@ConsumerType
public interface SearchResultItem extends Component {

	/**
	 * Gets the link text.
	 *
	 * @return the link text
	 */
	default String getLinkText() {
		throw new UnsupportedOperationException();
	}

	/**
	 * Gets the title text.
	 *
	 * @return the title text
	 */
	default String getTitleText() {
		throw new UnsupportedOperationException();
	}

	/**
	 * Gets the description text.
	 *
	 * @return the description text
	 */
	default String getDescriptionText() {
		throw new UnsupportedOperationException();
	}

	/**
	 * Gets the design type.
	 *
	 * @return the design type
	 */

	default String getDesignType() { throw new UnsupportedOperationException(); }

	/**
	 * Gets the image path.
	 *
	 * @return the image path
	 */
	default String getImagePath() { throw new UnsupportedOperationException(); }

	/**
	 * Gets the search button label.
	 *
	 * @return the search button label
	 */
	default String getSearchButtonLabel() { throw new UnsupportedOperationException(); }

	/**
	 * Gets the default search button label.
	 *
	 * @return the default search button label
	 */
	default String getDefaultSearchButtonLabel() { throw new UnsupportedOperationException(); }

	/**
	 * Gets the search button link.
	 *
	 * @return the search button link
	 */
	default String getSearchButtonLink() { throw new UnsupportedOperationException(); }

	/**
	 * Gets the default search button link.
	 *
	 * @return the default search button link
	 */
	default String getDefaultSearchButtonLink() { throw new UnsupportedOperationException(); }

	/**
	 * Gets the checks if video popup is enabled
	 *
	 * @return the checks if video popup is enabled
	 */
	default Boolean getIsVideoPopupEnable() { throw new UnsupportedOperationException(); }

	/**
	 * Gets the video popup experience fragment path.
	 *
	 * @return video popup experience fragment path.
	 */
	default String getVideoPopupXpPath() { throw new UnsupportedOperationException(); }

	/**
	 * Gets the checks if compare popup is enabled.
	 *
	 * @return the checks if compare popup is enabled
	 */
	default Boolean getIsComparePopupEnable() { throw new UnsupportedOperationException(); }

	/**
	 * Gets the product compare label.
	 *
	 * @return the product compare label
	 */
	default String getProductCompareLabel() { throw new UnsupportedOperationException(); }

	/**
	 * Gets the compare popup experience fragment path.
	 *
	 * @return the compare popup experience fragment path.
	 */
	default String getComparePopupXpPath() { throw new UnsupportedOperationException(); }

	/**
	 * Gets the video app id.
	 *
	 * @return the video app id.
	 */
	default String getVideoAppId() { throw new UnsupportedOperationException(); }

	/**
	 * Gets the video account id.
	 *
	 * @return the video account id.
	 */
	default String getVideoAccountId() { throw new UnsupportedOperationException(); }

	/**
	 * Gets the video id.
	 *
	 * @return the video id.
	 */
	default String getVideoId() { throw new UnsupportedOperationException(); }

	/**
	 * Gets the video type.
	 *
	 * @return the video type.
	 */
	default String getVideoType() { throw new UnsupportedOperationException(); }

	/**
	 * Gets the Banner Layout.
	 *
	 * @return the Banner Layout.
	 */
	default String getBannerLayout() { throw new UnsupportedOperationException(); }

	/**
	 * Gets the Banner Position.
	 *
	 * @return the Banner Position.
	 */
	default String getBannerPosition() { throw new UnsupportedOperationException(); }

	/**
	 * Gets the Corner Raidus.
	 *
	 * @return the Corner Radius.
	 */
	default String getCornerRadius() { throw new UnsupportedOperationException(); }


	/**
	 * Gets the Icon Alignment.
	 *
	 * @return the Icon Alignment.
	 */
	default String getIconAlignment() { throw new UnsupportedOperationException(); }


	/**
	 * Gets the Text Alignment.
	 *
	 * @return the Text Alignment.
	 */
	default String getTextAlignment() { throw new UnsupportedOperationException(); }

		/**
	 * Gets the iconpicker.
	 *
	 * @return the iconpicker.
	 */
	default String getIconpicker() { throw new UnsupportedOperationException(); }

	default List<SearchResultItemList> getSearchResultItemList() { throw new UnsupportedOperationException(); }

}