package com.abbott.aem.cv.division.core.components.models.impl;

import com.abbott.aem.cv.division.core.components.models.HorizontalRule;

import lombok.Getter;

import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.apache.sling.api.SlingHttpServletRequest;


@Model(adaptables = { SlingHttpServletRequest.class }, adapters = { HorizontalRule.class },
    resourceType = { HorizontalRuleImpl.RESOURCE_TYPE },
 defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class HorizontalRuleImpl implements HorizontalRule{
    
    public static final String RESOURCE_TYPE = "cv/division/components/content/horizontalrule";

    @Getter
    @ValueMapValue
    @Default(values = "charcoal")
    public String ruleColor;

    @Getter
    @ValueMapValue
    @Default(values="margin-top-large")
    public String topMargin;

    @Getter
    @ValueMapValue
    @Default(values="margin-bottom-large")
    public String bottomMargin;
}