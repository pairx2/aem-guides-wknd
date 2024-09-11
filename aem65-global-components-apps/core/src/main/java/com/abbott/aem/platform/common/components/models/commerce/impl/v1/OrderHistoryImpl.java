package com.abbott.aem.platform.common.components.models.commerce.impl.v1;

import com.abbott.aem.platform.common.components.models.commerce.OrderHistory;
import com.abbott.aem.platform.common.components.models.impl.v1.ComponentProxyImpl;
import com.abbott.aem.platform.common.util.PageUtil;
import com.adobe.cq.export.json.ExporterConstants;
import com.day.cq.commons.Externalizer;

import lombok.AccessLevel;
import lombok.Data;
import lombok.Setter;

import javax.inject.Inject;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Data
@Model(adaptables = SlingHttpServletRequest.class, adapters = OrderHistory.class, resourceType = OrderHistoryImpl.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
        extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class OrderHistoryImpl extends ComponentProxyImpl implements OrderHistory {
    public static final String RESOURCE_TYPE = "abbott-platform/components/commerce/orderhistory/v1/orderhistory";

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    private int maxNumber;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    private String orderDetailPage;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    private String showSpaceInPrice;

    @SlingObject
	protected ResourceResolver resourceResolver;

	@Inject
    private Externalizer externalizer;

    @Override
    public String getOrderDetailPage() {
        return PageUtil.getUrl(orderDetailPage, resourceResolver, externalizer, true, true);
    }
}
