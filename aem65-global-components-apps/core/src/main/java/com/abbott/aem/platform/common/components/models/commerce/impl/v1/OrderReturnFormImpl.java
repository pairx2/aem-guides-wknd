package com.abbott.aem.platform.common.components.models.commerce.impl.v1;

import com.abbott.aem.platform.common.components.models.commerce.OrderReturnForm;
import com.adobe.cq.export.json.ExporterConstants;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;


@Model(adaptables = SlingHttpServletRequest.class, adapters = OrderReturnForm.class, resourceType = OrderReturnFormImpl.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
        extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class OrderReturnFormImpl implements OrderReturnForm {
    public static final String RESOURCE_TYPE = "abbott-platform/components/commerce/orderdetails/orderreturnform/v1/orderreturnform";

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    @Getter
    private String id;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    @Getter
    private String itemsLabel;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    @Getter
    private String itemsQtyLabel;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    @Getter
    private String commentLabel;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    @Getter
    private String commentPlaceholder;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    @Getter
    private String successPagePath;
}
