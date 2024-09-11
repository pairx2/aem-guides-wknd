package com.abbott.aem.platform.common.components.models.commerce.impl.v1;

import com.abbott.aem.platform.common.components.models.commerce.SubscriptionHistory;
import com.abbott.aem.platform.common.components.models.impl.v1.ComponentProxyImpl;
import com.abbott.aem.platform.common.util.PageUtil;
import lombok.Getter;
import com.adobe.cq.export.json.ExporterConstants;
import com.day.cq.commons.Externalizer;

import lombok.AccessLevel;
import lombok.Setter;

import javax.inject.Inject;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adaptables = SlingHttpServletRequest.class, adapters = SubscriptionHistory.class, resourceType = SubscriptionHistoryImpl.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
        extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class SubscriptionHistoryImpl extends ComponentProxyImpl implements SubscriptionHistory {
    public static final String RESOURCE_TYPE = "abbott-platform/components/commerce/subscriptionhistory/v1/subscriptionhistory";

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    @Getter
    private int maxNumber;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    @Getter
    private String subscriptionCategory;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    private String subscriptionDetailPage;

    @SlingObject
	protected ResourceResolver resourceResolver;

	@Inject
    private Externalizer externalizer;

    @Override
    public String getSubscriptionDetailPage() {
        return PageUtil.getUrl(subscriptionDetailPage, resourceResolver, externalizer, true, true);
    }
}
