package com.abbott.aem.platform.common.components.models.commerce;

import org.osgi.annotation.versioning.ProviderType;

import java.util.List;

@ProviderType
public interface ProductTile extends CifProduct {
    String getBadge();

    List<String> getIncludes();

    String getPdpLinkUrl();

    String getPriceToShow();

    String isEnableLoyaltyPoints();

    String getOutOfStockTitle();

    String getOutOfStockMessage();

    String getStockAlertLinkText();

    String getStockAlertStaticText();

    String isShowFreeDeliveryLabel();

    String isViewProductAATracking();

    String isAddToCartAATracking();

    String isShowBuyNowButton();

    String getSubscriptionOptions();
}
