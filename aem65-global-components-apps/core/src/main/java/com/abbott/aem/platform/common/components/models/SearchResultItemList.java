package com.abbott.aem.platform.common.components.models;

import com.adobe.cq.wcm.core.components.models.Component;

public interface SearchResultItemList extends Component {

    String getResultKey();

    String getResultLabel();

    String getSelectType();

    String getUrlLink();

}
