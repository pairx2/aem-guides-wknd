package com.abbott.aem.platform.common.components.models.commerce.impl.v1;

import com.abbott.aem.platform.common.components.models.commerce.ProductDetail;
import com.abbott.aem.platform.common.util.PageUtil;
import com.adobe.cq.sightly.SightlyWCMMode;
import com.day.cq.commons.Externalizer;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;

import javax.annotation.PostConstruct;
import javax.inject.Inject;

@Model(
        adaptables = SlingHttpServletRequest.class,
        adapters = ProductDetail.class,
        resourceType = ProductDetailImpl.RESOURCE_TYPE,
        cache = true)
public class ProductDetailImpl extends CifProductImpl implements ProductDetail {
    public static final String RESOURCE_TYPE = "abbott-platform/components/structure/productdetail/v1/productdetail";

    @ScriptVariable(name = "wcmmode")
    private SightlyWCMMode wcmMode;

    @Inject
    private Externalizer externalizer;

    private String canonicalUrl;

    @Override
    @PostConstruct
    public void initModel() {
        super.initModel();
        if (!wcmMode.isDisabled()) {
            canonicalUrl = externalizer.authorLink(resource.getResourceResolver(), request.getRequestURI());
        } else {
            canonicalUrl = PageUtil.getUrl(request.getRequestURI(),resource.getResourceResolver());
        }
    }

    @Override
    public String getMetaDescription() {
        return productRetriever.fetchProduct().getMetaDescription();
    }

    @Override
    public String getMetaKeywords() {
        return productRetriever.fetchProduct().getMetaKeyword();
    }

    @Override
    public String getMetaTitle() {
        return StringUtils.defaultString(productRetriever.fetchProduct().getMetaTitle(), getName());
    }

    @Override
    public String getCanonicalUrl() {
        return canonicalUrl;
    }

}
