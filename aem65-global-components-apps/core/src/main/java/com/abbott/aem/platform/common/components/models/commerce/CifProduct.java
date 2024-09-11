package com.abbott.aem.platform.common.components.models.commerce;

import com.adobe.cq.commerce.core.components.models.product.Product;
import org.osgi.annotation.versioning.ProviderType;

@ProviderType
public interface CifProduct extends Product {
    String getCtaOverride();
}
