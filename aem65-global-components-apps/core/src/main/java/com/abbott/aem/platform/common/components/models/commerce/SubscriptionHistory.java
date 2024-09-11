package com.abbott.aem.platform.common.components.models.commerce;

import com.adobe.cq.wcm.core.components.models.Component;

public interface SubscriptionHistory extends Component {

    int getMaxNumber();

    String getSubscriptionDetailPage();

    String getSubscriptionCategory();
    
}
