package com.abbott.aem.platform.common.components.models;

import com.adobe.cq.wcm.core.components.models.Component;

import java.util.List;


public interface FormConditional extends Component {

    boolean isDynamic();

    List<CustomConditionalItem> getConditionalItems();

    String getConditionalType();

    String getVariableName();

    String getLabel();

    String getName();

    String getValue();

    String getHelpMessage();

    String getConditionalJson();

    String getUniqueId();

    String getUniqueCheckboxId();
}
