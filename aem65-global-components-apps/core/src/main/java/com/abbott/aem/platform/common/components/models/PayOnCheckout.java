package com.abbott.aem.platform.common.components.models;

import org.osgi.annotation.versioning.ProviderType;

@ProviderType
public interface PayOnCheckout {
    String getCheckoutSummaryPageUrl();
    String getConsumerComponentOption();
}
