package com.abbott.aem.platform.common.components.models.commerce.impl.v1;

import com.abbott.aem.platform.common.components.models.commerce.SubscriptionDetailsContainer;
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
@Model(adaptables = SlingHttpServletRequest.class, adapters = SubscriptionDetailsContainer.class, resourceType = SubscriptionDetailsContainerImpl.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
        extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class SubscriptionDetailsContainerImpl implements SubscriptionDetailsContainer {
    public static final String RESOURCE_TYPE = "abbott-platform/components/commerce/subscriptiondetails/subscriptiondetailscontainer/v1/subscriptiondetailscontainer";

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    private String subscriptionLabel;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    private String icon;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    private String printInvoiceText;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    private String printCreditMemoText;
}
