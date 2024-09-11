package com.abbott.aem.platform.common.components.models.commerce.impl.v1;

import com.abbott.aem.platform.common.components.models.commerce.PaymentTabs;
import com.abbott.aem.platform.common.components.models.impl.v1.CustomTabsImpl;

import com.fasterxml.jackson.annotation.JsonIgnore;

import com.adobe.cq.export.json.ExporterConstants;
import com.adobe.cq.wcm.core.components.models.Tabs;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.stream.StreamSupport;

@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
        extensions = ExporterConstants.SLING_MODEL_EXTENSION)
@Model(adaptables = { SlingHttpServletRequest.class, Resource.class },
        adapters = { PaymentTabs.class, Tabs.class },
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL,
        resourceType = {PaymentTabsImpl.RESOURCE_TYPE} )
public class PaymentTabsImpl extends CustomTabsImpl implements PaymentTabs {
    public static final String RESOURCE_TYPE = "abbott-platform/components/commerce/paymenttabs/v1/paymenttabs";

    @JsonIgnore
    @Self
    private SlingHttpServletRequest slingHttpServletRequest;

    private Map<String, String> paymentTypes = new HashMap<>();

    public Map<String, String> getPaymentTypes() {
        StreamSupport.stream(slingHttpServletRequest.getResource().getChildren().spliterator(), false)
                .filter(Objects::nonNull)
                .forEach(item -> paymentTypes.put(item.getName(), item.getValueMap().get("paymentType", String.class)));

        return paymentTypes;
    }
}
