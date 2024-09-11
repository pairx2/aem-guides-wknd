package com.abbott.aem.platform.common.components.models.commerce;

import com.adobe.cq.wcm.core.components.models.Component;
import org.osgi.annotation.versioning.ProviderType;

import java.util.List;

@ProviderType
public interface MiniCart extends Component {

    List<String> getListOfButtons();

    String getIcon();

    String getHeader();

    String getReadAllowed();

    String getCartHeader();

    String getPriceToShow();

    String getIncludeCartButton();

    String getEmptyCartMessage();

    Integer getNumberOfButtons();

    String getEnableTax();

    String getIncompatibleProductMessage();

    String getMiniAddToCartAATracking();

    String getMiniRemoveCartAATracking();

    String getShowSpaceInPrice();

    String getSubtotalWithoutTax();
}
