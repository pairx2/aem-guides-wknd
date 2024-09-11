package com.abbott.aem.ardx.division.core.components.models.impl;

import javax.inject.Inject;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.abbott.aem.ardx.division.core.components.models.ProductSupportButton;
import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.day.cq.wcm.api.Page;

import lombok.AccessLevel;
import lombok.Data;
import lombok.Setter;

@Data
@Model(adaptables = { SlingHttpServletRequest.class }, adapters = { ProductSupportButton.class,
        ComponentExporter.class }, resourceType = {
                ProductSupportButtonImpl.RESOURCE_TYPE }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class ProductSupportButtonImpl extends ComponentProxyImpl implements ProductSupportButton {

    protected static final String RESOURCE_TYPE = "ardx/division/components/content/productsupportbutton";

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    @Default(booleanValues = true)
    private Boolean supportButton;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    @Default(booleanValues = true)
    private Boolean technicalButton;

    @Inject
    private Page currentPage;

    @Override
    public String getProduct() {
        return currentPage.getPageTitle();
    }
}
