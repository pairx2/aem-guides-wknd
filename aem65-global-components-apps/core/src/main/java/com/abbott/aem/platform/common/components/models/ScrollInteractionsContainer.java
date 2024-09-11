package com.abbott.aem.platform.common.components.models;

import com.adobe.cq.wcm.core.components.models.Component;
import org.osgi.annotation.versioning.ConsumerType;

import java.util.List;

@ConsumerType
public interface ScrollInteractionsContainer extends Component {
    default String getJsonConfig() {
        throw new UnsupportedOperationException();
    }
    default List<ScrollInteractions> getScrollInteractions() {
        throw new UnsupportedOperationException();
    }
}