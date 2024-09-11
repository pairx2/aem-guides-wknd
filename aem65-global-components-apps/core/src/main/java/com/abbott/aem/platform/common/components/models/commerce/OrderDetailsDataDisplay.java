package com.abbott.aem.platform.common.components.models.commerce;

import org.apache.commons.lang3.NotImplementedException;
import org.osgi.annotation.versioning.ProviderType;

@ProviderType
public interface OrderDetailsDataDisplay {

    default String getTitle() { throw new UnsupportedOperationException(); }

    default String getDataSource() { throw new UnsupportedOperationException(); }

    default String getDisplayOutput() { throw new UnsupportedOperationException(); }
}
