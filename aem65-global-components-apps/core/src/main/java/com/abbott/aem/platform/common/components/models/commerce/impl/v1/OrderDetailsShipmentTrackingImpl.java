package com.abbott.aem.platform.common.components.models.commerce.impl.v1;

import com.abbott.aem.platform.common.components.models.commerce.OrderDetailsShipmentTracking;
import com.adobe.cq.export.json.ExporterConstants;
import lombok.AccessLevel;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;


@Model(adaptables = SlingHttpServletRequest.class, adapters = OrderDetailsShipmentTracking.class, resourceType = OrderDetailsShipmentTrackingImpl.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
        extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class OrderDetailsShipmentTrackingImpl implements OrderDetailsShipmentTracking {
    public static final String RESOURCE_TYPE = "abbott-platform/components/commerce/orderdetails/orderdetailsshipmenttracking/v1/orderdetailsshipmenttracking";

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    @Getter
    private String arrivalTextPrefix;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    @Getter
    private String trackingNumberTextPrefix;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    @Getter
    private String enableArvatoTrackingWidget;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    @Getter
    private String arvatoScriptTrackURL;
}
