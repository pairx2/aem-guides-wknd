package com.abbott.aem.platform.common.components.models.commerce;

import org.osgi.annotation.versioning.ProviderType;

@ProviderType
public interface ProductDetails extends ProductTile {

    String getDisclaimer();
    String getMaxSaleQuantity();
    String getMediaCarouselProxyPath();

}
