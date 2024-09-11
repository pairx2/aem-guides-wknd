package com.abbott.aem.an.division.core.components.models;

import lombok.*;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Data
@Model(adaptables = { Resource.class },
        adapters = { ProductDetailSku.class },
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class ProductDetailSku {

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    private String pimSku;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    private String priceSpiderSku;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    private String flavorNameOverride;

}

