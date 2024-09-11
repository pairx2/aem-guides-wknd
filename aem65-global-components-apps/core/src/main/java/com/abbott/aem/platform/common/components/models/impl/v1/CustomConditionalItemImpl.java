package com.abbott.aem.platform.common.components.models.impl.v1;

import com.abbott.aem.platform.common.components.models.CustomConditionalItem;
import com.google.gson.annotations.Expose;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;

public class CustomConditionalItemImpl implements CustomConditionalItem {

    private static final String EXPAND_FIELD = "expandField";
    private static final String PREVIOUS_FIELD = "previousField";
    private static final String VARIABLE_VALUE = "variableValue";

    @SlingObject
    protected Resource resource;

    private ValueMap properties;

    @Expose
    private String expandedField;
    @Expose
    private String previousField;
    private String variableValue;

    public CustomConditionalItemImpl(Resource option) {

        this.properties = option.getValueMap();
        this.expandedField = this.properties.get(EXPAND_FIELD, StringUtils.EMPTY);
        this.previousField = this.properties.get(PREVIOUS_FIELD, StringUtils.EMPTY);
        this.variableValue = this.properties.get(VARIABLE_VALUE, StringUtils.EMPTY);
    }

    @Override
    public String getExpandedField() {
        return expandedField;
    }

    @Override
    public String getPreviousField() {
        return previousField;
    }

    @Override
    public String getVariableValue() {
        return variableValue;
    }

    //Required for HTL check because the value can be "false" which will not render the container
    @Override
    public boolean valueIsNotBlank() {
        return StringUtils.isNotBlank(variableValue);
    }
}
