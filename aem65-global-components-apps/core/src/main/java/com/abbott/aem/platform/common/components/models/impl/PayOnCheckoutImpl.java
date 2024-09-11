package com.abbott.aem.platform.common.components.models.impl;

import com.abbott.aem.platform.common.components.models.PayOnCheckout;
import com.abbott.aem.platform.common.util.PageUtil;
import com.adobe.cq.export.json.ExporterConstants;
import com.day.cq.commons.Externalizer;
import lombok.Data;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;

import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.injectorspecific.InjectionStrategy;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import org.apache.sling.api.resource.ValueMap;

import javax.inject.Inject;
import java.util.Optional;
import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Data
@Model(adaptables = SlingHttpServletRequest.class, adapters = PayOnCheckout.class, resourceType = PayOnCheckoutImpl.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class PayOnCheckoutImpl implements PayOnCheckout {
    public static final String RESOURCE_TYPE = "abbott-platform/components/form/payoncheckout/v1/payoncheckout";
    protected static final String NORMAL = "normal";

    @SlingObject
    protected ResourceResolver resourceResolver;
    
    @Inject
    private Externalizer externalizer;
    
    @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
    private String checkoutSummaryPageUrl;
    
    public String getCheckoutSummaryPageUrl() {
        return Optional.ofNullable(checkoutSummaryPageUrl)
                .map(url -> PageUtil.getUrl(checkoutSummaryPageUrl, resourceResolver, externalizer, true, true))
                .orElse(StringUtils.EMPTY);
    }

   @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
    private String consumerComponentOption;

    public String getConsumerComponentOption() {
        return Objects.nonNull(consumerComponentOption) && StringUtils.isNotBlank(consumerComponentOption) ? consumerComponentOption : NORMAL;
    }

}
