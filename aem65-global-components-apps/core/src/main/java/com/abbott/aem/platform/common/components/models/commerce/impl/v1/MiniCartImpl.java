package com.abbott.aem.platform.common.components.models.commerce.impl.v1;

import com.abbott.aem.platform.common.components.models.commerce.MiniCart;
import com.abbott.aem.platform.common.components.models.impl.v1.ComponentProxyImpl;
import com.adobe.cq.export.json.ExporterConstants;
import lombok.AccessLevel;
import lombok.Data;
import lombok.Setter;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import java.util.ArrayList;
import java.util.List;

@Data
@Model(adaptables = SlingHttpServletRequest.class, adapters = MiniCart.class, resourceType = MiniCartImpl.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
        extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class MiniCartImpl extends ComponentProxyImpl implements MiniCart {
    public static final String RESOURCE_TYPE = "abbott-platform/components/commerce/minicart/v1/minicart";

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    private String icon;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    private String header;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    private String readAllowed;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    private String cartHeader;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    private String priceToShow;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    private String includeCartButton;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    private String emptyCartMessage;

    @ValueMapValue
    @Default(intValues = 0)
    @Setter(AccessLevel.NONE)
    private Integer numberOfButtons;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    private String enableTax;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    private String incompatibleProductMessage;

    @Override
    public List<String> getListOfButtons() {
        List<String> listOfButtons = new ArrayList<>();
        for (int i = 0; i < numberOfButtons; i++) {
            listOfButtons.add("button-" + i);
        }
        return listOfButtons;
    }

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    private String miniAddToCartAATracking;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    private String miniRemoveCartAATracking;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    private String showSpaceInPrice;

    @ValueMapValue     
    @Setter(AccessLevel.NONE)     
    private String subtotalWithoutTax; 

}
