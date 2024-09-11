package com.abbott.aem.platform.common.components.models.commerce.impl.v1;  

import com.abbott.aem.platform.common.components.models.commerce.OrderSummary;
import com.adobe.cq.export.json.ExporterConstants; 
import lombok.AccessLevel; 
import lombok.Getter;
import lombok.Setter;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy; 
import org.apache.sling.models.annotations.Exporter; 
import org.apache.sling.models.annotations.Model; 
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adaptables = SlingHttpServletRequest.class, adapters = OrderSummary.class, resourceType = OrderSummaryImpl.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,         
extensions = ExporterConstants.SLING_MODEL_EXTENSION) 
public class OrderSummaryImpl extends MiniCartImpl implements OrderSummary {     
    public static final String RESOURCE_TYPE = "abbott-platform/components/commerce/ordersummary/v1/ordersummary";      
    
    @ValueMapValue     
    @Setter(AccessLevel.NONE)
    @Getter
    private String promoCodeText;           


    @ValueMapValue     
    @Setter(AccessLevel.NONE)
    @Getter
    private boolean promoCodeEnabled; 

    @ValueMapValue     
    @Setter(AccessLevel.NONE)
    @Getter
    private String promoCodeSuccessMsg;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    @Getter
    private String promoCodeErrorMsg;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    @Getter
    private boolean promoCodeAATracking;

    @ValueMapValue     
    @Setter(AccessLevel.NONE)
    @Getter
    private String showSpaceInPrice; 

    @ValueMapValue     
    @Setter(AccessLevel.NONE)
    @Getter
    private String subtotalWithoutTax; 
    
} 