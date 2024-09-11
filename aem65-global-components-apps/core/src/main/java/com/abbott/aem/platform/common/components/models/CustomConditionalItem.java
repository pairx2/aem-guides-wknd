package com.abbott.aem.platform.common.components.models;

import org.osgi.annotation.versioning.ConsumerType;

@ConsumerType
public interface CustomConditionalItem{

    String getExpandedField();

    String getPreviousField();

    String getVariableValue();

    boolean valueIsNotBlank();
}
