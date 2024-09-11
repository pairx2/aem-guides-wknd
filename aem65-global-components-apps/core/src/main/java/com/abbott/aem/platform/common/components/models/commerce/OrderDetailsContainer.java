package com.abbott.aem.platform.common.components.models.commerce;

import org.osgi.annotation.versioning.ProviderType;

@ProviderType
public interface OrderDetailsContainer {

    default String getOrderLabel() {
        throw new UnsupportedOperationException();
    }

    default String getIcon() {
        throw new UnsupportedOperationException();
    }

    default String getPrintInvoiceText() {
        throw new UnsupportedOperationException();
    }

    default String getPrintCreditMemoText() {
        throw new UnsupportedOperationException();
    }
}
