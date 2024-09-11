package com.abbott.aem.platform.common.components.models.commerce;

import com.adobe.cq.wcm.core.components.models.Component;

public interface OrderHistory extends Component {

    int getMaxNumber();

    String getOrderDetailPage();
    
    String getShowSpaceInPrice();
}
