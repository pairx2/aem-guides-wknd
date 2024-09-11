package com.abbott.aem.platform.common.components.models.commerce.impl.v1;

import com.abbott.aem.platform.common.components.models.commerce.SubscriptionDetailsDataDisplay;
import com.adobe.cq.export.json.ExporterConstants;
import lombok.AccessLevel;
import lombok.Data;
import lombok.Setter;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Data
@Model(adaptables = SlingHttpServletRequest.class, adapters = SubscriptionDetailsDataDisplay.class, resourceType = SubscriptionDetailsDataDisplayImpl.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
        extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class SubscriptionDetailsDataDisplayImpl implements SubscriptionDetailsDataDisplay {
    public static final String RESOURCE_TYPE = "abbott-platform/components/commerce/subscriptiondetails/subscriptiondetailsdatadisplay/v1/subscriptiondetailsdatadisplay";

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    private String title;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    private String dataSource;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    private String displayOutput;
}
