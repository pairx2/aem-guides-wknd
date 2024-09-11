package com.abbott.aem.platform.common.components.models;

import com.adobe.cq.wcm.core.components.models.Component;

import java.util.List;

public interface AccountNavigation extends Component {
    String getCustomerHeader();

    List<AccountNavigationItem> getLinkMultifield();
}
