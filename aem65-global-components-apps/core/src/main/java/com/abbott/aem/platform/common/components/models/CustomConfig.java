package com.abbott.aem.platform.common.components.models;

import org.osgi.annotation.versioning.ConsumerType;

@ConsumerType
public interface CustomConfig {

    default String getId() {
        throw new UnsupportedOperationException();
    }

    default String getClassName() {
        throw new UnsupportedOperationException();
    }

}