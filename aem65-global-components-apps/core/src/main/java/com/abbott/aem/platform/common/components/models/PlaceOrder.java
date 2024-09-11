package com.abbott.aem.platform.common.components.models;

import org.osgi.annotation.versioning.ConsumerType;

import com.adobe.cq.wcm.core.components.models.Component;

@ConsumerType
public interface PlaceOrder extends Component {
    
    default String getSuccessPageShortenedUrl() {
        throw new UnsupportedOperationException();
    }

    default String getGuestPageShortenedUrl() {
        throw new UnsupportedOperationException();
    }
    
    default String getErrorPageShortenedUrl() {
        throw new UnsupportedOperationException();
    }
    
    default String getPurchaseAATracking() {
        throw new UnsupportedOperationException();
    }
}