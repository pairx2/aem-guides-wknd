package com.abbott.aem.platform.common.components.models.commerce.impl.v1;

import com.abbott.aem.platform.common.components.models.commerce.OrderDetailsDataDisplay;
import com.adobe.cq.export.json.ExporterConstants;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adaptables = SlingHttpServletRequest.class, adapters = OrderDetailsDataDisplay.class, resourceType = OrderDetailsDataDisplayImpl.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
        extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class OrderDetailsDataDisplayImpl implements OrderDetailsDataDisplay {
    public static final String RESOURCE_TYPE = "abbott-platform/components/commerce/orderdetails/orderdetailsdatadisplay/v1/orderdetailsdatadisplay";

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    @Getter
    private String title;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    @Getter
    private String dataSource;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    @Getter
    private String displayOutput;
}
