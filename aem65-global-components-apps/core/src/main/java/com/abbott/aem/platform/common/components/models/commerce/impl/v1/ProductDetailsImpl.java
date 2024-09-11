package com.abbott.aem.platform.common.components.models.commerce.impl.v1;

import com.abbott.aem.platform.common.components.models.commerce.ProductDetails;
import com.abbott.aem.platform.common.components.services.ProxyPaths;
import com.adobe.cq.export.json.ExporterConstants;
import com.google.gson.JsonElement;
import lombok.extern.slf4j.Slf4j;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;

import javax.annotation.PostConstruct;


@Slf4j
@Model(adaptables = SlingHttpServletRequest.class, adapters = ProductDetails.class, resourceType = ProductDetailsImpl.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class ProductDetailsImpl extends ProductTileImpl implements ProductDetails {
    protected static final String RESOURCE_TYPE = "abbott-platform/components/commerce/productdetails/v1/productdetail";

    protected static final String PRODUCT_DISCLAIMER = "disclaimerText";
    protected static final String DEFAULT_QUANTITIES = "default_quantities";
    protected static final String MAX_SALE_QUANTITY = "max_sale_qty";

    @Override
    @PostConstruct
    public void initModel() {
        super.initModel();
        productRetriever.extendProductQueryWith(p -> p.addCustomObjectField(DEFAULT_QUANTITIES, customFieldQuery -> customFieldQuery.addField(MAX_SALE_QUANTITY)));
    }

    @Override
    public String getDisclaimer() {
        return properties.get(PRODUCT_DISCLAIMER, String.class);
    }

    @Override
    public String getMaxSaleQuantity() {
        String maxQuantity = null;
        JsonElement jsonElement = (JsonElement) productRetriever.fetchProduct().get(DEFAULT_QUANTITIES);
        if (jsonElement.isJsonObject() && jsonElement.getAsJsonObject().has(MAX_SALE_QUANTITY)) {
            maxQuantity = jsonElement.getAsJsonObject().get(MAX_SALE_QUANTITY).getAsString();
        }
        return maxQuantity;
    }

    @Override
    public  String getMediaCarouselProxyPath() {
        return ProxyPaths.mediaCarouselProxy.getPath();
    }
}
