package com.abbott.aem.platform.common.components.models;

import com.adobe.cq.wcm.core.components.models.Component;

import org.osgi.annotation.versioning.ConsumerType;

@ConsumerType
public interface FormAlert extends Component {

    default String getIcon() {
        throw new UnsupportedOperationException();
    }

    default String getMessage() {
        throw new UnsupportedOperationException();
    }
}
