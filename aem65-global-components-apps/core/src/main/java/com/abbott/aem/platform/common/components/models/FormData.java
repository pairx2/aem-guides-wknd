package com.abbott.aem.platform.common.components.models;

import java.util.List;

import com.adobe.cq.wcm.core.components.models.Component;

public interface FormData extends Component {
    List<String> getListOfButtons();

    String getDataSource();

    String getDisplayOutput();

    String getTargetDataSource();

    String getTitle();

    String getButtonPosition();

    Integer getNumberOfButtons();

}
