package com.abbott.aem.platform.common.components.models.commerce.impl.v1;

import com.abbott.aem.platform.common.components.models.commerce.CifProduct;
import com.abbott.aem.platform.common.components.models.commerce.utils.CommerceConstants;
import com.adobe.cq.commerce.core.components.models.product.Product;
import com.adobe.cq.commerce.core.components.models.retriever.AbstractProductRetriever;
import com.adobe.cq.commerce.core.components.services.urls.UrlProvider;
import com.day.cq.wcm.api.Page;
import lombok.experimental.Delegate;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.via.ResourceSuperType;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import java.util.Locale;

@Slf4j
@Model(
        adaptables = SlingHttpServletRequest.class,
        adapters = CifProduct.class,
        resourceType = CifProductImpl.RESOURCE_TYPE,
        cache = true)
public class CifProductImpl implements CifProduct {
    public static final String RESOURCE_TYPE = "abbott-platform/components/commerce/product/v1/product";
    protected static final String SELECTION_PROPERTY = "selection";
    protected static final String REQUEST_PROPERTY = "productRetriever";

    @Self
    @Via(type = ResourceSuperType.class)
    @Delegate
    protected Product product;

    protected AbstractProductRetriever productRetriever;

    @Self
    protected SlingHttpServletRequest request;

    @Inject
    protected Page currentPage;

    @ScriptVariable
    protected ValueMap properties;

    @Inject
    protected Resource resource;

    @Inject
    protected UrlProvider urlProvider;

    protected Boolean configurable;

    protected Locale locale;

    @PostConstruct
    public void initModel() {
        String sku = StringUtils.EMPTY;
        try {
            productRetriever = (AbstractProductRetriever) request.getAttribute(REQUEST_PROPERTY);
            if (productRetriever == null || productRetriever.fetchProduct() == null) {
                productRetriever = product.getProductRetriever();

                //page properties driven for use on PDP
                ValueMap pageProperties = currentPage.getProperties();
                sku = pageProperties.get(SELECTION_PROPERTY, String.class);
                log.debug("Product Sku authored in page properties: {}", sku);

                if (StringUtils.isEmpty(sku)) {
                    //Product sku not authored, checking for dynamic PDP
                    sku = urlProvider.getProductIdentifier(request);
                    log.debug("Product Sku from URL selector: {}", sku);
                }

                if (StringUtils.isNotBlank(sku)) {
                    productRetriever.setIdentifier(sku);
                }

                request.setAttribute(REQUEST_PROPERTY, productRetriever);
            }
        }catch (RuntimeException e){
            log.warn("Product not found for SKU {}", sku, e);
        }

    }

    public String getCtaOverride() {
        //put add to cart button on commerce components be default
        return CommerceConstants.ADD_TO_CART;
    }
}
