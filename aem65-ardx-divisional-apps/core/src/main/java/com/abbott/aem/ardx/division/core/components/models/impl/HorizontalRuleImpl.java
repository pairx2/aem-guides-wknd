package com.abbott.aem.ardx.division.core.components.models.impl;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.abbott.aem.ardx.division.core.components.models.HorizontalRule;
import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;

import lombok.AccessLevel;
import lombok.Data;
import lombok.Setter;

@Data
@Model(adaptables = {SlingHttpServletRequest.class}, adapters = {HorizontalRule.class,
        ComponentExporter.class}, resourceType = HorizontalRuleImpl.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)

public class HorizontalRuleImpl implements HorizontalRule {
    
    protected static final String RESOURCE_TYPE = "ardx/division/components/content/horizontalrule";


    @ValueMapValue
    @Setter(AccessLevel.NONE)
    public String ruleColor;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    public String ruleTopMargin;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    public String ruleBottomMargin;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    public String ruleThickness;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    public String marginCheckBox;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    public String ruleTopAndBottomMargin;
}
