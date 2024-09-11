package com.abbott.aem.platform.common.components.models.commerce;

import org.osgi.annotation.versioning.ProviderType;

@ProviderType
public interface OrderSummary extends MiniCart {

    String getPromoCodeText();

    boolean isPromoCodeEnabled();

    String getPromoCodeSuccessMsg();

    String getPromoCodeErrorMsg();

    boolean isPromoCodeAATracking();

    String getShowSpaceInPrice();

    String getSubtotalWithoutTax();
}
