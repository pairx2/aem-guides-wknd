package com.abbott.aem.platform.common.components.models.commerce.impl.v1;

import com.abbott.aem.platform.common.components.models.commerce.CifAuthoredProduct;
import com.abbott.aem.platform.common.components.models.commerce.utils.CommerceConstants;
import com.adobe.cq.export.json.ExporterConstants;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;

import javax.annotation.PostConstruct;
import java.util.Objects;

@Slf4j
@Model(adaptables = SlingHttpServletRequest.class, adapters = CifAuthoredProduct.class, resourceType = CifAuthoredProductImpl.RESOURCE_TYPE)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class CifAuthoredProductImpl extends CifProductImpl implements CifAuthoredProduct {
    public static final String RESOURCE_TYPE = "abbott-platform/components/commerce/producttitle/v1/producttitle";

    @Override
    @PostConstruct
    public void initModel() {
        super.initModel();
    }

    @Override
    public String getName() {
        try {
            return Objects.nonNull(properties.get(CommerceConstants.PRODUCT_NAME)) && StringUtils.isNotBlank(properties.get(CommerceConstants.PRODUCT_NAME).toString()) ? properties.get(CommerceConstants.PRODUCT_NAME).toString() : productRetriever.fetchProduct().getName();
        } catch (RuntimeException e) {
            log.error("fetchProduct() failed at {} while getting the 'name' attribute", currentPage.getPath());
            return StringUtils.EMPTY;
        }
    }

    @Override
    public String getDescription() {
        try {
            return Objects.nonNull(properties.get(CommerceConstants.PRODUCT_DESCRIPTION)) && StringUtils.isNotBlank(properties.get(CommerceConstants.PRODUCT_DESCRIPTION).toString()) ? properties.get(CommerceConstants.PRODUCT_DESCRIPTION).toString() : productRetriever.fetchProduct().getDescription().getHtml();
        } catch (RuntimeException e) {
            log.error("fetchProduct() failed at {} while getting the 'description' attribute", currentPage.getPath());
            return StringUtils.EMPTY;
        }
    }
}
