package com.abbott.aem.platform.common.components.models.commerce;

import org.osgi.annotation.versioning.ProviderType;

@ProviderType
public interface OrderDetailsShipmentTracking {

    default String getArrivalTextPrefix() {
        throw new UnsupportedOperationException();
    }

    default String getTrackingNumberTextPrefix() {
        throw new UnsupportedOperationException();
    }

    default String getArvatoScriptTrackURL() {
        throw new UnsupportedOperationException();
    }

    default String getEnableArvatoTrackingWidget() {
        throw new UnsupportedOperationException();
    }
}
