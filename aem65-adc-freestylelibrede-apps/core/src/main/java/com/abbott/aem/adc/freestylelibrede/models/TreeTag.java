package com.abbott.aem.adc.freestylelibrede.models;

import lombok.Getter;

import java.util.Collections;
import java.util.List;

public class TreeTag {

    private String label;
    private String value;
    @Getter
    private List<TreeTag> children;

    public TreeTag(String label, String value, List<TreeTag> children) {
        this.label = label;
        this.value = value;
        this.children = (children == null ? null : Collections.unmodifiableList(children));
    }

    /**
     * @return the label
     */
    public String getLabel() {
        return label;
    }

    /**
     * @return the value
     */
    public String getValue() {
        return value;
    }

}
